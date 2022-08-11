import React from 'react'
import './AppIcon.css'

export const Appicon = (props) => {
  const {icon, onClick} = props
  return (
    <i className={`appicon ${icon}`} onClick={()=> onClick?.()}></i> 
  )
}