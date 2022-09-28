import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Layout from '../../containers/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import UploadMedia from '../../components/AppBtn/UploadMedia';
import DropZone from '../../components/DropZone/DropZone';
import { AppInput } from '../../components/AppInput/AppInput';
import AppBtn from '../../components/AppBtn/AppBtn';
import { addAlbum } from '../../services/DBFunctions';

const AddAlbum = props => {
    const navigate = useNavigate()
    const [files, setFiles] = useState([])
    const [name, setName] = useState('')
    console.log(files)
    return (
        <Layout className='addalbum' title='Create Album' btnText='Go Back' onClick={()=> navigate(-1)}>
            <AppInput value={name} setValue={setName} placeholder={'Album Name'}/>
            <DropZone limit={Infinity} files={files} setFiles={setFiles} hideBtn/>
            <div className="flexrow fe ">
                <AppBtn text='Create Album' onClick={()=> {addAlbum(files, name, ()=> navigate(-1))}}/>
            </div>
        </Layout>
    );
};

AddAlbum.propTypes = {
    
};

export default AddAlbum;