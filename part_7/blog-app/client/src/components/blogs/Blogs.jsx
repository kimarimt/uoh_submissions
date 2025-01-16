import { Link } from 'react-router-dom'
import { useBlogs } from '../../hooks/blog'
import { List, ListItem, ListItemButton, Typography } from '@mui/material'

const Blogs = () => {
  const { data: blogs, isPending, error } = useBlogs()
  const blogByLikes = blogs && blogs.toSorted((a, b) => b.likes - a.likes)

  return (
    <>
      {error && <Typography variant='subtitle1'>{error.message}</Typography>}
      {isPending && <Typography variant='subtitle1'>loading blogs...</Typography>}
      {blogByLikes && blogByLikes.length > 0 ? (
        <List sx={{ py: 4 }}>
          {blogByLikes.map(blog => (
            <ListItem sx={{ px: 0 }} key={blog.id}>
              <ListItemButton sx={{ px: 0 }} component={Link} to={`/blogs/${blog.id}`}>
                <Typography variant='h6'>
                  {blog.title} | {blog.author}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <p>No blogs found...</p>
      )}
    </>
  )
}
export default Blogs
