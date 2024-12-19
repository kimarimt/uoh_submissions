import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

export const unicafeSlice = createSlice({
  name: 'unicafe',
  initialState,
  reducers: {
    incrementByType: (state, action) => {
      switch (action.payload) {
      case 'GOOD':
        return {
          ...state,
          good: state.good + 1
        }
      case 'OK':
        return {
          ...state,
          ok: state.ok + 1
        }
      case 'BAD':
        return {
          ...state,
          bad: state.bad + 1
        }
      case 'RESET':
        return initialState
      default:
        return state
      }
    }
  }
})

export const { incrementByType } = unicafeSlice.actions
export default unicafeSlice.reducer