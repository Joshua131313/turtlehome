import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { db } from '../../Fire';

const useGetReactions = props => {
    const {collection, limit} = props
    const [reactions, setReactions] = useState([])

    useEffect(()=> {
        db.collection(collection).limit(limit).onSnapshot(snapshot => {
            const reactions = snapshot.docs.map(doc => doc.data())
            setReactions(reactions)
        })
    }, [collection, limit])

    return reactions
};

useGetReactions.propTypes = {
    
};

export default useGetReactions;