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
import { addReaction, deletePost, flagPost, generateID, hidePost, privatePost, sendComment, updatePost } from '../../services/DBFunctions';
import useGetPostComments from '../../services/GetPostComments';
import Comments from './Comment/Comments';
import useGetReactions from '../../services/GetReactions';
import Dropdown from '../Dropdown/Dropdown';
import Drop from './Drop';
import { addS, getTimeAgo } from '../../utils/date';
import MediaCarousel from '../MediaCarousel/MediaCarousel';
import Popup from '../Popup/Popup';
import SelectedImgs from '../DropZone/SelectedImgs';
import UploadMedia from '../AppBtn/UploadMedia';
import TextArea from '../AppInput/TextArea';
import EditPostPopup from './EditPostPopup';
import PostText from './PostText';

const Post = props => {
    const {post, openID, setOpenID} = props
    const {user} = useContext(StoreContext)
    const reactions = useGetReactions({collection: `/users/${post.postedBy}/posts/${post.id}/reactions`, limit: 3})
    const [showComments, setShowComments] = useState(false)
    const [comment, setComment] = useState('')
    const [showEditPost, setShowEditPost] = useState(false)
    const [editedPostContent, setEditedPostContent] = useState(post?.postContent.text)
    const [editedPostMedia, setEditedPostMedia] = useState(post?.postContent.media)
    const [loading, setLoading] = useState(false)
    const ReactionIcon = ({reaction, text}) => {
        const isReacted = reactions.some(x=> x.user === user.uid && x.reaction === reaction)
        return (
           <div className='flexrow ac reactioncont gap-5' onClick={()=> handleReaction(reaction, isReacted)}>
                <i className={`${isReacted? 'activeactionbtn fa ':'fal ' } fa-${reaction}`} ></i>
                <span>{text}</span>
           </div>
        )
    }
    const handleReaction = (reaction='thumbs-up', isReacted) => {
        addReaction(`/users/${post.postedBy}/posts/${post.id}/reactions`, reaction, isReacted)
    }
 
    const reactionsRow = reactions?.map((reaction, i)=> {
        return (
            <div className="name flexrow" key={reaction.user}>
                <AppUser userid={reaction.user} showImg={false}/>
                {/* <span>
                    {reactions.length === 1 ? '' : (reactions.length === 2 && i === 0) ?  '&' : i === reactions.length - 1 ? '' : ','}
                </span> */}
                {
                    reactions.length === 1 ? '' 
                    : 
                    (reactions.length === 2 && i === 0) ?
                    <span style={{fontWeight: 'bold', marginLeft: 5, marginRight: 3}}>&</span>
                    :
                    i !== reactions.length - 1  &&
                    ','
                }
            </div>
        )
    }) 
    return (
        <Envelope className='post' id={post.id}> 
           {showEditPost && 
            <EditPostPopup 
                showEditPost={showEditPost}
                setShowEditPost={setShowEditPost}
                setEditedPostContent={setEditedPostContent}
                editedPostContent={editedPostContent}
                editedPostMedia={editedPostMedia}
                setEditedPostMedia={setEditedPostMedia}
                updatePost={()=> updatePost(post, editedPostContent, editedPostMedia)}
             />}
            <div className="postheader flexrow ac sb">
                <AppUser userid={post.postedBy}> 
                    <span className="timeago">
                        {getTimeAgo(post && post.datePosted.toDate())}
                    </span>
                </AppUser>
                <Dropdown 
                    options={[
                        {text: post.flagged ? 'Reported' : 'Report post', icon: 'fal fa-flag', onClick: ()=> flagPost(post)},
                        {text: 'Edit post', icon: 'fal fa-pencil', onClick: ()=> setShowEditPost(!showEditPost), onlyOwner: true},
                        {text: post?.hiddenBy?.includes(user.uid) ? 'Show post' : 'Hide post', icon: post.hiddenBy?.includes(user.uid) ? 'fal fa-eye' : 'fal fa-eye-slash', onClick: ()=> hidePost(post)},
                        {text: post.private ? 'Public post' : 'Private post', icon: 'fal fa-shield-check', onClick: ()=> privatePost(post), onlyOwner: true},
                        {text: 'Delete post', icon: 'fal fa-trash', onClick: ()=> deletePost(post), onlyOwner: true},
                    ].filter(x=> (user.uid === post.postedBy || !x.onlyOwner) && (user.uid !== post.postedBy || x.onlyOwner))} 
                    id={post.id} 
                    openID={openID} 
                    setOpenID={setOpenID}>
                    <i className="appicon fal fa-ellipsis-h"></i>
                </Dropdown>
            </div>
            <PostText post={post} />
            {post?.postContent.media.length ?
                <div className="postmedia">
                    <MediaCarousel post={post} media={post?.postContent.media} />
                </div>
                : ''
            }
            <div className="postactiondetails">
                <div className="likedbyrow flexrow ac">
                    {
                      reactions.length >= 1 ?
                      <i className={`likedby fa fa-thumbs-up`}></i>
                      : ''
                    }
                    {reactionsRow}
                    {reactions.length - 3 > 0 ?
                        <div className="name flexrow" style={{marginLeft: 4}}>  
                            {`& ${reactions.length - 3} ${reactions.length - 3 === 1 ? ' other' : ' others'}`}
                         </div>
                         :''
                    }
                </div>
                {post.commentCount !== 0 && <div className="count flexrow">
                    <div className="commentscount">
                        <small>{post.commentCount} {`comment${addS(post.commentCount)}`}</small>
                    </div>
                    {/* <div className="sharescount">100 shares</div> */}
                </div>}
            </div>
            <div className="postcontrols">
                <div className="postactionbtns">
                    <ReactionIcon reaction='thumbs-up' text='Like'/>
                    {/* <ReactionIcon reaction='heart' text='Love'/> */}
                    <div className="flexrow ac reactioncont commentcont gap-5" onClick={()=> setShowComments(!showComments)}>
                        <i className={`fa fa-comment-alt comment ${showComments ? 'activecommenticon':''}`} ></i>
                        <span>Comment</span>
                    </div>
                </div>
                <div className="share flexrow ac gap-5" onClick={()=> navigator.share({url: 'rest.com'})}>
                    <i className="fa fa-share"></i>
                    <span>Share</span>
                </div>
            </div>
            {
            showComments && 
                <div className="commentssection selectmedia">
                    <CommentInput loading={loading} text='Comment' value={comment} onClick={(files)=> sendComment(post, comment, ()=> {setComment('');}, files, (val)=> setLoading(val))} setValue={setComment} />
                    <Comments post={post}/>
                </div>
            }
            {/* <button onClick={(e)=> console.log(e)}>s</button>
           <Dropdown openID={openID} setOpenID={setOpenID} id={post.id} options={[{text: 'asd'}, {text: 'asd'}]}>
               <button>asd</button>
           </Dropdown> */}
       </Envelope>
    );
};

Post.propTypes = {
    
};

export default Post;