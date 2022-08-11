import React from 'react'
import AuthContainer from '../containers/AuthContainer/AuthContainer'
import firebase from 'firebase'
import { useNavigate } from 'react-router-dom'
export const Login = (props) => {
  const navigate = useNavigate()
 
  const handleLogin = (states, setStates) => {
    const {email, password} = states
    const {setEmailError, setPasswordError, setLoading} = setStates
    setEmailError('')
    setPasswordError(''
    )
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(()=>{
      setLoading(true)
      navigate('/', {replace: true})
    })
    .catch(err => {
      switch(err.code) {
        case "auth/invalid-email":
          setEmailError(err.message)
        break
        case "auth/user/disabled":
        case "auth/user-not-found":
          setEmailError('Email does not exist')
        break
        case "auth/wrong-password":
          setPasswordError('Incorrect Password')
        break
        default: 
      } 
      setTimeout(()=>{
       setPasswordError('')
       setEmailError('')
      },4000) 
    })
  }
  
  return (
    <AuthContainer isLogIn  
      btnText1={{
        text: 'Forgot password',
        link: '/forgot-password'
      }}
      btnText2={{
        text: "Don't have an account?",
        link: '/register'
      }}
      mainBtn={{
        text: 'Login',
        onClick: (states, setStates)=> handleLogin(states, setStates)
      }}
    />
  )
}