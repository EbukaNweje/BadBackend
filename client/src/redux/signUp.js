// Create actions and reducers
export const ActionTypes = {
    FETCH_SIGNUPDATA_LOADING: 'FETCH_SIGNUPDATA_LOADING',
    FETCH_SIGNUPDATA_ERROR: 'FETCH_SIGNUPDATA_ERROR',
    SIGNUP_USER: 'SIGNUP_USER',
    SETWRONGEMAIL: 'SETWRONGEMAIL',
    SETEMAILINPUT: 'SETEMAILINPUT',
    SETFIRSTNAME: 'SETFIRSTNAME',
    SETLASTNAME: 'SETLASTNAME',
    SETWRONGPASSWORD: 'SETWRONGPASSWORD',
    PASSWORDSHOW: 'PASSWORDSHOW',
    PASSINPUT: 'PASSINPUT'
  }
  
  export const setsignUpLoadingData = () => ({
    type: ActionTypes.FETCH_SIGNUPDATA_LOADING,
  })
  
  export const setsignUpDataError = (data) => ({
    type: ActionTypes.FETCH_SIGNUPDATA_ERROR,
    payload: data,
  })
  
  export const setsignUp = (data) => ({
    type: ActionTypes.SIGNUP_USER,
    payload: data,
  })
  export const setWrongEmail = (data) => ({
    type: ActionTypes.SETWRONGEMAIL,
    payload: data,
  })
  export const setemailInput = (data) => ({
    type: ActionTypes.SETEMAILINPUT,
    payload: data,
  })
  export const setFirstName = (data) => ({
    type: ActionTypes.SETFIRSTNAME,
    payload: data,
  })
  export const setlastName = (data) => ({
    type: ActionTypes.SETLASTNAME,
    payload: data,
  })
  export const setWrongPassword = (data) => ({
    type: ActionTypes.SETWRONGPASSWORD,
    payload: data,
  })
  export const setPasswordShow = () => ({
    type: ActionTypes.PASSWORDSHOW,
  })
  export const setpasswordInput = (data) => ({
    type: ActionTypes.PASSINPUT,
    payload: data,
  })
  
  const initialState = {
    loading: false,
    error: [],
    signedUpUser: [],
    wrongEmail: false,
    emailInput: '',
    FirstName: '',
    lastName: '',
    wrongPassword: false,
    passwordShow: false
  }
  
  const signUpReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case ActionTypes.FETCH_SIGNUPDATA_LOADING:
        return {
          ...state,
          loading: true,
        }
      case ActionTypes.SIGNUP_USER:
        return {
          ...state,
          signedUpUser: payload,
          loading: false,
        }
      case ActionTypes.FETCH_SIGNUPDATA_ERROR:
        return {
          ...state,
          error: payload,
          loading: false,
        }
        case ActionTypes.SETWRONGEMAIL:
          return {
            ...state,
            wrongEmail: payload,
          }
        case ActionTypes.SETEMAILINPUT:
          return {
            ...state,
            emailInput: payload,
          }
        case ActionTypes.SETFIRSTNAME:
          return {
            ...state,
            FirstName: payload,
          }
        case ActionTypes.SETLASTNAME:
          return {
            ...state,
            lastName: payload,
          }
        case ActionTypes.SETWRONGPASSWORD:
          return {
            ...state,
            wrongPassword: payload,
          }
        case ActionTypes.PASSWORDSHOW:
          return {
            ...state,
            passwordShow: !state.passwordShow,
          }
        case ActionTypes.PASSINPUT:
          return {
            ...state,
            passwordInput: payload,
          }
      default:
        return state
    }
  }
  export default signUpReducer
  