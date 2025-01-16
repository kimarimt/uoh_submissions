import { useRef } from 'react'
import { useField } from '../../hooks'
import { useMutations } from '../../hooks/blog'
import Toggable from '../helpers/Toggable'
import { Button, FormControl, Input, InputLabel } from '@mui/material'

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
        <FormControl variant='standard' fullWidth>
          <InputLabel htmlFor='title'>Title: </InputLabel>
          <Input data-testid='title' {...title} />
        </FormControl>
        <FormControl variant='standard' fullWidth>
          <InputLabel htmlFor='author'>Author: </InputLabel>
          <Input data-testid='author' {...author} />
        </FormControl>
        <FormControl variant='standard' fullWidth>
          <InputLabel htmlFor='url'>Url: </InputLabel>
          <Input data-testid='url' {...url} />
        </FormControl>
        <Button variant='contained' type='submit' sx={{ my: 2 }}>
          Create
        </Button>
      </form>
    </Toggable>
  )
}

export default NewBlog
