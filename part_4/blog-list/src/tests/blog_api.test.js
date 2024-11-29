import { test, after, beforeEach } from 'node:test'
import assert from 'node:assert'
import mongoose from 'mongoose'
import supertest from 'supertest'
import helper from './test_helper.js'
import Blog from '../models/blog.js'
import app from '../app.js'

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promises = blogObjects.map(blog => blog.save())
  await Promise.all(promises)
})

test('blogs are return as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs have an `id` property', async () => {
  const res = await api.get('/api/blogs')
  const properties = Object.keys(res.body[0])

  assert(properties.includes('id'))
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Writing Tests',
    author: 'Joe Smith',
    url: 'https://bloglist.fly.dev/jsmith/writing-tests',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
})

test('`like` property defaults to 0 if missing from request', async () => {
  const newBlog = Blog({
    title: 'Writing Tests',
    author: 'Joe Smith',
    url: 'https://bloglist.fly.dev/jsmith/writing-tests',
  })

  assert.strictEqual(newBlog.likes, 0)
})

test('blog without a title is not added', async () => {
  const newBlog = {
    author: 'Joe Smith',
    url: 'https://bloglist.fly.dev/jsmith/writing-tests',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test('blog without an author is not added', async () => {
  const newBlog = {
    title: 'Writing Tests',
    url: 'https://bloglist.fly.dev/jsmith/writing-tests',
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

after(async () => {
  await mongoose.connection.close()
})