import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CommentInput from './CommentInput';
import { handleReply } from '../../../services/DBFunctions';
import useGetCommentReplies from '../../../services/GetCommentReplies';
import Reply from './Reply';

const Replies = props => {
    const {showReply, post, comment, setShowReply} = props
    const [reply, setReply] = useState('')
    const replies = useGetCommentReplies({post, comment})
    const [loading, setLoading] = useState(false)

    const repliesRender = replies?.map(reply=> {
        return  (
            <Reply reply={reply} comment={comment} post={post} />
        )
    })

    return (
        <div className="replycont flexcol">
            {
                showReply && <CommentInput loading={loading} onClick={(file)=> {handleReply(post, comment, reply, setReply, file, setLoading); setShowReply(false)}} value={reply} setValue={setReply} text='Reply' placeholder='Write a reply...' />
            }
            {replies.length !== 0 ? <div className="replyrow flexcol">
                {repliesRender}
            </div> : ''}
      </div>
    );
};

Replies.propTypes = {
    
};

export default Replies;