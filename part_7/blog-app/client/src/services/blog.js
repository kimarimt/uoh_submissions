import axios from 'axios'

const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = newToken === null ? null : `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const postComment = async ({id, text}) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { text })
  return response.data
}

const getComments = async id => {
  const response = await axios.get(`${baseUrl}/${id}/comments`)
  return response.data
}

const createBlog = async blogObj => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, blogObj, config)
  return response.data
}

const updateBlog = async newObj => {
  const response = await axios.put(`${baseUrl}/${newObj.id}`, newObj)
  return response.data
}

const deleteBlog = async blog => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return response.data
}

export default {
  setToken,
  getAll,
  getComments,
  postComment,
  createBlog,
  updateBlog,
  deleteBlog,
}
