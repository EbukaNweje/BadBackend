import axios from 'axios'
import { setDataError } from './user'

export const getUser = (id) => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  axios
    .get(`http://127.0.0.1:8080/users/${id}`, config)
    .then((response) => {
      localStorage.setItem('serverResponse', JSON.stringify(response.data.data))
    })
    .catch((error) => {
      dispatch(setDataError(error))
      console.log('Catch error', error)
    })
}
