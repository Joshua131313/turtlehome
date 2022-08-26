import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Feed.css'
import Envelope from '../../containers/Envelope/Envelope';
import ReactTextareaAutosize from 'react-textarea-autosize';
import TextArea from '../../components/AppInput/TextArea';
import { User } from '../../components/User/User';
import AppBtn from '../../components/AppBtn/AppBtn';
import { uploadImgur } from '../../utils/uploadToImgur';
import { AddToDB, generateID } from '../../services/DBFunctions';
import { StoreContext } from '../../../ContextAPI';
import { db } from '../../../Fire';
import Dropdown from '../../components/Dropdown/Dropdown';
import { addNotification } from '../../../Notification/Addnotification';
import ImgLoaded from '../../components/Imgloaded/Imgloaded';
import { clear } from '@testing-library/user-event/dist/clear';
import AppUser from '../../components/User/AppUser';
import Post from '../../components/Post/Post';
import PostBtn from '../../components/AppBtn/PostBtn';
import firebase from 'firebase';
import Popup from '../../components/Popup/Popup';
import Dropzone from 'react-dropzone'
import DropZone from '../../components/DropZone/DropZone';
import SelectedImgs from '../../components/DropZone/SelectedImgs';

const Feed = props => {
    const [img, setImg] = useState('')
    const {user, addNoti, notifisystem} = useContext(StoreContext)
    const [text, setText] = useState('')
    const [openID, setOpenID] = useState(null)
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [dropZone, setDropZone] = useState(false)
    const [files, setFiles] = useState([])
    const clearFields = () => {
        setText('')
        setImg('')
    }

    const handleCreatePost = () => {
        let imgID = generateID()
        AddToDB(`/users/${user.uid}/posts`, {
            postContent: {
                media: img,
                text,
                imgID
            },
            postedBy: user.uid,
            datePosted: new Date()
        }, clearFields)
        if(img) {
            AddToDB(`/users/${user.uid}/images`, {
                img: img,
                datePosted: new Date(),
            }, clearFields, imgID)
        }
    }
    const handleImgURL = () => {
        addNotification({
            msg: 'Type Image URL...',
            icon: 'fa fa-link',
            onChange: (e)=>  setFiles(prev=> [{preview: e.target.value, isUrl: true}, ...prev]),
            value: img,
            type: 'input',
            notifisystem
        }, Infinity)
    }
    const uploadImgs = (e) => {
        
        const files = e.target.files
        
        files.forEach((file)=> {
          if(file) {
            let storageRef = firebase.storage().ref(`${user.uid}/images`).child(generateID())
            const task = storageRef.put(file)
            task.on(
                "state_changes",
                function progress(snap) {
                  setLoading(true);
                //   const percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
                //   loadingref.current.style.height = percentage + "%";
                }, 
                function error() {
                  addNoti({
                    text: "Try Again!", 
                    icon: "fal fa-exclamation-circle"
                  });
                },
                function complete() {
                  setLoading(false);
                  storageRef.getDownloadURL().then((url) => {
                    let tempState = [...img]
                    tempState.push(url)
                    setImg(tempState)
                  });
                  addNoti({
                    text: "Media Uploaded!",
                    icon: "fal fa-check-circle"
                  });
                }
              );
          }
        })
    }
    
    const postsrow = posts?.map(post=> {
        return (
            <Post post={post} key={post.id} openID={openID} setOpenID={setOpenID}/>
        )
    })

    useEffect(()=> {
       user &&  db.collectionGroup('posts').orderBy('datePosted', 'desc').onSnapshot((snap)=> {
            let posts = []
            snap.forEach((doc)=> {
                posts.push(doc.data())
            } )
            setPosts(posts)
        })
    }, [user])
    return (
        <div className='feed'>
            <Envelope >
                <div className="titlebar">
                    <h3>Create Post</h3>
                    <i className="fal fa-comment-alt-edit"></i>
                </div>
                <div className="textareacontent">
                    <User showName={false} />
                    <TextArea className="feedtextarea" placeholder="What's on your mind?" value={text} onChange={(e)=> setText(e.target.value)}/>
                </div>

                <div className="selectmedia sb flexrow">

                   <Dropdown openID={openID} setOpenID={setOpenID} id={1} options={[{icon: 'fal fa-link', text: "URL", onClick: ()=> {handleImgURL()}}, {icon: 'fal fa-upload', text: "Upload", onClick: ()=> setDropZone(true)}]}>
                        <AppBtn text='Upload Media' icon='fal fa-image'/>
                   </Dropdown>
                    <PostBtn value={text} onClick={()=> handleCreatePost()} />
                </div>
                <SelectedImgs files={files} setFiles={setFiles} />
      
            </Envelope>
            <div className="postsrow">
                    {postsrow}
            </div>
            <Popup className='imguploadpopup' visible={dropZone} setVisible={setDropZone}>
                <h2>Upload Media</h2>
                <DropZone setVisible={setDropZone} files={files} setFiles={setFiles} />
            </Popup>
        </div>
    );
};

Feed.propTypes = {
    
};

export default Feed;