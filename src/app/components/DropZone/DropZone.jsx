import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {useDropzone} from 'react-dropzone';
import './DropZone.css'
import AppBtn from '../AppBtn/AppBtn';
import SelectedImgs from './SelectedImgs';

const DropZone = props => {
    const {files, setFiles, btntext='Done', setVisible, enabled, showNoti, limit} = props
    const {getRootProps, getInputProps, acceptedFiles} = useDropzone({
        noKeyboard: false, 
        accept: {'image/*': [], 'video/*': []},
        disabled: !enabled,
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
           <div className={`dropzonecont ${enabled ? '' : 'disableddropzone'}`}>
                <div {...getRootProps({className: 'dropzone'})}>
                    <input {...getInputProps()} />
                    <i className={enabled ? 'fal fa-upload' : 'fal fa-exclamation-circle'}></i>
                   <h3>{enabled ? `Drop Images & Videos Here` : 'Maximum files reached'}</h3>
                   <span>{enabled ? `Drag and drop your imsges here.` : `Only ${limit} ${limit === 1 ? 'file' : 'files'} allowed`}</span>
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