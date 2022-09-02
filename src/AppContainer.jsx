import React, { useContext, useEffect } from "react";
import { Redirect, Route, Routes, useNavigate } from "react-router-dom";
import { AuthSwitch } from "./app/auth/AuthSwitch";
import { ForgotPassword } from "./app/auth/ForgotPassword";
import { Login } from "./app/auth/Login";
import { Register } from "./app/auth/Register";
import { Logo } from "./app/components/Logo/Logo";
import { Navbar } from "./app/components/Navbar/Navbar";
import Portal from "./app/components/Portal/Portal";
import RightBar from "./app/components/RightBar/RightBar";
import { sideBarLinks } from "./app/data/Array";
import Events from "./app/pages/Events/Events";
import Feed from "./app/pages/Feed/Feed";
import Friends from "./app/pages/Friends/Friends";
import Home from "./app/pages/Home/Home";
import Market from "./app/pages/Market/Market";
import Media from "./app/pages/Media/Media";
import Reels from "./app/pages/Reels/Reels";
import { StoreContext } from "./ContextAPI";

export const AppContainer = (props) => {
  const { firebaseLoaded, user } = useContext(StoreContext);
  const navigate = useNavigate()
  // useEffect(()=> {
  //   if(firebaseLoaded) {
  //     if(user) {
  //       navigate(-1) 
  //     }
  //     else {
  //       navigate('/login')
  //     }
  //   }
  //   console.log('asd')
  // }, [firebaseLoaded, user])
  let comp = {
    Feed,
    Media,
    Reels,
    Market,
    Events,
    Friends
  }
  const routesRender = sideBarLinks.map(route=> {
    let El = comp[route.text]
    return (
      <Route path={route.link} element={<El />} index={route.index}/>
    )
  })
  return (
    <>
      {firebaseLoaded ? (
        
          // user ? 
          //  <Home />
          //  :
          //  <AuthSwitch />
        <>

        <Routes>  
           {user ? 
          <Route path='/'  element={<Home />}>
            {routesRender}
             {/* <Route index path='/' element={<Feed />}/>
             <Route path='/media'>

             </Route>
             <Route path='/reels'>

             </Route>
             <Route path='/market'>

             </Route>
             <Route path='/events'>

             </Route>
             <Route path='/friends'>

             </Route> */}
              {/* <Route path=':category' element={<CategoryPage />}/>
              <Route path="saved" element={<>Saved</>} /> */}
           </Route>
           :
            <>
              <Route path={"/"} element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/register" element={<Register />} />
            </>
            }
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
