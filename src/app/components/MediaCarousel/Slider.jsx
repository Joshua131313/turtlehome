import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RenderPostMedia from './RenderPostMedia';
import { convertBytes, convertBytesToMb, downloadImg } from '../../utils/general';
import ImgLoaded from '../Imgloaded/Imgloaded';
import AppUser from '../User/AppUser';
import TextArea from '../AppInput/TextArea';
import { getTimeAgo } from '../../utils/date';
import AppBtn from '../AppBtn/AppBtn';
import { postImgDescription } from '../../services/DBFunctions';
import { saveAs } from 'file-saver'

const Slider = props => {
    const [zoomed, setZoomed] = useState(false)
    const {media, setShowPopup, handleNextPrev, mediaRender, imgZoom, length, post, allMedia} = props
    const [showInfo, setShowInfo] = useState('')
    const [imgDescription, setImgDescription] = useState('')

    return (
        <>
        <div className="imgsection flexcol" >
            {imgZoom && 
             <div className="imgheader flexrow ac sb">
               {!media?.fileType?.includes('video') &&
                <div onClick={()=> saveAs(media.downloadURL ?? media.preview ?? media.media, media.name+'.jpg')} >
                    <i className="fal fa-cloud-download appicon"></i>
                </div>}
                 {media?.fileInfo && 
                    <div className="flexcol imginfotext ac gap-5">
                        <span>{media.fileInfo.name}</span>
                        <span>File Size: {convertBytes(media.fileInfo.size)}</span>
                    </div>
                 }
                 <i className='fal fa-info appicon' ></i>
             </div>
             }
             <RenderPostMedia setZoomed={setZoomed} media={media} imgZoom={imgZoom} setShowPopup={setShowPopup}/>
        </div>
            {
            (length > 1 && !zoomed) ?<>
            <i className="appicon fal fa-chevron-right next" onClick={()=> handleNextPrev?.('next')}></i>
            <i className="appicon fal fa-chevron-left prev" onClick={()=> handleNextPrev?.()}></i>
            </>
            :''
            }
       {length !== 1 ? 
       <div className="thumbnails">
            {mediaRender && mediaRender}
        </div> : ''}
        </>
    );
};

Slider.propTypes = {
    
};

export default Slider;