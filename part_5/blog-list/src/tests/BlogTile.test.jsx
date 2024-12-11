import { expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogTile from '../components/BlogTile'

const blog = {
  url: 'http://www.example.com',
  title: 'Example Title',
  author: 'Example Author',
  likes: 0
}

describe('<BlogTile />', () => {
  test('Renders the title and author only and hides the url and likes', () => {
    const { container } = render(
      <BlogTile blog={blog} />
    )

    const title = container.querySelector('.title')
    expect(title.textContent).to.eq(blog.title)

    const author = container.querySelector('.author')
    expect(author.textContent).to.eq(blog.author)

    const detail = container.querySelector('.blog-details')
    expect(detail).toHaveStyle('display: none')
  })

  test('Renders url and likes when button is clicked', async () => {
    const { container } = render(
      <BlogTile blog={blog} />
    )

    const user = userEvent.setup()
    const detailButton = container.querySelector('.show-detail')
    await user.click(detailButton)

    const details = container.querySelector('.blog-details')
    expect(details).toHaveStyle('display: block')

    const url = container.querySelector('.blog-url')
    expect(url.textContent).to.eq(blog.url)

    const likes = container.querySelector('.blog-likes')
    expect(likes).toHaveTextContent(`Likes: ${blog.likes}`)

    screen.debug(likes)
  })
})
