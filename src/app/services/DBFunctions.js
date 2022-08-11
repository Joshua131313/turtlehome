import firebase from 'firebase'
import { db } from '../../Fire';
export const generateID = () => {
  return db.collection('users').doc().id
}
export const createUserCollection = (userid, name, email, profilePic='', phoneNumber='', provider=false) => {
  db.collection('users').doc(userid).set({
    created: new Date(),
    uid: userid,
    name: name,
    searchName: name.replace(/\s/gm, '').toLowerCase(),
    userinfo: {
      profilePic: profilePic,
      phoneNumber: phoneNumber,
      email: email
    },
    provider
  })
}
export const sendMsg = (userid, convoid, msg, type='text') => {
  let id = generateID()
  db.collection(`chats/${convoid}/messages`).doc(id).set({
    msg: {
      content: msg,
      type
    },
    date: new Date(),
    senderid: userid,
    msgid: id,
    seenBy: []
  })
  db.collection('chats').doc(convoid).set({
    lastMsgDate: new Date(),
    lastMsg: {
      content: msg,
      type,
      senderid: userid,
      msgid: id,
      seenBy: [],
      date: new Date(),
    }
  }, {merge: true})
}
export const disptachCall = (userid, convoid, type, callID) => {
  db.collection('chats').doc(convoid).set({
    call: {
      callid: callID,
      type: type,
      caller: userid,
      members: [userid],
    }
  }, {merge: true})
}
export const endMeetingDB = (convoid) => {
  console.log(convoid)
  db.collection('chats').doc(convoid).set({
    call: {
    }
  }, {merge: true})
}
export const getLastMsg = (user, convoid) => {
   db.collection('chats').doc('KP7qXDAI7xNpuVe68gH0').collection('messages').orderBy('date', 'desc').limit(1).get(snap=> {
    let items = []
    snap.forEach(doc => items.push(doc.data())) 
    console.log(items) 
  }) 
}
export const createConvo = (userid, to, convoid, msg, history, type='text') => {
  db.collection('chats').doc(convoid).set({
    members: to.includes(userid) ? to : [...to, userid],
    convoid: convoid,
    lastMsg: {
      senderid: userid,
      msg: msg,
      wasSeen: false,
      date: new Date()
    }
  }).then(()=> {
    sendMsg(userid, convoid, msg, type)
    history.push({pathname: `/chat/${convoid}`})
  })
}

export const loginwithProvider = (provider, history) => {
  provider.addScope('email');
  firebase.auth()
  .signInWithPopup(provider)
  .then((result)=>{
    if(result.additionalUserInfo.isNewUser) {
      const user = result.user  
      createUserCollection(user.uid, user.displayName, user.email, user.photoURL, user.phoneNumber,  true)
    }
    history()
  })
}

export const handleUpdateUserInfo = (userid, updated, objKey) => {
  db.collection('users').doc(userid).set({
    [objKey]: updated
  }, {merge: true})
}
export const handleMuteChat = (convoid, userid) => {
  let id = generateID()
  db.collection(`chats`).doc(convoid).collection('mutedBy').doc(id).set(userid, {merge: true})
}

export const DeleteFromDB = (collection, id) => {
  db.collection(collection).doc(id).delete()
  .then(()=> {
    console.log('k')
  })
  .catch(err=> {
    console.log(err)
  })
}
export const ClearCollection = (collection, setState) => {
  db.collection(collection) //make sure to use backtics
  .get()
  .then(res => {
    res.forEach(element => {
      element.ref.delete();
      setState && setState()
    });
  })
  .catch(()=> {
    setState && setState()
  })
  setState && setState()
}

export const AddToDB = (collection, value) => {
  let id = generateID()
  let result = Object.assign(value, {notifid: id})
  db.collection(collection).doc(id).set(result)
  return id
}

export const handleLogout = () =>{   
  firebase.auth().signOut()
  window.location.reload()
}
