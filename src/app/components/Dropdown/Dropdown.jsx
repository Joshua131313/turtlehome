import React, { useContext, useEffect, useState } from 'react'
import './Dropdown.css'

const Dropdown = (props) => {
  const {options, openID, setOpenID, id} = props
  const optionsrow = options.map((option, i)=> {
    if(option.download) {
      return (
        <a href='' target='__blank' className='dropoption' key={i}>
          <i className={option.icon}></i>
          <span>{option.text}</span>
        </a>
      )
    }
    else if (option.upload) {
      return (
        <label key={i} className='dropoption'>
          <input multiple={false} onChange={(e)=> option.onChange(e)} type="file" style={{display: 'none'}} />
          <i className={option.icon}></i>
          <span>{option.text}</span>
       </label>
      )
    }
    else {
      return ( 
        <div key={i} onClick={()=> option.onClick()} className='dropoption'>
          <i className={option.icon}></i>
          <span>{option.text}</span>
        </div>
      )
    }
  })
  useEffect(()=> {
     if(openID) { 
       window.onclick = () => {
        setOpenID(null) 
      }
    }
    return () => {
      window.onclick = null
    }
  }, [openID, id])
  
  return (
    <div onClick={(e)=> {setOpenID(prev=> prev === id ? null : id); e.stopPropagation()}} className={`dropcont ${openID === id?'activedrop':''}`}>
      {props.children}
      <div className="dropdown">
          {optionsrow}
      </div>
    </div> 
    
  )
}
export default Dropdown