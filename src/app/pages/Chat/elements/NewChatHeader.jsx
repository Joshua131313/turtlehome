import React, { useEffect, useState } from "react";
import { usersSearchClient } from "../../../algolia";
import { AppInput } from "../../../components/AppInput/AppInput";
import { Usersdropdown } from "../../../components/Dropdown/Usersdropdown";
import ImgLoaded from "../../../components/Imgloaded/Imgloaded";
import "./index.css";

export const NewChatHeader = (props) => {
  const {chatUsers, setChatUsers} = props;
  const [visibleDrop, setVisibleDrop] = useState(false)
  const [name, setName] = useState('')
  const usersIndex = usersSearchClient.initIndex('users_index')
  const [userName, setUserName] = useState('')
  const [users, setUsers] = useState([])
  
  const handleAddRemove = (userid) => {
    let tempState = [...chatUsers]
    let i = tempState.findIndex(x=> x === userid)
    if(chatUsers.includes(userid)) {
      tempState.splice(i, 1)
    }
    else {
      tempState.push(userid)
    }
    setChatUsers(tempState)
    setVisibleDrop(false)
  }

  const searchedUsersRow = users?.map(user=> {
    return (
      <div className="searcheduser flexrow" onClick={()=> handleAddRemove(user.uid)}>
        {
           user?.userinfo.profilePic ? <ImgLoaded img={user?.userinfo.profilePic} /> : <div className="imgloaded usericonplaceholder"><i className='fa fa-user'></i></div>
         }
        <span>{user?.name}</span>
      </div>
    )
  }) 
  const torow = chatUsers?.map(userid=> {
    return <span>{userid}</span>
  })

  useEffect(()=> {
    if(visibleDrop) {
      window.onclick = () => {
        setVisibleDrop(false)
      }
    }
  }, [visibleDrop])
  useEffect(()=> {
    usersIndex.search(userName).then(({ hits }) => {
      setUsers(hits)
    })
  }, [userName])
  return (
    <>
    <div className="createnewheader">
      <span>To:</span>
      <div className="listusers">
        {torow}
        <div className="searchusersdrop" onClick={(e)=> e.stopPropagation()}>
         <input onFocus={()=> setVisibleDrop(true)} type="text" value={name} placeholder={'Name of the person...'} onChange={(e)=> setName(e.target.value)}/>
         <Usersdropdown handleAddRemove={handleAddRemove} members={users} visibleDrop={visibleDrop} setVisibleDrop={setVisibleDrop} />
        </div>
      </div>
    </div>
    <hr/>
    </>
  )
};
