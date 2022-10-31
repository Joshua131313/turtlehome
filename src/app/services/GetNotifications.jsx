import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import { db } from "../../Fire";

const useGetNotifications = (limit=4, user = firebase.auth().currentUser) => {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    db.collection("users")
      .doc(user.uid)
      .collection("notifications")
      .limit(limit)
      .onSnapshot((snapshot) => {
        const notifications = snapshot.docs.map((doc) => doc.data());
        setNotifications(notifications);
      });
  }, [user, limit]);

  return notifications;
};

export default useGetNotifications;
