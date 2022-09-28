import React from 'react';
import PropTypes from 'prop-types';
import useGetAlbumImgs from '../../services/GetAlbumImgs';
import { addS } from '../../utils/date';
import ImgLoaded from '../Imgloaded/Imgloaded';
import './AlbumCard.css'
import { Link } from 'react-router-dom';

const AlbumCard = props => {
    const {albumId, albumName, dateCreated, albumLength} = props.album
    const lastAlbumImg = useGetAlbumImgs({limit: 1, albumId: albumId})?.[0]
    return (
        <Link to={`${albumName}/${albumId}`} className="albumcard">
            {lastAlbumImg?.fileType?.includes('video') ? 
                <video src={lastAlbumImg?.media} controls={false} style={{pointerEvents: 'none'}}></video> 
                 :
                <ImgLoaded img={lastAlbumImg?.media} />
            }
            <div className="albuminfo flexcol">
                <span>{albumName}</span>
                <span>{albumLength} file{addS(albumLength)}</span>
            </div>
        </Link>
    );
};

AlbumCard.propTypes = {
    
};

export default AlbumCard;