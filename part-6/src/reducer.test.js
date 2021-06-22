import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('bad is incremented and ok is incremented*2 and decremented',()=>{
      let action={
        type:'BAD'
      }
      const state=initialState
      deepFreeze(state)
      let newState=counterReducer(state,action)
      expect(newState).toEqual({
        good: 0,
        ok: 0,
        bad: 1
      })
      action={
        type:'OK'
      }
      deepFreeze(newState)
      newState=counterReducer(newState,action)
      newState=counterReducer(newState,action)
      expect(newState).toEqual({
        good: 0,
        ok: 2,
        bad: 1
      })
  })
})