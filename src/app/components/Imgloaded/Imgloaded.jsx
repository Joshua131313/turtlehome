import React, {useState, useEffect} from 'react'
import './Imgloaded.css'
const ImgLoaded = (props) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const {img, skeletonclass='', className='', dimension, width=null, sizes, zoomScale, activeIndicator} = props


  useEffect(()=> {
    return ()=> {
      setIsLoaded(false)
    }
  }, [img])

  return ( 
    <div className={`imgloaded ${className}`} style={{top: sizes?-sizes(50):null}}>
      {/* <img src={img} alt="" onLoad={()=> setIsLoaded(true)}/> */}
      <img referrerPolicy='no-referrer' onLoad={(e)=> {setIsLoaded(true);}} src={img} alt="" style={isLoaded?{display: 'block', maxHeight: zoomScale ? zoomScale * 400 : ''}:{display: 'none'}}/> 
      <div className={"rskeletonimg "+skeletonclass} style={!isLoaded?{display: 'block', width: sizes?sizes(100):null, height: sizes?sizes(100):null}:{display: 'none'}}></div>
      {
        activeIndicator &&
        <div className="activeindicator"></div>
      }
    </div> 
  ) 
} 
export default ImgLoaded 