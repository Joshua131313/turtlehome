import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { db } from '../../Fire';

const useGetPostComments = props => {
    const {post} = props
    const [comments, setComments] = useState([])

    useEffect(() => {
        db.collection(`/users/${post.postedBy}/posts`).doc(post.id).collection('comments').orderBy('datePosted', 'desc').onSnapshot(snapshot => {
            const comments = snapshot.docs.map(doc => doc.data())
            setComments(comments)
        })
    }, [post])

    return comments
};



export default useGetPostComments;