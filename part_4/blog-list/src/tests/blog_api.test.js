import { test, describe, after, beforeEach } from 'node:test'
import assert from 'node:assert'
import mongoose from 'mongoose'
import supertest from 'supertest'
import helper from './test_helper.js'
import Blog from '../models/blog.js'
import app from '../app.js'

const api = supertest(app)


describe('Blog Api Test', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
    const promises = blogObjects.map((blog) => blog.save())
    await Promise.all(promises)
  })

  describe('fetching blogs', () => {
    test('blogs are return as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('api fetches the correct number of blogs', async () => {
      const blogs = await api.get('/api/blogs')
      assert.strictEqual(blogs.body.length, helper.initialBlogs.length)
    })

    test('blogs have an `id` property', async () => {
      const res = await api.get('/api/blogs')
      const properties = Object.keys(res.body[0])

      assert(properties.includes('id'))
    })
  })

  describe('fetching a single blog', () => {
    test('succeed with a 200', async () => {
      const blogs = await helper.blogsInDb()
      const firstBlog = blogs[0]

      const res = await api
        .get(`/api/blogs/${firstBlog.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(res.body, firstBlog)
    })

    test('fails with 400 if id is invalid', async () => {
      const id = '674bc9b386756eb0de45865'

      await api.get(`/api/blogs/${id}`).expect(400)
    })
  })

  describe('creating a new blog', () => {
    describe('valid blogs', () => {
      test('a blog with all properties can be added', async () => {
        const user = await helper.getUser()
        const token = helper.getToken(user)

        const newBlog = {
          title: 'Writing Tests',
          author: 'Joe Smith',
          url: 'https://bloglist.fly.dev/jsmith/writing-tests',
          userId: user.id,
          likes: 5,
        }

        await api
          .post('/api/blogs')
          .send(newBlog)
          .set('Authorization', `Bearer ${token}`)
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
    })

    describe('invalid blogs', () => {
      test('blog titles are required', async () => {
        const user = await helper.getUser()
        const token = helper.getToken(user)

        const newBlog = {
          author: 'Joe Smith',
          url: 'https://bloglist.fly.dev/jsmith/writing-tests',
          userId: user.id,
          likes: 5,
        }

        await api
          .post('/api/blogs')
          .set('Authorization', `Bearer ${token}`)
          .send(newBlog)
          .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
      })
    })

    test('blog authors are required', async () => {
      const user = await helper.getUser()
      const token = helper.getToken(user)

      const newBlog = {
        title: 'Writing Tests',
        url: 'https://bloglist.fly.dev/jsmith/writing-tests',
        userId: user.id,
        likes: 5,
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })

  describe('deleting a blog', () => {
    test('succeed with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

      const titles = blogsAtEnd.map((blog) => blog.title)
      assert(!titles.includes(blogToDelete.title))
    })

    test('fails with status code 400 if id is invalid', async () => {
      const id = '674a70f0548212534d4e6b'

      await api.delete(`/api/blogs/${id}`).expect(400)
    })

    test('fails with status code 204 if existing blog has been deleted', async () => {
      const id = await helper.nonExistingId()

      await api.delete(`/api/blogs/${id}`).expect(204)
    })
  })

  describe('updating a blog', () => {
    test('succeeds in updating the `likes` property', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const oldBlogObj = blogsAtStart[0]

      const newBlog = {
        title: oldBlogObj.title,
        author: oldBlogObj.author,
        url: oldBlogObj.url,
        likes: oldBlogObj.likes + 1,
      }

      await api.put(`/api/blogs/${oldBlogObj.id}`).send(newBlog).expect(200)

      const blogsAtEnd = await helper.blogsInDb()
      const newBlogObj = blogsAtEnd[0]
      assert(oldBlogObj.likes !== newBlogObj.likes)
    })

    test('fails when `id` is invalid', async () => {
      const id = '674bc9b386756eb0de45865'

      const newBlog = {
        title: 'dummy title',
        author: 'dummy author',
        url: 'https://blogs.fly.dev',
        likes: 0,
      }

      await api.put(`/api/blogs/${id}`).send(newBlog).expect(400)
    })
  })

  after(async () => {
    await mongoose.connection.close()
  })
})