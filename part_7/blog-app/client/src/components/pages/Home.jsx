import { Box, Typography } from '@mui/material'
import NewBlog from '../blogs/NewBlog'
import Blogs from '../blogs/Blogs'

const Home = () => {
  return (
    <Box component='div' sx={{ px: 2 }}>
      <Typography variant='h4' sx={{ my: 4 }}>Blogs</Typography>
      <NewBlog />
      <Blogs />
    </Box>
  )
}

export default Home
