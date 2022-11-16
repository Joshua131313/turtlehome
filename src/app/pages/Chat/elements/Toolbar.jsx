import React, { useEffect, useRef, useState } from "react";
import TextArea  from "../../../components/AppInput/TextArea";
import "./index.css";

import {
  createConvo,
  generateID,
  sendMsg
} from "../../../services/DBFunctions";
import firebase from "firebase";
import { useGetConvoIDFromPath } from "../../../services/GetConvoIDFromLocation";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetChatInfo } from "../../../services/GetChatInfo";
import { GifPicker } from "../../../components/GifPicker/GifPicker";


export const Toolbar = (props) => {
  const convoid = useGetConvoIDFromPath();
  
  const chatInfo = useGetChatInfo(convoid);
  const [msg, setMsg] = useState("");
  const { to, setTo, usersConvos } = props;
  const user = firebase.auth().currentUser;
  const navigate = useNavigate();
  const location = useLocation();
  const handleCreateNewConvo = () => {
    let convoid = generateID();
    createConvo(user.uid, to, convoid, msg, navigate);
    setMsg("");
  };

  const handleSendMsg = (e) => {
    let path = location.pathname.split("/")[2];
    if (path === "create-new") {
      if (
        usersConvos?.some(
          (convo) =>
            JSON.stringify(convo.members?.filter((x) => x !== user.uid)) ===
            JSON.stringify(to)
        )
      ) {
      } else {
        handleCreateNewConvo();
        setTo([]);
      }
    } else {
      sendMsg(user.uid, convoid, msg);
    }
    setMsg("");
  };
  const handleReplaceName = ({name, string}) => {
    setMsg(msg.replace(string, name))
  }

  return (
    <div className="toolbar flexrow">
      <div className="toolbaricon">
        <i className="fa fa-plus"></i>
      </div>
      <div className="toolbarinput">
        <TextArea
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
          placeholder="Type a message..."
        />
        {/* {chatInfo?.members?.length > 2 && <Usersdropdown handleAddRemove={handleReplaceName} search={msg} members={chatInfo?.members} visibleDrop={true} />} */}
        <div className="toolbaricon">
          <i className="fa fa-sticky-note"></i>
          <GifPicker />
        </div>
      </div>
      <div className="toolbaricon">
        {msg ? (
          <i
            className="fa fa-paper-plane"
            onClick={() => handleSendMsg()}
          ></i>
        ) : (
          <i
            onClick={() => {
              sendMsg(user.uid, convoid, "thumbs-up", "icon");
            }}
            className={`${
              chatInfo?.customization?.icon
                ? chatInfo?.customization?.icon
                : "fa fa-thumbs-up"
            }`}
          ></i>
        )}
      </div>
    </div>
  );
};
