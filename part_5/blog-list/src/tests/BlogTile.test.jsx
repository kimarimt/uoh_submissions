import { beforeEach, expect } from 'vitest'
import { render } from '@testing-library/react'
import BlogTile from '../components/BlogTile'

const blog = {
  url: 'http://www.example.com',
  title: 'Example Title',
  author: 'Example Author',
  likes: 0
}

describe('<BlogTile />', () => {
  let container

  beforeEach(() => {
    container = render(
      <BlogTile blog={blog} />
    ).container
  })

  test('Renders the title and author only and hides the url and likes', () => {
    const title = container.querySelector('.title')
    expect(title).toBeDefined()
    
    const author = container.querySelector('.author')
    expect(author).toBeDefined()
    
    const detail = container.querySelector('.blog-details')
    expect(detail).toHaveStyle('display: none')
  })
})
