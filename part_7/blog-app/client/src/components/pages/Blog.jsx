import { Link, useNavigate } from 'react-router-dom'
import { useComments, useMutations } from '../../hooks/blog'
import { useUserValue } from '../contexts/UserContext'
import { useField } from '../../hooks'
import {
  Box,
  Typography,
  Link as MILink,
  Divider,
  Button,
  FormControl,
  Input,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'

const Blog = ({ blog }) => {
  const navigate = useNavigate()
  const user = useUserValue()
  const { reset: textReset, ...commentText } = useField('text')
  const { updateBlogMutation, deleteBlogMutation, addCommentMutation } =
    useMutations()
  const { data: comments, isPending, error } = useComments(blog.id)

  const likeBlog = async blog => {
    await updateBlogMutation.mutateAsync({
      ...blog,
      likes: blog.likes + 1,
    })
  }

  const deleteBlog = async blog => {
    const message = `Remove blog ${blog.title} by ${blog.author}?`

    if (window.confirm(message)) {
      await deleteBlogMutation.mutateAsync(blog)
      navigate('/')
    }
  }

  const addComment = async event => {
    event.preventDefault()
    await addCommentMutation.mutateAsync({
      id: blog.id,
      text: commentText.value,
    })
    textReset()
  }

  return (
    <Box component='div' sx={{ px: 2 }}>
      {blog && comments && (
        <div>
          <Typography sx={{ mt: 2 }} variant='h4'>
            {blog.title}
          </Typography>
          <Typography sx={{ mb: 2 }} color='textSecondary'>
            {blog.author}
          </Typography>
          <MILink
            variant='body1'
            underline='none'
            href={blog.url}
            target='_blank'
          >
            {blog.url}
          </MILink>
          <Box sx={{ my: 2, display: 'flex', alignItems: 'center' }}>
            <Typography variant='body1'>
              Likes: <span data-testid='likes'>{blog.likes}</span>
            </Typography>
            <Button
              sx={{ mx: 1 }}
              variant='contained'
              size='small'
              onClick={() => likeBlog(blog)}
            >
              Like
            </Button>
          </Box>
          <Typography
            color='info'
            component={Link}
            to={`/users/${blog.user.id}`}
          >
            {blog.user.name}
          </Typography>
          <Divider />
          <>
            <Typography variant='h6' sx={{ my: 2 }}>
              Comments
            </Typography>
            {error && (
              <Typography variant='subtitle1'>{error.message}</Typography>
            )}
            {isPending && (
              <Typography variant='subtitle1'>Loading comments...</Typography>
            )}
            <form onSubmit={addComment}>
              <FormControl>
                <Box>
                  <Input placeholder='Add comment here...' {...commentText} />
                  <Button onClick={addComment}>Send</Button>
                </Box>
              </FormControl>
            </form>
            {comments.length > 0 ? (
              <List sx={{ my: 1 }}>
                {comments.map(comment => (
                  <ListItem key={comment.id}>
                    <ListItemText>{comment.text}</ListItemText>
                  </ListItem>
                ))}
              </List>
            ) : (
              <p>No comments found...</p>
            )}
          </>
          <Divider />
          {user.name === blog.user.name && (
            <Button
              sx={{ mt: 2 }}
              variant='contained'
              color='error'
              onClick={() => deleteBlog(blog)}
            >
              Delete
            </Button>
          )}
        </div>
      )}
    </Box>
  )
}

export default Blog
