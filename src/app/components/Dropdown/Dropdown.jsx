import React, { useContext, useEffect, useRef, useState } from 'react'
import Portal from '../Portal/Portal'
import './Dropdown.css'
import { Link } from 'react-router-dom';

const Dropdown = (props) => {
  const {options, openID, setOpenID, id} = props
  const elPos = useRef()
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
    else if(option.link) {
      return (
        <Link key={i} to={option.link} className='dropoption'>
          <i className={option.icon}></i>
          <span>{option.text}</span>
       </Link>
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
    <div onClick={(e)=> {setOpenID(prev=> prev === id ? null : id); e.stopPropagation(); }} className={`dropcont ${openID === id?'activedrop':''}`}>
      {props.children}
      <div className="dropdown" >
          {optionsrow}
      </div>
    </div> 
    
  )
}
export default Dropdown