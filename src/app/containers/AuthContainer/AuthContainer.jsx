import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../../ContextAPI";
import AppBtn from "../../components/AppBtn/AppBtn";
import ImgLoaded from "../../components/Imgloaded/Imgloaded";
import { Logo } from "../../components/Logo/Logo";
import "./AuthContainer.css";
import { AuthInput } from "./AuthInput";
import FacebookBtn from "./AuthProviders/Facebook";
import GoogleBtn from "./AuthProviders/Google";

const AuthContainer = (props) => {
  const {addNoti, user} = useContext(StoreContext)
  const { title = "Sign in", isLogIn, btnText1, btnText2, mainBtn, isForgotPassword } = props;
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const states = {
    name, 
    email, 
    password
  }
  const setStates = {
    setPasswordError, 
    setEmailError,
    setLoading,
    addNoti
  }

  useEffect(()=> {
    if(user) {
      navigate('/', {replace: true})
    }
  }, [user])
  return (
    <div className="authcontainer">
      <div className="leftside">
        <Logo disabled/>
        <ImgLoaded img={'https://i.imgur.com/QHXELMb.jpg'}/>
      </div>
      <div className="rightside">
        <div className="header">
          <h1>{title}</h1>
          <span>Welcome to TurtleFeed</span>
        </div>
        {!isForgotPassword && <div className="authproviders">
          <GoogleBtn />
          <FacebookBtn />
        </div>}
        <form className="authform flex" onSubmit={(e) =>{mainBtn.onClick(states, setStates) ;e.preventDefault()}}>
          <div className="forminputs flex">
            {(!isLogIn && !isForgotPassword) && 
              <AuthInput placeholder='full name' value={name} setValue={setName}/>
            }
            <AuthInput placeholder='email' value={email} setValue={setEmail} error={emailError}/>
            {!isForgotPassword && 
              <AuthInput type='password' placeholder='password' setValue={setPassword} value={password} error={passwordError}/>
            }
          </div>
          <div className="formbtns flexrow">
            <div className="textbtns flex">
              {btnText1 && <Link to={btnText1.link} onClick={()=> btnText1.onClick && btnText1.onClick()} className="textbtn">{btnText1.text}</Link>}
              {btnText2 && <Link to={btnText2.link && btnText2.link} onClick={()=> btnText2.onClick && btnText2.onClick()} className="textbtn">{btnText2.text}</Link>}
            </div>
            <AppBtn text={mainBtn.text} onClick={()=> mainBtn.onClick(states, setStates)}/>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AuthContainer;
