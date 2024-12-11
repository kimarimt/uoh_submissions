import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../components/BlogForm'
import { expect } from 'vitest'

describe('<BlogForm />', () => {
  test('Submitting updates the parent state', async () => {
    const addBlog = vi.fn()
    const user = userEvent.setup()

    const { container } = render(<BlogForm addBlog={addBlog} />)

    const titleInput = container.querySelector('#title')
    await user.type(titleInput, 'Test title')

    const authorInput = container.querySelector('#author')
    await user.type(authorInput, 'Test author')

    const urlInput = container.querySelector('#url')
    await user.type(urlInput, 'http://www.example.com')

    const createButton = screen.getByText('Create')
    await user.click(createButton)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe('Test title')
    expect(addBlog.mock.calls[0][0].author).toBe('Test author')
    expect(addBlog.mock.calls[0][0].url).toBe('http://www.example.com')
  })
})