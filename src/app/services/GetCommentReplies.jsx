import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { db } from '../../Fire';

const useGetCommentReplies = props => {
    const {post, comment} = props
    const [replies, setReplies] = useState([])

    useEffect(()=> {
        db.collection(`/users/${post.postedBy}/posts/${post.id}/comments/${comment.commentId}/replies`).orderBy('datePosted', 'desc').onSnapshot(snapshot => {
            const replies = snapshot.docs.map(doc => doc.data())
            setReplies(replies)
        })
    }, [post, comment])

    return replies
};

useGetCommentReplies.propTypes = {
    
};

export default useGetCommentReplies;