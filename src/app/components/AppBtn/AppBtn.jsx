import React from 'react'
import './AppBtn.css'

const AppBtn = (props) => {
  const {onClick, text, className, icon, disabled} = props

  return (
    <button className={`appbtn ${className} ${disabled ? 'disabledbtn':''}`} onClick={()=> !disabled && onClick?.()}>
      {icon && <i className={icon}></i>}
      <span>{text}</span>
    </button>
  )
}
export default AppBtn