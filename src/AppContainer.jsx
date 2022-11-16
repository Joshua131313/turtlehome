import React, { useContext } from "react";
import { Redirect, Route, Routes, useNavigate } from "react-router-dom";
import { ForgotPassword } from "./app/auth/ForgotPassword";
import { Login } from "./app/auth/Login";
import { Register } from "./app/auth/Register";
import { Logo } from "./app/components/Logo/Logo";
import AppsRoutes from "./app/pages/Apps/AppsRoutes";
import Chat from "./app/pages/Chat/Chat";
import ChatBox from "./app/pages/Chat/ChatBox";
import EmptyBox from "./app/pages/Chat/EmptyBox";
import NewChat from "./app/pages/Chat/NewChat";
import Feed from "./app/pages/Feed/Feed";
import FriendsRoutes from "./app/pages/Friends/FriendsRoutes";
import Home from "./app/pages/Home/Home";
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
             <Route path='chats' element={<Chat />}>
                <Route index element={<EmptyBox />} />
                <Route path='new-chat' element={<NewChat />} />
                <Route path=':userid' element={<ChatBox />} />
             </Route> 
             <Route path='/reels'>

             </Route>
             <Route path='/market'>

             </Route>
             <Route path='/events'>

             </Route>
             <Route path='apps/*' element={<AppsRoutes /> } />
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
