import React from 'react';
import PropTypes from 'prop-types';
import ImgLoaded from '../../Imgloaded/Imgloaded';
import RenderPostMedia from '../../MediaCarousel/RenderPostMedia';
import { getTimeAgo } from '../../../utils/date';
import { deleteReply, handleLikeReply } from '../../../services/DBFunctions';
import { useGetUserInfo } from '../../../services/GetUserInfo';
import firebase from 'firebase';
const Reply = props => {
    const user = firebase.auth().currentUser
    const {reply, comment, post} = props
    const userInfo = useGetUserInfo(reply.postedBy)
    const userLikedComment = true
    return (
        <div className="reply flexcol">
            <div className='innercomment flexrow'>
                <div className="user">
                    <ImgLoaded  img={userInfo?.userinfo?.profilePic}/>
                </div> 
                <div className="commentbubble flexcol">
                    <div className="innercommentbubble flexcol">
                        <span>{userInfo.name}</span>
                        {reply.reply}
                        {reply?.media && <RenderPostMedia media={reply?.media} />}
                    </div>
                    <div className="commentcontrols flexrow sb ac">
                        <span>{getTimeAgo(reply?.datePosted?.toDate())}</span>
                        <div className="innercommentcontrols flexrow">
                            <span className={`${userLikedComment ? 'activelike' : ''} like`} onClick={()=> handleLikeReply(post, comment, reply)}>{userLikedComment ? 'Liked' : 'Like'}</span>
                            {user.uid === reply.postedBy &&
                            <>
                                <span className="edit">Edit</span>
                                <span className="delete" onClick={()=> deleteReply(post, comment, reply)}>Delete</span>
                            </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Reply.propTypes = {
    
};

export default Reply;