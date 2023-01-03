import React from 'react'
import { uploadImgur } from '../../utils/uploadToImgur'

export const UploadImg = (props) => {
  const {value, setValue} = props


  return (
    <label className='imguploader'>
      <input onChange={(e)=> uploadImgur(e, setValue)} type="file" style={{display: 'none'}}/>
      {props.children}
    </label>
  )
}