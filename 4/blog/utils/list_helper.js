const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  let total = 0

  blogs.map(blog => total = total + blog.likes)

  return total
}

const favoriteBlogs = (blogs) => {
  const maxLikes = Math.max(...blogs.map(blog => blog.likes))

  const blog = blogs.find(blog => blog.likes === maxLikes)
  return {
    'title': blog.title,
    'author': blog.author,
    'likes': blog.likes
  }
}

const transformBlog = (blog) => {
  return {
    'title': blog.title,
    'author': blog.author,
    'likes': blog.likes
  }
}

const mostBlogs = (blogs) => {
  const authors = blogs.map((blog) => (blog.author))
  const authorCount = authors.reduce(function(allAuthors, author) {
    if (allAuthors[author]) {
      allAuthors[author]++
    } else {
      allAuthors[author] = 1
    }
    return allAuthors
  }, {})
  const count = Math.max(...Object.values(authorCount))
  const author =  Object.keys(authorCount)[Object.values(authorCount).indexOf(count)]
  return {
    author: author,
    count: count
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlogs, transformBlog, mostBlogs
}