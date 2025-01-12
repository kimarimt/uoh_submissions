import { test, expect } from '@playwright/test'
import {
  testNotification,
  createUser,
  loginWith,
  createBlog,
  testBlog,
  likeBlog,
} from './test_helper'

test.describe('Blog App', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')

    await createUser(request, {
      name: 'testAdmin',
      username: 'agerman',
      password: 'secret',
    })

    await createUser(request, {
      name: 'testUser',
      username: 'jdoe',
      password: '081093',
    })

    await page.goto('/')
  })

  test('home page shows login form', async ({ page }) => {
    await expect(page.getByText('BlogApp Login')).toBeVisible()

    const loginForm = page.getByRole('form')
    expect(loginForm).toBeDefined()
  })

  test.describe('when logging in', () => {
    test.skip('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'agerman', 'secret')
      await expect(page.getByText('testAdmin is logged in')).toBeVisible()
    })

    test.skip('fails when logging in with wrong credentials', async ({
      page,
    }) => {
      await loginWith(page, 'agerman', 'wrong')

      const message = 'invalid username or password'
      await testNotification(page, message, 'rgb(255, 0, 0)')
      await expect(page.getByText('testAdmin is logged in')).not.toBeVisible()
    })

    test.describe('when logged in', () => {
      test.beforeEach(async ({ page }) => {
        await loginWith(page, 'agerman', 'secret')
      })

      test.skip('a blog can be created', async ({ page }) => {
        await createBlog(page)
        await expect(
          page.getByText(`${testBlog.title} | ${testBlog.author}`)
        ).toBeVisible()

        const message = `New blog ${testBlog.title} by ${testBlog.author} has been added`
        await testNotification(page, message)
      })

      test.describe('after a blog has been created', () => {
        test.beforeEach(async ({ page }) => {
          await createBlog(page)
          await page.getByRole('button', { name: 'Show Info' }).click()
        })

        test.skip("clicking a blog's `like` button updates the number of likes", async ({
          page,
        }) => {
          await page.getByRole('button', { name: 'Like' }).click()
          await expect(page.getByTestId('likes')).toHaveText('1')
        })

        test.describe('deleting a blog', () => {
          test.skip("pressing a blog's delete button removes it from the page", async ({
            page,
          }) => {
            page.on('dialog', async dialog => await dialog.accept())
            await page.getByRole('button', { name: 'Delete' }).click()
            await expect(
              page.getByText(`${testBlog.title} | ${testBlog.author}`)
            ).not.toBeVisible()
            await testNotification(
              page,
              `${testBlog.title} by ${testBlog.author} has been deleted`
            )
          })

          test.skip('`delete` button is only visible to the person who added the blog', async ({
            page,
          }) => {
            const deleteButton = page.getByRole('button', { name: 'Delete' })
            await expect(deleteButton).toBeVisible()

            await page.getByRole('button', { name: 'logout' }).click()
            await loginWith(page, 'jdoe', '081093')
            await page.getByRole('button', { name: 'Show Info' }).click()
            await expect(deleteButton).not.toBeVisible()
          })
        })
      })
    })
  })

  test.describe('sorting blogs by likes', () => {
    test.beforeEach(async ({ page }) => {
      await loginWith(page, 'agerman', 'secret')
      await createBlog(page)
      await createBlog(page, {
        title: 'test title',
        author: 'test author',
        url: 'http:///www.example.com',
      })
    })

    test.skip('blogs are sorted by most to least likes', async ({ page }) => {
      const blogs = await page.locator('.blog-tile').all()
      const [firstBlog, lastBlog] = blogs

      await firstBlog.getByRole('button', { name: 'Show Info' }).click()
      await likeBlog(firstBlog)
      await likeBlog(firstBlog)
      await lastBlog.getByRole('button', { name: 'Show Info' }).click()
      await likeBlog(lastBlog)
      await likeBlog(lastBlog)
      await likeBlog(lastBlog)

      const blogWithMostLikes = page.locator('.blog-tile')
      await expect(
        blogWithMostLikes.getByText('test title | test author')
      ).toBeVisible()
    })
  })
})
