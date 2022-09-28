import React from 'react';
import PropTypes from 'prop-types';
import './Media.css'
import Layout from '../../containers/Layout/Layout';
import ImgLoaded from '../../components/Imgloaded/Imgloaded';
import useGetUsersAlbums from '../../services/GetUsersAlbums';
import AlbumCard from '../../components/AlbumCard/AlbumCard';
import { Outlet, Route } from 'react-router-dom';

const Media = props => {


    return (
        <div >
            <Outlet />
        </div>
    );
};

Media.propTypes = {
    
};

export default Media;