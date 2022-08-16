import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { db } from '../../Fire';

const useGetPostReactions = props => {
    const {post} = props
    const [postReactions, setPostReactions] = useState([])

    useEffect(()=> {
        db.collection(`/users/${post.postedBy}/posts`).doc(post.id).collection('reactions').onSnapshot(snapshot => {
            const reactions = snapshot.docs.map(doc => doc.data())
            setPostReactions(reactions)
        })
    }, [post])

    return postReactions
};



export default useGetPostReactions;