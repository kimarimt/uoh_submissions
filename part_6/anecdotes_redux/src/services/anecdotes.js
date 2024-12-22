import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAllAnecdotes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnecdote = async text => {
  const newObj = { text, votes: 0 }
  const response = await axios.post(baseUrl, newObj)
  return response.data
}

const addVote = async (id, newObj) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObj)
  return response.data
}

export default {
  getAllAnecdotes,
  createAnecdote,
  addVote
}