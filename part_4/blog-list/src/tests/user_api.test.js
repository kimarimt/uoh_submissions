import { test, after, beforeEach, describe } from 'node:test'
import assert from 'node:assert'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app.js'
import helper from './test_helper.js'
import User from '../models/user.js'

const api = supertest(app)

describe('User Api testing', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
  })

  describe('creating new users', () => {
    test('succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'agerman',
        name: 'Alec German',
        password: 'zwe456&lop',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      assert(usernames.includes(newUser.username))
    })

    test('fails if username is not unique', async () => {
      const usersAtStart = helper.usersInDb()

      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'zwe456&lop',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
      assert(result.body.error.includes('expected `username` to be unique'))

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, (await usersAtStart).length)
    })

    test('fails if username is missing from request', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        name: 'Alec German',
        password: 'zwe456&lop',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-type', /application\/json/)

      assert(result.body.error.includes('Path `username` is required'))

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    })

    test('fails if username is less than 3 characters', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'ag',
        name: 'Alec German',
        password: 'zwe456&lop',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-type', /application\/json/)

      assert(
        result.body.error.includes(`Path \`username\` (\`${newUser.username}\`) is shorter than the minimum allowed length (3).`)
      )

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    })

    test('fails if password is missing from request', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'agerman',
        name: 'Alec German',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-type', /application\/json/)

      assert(result.body.error.includes('password is required'))

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    })

    test('fails if password is less than 3 characters', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'agerman',
        name: 'Alec German',
        password: 'ze'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-type', /application\/json/)

      assert(result.body.error.includes('must be longer than 3 characters'))

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    })
  })

  describe('fetching users', () => {
    test('succeeds with a status code of 200', async () => {
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