import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { db } from '../../Fire';
import firebase from 'firebase';

const useGetAlbumImgs = props => {
    const {limit=Infinity, albumId} = props
    const user = firebase.auth().currentUser
    const [albumImgs, setAlbumImgs] = useState([])

    useEffect(()=> {
        db.collection(`users/${user.uid}/albums/${albumId}/media`).limit(limit).onSnapshot(snapshot => {
            const albumImgs = snapshot.docs.map(doc => doc.data())
            setAlbumImgs(albumImgs)
        })
    }, [limit])

    return albumImgs
};

useGetAlbumImgs.propTypes = {
    
};

export default useGetAlbumImgs;