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

const Feed = props => {
    const [img, setImg] = useState('')
    const {user, addNoti, notifisystem} = useContext(StoreContext)
    const [text, setText] = useState('')
    const [opendID, setOpenID] = useState(null)
    const [posts, setPosts] = useState([])
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
            onChange: (e)=>  setImg(e.target.value),
            value: img,
            type: 'input',
            notifisystem
        }, Infinity)
    }
    
    const postsrow = posts?.map(post=> {
        return (
            <Post post={post} />
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

                   <Dropdown openID={opendID} setOpenID={setOpenID} id={1} options={[{icon: 'fal fa-link', text: "URL", onClick: ()=> {handleImgURL()}}, {icon: 'fal fa-upload', text: "Upload", upload: true, onChange: (e)=> {setImg(e.target.value)}}]}>
                        <AppBtn text='Upload Image' icon='fal fa-image'/>
                   </Dropdown>
                    <PostBtn value={text} onClick={()=> handleCreatePost()} />
                </div>
                {img && 
                    <div className="uploadedmedia">
                        <ImgLoaded img={img}/>
                    </div>
                }
      
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