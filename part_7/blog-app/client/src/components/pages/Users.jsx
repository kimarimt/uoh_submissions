import { Link } from 'react-router-dom'
import { useUsers } from '../../hooks/user'
import {
  Box,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableCell,
  Typography,
  TableBody,
  TableRow,
} from '@mui/material'

const Users = () => {
  const { data: users, isPending, error } = useUsers()

  return (
    <Box component='div' sx={{ mt: 4, px: 2 }}>
      {error && <p>{error.message}</p>}
      {isPending && <p>Users loading...</p>}
      {users && (
        <>
          <Typography variant='h5'>Users</Typography>
          <TableContainer sx={{ mt: 2 }} component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Blogs Created</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Typography component={Link} to={`/users/${user.id}`}>{user.name}</Typography>
                    </TableCell>
                    <TableCell>{user.blogs.length}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  )
}

export default Users
