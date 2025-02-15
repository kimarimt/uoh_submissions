import { test, expect } from '@playwright/test'
import helper from './test_helper.js'

test.describe('Blog App', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')

    await helper.createUser(
      request,
      { name: 'testAdmin',
        username: 'tester',
        password: 'secret'
      }
    )

    await helper.createUser(
      request,
      { name: 'testUser',
        username: 'johnsmith',
        password: 'examplePassword'
      }
    )

    await page.goto('/')
  })

  test('login form is shown', async ({ page }) => {
    await expect(page.getByText('BlogList Login')).toBeVisible()
    const loginForm = page.getByRole('form')
    expect(loginForm).toBeDefined()
  })

  test.describe('when logging in', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await helper.loginWith(page, 'tester', 'secret')
      await expect(page.getByText('testAdmin is logged in'))
        .toBeVisible()
    })

    test('fails with the wrong credentials', async ({ page }) => {
      await helper.loginWith(page, 'tester', 'wrong')
      const message = 'invalid username or password'
      await helper.createNotification(page, message, 'rgb(255, 0, 0)')
      await expect(page.getByText('testAdmin is loged in')).not.toBeVisible()
    })
  })

  test.describe('when logged in', () => {
    test.beforeEach(async ({ page }) => {
      await helper.loginWith(page, 'tester', 'secret')
      await page.getByRole('button',)
    })

    test('a new blog can be created', async ({ page }) => {
      await helper.createBlog(page)
      await expect(page.getByText(`${helper.testBlog.title} | ${helper.testBlog.author}`)).toBeVisible()
      const message = `New blog ${helper.testBlog.title} by ${helper.testBlog.author} has been added`
      await helper.createNotification(page, message)
    })

    test.describe('when blogs are created', () => {
      test.beforeEach(async ({ page }) => {
        await helper.createBlog(page)
        await page.getByRole('button', { name: 'Show Info' })
          .click()
      })

      test('click a blog\'s `like` button updates number of likes', async ({ page }) => {
        await page.getByRole('button', { name: 'Like' })
          .click()
        await expect(page.getByTestId('likes')).toHaveText('1')
      })

      test.describe('deleting a blog', () => {
        test('blog doesn\'t appear on the screen when `delete` button is clicked', async ({ page }) => {
          page.on('dialog', async dialog => await dialog.accept())
          await page.getByRole('button', { name: 'Delete' })
            .click()
          await expect(page.getByText(`New blog ${helper.testBlog.title} by ${helper.testBlog.author} has been added`)).not.toBeVisible()
          await helper.createNotification(page, 'Blog successfully deleted')
        })

        test('`delete` is only shown when the user who added it is logged in', async ({ page }) => {
          const deleteButton = page.getByRole('button', { name: 'Delete' })
          await expect(deleteButton).toBeVisible()

          await page.getByRole('button', { name: 'logout' })
            .click()
          await helper.loginWith(page, 'johnsmith', 'examplePassword')
          await page.getByRole('button', { name: 'Show Info' })
            .click()
          await expect(deleteButton).not.toBeVisible()
        })
      })
    })
  })

  test.describe('sorting blogs by like', () => {
    test.beforeEach(async ({ page }) => {
      await helper.loginWith(page, 'tester', 'secret')
      await helper.createBlog(page)
      await helper.createBlog(page, {
        title: 'testTitle',
        author: 'testAuthor',
        url: 'http://www.example.com'
      })
    })

    test.only('blog are sorted from most to least likes', async ({ page }) => {
      const blogs = await page.locator('.blog-tile').all()

      const firstBlog = blogs[0]
      const lastBlog = blogs[1]

      await firstBlog.getByRole('button', { name: 'Show Info' }).click()
      await helper.handleClicks(page, firstBlog)
      await helper.handleClicks(page, firstBlog)
      await helper.handleClicks(page, firstBlog)
      await helper.handleClicks(page, firstBlog)
      await helper.handleClicks(page, firstBlog)
      await lastBlog.getByRole('button', { name: 'Show Info' }).click()
      await helper.handleClicks(page, lastBlog)
      await helper.handleClicks(page, lastBlog)
      await helper.handleClicks(page, lastBlog)
      await helper.handleClicks(page, lastBlog)
      await helper.handleClicks(page, lastBlog)
      await helper.handleClicks(page, lastBlog)
      await helper.handleClicks(page, lastBlog)
      await helper.handleClicks(page, lastBlog)

      const updatedBlogs = await page.locator('.blog-tile').all()
      await expect(updatedBlogs[0].getByText('testTitle | testAuthor')).toBeVisible()
    })
  })
})