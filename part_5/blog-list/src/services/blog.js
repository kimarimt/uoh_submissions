import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = newToken === null ? null : `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async (blogObj) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, blogObj, config)
  return response.data
}

const updateBlog = async (id, newObj) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObj)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default {
  setToken,
  getAll,
  createBlog,
  updateBlog,
  deleteBlog,
}
