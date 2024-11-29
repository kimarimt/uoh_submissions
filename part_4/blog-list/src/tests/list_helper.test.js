import { test, describe } from 'node:test'
import assert from 'node:assert'
import listHelper from '../utils/list_helper.js'

const testBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

describe.skip('dummy', () => {
  test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })
})

describe.skip('total likes', () => {
  test('of empty list is zero', () => {
    const blogs = []

    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog', () => {
    const blogs = testBlogs.slice(0, 1)

    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 7)
  })

  test('bigger list is calculated right', () => {
    const result = listHelper.totalLikes(testBlogs)
    assert.strictEqual(result, 36)
  })
})

describe.skip('favorite blog', () => {
  test('empty list', () => {
    const result = listHelper.favoriteBlog([])
    assert.deepStrictEqual(result, {})
  })

  test('bigger list of blogs', () => {
    const result = listHelper.favoriteBlog(testBlogs)
    const expected = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }

    assert.deepStrictEqual(result, expected)
  })

  test('multiple blogs with the same number of likes', () => {
    const blogs = [
      {
        _id: '5a422b3a1b54a676234d172a',
        title: 'Functional Programming',
        author: 'Edsger W. Dijkstra',
        url: 'http://blog.cleancoder.com/uncle-bob/2018/08/01/FunctionalProgramming.html',
        likes: 12,
        __v: 0,
      },
      ...testBlogs,
    ]

    const result = listHelper.favoriteBlog(blogs)
    const expected = {
      title: 'Functional Programming',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    }

    assert.deepStrictEqual(result, expected)
  })
})

describe.skip('most blogs', () => {
  test('empty list', () => {
    const result = listHelper.mostBlogs([])
    assert.deepStrictEqual(result, {})
  })

  test('bigger list of blogs', () => {
    const result = listHelper.mostBlogs(testBlogs)
    const expected = {
      author: 'Robert C. Martin',
      blogs: 3
    }

    assert.deepStrictEqual(result, expected)
  })

  test('authors with the same number of blogs', () => {
    const blogs = [
      {
        _id: '5a422b3a1b54a676234d172a',
        title: 'Functional Programming',
        author: 'Edsger W. Dijkstra',
        url: 'http://blog.cleancoder.com/uncle-bob/2018/08/01/FunctionalProgramming.html',
        likes: 12,
        __v: 0,
      },
      ...testBlogs
    ]

    const result = listHelper.mostBlogs(blogs)
    const expected = {
      author: 'Edsger W. Dijkstra',
      blogs: 3
    }

    assert.deepStrictEqual(result, expected)
  })
})

describe.skip('most likes', () => {
  test('empty list', () => {
    const result = listHelper.mostLikes([])
    assert.deepStrictEqual(result, {})
  })

  test('bigger list of blogs', () => {
    const result = listHelper.mostLikes(testBlogs)
    const expected = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }

    assert.deepStrictEqual(result, expected)
  })

  test('two authors with the most likes', () => {
    const blogs = [
      {
        _id: '5a422a851b54a676234d17f7',
        title: 'React hooks',
        author: 'Michael Chan',
        url: 'https://reacthook.com/',
        likes: 10,
        __v: 0,
      },
      ...testBlogs
    ]

    const result = listHelper.mostLikes(blogs)
    const expected = {
      author: 'Michael Chan',
      likes: 17
    }

    assert.deepStrictEqual(result, expected)
  })
})