export const ActionTypes = {
  GETTEXT: 'GETTEXT',
  GETTEXTERROR: 'GETTEXTERROR',
  CREATETEXT: 'CREATETEXT',
  SETTOGGLE: 'SETTOGGLE',
  ADDTOGGLE: 'ADDTOGGLE',
  ADDTEXTNAME: 'ADDTEXTNAME',
  ADDDESCRIPTION: 'ADDDESCRIPTION',
  TEXTEDIT: 'TEXTEDIT',
  NAMEEDIT: 'NAMEEDIT',
  DESCRIPTIONEDIT: 'DESCRIPTIONEDIT',
}

export const setDataError = (data) => ({
  type: ActionTypes.GETTEXTERROR,
  payload: data,
})
export const getallText = (data) => ({
  type: ActionTypes.GETTEXT,
  payload: data,
})
export const createText = (data) => ({
  type: ActionTypes.CREATETEXT,
  payload: data,
})
export const setToggle = () => ({
  type: ActionTypes.SETTOGGLE,
})
export const setAddToggle = (data) => ({
  type: ActionTypes.ADDTOGGLE,
  payload: data,
})
export const setAddname = (data) => ({
  type: ActionTypes.ADDTEXTNAME,
  payload: data,
})
export const setaddDescription = (data) => ({
  type: ActionTypes.ADDDESCRIPTION,
  payload: data,
})
export const setIsEditing = (data) => ({
  type: ActionTypes.TEXTEDIT,
  payload: data,
})
export const setnameEdit = (data) => ({
  type: ActionTypes.NAMEEDIT,
  payload: data,
})
export const setdescriptionEdit = (data) => ({
  type: ActionTypes.DESCRIPTIONEDIT,
  payload: data,
})

const initialState = {
  getText: [],
  toggle: false,
  addtoggle: '',
  addname: '',
  addDescription: '',
  isEditing: [],
  nameEdit: '',
  descriptionEdit: '',
}

const textReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GETTEXT:
      return {
        ...state,
        getText: payload,
      }
    case ActionTypes.GETTEXTERROR:
      return {
        ...state,
        getText: payload,
      }
    case ActionTypes.SETTOGGLE:
      return {
        ...state,
        toggle: !state.toggle,
      }
    case ActionTypes.ADDTOGGLE:
      return {
        ...state,
        addtoggle: payload,
      }
    case ActionTypes.ADDTEXTNAME:
      return {
        ...state,
        addname: payload,
      }
    case ActionTypes.ADDDESCRIPTION:
      return {
        ...state,
        addDescription: payload,
      }
    case ActionTypes.NAMEEDIT:
      return {
        ...state,
        nameEdit: payload,
      }
    case ActionTypes.DESCRIPTIONEDIT:
      return {
        ...state,
        descriptionEdit: payload,
      }
    case ActionTypes.TEXTEDIT:
      return {
        ...state,
        isEditing: payload,
      }
    default:
      return state
  }
}
export default textReducer
