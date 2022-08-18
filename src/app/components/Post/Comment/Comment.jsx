import React from 'react';
import PropTypes from 'prop-types';
import './Comment.css';
import AppUser from '../../User/AppUser';
import ImgLoaded from '../../Imgloaded/Imgloaded';
import { useGetUserInfo } from '../../../services/GetUserInfo';

const Comment = props => {
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
            </div>
        </div>
    );
};

Comment.propTypes = {
    
};

export default Comment;