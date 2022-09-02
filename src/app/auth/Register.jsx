import React, { useContext } from 'react'
import { StoreContext } from '../../ContextAPI'
import AuthContainer from '../containers/AuthContainer/AuthContainer'
import firebase from 'firebase'
import { createUserCollection } from '../services/DBFunctions'
import { useNavigate } from 'react-router-dom'

export const Register = (props) => {
  const {setUser} = useContext(StoreContext)
  const navigate = useNavigate()
  
  const handleRegister = (states, setStates) => {
    const {name, email, password} = states
    const {setPasswordError, setEmailError, setLoading} = setStates

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(()=>{
      setLoading(true)
    })
    .catch((err)=>{
      switch(err.code) {
        case "auth/email-already-in-use":
          setEmailError(err.message)
         break
        case "auth/invalid-email":
          setEmailError(err.message)
        break
        case "auth/weak-password":
          setPasswordError(err.message)
        break
        default: 
          setEmailError(err.message)
        setTimeout(()=>{
          setEmailError('')
          setPasswordError('')
        }, 4000)
      }
    })
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
          user.updateProfile({
            displayName: name
          })
          createUserCollection(user.uid, name, email)
          navigate('/', {replace: true})
          setUser(user)
        }
        else {
          setUser(null)
      }
    })
  }

  return (
    <AuthContainer title='Register'
      btnText1={{
        text: 'Already have an account?',
        link: '/' 
      }}
      mainBtn={{
        text: 'Register',
        onClick: (states, setStates)=> {handleRegister(states, setStates)}
      }}
    />
  )
}