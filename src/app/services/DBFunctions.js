import firebase from 'firebase'
import { db } from '../../Fire';
import { deleteMultipleStorageFiles, uploadMultipleFilesToFireStorage } from './storageServices'
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

export const AddToDB = (collection, value, clearFields, cID) => {
  const user = firebase.auth().currentUser
  let id = cID ? cID : generateID()
  let result = Object.assign(value, {
    id: id,                 
    postedBy: user.uid,
    datePosted: new Date(),
  })
  db.collection(collection).doc(id).set(result).then(()=> {clearFields()})
  return id
}


export const handleLogout = () =>{   
  firebase.auth().signOut()
  window.location.reload()
}

export const GetFromDB = (collection, setState) => {
  db.collection(collection).onSnapshot(data=> {
    let result = []
    data.forEach(doc=> {
      result.push(doc.data())
    })
    setState(result)
  })
}

export const addReaction = (collection, reaction, isReacted) => {
  const user = firebase.auth().currentUser

  if(isReacted) {
      db.collection(collection).doc(user.uid).delete()
  }
  else {
      db.collection(collection).doc(user.uid).set({
          reaction,
          dateReacted: new Date(),
          user: user.uid
      })
  }
}
export const flagPost = (post) => {
  const user = firebase.auth().currentUser

  db.collection(`users/${user.uid}/posts`).doc(post.id).set({
    flagged: !post.flagged
  }, {merge: true})
}
export const deletePost = (post) => {
  const user = firebase.auth().currentUser
  post.postContent.media.forEach(media=> {
    db.collection(`users/${user.uid}/media`).doc(media.name).delete()
  })
  db.collection(`users/${user.uid}/posts`).doc(post.id).delete().then(()=> {
    deleteMultipleStorageFiles(post.postContent.media.filter(x=> x.downloadURL), `${user.uid}/files`)
  })
}
export const hidePost = (post) => {
  const user = firebase.auth().currentUser

  db.collection(`users/${user.uid}/posts`).doc(post.id).set({
    hidden: !post.hidden
  }, {merge: true})
}
export const sendComment = (post, comment, setComment, files, setLoading) => {
  const user = firebase.auth().currentUser
  let id = generateID()
  setLoading(true)
  db.collection(`/users/${post.postedBy}/posts`).doc(post.id).set({
    commentCount: post.commentCount + 1
}, {merge: true})
  uploadMultipleFilesToFireStorage(files, `${user.uid}/files`).then((media)=> {
      db.collection(`/users/${post.postedBy}/posts`).doc(post.id).collection('comments').doc(id).set({
        comment,
        datePosted: new Date(),
        postedBy: user.uid,
        postId: post.id,
        media: media[0] ?? '',
        commentId: id,
    }).then(()=> {
        setComment()
        setLoading(false)
    })
  })
}
export const deleteComment = (post, comment) => {
  const user = firebase.auth().currentUser
  db.collection(`users/${user.uid}/posts/${post.id}/comments`).doc(comment.commentId).delete().then(()=> {
    deleteMultipleStorageFiles(comment.media?.filter(x=> x.downloadURL), `${user.uid}/files`)
  })
}
export const handleReply = (post, comment, reply, setReply, files, setLoading) => {
  const user = firebase.auth().currentUser
  let id = generateID()
  setLoading(true)
  db.collection(`/users/${post.postedBy}/posts/${post.id}/comments`).doc(comment.commentId).set({
    replyCount: post.replyCount + 1
}, {merge: true})
  uploadMultipleFilesToFireStorage(files, `${user.uid}/files`).then((media)=> {
      db.collection(`/users/${post.postedBy}/posts/${post.id}/comments/${comment.commentId}/replies`).doc(id).set({
        reply,
        datePosted: new Date(),
        postedBy: user.uid,
        postId: post.id,
        commentId: comment.commentId,
        media: media[0] ?? '',
        replyId: id,
    }).then(()=> {
       setReply()
       setLoading(false)
    })
  })
}
export const handleLikeReply = () => {

}
export const deleteReply = () => {
  
}