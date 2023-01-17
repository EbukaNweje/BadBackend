import axios from 'axios'
import { setLoadingData, setDataError, setCreateUser } from './Login'

const USERURL = 'http://127.0.0.1:8080/auth/login/'

export const postLoginUser = (userDetail) => (dispatch) => {
  dispatch(setLoadingData())
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  axios
    .post(USERURL, userDetail, config)
    .then((response) => {
      dispatch(setCreateUser(response.data.data))
      localStorage.setItem('serverResponse', JSON.stringify(response.data.data));
      localStorage.setItem('getText', JSON.stringify(response.data.data.text));
    })
    .catch((error) => {
      dispatch(setDataError(error.response.data.message))
    })
}

export const postLogoutUser = (id) => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  axios
    .post(`http://127.0.0.1:8080/auth/logout/${id}`, config)
    .then((response) => {
      localStorage.removeItem('serverResponse')
      localStorage.removeItem('getText')
    })
    .catch((error) => {
      dispatch(setDataError(error.response.data.message))
      console.log('Catch error', error)
    })
}