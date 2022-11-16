import React, { useState, useEffect } from "react";
import { db } from "../../Fire";
import firebase from "firebase";
import { useHistory } from "react-router-dom";

export const useGetAllUserChats = () => {
  const [chats, setChats] = useState([]);
  const user = firebase.auth().currentUser;
  useEffect(() => {
    setChats([]);
    user &&
      db
        .collection("chats")
        .where("members", "array-contains", user.uid)
        .orderBy("lastMsgDate", "desc")
        .onSnapshot((snap) => {
          let items = [];
          console.log(items);
          snap.forEach((doc) => items.push(doc.data()));
          setChats(items);
        });
  }, [user]);

  return chats;
};
