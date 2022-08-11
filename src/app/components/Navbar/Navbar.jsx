import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { links } from '../../data/Array'
import AppBtn from '../AppBtn/AppBtn'
import Date from '../Date/Date'
import { Logo } from '../Logo/Logo'
import { Drawer } from './Drawer'
import './Navbar.css'
export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false) 
  const location = useLocation()
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  function handleScroll(){
    if(window.scrollY > 50) {
      setScrolled(true)
    }
    else {
      setScrolled(false)
    }
  }

  const linksrow = links.map(link=> {
    return (
      <NavLink end className={({ isActive }) => "navlink" + (isActive ? " activelink" : "")}   to={`${link.filter}`} >
          <i className={`sideicon ${link.icon}`}></i>
          <span>{link.filter}</span>
      </NavLink>
    )
  })
  useEffect(()=>{
      window.addEventListener('scroll', handleScroll)
  },[navigate])

  return (
    <>
    <div className={`navbar  ${scrolled ? `scrollednav`: ''}`}>
      <div className="leftnav">
        <i className="fal fa-search"></i>
        <i className="fal fa-bell"></i>
      </div>
      <Logo />
      {/* <div className="navlinksrow flexrow">
        {linksrow}
      </div> */}
      <div className="authbtns">
        <AppBtn text='Sign in' icon='fal fa-user' />
        <AppBtn text='Subscribe' className='border'  />
      </div>
    </div>
    <div className="categoriesbar">
      <Date />
      <div className="categoriesrow flexcol">
        {linksrow}
      </div>
    </div>
    {/* <Drawer setVisible={setVisible} navlinksrow={linksrow} visible={visible}/> */}
    <i className={`scrolltotop fa fa-chevron-up ${scrolled? 'visiblebtn':''}`} onClick={()=> window.scrollTo({top: 0})}></i>
    </>
  )
}