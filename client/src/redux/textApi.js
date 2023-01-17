import axios from 'axios'
import { setDataError, getallText, createText } from './text'

export const getTexts = (id) => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  axios
    .get(`http://127.0.0.1:8080/text/${id}`, config)
    .then((response) => {
      dispatch(getallText(response.data.data.UserText))
      localStorage.setItem(
        'getText',
        JSON.stringify(response.data.data.UserText),
      )
    })
    .catch((error) => {
      dispatch(setDataError(error))
      console.log('Catch error', error)
    })
}

export const postText = (textValues, id) => (dispatch) => {
  console.log(id, 'this is id')
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  axios
    .post(`http://127.0.0.1:8080/text/${id}`, textValues, config)
    .then((response) => {
      dispatch(createText(response))
    })
    .catch((error) => {
      dispatch(setDataError(error))
      console.log('Catch error', error)
    })
}

export const deleteText = (id, textId) => (dispatch) => {
  axios
    .delete(`http://127.0.0.1:8080/text/${id}/${textId}`)
    .then((response) => {
      console.log('Expecting res', response)
    })
    .catch((error) => {
      dispatch(setDataError(error))
      console.log('Catch error', error)
    })
}

export const editText = (textValues, userId, textId) => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  axios
    .patch(`http://127.0.0.1:8080/text/${userId}/${textId}`, textValues, config)
    .then((response) => {
      dispatch(createText(response))
    })
    .catch((error) => {
      dispatch(setDataError(error))
      console.log('Catch error', error)
    })
}
