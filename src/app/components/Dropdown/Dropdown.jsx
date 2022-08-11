import React, { useContext, useEffect, useState } from 'react'
import './Dropdown.css'

const Dropdown = (props) => {
  const {options, openID, setOpenID, id} = props
  const optionsrow = options.map(option=> {
    if(option.download) {
      return (
        <a href='' target='__blank' className='dropoption'>
          <i className={option.icon}></i>
          <span>{option.text}</span>
        </a>
      )
    }
    else {
      return ( 
        <div onClick={()=> option.onClick()} className='dropoption'>
          <i className={option.icon}></i>
          <span>{option.text}</span>
        </div>
      )
    }
  })

  useEffect(()=> {
    window.onclick = () => {
     if(openID) {
        setOpenID(null) 
     }
    }
  }, [openID, id])
  return (
    <div onClick={(e)=> {setOpenID(id); e.stopPropagation()}} className={`dropcont ${openID === id?'activedrop':''}`}>
      <i  className="fal fa-ellipsis-h appicon"></i>
      <div className="dropdown">
          {optionsrow}
      </div>
    </div> 
    
  )
}
export default Dropdown