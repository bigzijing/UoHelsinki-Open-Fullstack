const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared')

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('when there are initially some blog saved', () => {
  test('blogs are returned as json', async () => {
    console.log('entered test')
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async() => {
    const res = await api.get('/api/blogs')

    expect(res.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned notes', async () => {
    const res = await api.get('/api/blogs')

    const titles = res.body.map(r => r.title)
    expect(titles).toContain(
      'Blog 2'
    )
  })
})

describe('viewing a specific blog', () => {
  test('succeeds with a vali id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body).toEqual(blogToView)
  })

  test('fails with status code 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    console.log(validNonexistingId)

    await api
      .get(`/api/notes/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with status code 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/notes/${invalidId}`)
      .expect(400)
  })
})

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const userInfo = {
      username: 'zij3',
      password: 'password123'
    }

    const res = await api
      .post('/api/login')
      .send(userInfo)

    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Zi Jing',
      url: 'here',
      likes: 69
    }

    await api
      .post('/api/blogs')
      .set('Authorization', ('bearer ' + res.body.token))
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain(
      'async/await simplifies making async calls'
    )
    const authors = blogsAtEnd.map(b => b.author)
    expect(authors).toContain(
      'Zi Jing'
    )
  })

  test('fails with status code 401 if unauthorized', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Zi Jing',
      url: 'here',
      likes: 69
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })

  test('fails with status code 400 if data invalid', async () => {
    const userInfo = {
      username: 'zij3',
      password: 'password123'
    }

    const res = await api
      .post('/api/login')
      .send(userInfo)

    const newBlog = {
      author: 'Zi Jing'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', ('bearer ' + res.body.token))
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('fails with status code 401 of unauthorized', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401)
  })

  test('succeeds with status code 204 if authorized and id is valid', async () => {
    // dummy userid: 5ea0343b8510e215ccd1204e
    const userInfo = {
      username: 'test',
      password: 'password123'
    }

    const res = await api
      .post('/api/login')
      .send(userInfo)

    const createBlog = {
      author: 'test',
      url: 'test',
      likes: 5,
      title: 'test'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', ('bearer ' + res.body.token))
      .send(createBlog)
      .expect(200)

    const blogToDelete = createBlog

    console.log(createBlog)
    console.log(blogToDelete)
    console.log(typeof(createBlog))

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', ('bearer ' + res.body.token))
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    const contents = blogsAtEnd.map(r => r.title)
    console.log('---')
    console.log(contents)
    console.log('---')

    expect(contents).not.toContain(blogToDelete.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'root', name: 'superuser', password: 'password123' })
    await user.save()
    const user2 = new User({ username: 'zijing', name: 'Zi Jing', password: 'password123' })
    await user2.save()
  })

  test('creation succeeds with a fresh username', async() => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'zij3',
      name: 'Zi Jing',
      password: 'password123',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})