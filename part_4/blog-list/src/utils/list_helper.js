import _ from 'lodash'

const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  if (blogs.length === 0) {
    return 0
  }

  return _(blogs)
    .sumBy('likes')
}

const favoriteBlog = blogs => {
  if (blogs.length === 0) {
    return {}
  }

  return _(blogs)
    .map((blog) => ({
      title: blog.title,
      author: blog.author,
      likes: blog.likes
    }))
    .orderBy('likes', 'desc')
    .first()
}

const mostBlogs = blogs => {
  if (blogs.length === 0) {
    return {}
  }

  const result = _(blogs)
    .countBy('author')
    .map((val, key) => ({
      author: key,
      blogs: val
    }))
    .orderBy('blogs', 'desc')
    .first()

  return result
}

const mostLikes = blogs => {
  if (blogs.length === 0) {
    return {}
  }

  const result = _(blogs)
    .groupBy('author')
    .map((blog, key) => ({
      'author': key,
      'likes': _.sumBy(blog, 'likes')
    }))
    .orderBy('likes', 'desc')
    .first()

  return result
}

export default {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
