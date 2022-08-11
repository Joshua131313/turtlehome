import React from 'react'
import './AppBtn.css'

const AppBtn = (props) => {
  const {onClick, text, className, icon} = props

  return (
    <button className={`appbtn ${className}`} onClick={()=> onClick()}>
      {icon && <i className={icon}></i>}
      <span>{text}</span>
    </button>
  )
}
export default AppBtn