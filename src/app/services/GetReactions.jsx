import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { db } from '../../Fire';

const useGetReactions = props => {
    const {collection, limit, comment} = props
    const [reactions, setReactions] = useState([])

    useEffect(()=> {
        db.collection(collection).limit(limit).onSnapshot(snapshot => {
            const reactions = snapshot.docs.map(doc => doc.data())
            setReactions(reactions)
        })
    }, [collection, limit, comment])

    return reactions
};

useGetReactions.propTypes = {
    
};

export default useGetReactions;