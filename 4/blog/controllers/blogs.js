const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  res.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body
  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  } else if (!body.title || !body.url) {
    return res.status(400).json({ error: 'title and url cannot be empty!' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  res.json(savedBlog.toJSON())
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (blog) {
    res.json(blog.toJSON())
  } else {
    res.status(404).end()
  }
})

blogsRouter.put('/:id', (req, res, next) => {
  // do something
})

blogsRouter.delete('/:id', async (req, res) => {
  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const blog = await Blog.findById(req.params.id)
    .then(blog => {
      if (blog) {
        return blog.toJSON()
      } else {
        return res.status(401).json({ error: 'you are unauthorized to delete someone else\'s post!' })
      }
    })

  if (!blog) {
    res.status(204).end()
  }
  const authorId = blog.user.toString()
  if (decodedToken.id !== authorId) {
    return res.status(401).json({ error: 'only the author of this blog can delete it' })
  }

  Blog.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
})

module.exports = blogsRouter