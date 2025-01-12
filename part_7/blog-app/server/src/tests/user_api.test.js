import assert from 'node:assert'
import { after, beforeEach, describe, test } from 'node:test'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app.js'
import { usersInDb } from './test_helper.js'
import User from '../models/user.js'

const baseUrl = '/api/users'
const api = supertest(app)

describe('User Api testing', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
  })

  describe.skip('creating users', () => {
    test('succeeds with a valid username and password', async () => {
      const usersAtStart = await usersInDb()

      const newUser = {
        username: 'agerman',
        name: 'Alec German',
        password: 'zwe456&lop',
      }

      await api
        .post(baseUrl)
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

      const usernames = usersAtEnd.map(user => user.username)
      assert(usernames.includes(newUser.username))
    })

    test('fails when username is not unique', async () => {
      const usersAtStart = await usersInDb()

      const newUser = {
        username: 'root',
        name: 'testuser',
        password: 'zwe456&lop',
      }

      await api
        .post(baseUrl)
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await usersInDb()
      assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    })

    test('fails when username is missing', async () => {
      const usersAtStart = await usersInDb()

      const newUser = {
        name: 'testuser',
        password: 'zwe456&lop',
      }

      await api
        .post(baseUrl)
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await usersInDb()
      assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    })

    test('fails when username is less than 3 characters', async () => {
      const usersAtStart = await usersInDb()

      const newUser = {
        username: 'ro',
        name: 'testuser',
        password: 'zwe456&lop',
      }

      await api
        .post(baseUrl)
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await usersInDb()
      assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    })

    test('fails when password is missing', async () => {
      const usersAtStart = await usersInDb()

      const newUser = {
        name: 'admin',
        username: 'testuser',
      }

      await api
        .post(baseUrl)
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await usersInDb()
      assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    })

    test('fails when password is less than three characters', async () => {
      const usersAtStart = await usersInDb()

      const newUser = {
        name: 'admin',
        username: 'testuser',
        password: 'ew',
      }

      await api
        .post(baseUrl)
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await usersInDb()
      assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    })
  })

  describe.skip('reading users', () => {
    test('fetches all users', async () => {
      await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
  })

  after(async () => {
    await mongoose.connection.close()
  })
})
