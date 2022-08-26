import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {useDropzone} from 'react-dropzone';
import './DropZone.css'
import AppBtn from '../AppBtn/AppBtn';
import SelectedImgs from './SelectedImgs';

const DropZone = props => {
    const {files, setFiles, btntext='Done', setVisible} = props
    const {getRootProps, getInputProps, acceptedFiles} = useDropzone({
        noKeyboard: false, 
        accept: {'image/*': [], 'video/*': []},
        onDrop: acceptedFiles => {
            setFiles(prev=> [...acceptedFiles.map(file => Object.assign(file, {
              preview: URL.createObjectURL(file),
              isVideo: file.type.includes('video')
            })), ...prev]);
          }
    });
    // useEffect(()=> {        
    //     setFiles(prev=> [...prev, ...acceptedFiles])
    // }, [acceptedFiles])

    return (
        <>
           <div className="dropzonecont">
                <div {...getRootProps({className: 'dropzone'})}>
                    <input {...getInputProps()} />
                    <i className='fal fa-upload'></i>
                   <h3>Drop Images & Videos Here</h3>
                   <span>Drag and drop your imsges here.</span>
                </div> 
               
           </div> 
           <SelectedImgs files={files} setFiles={setFiles} />
           <div className="flexrow fe">
             <AppBtn text={btntext} icon='fal fa-upload' onClick={()=> setVisible(false)}/>
           </div>
           </>
    );
};

DropZone.propTypes = {
    
};

export default DropZone;