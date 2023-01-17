import React, { useEffect } from 'react'
import style from 'styled-components'
import { AiOutlineEye } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { SpinnerCircular } from 'spinners-react'
import { useDispatch, useSelector } from 'react-redux'

import { postLoginUser } from '../redux/LoginApi'
import {
  setPasswordShow,
  setWrongEmail,
  setemailInput,
  setpasswordInput,
} from '../redux/Login'

const Login = () => {
  const dispatch = useDispatch()
  const Navigate = useNavigate()

  const {
    loading,
    error,
    addedUser,
    passwordShow,
    wrongEmail,
    emailInput,
    passwordInput,
  } = useSelector((state) => state.logInReducer)

  const showPassword = () => {
    dispatch(setPasswordShow())
  }

  const handlePassword = (e) => {
    const password = e.target.value
    if (password.length > 0) {
      dispatch(setpasswordInput(password))
    }
  }

  const handleEmail = (e) => {
    const email = e.target.value
    if (email.length > 0) {
      dispatch(setemailInput( email))
    }
    if (/@/.test(email) || email.length === 0) {
      return dispatch(setWrongEmail(false))
    } else {
      return dispatch(setWrongEmail(true))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const userDetail = { email: emailInput, password: passwordInput }
    dispatch(postLoginUser(userDetail))
  }

  useEffect(() => {
    if (addedUser._id) {
      Navigate(`/dashboard/${addedUser._id}`)
      window.location.reload()
    } else {
      Navigate('/')
    }
    if (error.length > 0) {
      alert(error)
      window.location.reload()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addedUser, error])

  const btnDisable = wrongEmail || !passwordInput


  return (
    <Maincontainer>
      <CardBodyWrapper>
        <CardBody>
          <Header>
            <HeaderText>Log in</HeaderText>
            <HeaderLink>
              If you have no account,{' '}
              <span>
                {' '}
                <Link
                  to="/signup"
                  style={{
                    textDecoration: 'none',
                    color: 'rgba(0, 76, 189, 1)',
                  }}
                >
                  Sign up
                </Link>{' '}
              </span>
            </HeaderLink>
          </Header>
          <FormData onSubmit={(e) => handleSubmit(e)}>
            <EmailInput>
              <Laber>Email Address</Laber>
              <Input
                onChange={(e) => handleEmail(e)}
                type="email"
                placeholder="Type Here"
              />
              {wrongEmail ? <span>Wrong email format!</span> : ''}
            </EmailInput>
            <PasswordInput>
              <Laber>Password</Laber>
              <PasswordIcon>
                <Input2
                  type={passwordShow ? 'text' : 'password'}
                  placeholder="Type Here"
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
            </PasswordInput>

            <Button
              type="submit"
              disabled={btnDisable}
              style={{ background: btnDisable ? '#B7BCC3' : '#555658' }}
            >
              {loading ? (
                <SpinnerCircular
                  size={25}
                  thickness={91}
                  speed={100}
                  color="rgba(57, 114, 172, 1)"
                  secondaryColor="rgba(0, 0, 0, 0.44)"
                />
              ) : 'Login'}
            </Button>
          </FormData>
        </CardBody>
      </CardBodyWrapper>
    </Maincontainer>
  )
}

export default Login

const Button = style.button`
  width: 102%;
  height: 40px;
  background: #B7BCC3;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  color: #fff;
  margin: 20px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
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
    margin-top: 3%;
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
const Laber = style.div`
  font-family: sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #1A1A1A;
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

@media screen and (max-width: 768px) {

}
`

const CardBody = style.div`
  width: 80%;
  height: 90%;
`
