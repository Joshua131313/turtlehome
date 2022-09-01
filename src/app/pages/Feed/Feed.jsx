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
import UploadMedia from '../../components/AppBtn/UploadMedia';
import { uploadImgToFireStorage, uploadMultipleFilesToFireStorage } from '../../services/storageServices';
import { addKey, removeKey } from '../../utils/addKey';

const Feed = props => {
    const {user, addNoti} = useContext(StoreContext)
    const [text, setText] = useState('')
    const [openID, setOpenID] = useState(null)
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [files, setFiles] = useState([])
    const [uploadProgress, setUploadProgress] = useState(0)
    const clearFields = () => {
        setText('')
        setFiles([])
        setLoading(false)
    }
// files --> imgs
    const handleCreatePost = () => {
        let postID = generateID()
        setLoading(true)
        uploadMultipleFilesToFireStorage(files, `${user.uid}/files`, setUploadProgress).then((imgURLS)=> {
            imgURLS.forEach(el=> {
                AddToDB(`/users/${user.uid}/media`, {
                    media: el.downloadURL ? el.downloadURL :  el.preview,
                    postID: postID,
                    fileType: el.fileType ? el.fileType : 'image',
                    mediaID: el.name,
                }, clearFields, el.name)
            })
            AddToDB(`/users/${user.uid}/posts`, {
                postContent: {
                    media: imgURLS,
                    text,
                },
                hidden: false,
                commentCount: 0
            }, clearFields, postID)
        })
        .catch(err=> console.log(err))
        // let imgID = generateID()

        // const array = [{name: 'd'}]
        // let a = addKey(array, 'id', 12)
        // console.log(a)
        // uploadMultipleFilesToFireStorage(files, `${user.uid}/files`, setUploadProgress).then(img=> {
        //     console.log(img)
        // })
    }
    const postsrow = posts?.map(post=> {
        return (
            <Post post={post} key={post.id} openID={openID} setOpenID={setOpenID}/>
        )
    })
 
    useEffect(()=> {
       user &&  db.collectionGroup('posts').where('hidden', '==', false).orderBy('datePosted', 'desc').onSnapshot((snap)=> {
            let posts = []
            snap.forEach((doc)=> {
                posts.push(doc.data())
            } )
            setPosts(posts)
        })
    }, [user])
    return (
        <div className='feed'>
            <Envelope className='createpostcontrols'>
                <div className="titlebar">
                    <h3>Create Post</h3>
                    <i className="fal fa-comment-alt-edit"></i>
                </div>
                <div className="textareacontent">
                    <User showName={false} />
                    <TextArea className="feedtextarea" placeholder="What's on your mind?" value={text} onChange={(e)=> setText(e.target.value)}/>
                </div>

                <div className="selectmedia sb flexrow">

                    <UploadMedia files={files} setFiles={setFiles}/>
                    <PostBtn loading={loading} value={text} onClick={()=> handleCreatePost()} />
                </div>
                <SelectedImgs files={files} setFiles={setFiles} />
      
            </Envelope>
            <div className="postsrow">
                    {postsrow}
            </div>

        </div>
    );
};

Feed.propTypes = {
    
};

export default Feed;