import { useEffect, useState, useRef } from 'react'
import Toggable from './Toggable'
import NewBlog from './NewBlog'
import Blogs from './Blogs'

const Home = ({ name, currentUser, handleLogout }) => {
  return (
    <div>
      <p>
        {name} is logged in <button onClick={handleLogout}>logout</button>
      </p>
      <NewBlog />
      <Blogs currentUser={currentUser} />
    </div>
  )
}

export default Home
