import React from 'react';
import PropTypes from 'prop-types';
import './Comment.css';
import AppUser from '../../User/AppUser';
import ImgLoaded from '../../Imgloaded/Imgloaded';
import { useGetUserInfo } from '../../../services/GetUserInfo';
import firebase from 'firebase';
const Comment = props => {
    const user = firebase.auth().currentUser
    const {comment} = props
    const userInfo = useGetUserInfo(comment.postedBy)

    return (
        <div className='comment flexrow'>
            <div className="user">
                <ImgLoaded  img={userInfo?.userinfo?.profilePic}/>
            </div>
            <div className="commentbubble flexcol">
                <div className="innercommentbubble flexcol">
                    <span>{userInfo.name}</span>
                    {comment.comment}
                </div>
                <div className="commentcontrols flexrow sb ac">
                    <span>10 Days ago</span>
                    <div className="innercommentcontrols flexrow">
                        <span className="edit">Like</span>
                        <span className="reply">Reply</span>
                        {user.uid === comment.postedBy &&
                         <>
                             <span className="edit">Edit</span>
                             <span className="delete">Delete</span>
                         </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

Comment.propTypes = {
    
};

export default Comment;