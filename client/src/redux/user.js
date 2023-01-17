// Create actions and reducers
export const ActionTypes = {
    GETUSER: 'GETUSER',
  GETERROR: 'GETERROR',
}

export const setDataError = (data) => ({
  type: ActionTypes.GETERROR,
  payload: data,
})

const initialState = {
  errors: [],
  gottenUser: [],
}

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GETERROR:
      return {
        ...state,
        errors: payload,
      }
    default:
      return state
  }
}
export default userReducer
