import React, { useEffect } from 'react'
import style from 'styled-components'
import { AiOutlineEye } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { SpinnerCircular } from 'spinners-react'

import { signUpUser } from '../redux/signUpApi'
import {
  setemailInput,
  setWrongEmail,
  setFirstName,
  setlastName,
  setWrongPassword,
  setPasswordShow,
  setpasswordInput,
} from '../redux/signUp'

const Signup = () => {
  const dispatch = useDispatch()
  const Navigate = useNavigate()

  const {
    loading,
    error,
    signedUpUser,
    wrongEmail,
    emailInput,
    FirstName,
    lastName,
    wrongPassword,
    passwordShow,
    passwordInput,
  } = useSelector((state) => state.signUpReducer)

  const showPassword = () => {
    dispatch(setPasswordShow())
  }

  const handlePassword = (e) => {
    const password = e.target.value
    if (password.length > 0) {
      dispatch(setpasswordInput(password))
      return dispatch(setWrongPassword(true))
    }
    return dispatch(setWrongPassword(false))
  }

  const handleEmail = (e) => {
    const email = e.target.value
    if (email.length > 0) {
      dispatch(setemailInput(email))
    }
    if (/@/.test(email) || email.length === 0) {
      return dispatch(setWrongEmail(false))
    } else {
      return dispatch(setWrongEmail(true))
    }
  }
  const handleLastName = (e) => {
    const lastName = e.target.value
    dispatch(setlastName(lastName))
  }
  const handleFirstName = (e) => {
    const firstName = e.target.value
    dispatch(setFirstName(firstName))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const userDetail = {
      email: emailInput,
      password: passwordInput,
      firstName: FirstName,
      lastName,
    }
    dispatch(signUpUser(userDetail))
  }
  console.log(wrongEmail)

  useEffect(() => {
    if (signedUpUser._id) {
      Navigate(`/dashboard/${signedUpUser._id}`)
      window.location.reload()
    } else {
      Navigate('/signup')
    }
    if (error.length !== 0 || error === undefined) {
      alert(error)
      window.location.reload()
    }
  }, [signedUpUser, error])
  console.log(error)

  const btnDisable =
    !/[0-9]/.test(passwordInput) ||
    !(passwordInput.length >= 8) ||
    !/[A-Z]/.test(passwordInput) ||
    !/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(passwordInput) ||
    wrongEmail || !emailInput || !FirstName || !lastName

  return (
    <Maincontainer>
      <CardBodyWrapper>
        <CardBody>
          <Header>
            <HeaderText>Create an Account</HeaderText>
            <HeaderLink>
              Already have an account?{' '}
              <span>
                {' '}
                <Link
                  to="/"
                  style={{
                    textDecoration: 'none',
                    color: 'rgba(0, 76, 189, 1)',
                  }}
                >
                  {' '}
                  Log in
                </Link>
              </span>
            </HeaderLink>
          </Header>
          <FormData onSubmit={(e) => handleSubmit(e)}>
            <FirstInput>
              <NameInput>
                <Label>First Name</Label>
                <Input
                  onChange={(e) => handleFirstName(e)}
                  type="text"
                  placeholder="Type Here"
                />
              </NameInput>
              <LastName>
                <Label>Last Name</Label>
                <Input
                  onChange={(e) => handleLastName(e)}
                  type="text"
                  placeholder="Type Here"
                />
              </LastName>
            </FirstInput>
            <EmailInput>
              <Label>Email Address</Label>
              <Input
                onChange={(e) => handleEmail(e)}
                type="email"
                placeholder="Type Here"
              />
              {wrongEmail ? <span>Wrong email format!</span> : ''}
            </EmailInput>
            <PasswordInput>
              <Label>Password</Label>
              <PasswordIcon>
                <Input2
                  type={passwordShow ? 'text' : 'password'}
                  placeholder="Input password Here"
                  name="password"
                  onChange={(e) => handlePassword(e)}
                />
                <AiOutlineEye
                  style={{
                    fontSize: '20px',
                    cursor: 'pointer',
                    marginLeft: '10px',
                  }}
                  onClick={showPassword}
                />
              </PasswordIcon>
              {wrongPassword ? (
                <PasswordInfo>
                  <ul type="disk">
                    <li
                      style={{
                        color: /[A-Z]/.test(passwordInput)
                          ? 'green'
                          : '#999B9F',
                      }}
                    >
                      Contains at least one uppercase letter
                    </li>
                    <li
                      style={{
                        color: passwordInput.length >= 8 ? 'green' : '#999B9F',
                      }}
                    >
                      Contains eight characters
                    </li>
                    <li
                      style={{
                        color: /[0-9]/.test(passwordInput)
                          ? 'green'
                          : '#999B9F',
                      }}
                    >
                      Contains at least one number
                    </li>
                    <li
                      style={{
                        color: /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(
                          passwordInput,
                        )
                          ? 'green'
                          : '#999B9F',
                      }}
                    >
                      Contains at least one symbol
                    </li>
                  </ul>
                </PasswordInfo>
              ) : (
                ''
              )}
            </PasswordInput>
            <Button
              type="submit"
              disabled={btnDisable}
              style={{ background: btnDisable ? '#B7BCC3' : '#555658' }}
            >
              Sign Up
              {loading ? (
                <SpinnerCircular
                  style={{ position: 'absolute', right: '20px' }}
                  size={25}
                  thickness={91}
                  speed={100}
                  color="rgba(57, 114, 172, 1)"
                  secondaryColor="rgba(0, 0, 0, 0.44)"
                />
              ) : null}
            </Button>
          </FormData>
        </CardBody>
      </CardBodyWrapper>
    </Maincontainer>
  )
}
export default Signup

const Button = style.button`
  width: 102%;
  height: 40px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  color: #fff;
  margin: 20px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  position:relative
`
const PasswordInfo = style.div`
ul {
  margin: 0px;
  padding: 3px;
}
ul li{
  font-family: sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #999B9F;
  margin: 0px 15px;
}
`
const PasswordIcon = style.div`
  width: 100%
  height: 30px;
  border:  1px solid lightgray;
  border-radius: 5px;
  background: #fff;
  display: flex;
  align-items: center;
`
const PasswordInput = style.div`
  width: 102%;
`
const EmailInput = style.div`
  width: 100%;
  margin-bottom: 3%;
  span{
  font-family: sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #F41E10;
  }
`
const Input2 = style.input`
  width: 90%;
  height: 30px;
  border-radius: 4px;
  outline: none;
  border: none;
  padding-left: 10px;
`
const Input = style.input`
  width: 100%;
  height: 30px;
  border-radius: 4px;
  outline: none;
  border:  1px solid lightgray;
  padding-left: 10px;
  margin: 1% 0px;
`
const Label = style.div`
  font-family: sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #1A1A1A;
`
const FirstInput = style.div`
  margin-top: 7%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3%;
`
const LastName = style.div`
  width: 45%;
`
const NameInput = style.div`
  width: 45%
`
const FormData = style.form`
  width: 100%
`
const HeaderLink = style.div`
  ont-family: 'Montserrat';
  ont-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #777777;
  span{
    color: rgba(0, 76, 189, 1);
    cursor: pointer;
  }
`
const HeaderText = style.div`
  margin-top: 3%;
  width: 230px;
  height: 29px;
  font-family: sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: #000000;
  text-align: center;
`
const Header = style.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const Maincontainer = style.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #FAFAFA;
`
const CardBodyWrapper = style.div`
  width: 50%;
  height: max-content;
  background: #fff;
  box-shadow: 2px 2px 5px -6px rgba(0,0,0,0.69);
-webkit-box-shadow: 2px 2px 5px -6px rgba(0,0,0,0.69);
-moz-box-shadow: 2px 2px 5px -6px rgba(0,0,0,0.69);
display: flex;
justify-content: center;
`
const CardBody = style.div`
  width: 80%;
  height: 90%;
`
