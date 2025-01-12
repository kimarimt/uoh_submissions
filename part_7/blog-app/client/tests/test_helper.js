import { expect } from '@playwright/test'

export const testBlog = {
  title: 'A blog from playwright',
  author: 'John Doe',
  url: 'http://www.example.com',
}

export const createUser = async (request, data) => {
  await request.post('/api/users', {
    data,
  })
}

export const createBlog = async (page, blog = testBlog) => {
  const { title, author, url } = blog
  await page.getByRole('button', { name: 'Add Blog' }).click()
  await page.getByTestId('title').fill(title)
  await page.getByTestId('author').fill(author)
  await page.getByTestId('url').fill(url)
  await page.getByRole('button', { name: 'Create' }).click()
  await page.getByText(`${title} | ${author}`).waitFor()
}

export const loginWith = async (page, username, password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'Login' }).click()
}

export const testNotification = async (
  page,
  message,
  color = 'rgb(0, 128, 0)'
) => {
  const notification = page.locator('.message')
  await expect(notification).toBeVisible()
  await expect(notification).toHaveText(message)
  await expect(notification).toHaveCSS('color', color)
}

export const likeBlog = async blog => {
  await blog.getByRole('button', { name: 'Like' }).click()
  await blog.getByTestId('likes').waitFor()
}
