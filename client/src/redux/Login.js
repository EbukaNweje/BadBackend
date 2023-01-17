export const ActionTypes = {
  FETCH_DATA_LOADING: 'FETCH_DATA_LOADING',
  FETCH_DATA_ERROR: 'FETCH_DATA_ERROR',
  CREATE_USER: 'CREATE_USER',
  PASSWORDSHOW: 'PASSWORDSHOW',
  WRONGEMAIL: 'WRONGEMAIL',
  WRONGPASSWORD: 'WRONGPASSWORD',
  EMAILINPUT: 'EMAILINPUT',
  PASSWORDINPUT: 'PASSPOSTINPUT',
}

export const setLoadingData = () => ({
  type: ActionTypes.FETCH_DATA_LOADING,
})

export const setDataError = (data) => ({
  type: ActionTypes.FETCH_DATA_ERROR,
  payload: data,
})

export const setCreateUser = (data) => ({
  type: ActionTypes.CREATE_USER,
  payload: data,
})

export const setPasswordShow = () => ({
  type: ActionTypes.PASSWORDSHOW,
})
export const setWrongEmail = (data) => ({
  type: ActionTypes.WRONGEMAIL,
  payload: data,
})
export const setemailInput = (data) => ({
  type: ActionTypes.EMAILINPUT,
  payload: data,
})
export const setpasswordInput = (data) => ({
  type: ActionTypes.PASSWORDINPUT,
  payload: data,
})

const initialState = {
  loading: false,
  error: [],
  addedUser: [],
  passwordShow: false,
  wrongEmail: false,
  emailInput: '',
  passwordInput: '',
}

const logInReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.FETCH_DATA_LOADING:
      return {
        ...state,
        loading: true,
      }
    case ActionTypes.CREATE_USER:
      return {
        ...state,
        addedUser: payload,
        loading: false,
      }
    case ActionTypes.FETCH_DATA_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      }
    case ActionTypes.PASSWORDSHOW:
      return {
        ...state,
        passwordShow: !state.passwordShow,
      }
    case ActionTypes.WRONGEMAIL:
      return {
        ...state,
        wrongEmail: payload,
      }
    case ActionTypes.EMAILINPUT:
      return {
        ...state,
        emailInput: payload,
      }
    case ActionTypes.PASSWORDINPUT:
      return {
        ...state,
        passwordInput: payload,
      }
    default:
      return state
  }
}
export default logInReducer
