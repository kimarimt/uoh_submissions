import { useRef } from 'react'
import { useField } from '../../hooks'
import { useMutations } from '../../hooks/blog'
import Toggable from '../helpers/Toggable'

const NewBlog = () => {
  const blogFormRef = useRef()
  const { reset: titleReset, ...title } = useField('title')
  const { reset: authorReset, ...author } = useField('author')
  const { reset: urlReset, ...url } = useField('url', 'url')
  const { newBlogMutation } = useMutations()

  const addBlog = async event => {
    event.preventDefault()

    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }

    await newBlogMutation.mutateAsync(newBlog)
    if (newBlogMutation.isError) {
      return
    }

    titleReset()
    authorReset()
    urlReset()
    blogFormRef.current.toggle()
  }

  return (
    <Toggable buttonLabel='Add Blog' heading='Create Blog' ref={blogFormRef}>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor='title'>Title: </label>
          <input data-testid='title' {...title} />
        </div>
        <div>
          <label htmlFor='author'>Author: </label>
          <input data-testid='author' {...author} />
        </div>
        <div>
          <label htmlFor='url'>Url: </label>
          <input data-testid='url' {...url} />
        </div>
        <button type='submit'>Create</button>
      </form>
    </Toggable>
  )
}

export default NewBlog
