import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Envelope from '../../containers/Envelope/Envelope';
import AppUser from '../User/AppUser';
import ImgLoaded from '../Imgloaded/Imgloaded';
import TimeAgo from 'react-timeago'
import './Post.css'
import { db } from '../../../Fire';
import { StoreContext } from '../../../ContextAPI';
import useGetPostReactions from '../../services/GetPostReactions';
import { User } from '../User/User';
import ReactTextareaAutosize from 'react-textarea-autosize';
import AppBtn from '../AppBtn/AppBtn';
import PostBtn from '../AppBtn/PostBtn';
import CommentInput from './Comment/CommentInput';
import { addReaction, generateID } from '../../services/DBFunctions';
import useGetPostComments from '../../services/GetPostComments';
import Comments from './Comment/Comments';
import useGetReactions from '../../services/GetReactions';
import Dropdown from '../Dropdown/Dropdown';
import Drop from './Drop';
import { getTimeAgo } from '../../utils/date';

const Post = props => {
    const {post, openID, setOpenID} = props
    const {user} = useContext(StoreContext)
    const reactions = useGetReactions({collection: `/users/${post.postedBy}/posts/${post.id}/reactions`, limit: 3})
    const [showComments, setShowComments] = useState(false)
    const [comment, setComment] = useState('')
    const ReactionIcon = ({reaction}) => {
        const isReacted = reactions.some(x=> x.user === user.uid && x.reaction === reaction)
        return (
            <i className={`${isReacted? 'activeactionbtn fa ':'fal ' } fa-${reaction}`} onClick={()=> handleReaction(reaction, isReacted)}></i>
        )
    }
    const handleReaction = (reaction, isReacted) => {
        addReaction(`/users/${post.postedBy}/posts/${post.id}/reactions`, reaction, isReacted)
    }
    const sendComment = () => {
        let id = generateID()
        db.collection(`/users/${post.postedBy}/posts`).doc(post.id).collection('comments').doc(id).set({
            comment,
            datePosted: new Date(),
            postedBy: user.uid,
            postId: post.id,
            commentId: id
        }).then(()=> {
            setComment('')
        })
    }

    const reactionsRow = reactions?.map((reaction, i)=> {
        return (
            <div className="name flexrow" key={reaction.user}>
                <i className={`likedby fa fa-${reaction.reaction}`}></i>
                <AppUser userid={reaction.user} showImg={false}/>
            </div>
        )
    }) 
    return (
        <Envelope className='post' id={post.id}> 
            <AppUser userid={post.postedBy}> 
                <span className="timeago">
                    {getTimeAgo(post && post.datePosted.toDate())}
                </span>
            </AppUser>
            <div className="posttext">
                {post?.postContent.text}
            </div>
            {post?.postContent.media &&
                <div className="postimg">
                    <ImgLoaded img={post?.postContent.media} />
                </div>
            }
            <div className="postactiondetails">
                <div className="likedbyrow flexrow ac">
                    {reactionsRow}
                    {reactions.length >=1 ?
                        <div className="name flexrow">  
                            {reactions.length - 3 > 0 ? `+${reactions.length - 3}` : ''}
                         </div>
                         :''
                    }
                </div>
                <div className="count flexrow">
                    <div className="commentscount">26 comments</div>
                    <div className="sharescount">100 shares</div>
                </div>
            </div>
            <div className="postcontrols">
                <div className="postactionbtns">
                    <ReactionIcon reaction='thumbs-up' />
                    <ReactionIcon reaction='heart' />
                    <i className={`fal fa-comment comment ${showComments ? 'activecommenticon':''}`} onClick={()=> setShowComments(!showComments)}></i>
                </div>
                <div className="share">
                    <i className="fa fa-share"></i>
                </div>
            </div>
            {
            showComments && 
                <div className="commentssection">
                    <CommentInput value={comment} onClick={()=> sendComment()} setValue={setComment} />
                    <Comments post={post}/>
                </div>
            }
            <button onClick={(e)=> console.log(e)}>s</button>
           <Dropdown openID={openID} setOpenID={setOpenID} id={post.id} options={[{text: 'asd'}, {text: 'asd'}]}>
               <button>asd</button>
           </Dropdown>
       </Envelope>
    );
};

Post.propTypes = {
    
};

export default Post;