import { test, expect } from '@playwright/test'

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
})