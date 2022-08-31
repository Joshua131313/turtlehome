import React from 'react'
import './AppBtn.css'

const AppBtn = (props) => {
  const {onClick, text, className, icon, disabled, loading} = props

  return (
    <button className={`appbtn ${className} ${disabled ? 'disabledbtn':''}`} onClick={()=> !disabled && onClick?.()}>
      {loading ? <i className="fal fa-spinner fa-spin"></i> : icon && <i className={icon}></i>}
      <span>{text}</span>
    </button>
  )
}
export default AppBtn