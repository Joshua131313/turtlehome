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
    else if (option.upload) {
      return (
        <label className='dropoption'>
          <input onChange={(e)=> option.onChange(e)} type="file" style={{display: 'none'}} />
          <i className={option.icon}></i>
          <span>{option.text}</span>
       </label>
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
    <div onClick={(e)=> {setOpenID(openID ? null : id); e.stopPropagation()}} className={`dropcont ${openID === id?'activedrop':''}`}>
      {props.children}
      <div className="dropdown">
          {optionsrow}
      </div>
    </div> 
    
  )
}
export default Dropdown