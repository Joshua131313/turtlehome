import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Layout from '../../containers/Layout/Layout';
import './Media.css'
import { useParams } from 'react-router-dom';
import useGetAlbumImgs from '../../services/GetAlbumImgs';
import RenderPostMedia from '../../components/MediaCarousel/RenderPostMedia';
import Tabs from '../../components/Tabs/Tabs';
import PopupSlider from '../../components/MediaCarousel/PopupSlider';
import ImgLoaded from '../../components/Imgloaded/Imgloaded';

const AlbumPage = props => {
    const {albumId, albumName} = useParams()
    const albumImgs = useGetAlbumImgs({albumId})
    const [zoomScale, setZoomScale] = useState(1)
    const [showPopup, setShowPopup] = useState(false)
    const [activeImg, setActiveImg] = useState('')
    console.log(activeImg)
    const imgsRender = albumImgs?.map((img, i)=> {
        return (
            <RenderPostMedia setShowPopup={setShowPopup} onClick={(img)=> setActiveImg(i)} media={img} key={img.mediaID}  zoomScale={zoomScale}/>
        )
    })
    const thumbnailsRender = albumImgs?.map((media, i) => {
        if (media.fileType?.includes("video")) {
          return (
            <div
              className={`${activeImg === i ? "activethumbnail" : ""} thumbnail`}
              onClick={() => setActiveImg(i)}
            >
              <video
                src={media.downloadURL}
                controls={false}
                frameborder="0"
              ></video>
            </div>
          );
        } else {
          let src = media?.downloadURL ?? media?.preview;
          return (
            <div
              className={`${activeImg === i ? "activethumbnail" : ""} thumbnail`}
              onClick={() => setActiveImg(i)}
            >
              <ImgLoaded
                img={src}
                className={`${activeImg === i ? "activethumbnailimg " : ""}`}
              />
            </div>
          );
        }
      });
    const handleSize = (decrement) => {
        if(decrement) {
           if(zoomScale <= 1) {
               if(zoomScale > 0.1) {
                 setZoomScale(prev=> (parseFloat(prev) - 0.1).toFixed(1))
               }
           }
            else {
                setZoomScale(prev=> (parseFloat(prev) - 1).toFixed(1))
            }
        }
        else {
            if(zoomScale < 1) {
                  setZoomScale(prev=> (parseFloat(prev) + 0.1).toFixed(1))
            }
            else if(zoomScale < 10){
                setZoomScale(prev=> (parseFloat(prev) + 1).toFixed(1))
            }
        }
    }
    const handleNextPrev = (direction) => {
        //next
        if (direction === "next") {
          if (activeImg === albumImgs?.length - 1) {
            setActiveImg(0);
          } else {
            setActiveImg((prev) => prev + 1);
          }
        }
        //previous
        else {
          if (activeImg === 0) {
            setActiveImg(albumImgs?.length - 1);
          } else {
            setActiveImg((prev) => prev - 1);
          }
        }
      };
    return (
        <Layout className='albumpage' title={albumName} btnText='Edit Album'>
            <div className="controls">
                <div></div>
                <div className="incrementsize">
                    <i className='fal fa-minus' onClick={()=> handleSize(true)}></i>
                    <span>{zoomScale * 100}%</span>
                    <i className='fal fa-plus' onClick={()=> handleSize()}></i>
                </div>
            </div>
            <div className="imgsrender gridimgs">
                {imgsRender}
            </div>
            <PopupSlider handleNextPrev={(direction)=> handleNextPrev(direction)} mediaRender={thumbnailsRender} showPopup={showPopup} setShowPopup={setShowPopup} media={albumImgs} activeImg={activeImg}  />
        </Layout>
    );
};

AlbumPage.propTypes = {
    
};

export default AlbumPage;