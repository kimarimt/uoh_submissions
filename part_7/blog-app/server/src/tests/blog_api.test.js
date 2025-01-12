import assert from 'node:assert'
import { after, beforeEach, describe, test } from 'node:test'
import supertest from 'supertest'
import mongoose from 'mongoose'
import app from '../app.js'
import Blog from '../models/blog.js'
import {
  blogsInDb,
  getToken,
  getUser,
  initialBlogs,
  nonExistingId,
} from './test_helper.js'

const baseUrl = '/api/blogs'
const api = supertest(app)

describe('Blog Api test', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    const blogsObjs = initialBlogs.map(blog => new Blog(blog))
    const blogPromises = blogsObjs.map(blog => blog.save())
    await Promise.all(blogPromises)
  })

  describe.skip('creating blogs', async () => {
    const user = await getUser()
    const token = getToken(user)

    const newBlog = {
      title:
        'Unveiling the Power of TensorFlow 2.x: A Comprehensive Primer on Execution Modes and Model Building APIs',
      author: 'Oliver Kohl',
      url: 'https://www.codeproject.com/Tips/5378438/Unveiling-the-Power-of-TensorFlow-2-x-A-Comprehens',
    }

    test('succeeds with a status code of 201 if blog is valid', async () => {
      await api
        .post(baseUrl)
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await blogsInDb()
      assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1)
    })

    test('succeeds with status code of 201 if `url` property is missing', async () => {
      const { url, ...blogToAdd } = newBlog

      await api
        .post(baseUrl)
        .send(blogToAdd)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await blogsInDb()
      assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1)
    })

    test('fails with status code of 400 if `title` property is missing', async () => {
      const { title, ...blogToAdd } = newBlog

      await api
        .post(baseUrl)
        .send(blogToAdd)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)

      const blogsAtEnd = await blogsInDb()
      assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
    })

    test('fails with status code of 400 if `author` property is missing', async () => {
      const { author, ...blogToAdd } = newBlog

      await api
        .post(baseUrl)
        .send(blogToAdd)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)

      const blogsAtEnd = await blogsInDb()
      assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
    })

    test('`likes` defaults to zero if not provided', () => {
      const blogToAdd = new Blog(newBlog)
      assert.strictEqual(blogToAdd.likes, 0)
    })

    test("fails when token isn't provided", async () => {
      const blogsAtStart = await blogsInDb()

      await api.post('/api/blogs').send(newBlog).expect(401)

      assert.strictEqual(blogsAtStart.length, initialBlogs.length)
    })
  })

  describe.skip('reading blogs', () => {
    test('blogs are returned as json', async () => {
      await api
        .get(baseUrl)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('fetches the correct number of blogs', async () => {
      const blogs = await api.get(baseUrl)
      assert.strictEqual(blogs.body.length, initialBlogs.length)
    })

    test('fetching a single blog', async () => {
      const blogs = await blogsInDb()
      const blogToView = blogs[0]
      const response = await api.get(`${baseUrl}/${blogToView.id}`)
      assert.deepStrictEqual(blogToView, response.body)
    })

    test('fails with 400 if id is invalid', async () => {
      const id = '674bc9b386756eb0de45865'
      await api.get(`${baseUrl}/${id}`).expect(400)
    })
  })

  describe.skip('updating blogs', () => {
    test('updated the number of likes', async () => {
      const blogsAtStart = await blogsInDb()
      const oldBlog = blogsAtStart[0]

      const newBlog = {
        ...oldBlog,
        likes: oldBlog.likes + 1,
      }

      await api
        .put(`${baseUrl}/${oldBlog.id}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await blogsInDb()
      const updatedBlogs = blogsAtEnd[0]
      assert.notStrictEqual(oldBlog.likes, updatedBlogs.likes)
    })

    test('fails when `id` is invalid', async () => {
      const id = '674bc9b386756eb0de45865'
      const blogs = await blogsInDb()
      const oldBlog = blogs[0]

      const newBlog = {
        ...oldBlog,
        likes: oldBlog.likes + 1,
      }

      await api.put(`${baseUrl}/${id}`).send(newBlog).expect(400)
    })
  })

  describe.skip('deleting blogs', async () => {
    const user = await getUser()
    const token = getToken(user)

    const newBlog = {
      url: 'https://www.codeproject.com/Articles/5372414/Build-Secure-Kubeflow-Pipelines-on-Microsoft-Azure',
      title: 'Build Secure Kubeflow Pipelines on Microsoft Azure',
      author: 'Intel',
    }

    test('succeeds with status code 204 if `id` is valid', async () => {
      const res = await api
        .post(baseUrl)
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)

      const blogsAtStart = await blogsInDb()
      const blogToDelete = res.body

      await api
        .delete(`${baseUrl}/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await blogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
    })

    test('fails with status code 400 if id is invalid', async () => {
      const id = '674bc9b386756eb0de45865'

      await api
        .delete(`${baseUrl}/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
    })

    test('fails if existing blogs as been deleted', async () => {
      const id = await nonExistingId()

      await api
        .delete(`${baseUrl}/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
    })

    test("fails when token isn't provided", async () => {
      const response = await api
        .post(baseUrl)
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)

      const blogsAtStart = await blogsInDb()
      const blogToDelete = response.body
      await api.delete(`${baseUrl}/${blogToDelete.id}`).expect(401)

      const blogsAtEnd = await blogsInDb()
      assert.strictEqual(blogsAtStart.length, blogsAtEnd.length)
    })
  })

  after(async () => {
    await mongoose.connection.close()
  })
})
