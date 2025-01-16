import {
  Box,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  return (
    <Box sx={{ mt: 3, px: 2 }}>
      {user && (
        <>
          <Typography variant='h5'>{user.name}</Typography>
          <Typography color='info' sx={{ mt: 2 }} variant='h6'>added blogs</Typography>
          <Table>
            <TableBody>
              {user.blogs.map(blog => (
                <TableRow key={blog.id}>
                  <TableCell component={Link} to={`/blogs/${blog.id}`}>
                    <Typography variant='body1'>{blog.title}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </Box>
  )
}

export default User
