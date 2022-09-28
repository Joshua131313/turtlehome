import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { db } from '../../Fire';
import firebase from 'firebase';

const useGetUsersAlbums = props => {
    const user = firebase.auth().currentUser
    const [albums, setAlbums] = useState([])

    useEffect(()=> {
        db.collection(`users/${user.uid}/albums`).onSnapshot(snapshot => {
            const albums = snapshot.docs.map(doc => doc.data())
            setAlbums(albums)
        })
    }, [])

    return albums
};

useGetUsersAlbums.propTypes = {
    
};

export default useGetUsersAlbums;