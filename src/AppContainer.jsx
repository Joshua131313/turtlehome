import React, { useContext, useEffect } from "react";
import { Redirect, Route, Routes } from "react-router-dom";
import { AuthSwitch } from "./app/auth/AuthSwitch";
import { ForgotPassword } from "./app/auth/ForgotPassword";
import { Login } from "./app/auth/Login";
import { Register } from "./app/auth/Register";
import { Logo } from "./app/components/Logo/Logo";
import { Navbar } from "./app/components/Navbar/Navbar";
import Home from "./app/pages/Home/Home";
import { StoreContext } from "./ContextAPI";

export const AppContainer = (props) => {
  const { firebaseLoaded, user } = useContext(StoreContext);
 
  return (
    <>
      {firebaseLoaded ? (
        
          // user ? 
          //  <Home />
          //  :
          //  <AuthSwitch />
        <>

        <Routes>  
           <Route path='/'  element={<Home />}>
              {/* <Route path=':category' element={<CategoryPage />}/>
              <Route path="saved" element={<>Saved</>} /> */}
           </Route>
           <Route path={"/login"} element={<Login />} />
           <Route path="/forgot-password" element={<ForgotPassword />} />
           <Route path="/register" element={<Register />} />
        </Routes>
        </>
      ) : (
        <div className="loadingscreen">
          <Logo />
          <div className="loadingdiv">
            <img src="https://cdn.dribbble.com/users/1186261/screenshots/3718681/_______.gif" />
          </div>
        </div>
      )}
    </>
  );
};
