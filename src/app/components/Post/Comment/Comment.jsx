import React, { useEffect, useState } from 'react';
import './Comment.css';
import ImgLoaded from '../../Imgloaded/Imgloaded';
import { useGetUserInfo } from '../../../services/GetUserInfo';
import firebase from 'firebase';
import { addReaction, deleteComment, generateID } from '../../../services/DBFunctions';
import useGetReactions from '../../../services/GetReactions';
import RenderPostMedia from '../../MediaCarousel/RenderPostMedia';
import { getTimeAgo } from '../../../utils/date';
import Replies from './Replies';

const Comment = props => {
    const user = firebase.auth().currentUser
    const {comment, post} = props
    const userInfo = useGetUserInfo(comment.postedBy)
    const commentReactions = useGetReactions({collection: `/users/${comment.postedBy}/posts/${comment.postId}/comments/${comment.commentId}/reactions`, limit: Infinity, comment})
    const [userLikedComment, setUserLikedComment] = useState(false)
    const [showReply, setShowReply] = useState(false)
    const handleLike = () => {
        addReaction(`/users/${user.uid}/posts/${comment.postId}/comments/${comment.commentId}/reactions`, 'thumbs-up', userLikedComment)
    }
    useEffect(()=> {
        setUserLikedComment(commentReactions.some(x=> x.user === user.uid && x.reaction === 'thumbs-up'))
    }, [comment, commentReactions])
    return (
        <div className="comment flexcol">
            <div className='innercomment flexrow'>
                <div className="user">
                    <ImgLoaded  img={userInfo?.userinfo?.profilePic}/>
                </div> 
                <div className="commentbubble flexcol">
                    <div className="innercommentbubble flexcol">
                        <span>{userInfo.name}</span>
                        {comment.comment}
                        {comment?.media && <RenderPostMedia  media={comment?.media} />}
                    </div>
                    <div className="commentcontrols flexrow sb ac">
                        <span>{getTimeAgo(comment?.datePosted?.toDate())}</span>
                        <div className="innercommentcontrols flexrow">
                            <span className={`${userLikedComment ? 'activelike' : ''} like`} onClick={()=> handleLike()}>{userLikedComment ? 'Liked' : 'Like'}</span>
                            <span className="reply" onClick={()=> setShowReply(!showReply)}>Reply</span>
                            {user.uid === comment.postedBy &&
                            <>
                                <span className="edit">Edit</span>
                                <span className="delete" onClick={()=> deleteComment(post, comment)}>Delete</span>
                            </>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Replies setShowReply={setShowReply} showReply={showReply} comment={comment} post={post}/>
        </div>
    );
};

Comment.propTypes = {
    
};

export default Comment;