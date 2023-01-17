import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { AiFillCaretDown } from 'react-icons/ai'
import { MdAdd } from 'react-icons/md'
import { SpinnerDotted } from 'spinners-react'

import { linkToUser } from '../redux/ResetlinkApi'
import { getUser } from '../redux/userApi'
import { postLogoutUser } from '../redux/LoginApi'
import { deleteText, postText, getTexts, editText } from '../redux/textApi'
import { setdescriptionEdit, setToggle } from '../redux/text'
import { setAddToggle } from '../redux/text'
import { setAddname } from '../redux/text'
import { setaddDescription } from '../redux/text'
import { setIsEditing } from '../redux/text'
import { setnameEdit } from '../redux/text'

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const getResponse = JSON.parse(localStorage.getItem('serverResponse'))
  const getTextItems = JSON.parse(localStorage.getItem('getText')) || []

  const { resetLink } = useSelector((state) => state.resetReducer)
  const {
    toggle,
    addtoggle,
    addname,
    addDescription,
    isEditing,
    nameEdit,
    descriptionEdit,
  } = useSelector((state) => state.textReducer)

  const handleEditName = (e) => {
    const editName = e.target.value
    dispatch(setnameEdit(editName))
  }

  const handleEditDescription = (e) => {
    const editDescription = e.target.value
    dispatch(setdescriptionEdit(editDescription))
  }

  function handleSaveClick(textId) {
    const editTextValues = { name: nameEdit, description: descriptionEdit }
    dispatch(editText(editTextValues, getResponse._id, textId))
    dispatch(setIsEditing(''))
    alert("Edited successfully")
    dispatch(getTexts(getResponse._id))
  }

  function handleEditClick(textId) {
    dispatch(setIsEditing(textId))
  }
  function handleCancelClick() {
    dispatch(setIsEditing(''))
  }

  const handleName = (e) => {
    const name = e.target.value
    dispatch(setAddname(name))
  }

  const handleDescription = (e) => {
    const description = e.target.value
    dispatch(setaddDescription(description))
  }

  const showlogout = () => {
    dispatch(setToggle())
  }

  const showAddBox = () => {
    dispatch(setAddToggle(true))
  }
  const removeAddBox = () => {
    dispatch(setAddToggle(false))
  }

  const handleLogout = () => {
    dispatch(postLogoutUser(getResponse._id))
    navigate('/')
  }

  useEffect(() => {
    dispatch(getUser(getResponse._id))
    dispatch(getTexts(getResponse._id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleResetLink = () => {
    dispatch(linkToUser(getResponse._id))
  }

  const handleCreatetext = () => {
    const userDetail = { name: addname, description: addDescription }
    dispatch(postText(userDetail, getResponse._id))
    alert('Successfully Created text')
    removeAddBox()
    dispatch(getTexts(getResponse._id))
  }

  const handleDeleteText = (id) => {
    dispatch(deleteText(getResponse._id, id))
    alert('Successfully deleted text')
    dispatch(getTexts(getResponse._id))
  }

  if (resetLink) {
    alert('Sent successfully')
  }

  return (
    <MainContainer>
      {!getResponse.verify ? (
        <Verify>
          <span>
            You have not verified your email address.{' '}
            <LinkMe onClick={() => handleResetLink()}> Click here</LinkMe>
            to resend verification link or check your email for verification link
          </span>
        </Verify>
      ) : null}
      <Header>
        <DashboardText>Dashboard</DashboardText>
        <DashNameLog>
          <span>
            {getResponse.firstName} {getResponse.lastName}
          </span>
          <AiFillCaretDown
            style={{ cursor: 'pointer' }}
            onClick={() => showlogout()}
          />
        </DashNameLog>
        {toggle ? (
          <LogoOut onClick={() => handleLogout()}>Log out</LogoOut>
        ) : (
          ''
        )}
      </Header>
      <MainBody>
        <CardBodyMain>
          {getTextItems.length ? (
            getTextItems.map((text) =>
              isEditing === text._id ? (
                <Card width height>
                <TopHeader>Edit Item</TopHeader>
                <FromData>
                  <FromDataInput>
                    <Laber>Name</Laber>
                    <Input
                      onChange={(e) => handleEditName(e)}
                      name="name"
                      type="text"
                      placeholder="Input item name here"
                      defaultValue={text.name}
                    />
                  </FromDataInput>
                  <FromDataInput>
                    <Laber>Add Note</Laber>
                    <Textarea
                      onChange={(e) => handleEditDescription(e)}
                      name="description"
                      type="text"
                      placeholder="Type Here"
                      defaultValue={text.description}
                    />
                  </FromDataInput>
                </FromData>
                <ButtonDiv2>
                  <Button2 onClick={() => handleCancelClick()}>Cancel</Button2>
                  <Button2 onClick={() => handleSaveClick(text._id)} bg>
                    Save
                  </Button2>
                </ButtonDiv2>
              </Card>
              ) : (
                <Card key={text._id}>
                  <NamePart>
                    <Title>Name</Title>
                    <span>{text.name}</span>
                  </NamePart>

                  <Desc>
                    <Title>Description</Title>
                    <Dis>
                      <span> {text.description} </span>
                    </Dis>
                  </Desc>

                  <ButtonDiv>
                    <Button onClick={() => handleEditClick(text._id)}>Edit</Button>
                    <Button bg onClick={() => handleDeleteText(text._id)}>
                      Delete
                    </Button>
                  </ButtonDiv>
                </Card>
              ),
            )
          ) : (
            <div
              style={{
                display: 'flex',
                width: '100%',
                height: '100vh',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SpinnerDotted
                size={90}
                thickness={149}
                speed={102}
                color="rgba(87, 57, 172, 1)"
              />
            </div>
          )}
        </CardBodyMain>
      </MainBody>
      {getResponse.verify ? (
        <AddDiv onClick={() => showAddBox()}>
          <MdAdd
            style={{ color: 'white', fontSize: '20px' }}
            onClick={() => showAddBox()}
          />
        </AddDiv>
      ) : null}
      {addtoggle ? (
        <AddBox>
          <Card width height>
            <TopHeader>Create Item</TopHeader>
            <FromData>
              <FromDataInput>
                <Laber>Name</Laber>
                <Input
                  onChange={(e) => handleName(e)}
                  name="name"
                  type="text"
                  placeholder="Input item name here"
                />
              </FromDataInput>
              <FromDataInput>
                <Laber>Add Note</Laber>
                <Textarea
                  onChange={(e) => handleDescription(e)}
                  name="description"
                  type="text"
                  placeholder="Type Here"
                />
              </FromDataInput>
            </FromData>
            <ButtonDiv2>
              <Button2 onClick={() => removeAddBox()}>Cancel</Button2>
              <Button2 onClick={() => handleCreatetext()} bg>
                Create Text
              </Button2>
            </ButtonDiv2>
          </Card>
        </AddBox>
      ) : (
        ''
      )}
    </MainContainer>
  )
}

export default Dashboard

const Textarea = styled.textarea`
  width: 95%;
  height: 150px;
  border-radius: 4px;
  outline: none;
  border: 1px solid lightgray;
  padding-left: 10px;
  margin: 1% 0px;
`
const Input = styled.input`
  width: 95%;
  height: 40px;
  border-radius: 4px;
  outline: none;
  border: 1px solid lightgray;
  padding-left: 10px;
  margin: 1% 0px;
`
const Laber = styled.div`
  font-family: sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #1a1a1a;
`
const FromDataInput = styled.div`
  width: 100%;
  margin-bottom: 10px;
`
const FromData = styled.form`
  width: 100%;
  height: 75%;
`
const TopHeader = styled.div`
  width: 100%;
  height: 40px;
  border-bottom: 1px solid lightgray;
  display: flex;
  align-items: center;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #000000;
`
const AddBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.651);
  z-index: 100;
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const AddDiv = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: blue;
  position: absolute;
  bottom: 20px;
  right: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
const Button2 = styled.button`
  width: 100px;
  padding: 3px;
  height: 35px;
  margin: 0px 5px;
  cursor: pointer;
  background: ${({ bg }) => (bg ? '#999A9B' : '#EFEFF0')};
  color: ${({ bg }) => (bg ? 'white' : 'black')};
  border: ${({ bg }) => (bg ? 'none' : '1px solid gray')};
  border-radius: 4px;
`
const ButtonDiv2 = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-end;
`
const Button = styled.button`
  width: 100px;
  padding: 3px;
  height: 35px;
  margin: 0px 5px;
  cursor: pointer;
  background: ${({ bg }) => (bg ? 'Black' : 'white')};
  color: ${({ bg }) => (bg ? 'white' : 'black')};
  border: ${({ bg }) => (bg ? 'none' : '1px solid gray')};
  border-radius: 4px;
`
const ButtonDiv = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-end;
`
const Dis = styled.div`
  width: 350px;
  height: 80%;
  overflow-y: scroll;
`
const Desc = styled.div`
  width: 100%;
  height: 60%;
`
const Title = styled.div`
  font-size: 15px;
  color: gray;
  margin-bottom: 5px;
`
const NamePart = styled.div`
  width: 100%;
  height: 50px;

  span {
    font-weight: 500px;
    font-family: sans-serif;
    margin-top: 5px;
  }
`
const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  gap: 10px;
  min-width: ${({ width }) => (width ? '500px' : '350px')};
  height: ${({ height }) => (height ? '350px' : '242px')};
  background: #ffffff;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  margin: 3% 0.5%;
`
const CardBodyMain = styled.div`
  width: 90%;
  height: max-content;
  display: flex;
  flex-wrap: wrap;
`
const MainBody = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  overflow-y: scroll;
`
const LogoOut = styled.div`
  width: 100px;
  padding: 10px;
  background: #ffffff;
  border: 1px solid #fefefe;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.18);
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #f41e10;
  position: absolute;
  right: 85px;
  top: 50px;
  cursor: pointer;
`
const DashNameLog = styled.div`
  width: 200px;
  display: flex;
  align-items: center;

  span {
    margin-right: 5%;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
  }
`
const DashboardText = styled.div`
  margin-left: 5%;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
`
const Header = styled.div`
  width: 100%;
  height: 70px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`
const LinkMe = styled.span`
  color: rgba(0, 76, 189, 1);
  cursor: pointer;
`
const Verify = styled.div`
  width: 100%;
  height: 40px;
  background-color: #fff0cb;
  display: flex;
  justify-content: center;
  align-items: center;
`
const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: rgba(250, 250, 250, 1);
  position: relative;
`
