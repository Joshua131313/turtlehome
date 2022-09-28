import React from 'react';
import PropTypes from 'prop-types';
import AlbumCard from '../../components/AlbumCard/AlbumCard';
import useGetUsersAlbums from '../../services/GetUsersAlbums';
import Layout from '../../containers/Layout/Layout';

const AlbumsRender = props => {
    const albums = useGetUsersAlbums()
    const albumsRender = albums?.map(album=> {
        return (
            <AlbumCard album={album} />
        )
    })
    return (
        <Layout className='mediapage' title='Media' btnLink='create-album' btnText='Create Album'>
          <div className="albumsrender">
             {albumsRender}
          </div>
        </Layout>
    );
};

AlbumsRender.propTypes = {
    
};

export default AlbumsRender;