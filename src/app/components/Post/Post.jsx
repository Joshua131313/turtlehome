import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Envelope from '../../containers/Envelope/Envelope';
import AppUser from '../User/AppUser';
import ImgLoaded from '../Imgloaded/Imgloaded';
import TimeAgo from 'react-timeago'
import './Post.css'
import { db } from '../../../Fire';
import { StoreContext } from '../../../ContextAPI';
import useGetPostReactions from '../../services/GetPostReactions';

const Post = props => {
    const {post} = props
    const {user} = useContext(StoreContext)
    const reactions = useGetPostReactions({post})
   
   
    const ReactionIcon = ({reaction}) => {
        return (
            <i className={`${reactions.some(x=> x.user === user.uid && x.reaction === reaction)? 'activeactionbtn fa ':'fal ' } fa-${reaction}`} onClick={()=> handleReaction(reaction)}></i>
        )
    }
    const handleReaction = (reaction) => {
       db.collection(`/users/${user.uid}/posts`).doc(post.id).collection('reactions').doc(user.uid).set({
           reaction,
           dateReacted: new Date(),
           user: user.uid
       })
    }
    const handleComment = () => {

    }
    const reactionsRow = reactions?.map(reaction=> {
        return (
            <div className="name flexrow" key={reaction.user}>
                <i className={`likedby fa fa-${reaction.reaction}`}></i>
                <AppUser userid={reaction.user} showImg={false}/>
            </div>
        )
    })
    return (
        <Envelope className='post'>
            <AppUser userid={post.postedBy}> 
                <TimeAgo date={post && post.datePosted.toDate()} />
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
                    <i className="fal fa-comment comment" onClick={()=> handleComment('')}></i>
                </div>
                <div className="share">
                    <i className="fa fa-share"></i>
                </div>
            </div>
       </Envelope>
    );
};

Post.propTypes = {
    
};

export default Post;