import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DropZone from '../DropZone/DropZone';
import Popup from '../Popup/Popup';
import AppBtn from './AppBtn';
import Dropdown from '../Dropdown/Dropdown';
import { addNotification } from '../../../Notification/Addnotification';
import { StoreContext } from '../../../ContextAPI';
import { isImage } from '../../utils/general';

const UploadMedia = props => {
    const {notifisystem} = useContext(StoreContext)
    const {files, setFiles} = props
    const [openID, setOpenID] = useState(null)
    const [dropZone, setDropZone] = useState(false)
    const handleImgURL = () => {
        // addNotification({
        //     msg: 'Type Image URL...',
        //     icon: 'fa fa-link',
        //     onChange: (e)=>{ setImg(e.target.value); console.log(e.target.value)},
        //     onDone: (e)=>  {setFiles(prev=> [{preview: img, isUrl: true}, ...prev]);},
        //     type: 'input',
        //     notifisystem
        // }, 30)
        let img = prompt('Type Image URL...')
        if(img !== '') {
            setFiles(prev=> [{preview: img, isUrl: true}, ...prev])
        }
    }
    console.log(files)

    return (
        <>
        <Dropdown openID={openID} setOpenID={setOpenID} id={1} options={[{icon: 'fal fa-link', text: "URL", onClick: ()=> {handleImgURL()}}, {icon: 'fal fa-upload', text: "Upload", onClick: ()=> setDropZone(true)}]}>
             <AppBtn text='Upload Media' icon='fal fa-image'/>
        </Dropdown>
        <Popup className='imguploadpopup' visible={dropZone} setVisible={setDropZone}>
                <h2>Upload Media</h2>
                <DropZone setVisible={setDropZone}  files={files} setFiles={setFiles} />
        </Popup>
        </>
    );
};

UploadMedia.propTypes = {
    
};

export default UploadMedia;