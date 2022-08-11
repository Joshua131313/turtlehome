import React from 'react'
import firebase from 'firebase'
import './AuthProviders.css'
import { loginwithProvider } from '../../../services/DBFunctions'
import { useNavigate } from 'react-router-dom'

const GoogleBtn = (props) => {
  const navigate = useNavigate()
  return (
    <div className="googlebtn" onClick={()=> loginwithProvider(new firebase.auth.GoogleAuthProvider(), ()=> navigate('/', {replace: true}))}>
      <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png" alt=""/>
      <span>Continue with Google</span>
    </div>

  )
}
export default GoogleBtn