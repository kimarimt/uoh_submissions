import { test, expect } from '@playwright/test'
import helper from './test_helper.js'

test.describe('Blog App', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'testAdmin',
        username: 'tester',
        password: 'secret'
      }
    })

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
      const notification = page.locator('.message')
      await expect(notification).toBeVisible()
      await expect(notification).toHaveText('invalid username or password')
      await expect(notification).toHaveCSS('color', 'rgb(255, 0, 0)')
      await expect(page.getByText('testAdmin is loged in')).not.toBeVisible()
    })
  })
})