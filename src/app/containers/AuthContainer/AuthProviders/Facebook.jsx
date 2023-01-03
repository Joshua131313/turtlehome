import React from 'react'
import firebase from 'firebase'
import './AuthProviders.css'
import { loginwithProvider } from '../../../services/DBFunctions'
import { useNavigate } from 'react-router-dom'

const FacebookBtn = (props) => {
  const navigate = useNavigate()
  return (
    <div className="googlebtn facebookbtn" onClick={()=> loginwithProvider(new firebase.auth.FacebookAuthProvider(), ()=> navigate('/', {replace: true}))}>
      <img src="https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512" alt=""/>
      <span>Continue with Facebook</span>
   </div>
  )
}
export default FacebookBtn