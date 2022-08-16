import React, { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { addNotification } from "./Notification/Addnotification";
import firebase from "firebase";
import { db } from "./Fire";

export const StoreContext = createContext();
const curUser = firebase.auth().currentUser;
const ContextAppProvider = (props) => {
  const [user, setUser] = useState("");
  const notifisystem = useRef();
  const [userinfo, setUserinfo] = useState("");
  const [firebaseLoaded, setFirebaseLoaded] = useState(false);

  const authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser("");
      }
      setFirebaseLoaded(true);
    });
  };
  const addNoti = (msg, icon) => {
    addNotification({
      notifisystem,
      msg,
      icon,
    });
  };
  useEffect(() => {
    user &&
      db
        .collection("users")
        .doc(user.uid)
        .onSnapshot((snap) => {
          setUserinfo(snap.data());
        });
  }, [user]);

  useEffect(() => {
    authListener();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        user,
        setUser,
        curUser,
        notifisystem,
         addNoti,
        userinfo,
        firebaseLoaded,
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};
export default ContextAppProvider;
