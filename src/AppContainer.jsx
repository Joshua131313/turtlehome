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
import Apps from "./app/pages/Apps/Apps";
import AppsRender from "./app/pages/Apps/AppsRender";
import Weather from "./app/pages/Apps/Weather";
import Chats from "./app/pages/Chats/Chats";
import NewChat from "./app/pages/Chats/NewChat";
import Events from "./app/pages/Events/Events";
import Feed from "./app/pages/Feed/Feed";
import AddFriends from "./app/pages/Friends/AddFriends";
import Friends from "./app/pages/Friends/Friends";
import FriendsRoutes from "./app/pages/Friends/FriendsRoutes";
import Home from "./app/pages/Home/Home";
import Market from "./app/pages/Market/Market";
import AddAlbum from "./app/pages/Media/AddAlbum";
import AlbumPage from "./app/pages/Media/AlbumPage";
import AlbumsRender from "./app/pages/Media/AlbumsRender";
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
            {/* {routesRender} */}
             <Route index path='/' element={<Feed />}/>
             <Route path='media' element={<Media />}>
               <Route  index element={<AlbumsRender />} />
               <Route  path="create-album" element={<AddAlbum />} />
               <Route path=':albumName/:albumId' element={<AlbumPage />} />
             </Route>
             <Route path='chats' element={<Chats />}>
                <Route path='new-chat' element={<NewChat />}>
                  <Route path=':userid' element={<>a</>} />
                </Route>
             </Route> 
             <Route path='/reels'>

             </Route>
             <Route path='/market'>

             </Route>
             <Route path='/events'>

             </Route>
             <Route path='apps' elemen={<Apps />}>
                <Route index element={<AppsRender />} />
                <Route path='weather-io' element={<Weather />}/>

             </Route>
             {/* <Route path='friends' element={<Friends />} >
                <Route index element={<>asd</>} />
                <Route path='friend-request' element={<>12</>} />
                <Route path='blocked-friends' element={<>ccc</>} />
                <Route path='add-friends' element={<AddFriends />} />
              </Route> */}
              <Route path='friends/*' element={<FriendsRoutes />}/>
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
