export const ActionTypes = {
  RESENDLINK: 'RESENDLINK',
  FETCH_DATA_ERROR: 'FETCH_DATA_ERROR',
}

export const setResetLink = () => ({
  type: ActionTypes.RESENDLINK,
})

export const setDataError = (data) => ({
  type: ActionTypes.FETCH_DATA_ERROR,
  payload: data,
})

const initialState = {
  error: [],
  resetLink: false,
}

const resetReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.RESENDLINK:
      return {
        ...state,
        loading: false,
        resetLink: true,
      }
    case ActionTypes.FETCH_DATA_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      }
    default:
      return state
  }
}
export default resetReducer
