import axios from 'axios'
import { setResetLink, setDataError } from './Resetlink'

export const linkToUser = (id) => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  axios
    .post(`http://127.0.0.1:8080/auth/resendLink/${id}`, config)
    .then((response) => {
      dispatch(setResetLink())
    })
    .catch((error) => {
      dispatch(setDataError(error))
      console.log('Catch error', error)
    })
}
