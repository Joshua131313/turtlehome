import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {useDropzone} from 'react-dropzone';
import './DropZone.css'
import AppBtn from '../AppBtn/AppBtn';
import SelectedImgs from './SelectedImgs';
import { StoreContext } from '../../../ContextAPI';

const DropZone = props => {
  const {addNoti} = useContext(StoreContext)
    const {files, setFiles, btntext='Done', setVisible, disabled, showNoti, limit, hideBtn} = props
    const {getRootProps, getInputProps, acceptedFiles} = useDropzone({
        noKeyboard: false, 
        accept: {'image/*': [], 'video/*': []},
        disabled: limit == files?.length,
        maxSize: 3000000,
        onError: (err) => console.log(err.message),
        onDropRejected: (err) => addNoti(err.length > 1 ? 'Files are larger than 3 MB.' : "File is larger than 3 MB.", 'fal fa-exclamation-circle'),
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
           <div className={`dropzonecont ${(!disabled && limit !== files?.length) ? '' : 'disableddropzone'}`}>
                <div {...getRootProps({className: 'dropzone'})}>
                    <input {...getInputProps()} />
                    <i className={(!disabled && limit !== files?.length) ? 'fal fa-upload' : 'fal fa-exclamation-circle'}></i>
                   <h3>{(!disabled && limit !== files?.length) ? `Drop Images & Videos Here` : 'Maximum files reached'}</h3>
                   <span>{(!disabled && limit !== files?.length) ? `Drag and drop your imsges here.` : `Only ${limit} ${limit === 1 ? 'file' : 'files'} allowed`}</span>
                </div> 
               
           </div> 
           <SelectedImgs files={files} setFiles={setFiles} />
           {!hideBtn && <div className="flexrow fe">
             <AppBtn text={btntext} icon='fal fa-upload' onClick={()=> setVisible(false)}/>
           </div>}
           </>
    );
};

DropZone.propTypes = {
    
};

export default DropZone;