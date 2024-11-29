import Blog from '../models/blog.js'

const initialBlogs = [
  {
    title: 'Testing Backend Application',
    author: 'John Smith',
    url: 'https://bloglist.fly.dev/jsmith/testing',
  },
  {
    title: 'Using Supertest to Test APIs',
    author: 'Jane Doe',
    url: 'https://bloglist.fly.dev/jsmith/supertest',
  },
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'dummy title',
    author: 'dummy author',
    url: 'dummy url'
  })

  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

export default {
  initialBlogs,
  nonExistingId,
  blogsInDb
}