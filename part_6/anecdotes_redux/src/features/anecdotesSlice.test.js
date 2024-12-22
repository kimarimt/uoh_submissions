import deepFreeze from 'deep-freeze'
import anecdotesReducer, { castVote, addAnecdote } from './ancedotesSlice'

describe('anecdotesReducer', () => {
  test('initializes state with initialValue', () => {
    const state = []
    const initialState = anecdotesReducer(state, { type: 'unknown' })
    expect(initialState).toBe(state)
  })

  test('update votes with the `castVote` action', () => {
    const state = [
      {
        id: 1,
        text: 'testAnecdote 1',
        votes: 0
      },
      {
        id: 2,
        text: 'testAnecdote 2',
        votes: 0
      },
    ]

    deepFreeze(state)
    const newState = anecdotesReducer(state, castVote(2))
    expect(newState).toContainEqual(state[0])
    expect(newState).toContainEqual({
      id: 2,
      text: 'testAnecdote 2',
      votes: 1
    })
  })

  test('adds an anecdote with the `addAnecdote` action', () => {
    const state = []
    deepFreeze(state)

    const payload = 'testAnecdote 1'
    const newState = anecdotesReducer(state, addAnecdote(payload))
    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual({
      id: newState[0].id,
      text: payload,
      votes: 0
    })
  })
})