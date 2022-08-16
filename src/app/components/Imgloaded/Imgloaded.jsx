import React, {useState, useEffect} from 'react'
import './Imgloaded.css'
const ImgLoaded = (props) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const {img, skeletonclass='', className='', dimension, width=null, sizes} = props
  const [imgA, setImgA] = useState(img)


  useEffect(()=> {
    setImgA(img)
  }, [img])

  return ( 
    <div className={`imgloaded ${className}`} style={{top: sizes?-sizes(50):null}}>
      <img referrerPolicy='no-referrer' onLoad={()=> setIsLoaded(true)} src={img} alt="" style={isLoaded?{display: 'block', width}:{display: 'none'}}/>
      <div className={"rskeletonimg "+skeletonclass} style={!isLoaded?{display: 'block', width: sizes?sizes(100):null, height: sizes?sizes(100):null}:{display: 'none'}}></div>
    </div> 
  ) 
} 
export default ImgLoaded