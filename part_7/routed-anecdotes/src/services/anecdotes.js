import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAllAnecdotes = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

export const createAnecdote = async newAnecdote => {
  const res = await axios.post(baseUrl, newAnecdote)
  return res.data
}