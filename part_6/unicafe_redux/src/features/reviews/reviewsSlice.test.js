import deepFreeze from 'deep-freeze'
import reviewsReducer, { incrementByType } from './reviewsSlice'

const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

describe('unicafeReducer', () => {
  test('initializes state with initialState', () => {
    const newState = reviewsReducer(initialState, { type: 'undefined' })
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    deepFreeze(initialState)
    const newState = reviewsReducer(initialState, incrementByType('GOOD'))
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('ok is incremented', () => {
    deepFreeze(initialState)
    const newState = reviewsReducer(initialState, incrementByType('OK'))
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    deepFreeze(initialState)
    const newState = reviewsReducer(initialState, incrementByType('BAD'))
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('stats are reset', () => {
    const testState = {
      good: 7,
      ok: 5,
      bad: 3
    }

    deepFreeze(initialState)
    const newState = reviewsReducer(testState, incrementByType('RESET'))
    expect(newState).toEqual(initialState)
  })
})