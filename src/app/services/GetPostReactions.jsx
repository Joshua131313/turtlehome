import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { db } from '../../Fire';

const useGetPostReactions = props => {
    const {post, limit=3} = props
    const [postReactions, setPostReactions] = useState([])

    useEffect(()=> {
        db.collection(`/users/${post.postedBy}/posts`).doc(post.id).collection('reactions').limit(limit).onSnapshot(snapshot => {
            const reactions = snapshot.docs.map(doc => doc.data())
            setPostReactions(reactions)
        })
    }, [post])

    return postReactions
};



export default useGetPostReactions;