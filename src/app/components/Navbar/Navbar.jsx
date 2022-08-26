import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { usersSearchClient } from '../../algolia'
import { links } from '../../data/Array'
import AppBtn from '../AppBtn/AppBtn'
import { AppInput } from '../AppInput/AppInput'
import Date from '../Date/Date'
import { Logo } from '../Logo/Logo'
import AppUser from '../User/AppUser'
import { Drawer } from './Drawer'
import './Navbar.css'

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false) 
  const location = useLocation()
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const usersIndex = usersSearchClient.initIndex('users_index')
  const [searchValue, setSearchValue] = useState('')
  const [users, setUsers] = useState([])
  function handleScroll(){
    if(window.scrollY > 50) {
      setScrolled(true)
    }
    else {
      setScrolled(false)
    }
  }

  const linksrow = links?.map(link=> {
    return (
      <NavLink end className={({ isActive }) => "navlink" + (isActive ? " activelink" : "")}   to={`${link.filter}`} >
          <i className={`sideicon ${link.icon}`}></i>
          <span>{link.filter}</span>
      </NavLink>
    )
  })
 const usersrow = users?.map(user=> {
   return (
      <div className="searcheduser flexrow ac sb">
         <AppUser userid={user.uid}/>
         <div className="controls flexrow gap-10">
           <i className='appicon fal fa-comment'></i>
           <i className='appicon fal fa-user-plus'></i>
         </div>
      </div>
   ) 
 })
  

  useEffect(()=>{
      window.addEventListener('scroll', handleScroll)
  },[navigate])
  
  useEffect(()=> {
    usersIndex.search(searchValue).then(({ hits }) => {
      setUsers(hits)
    })
  }, [searchValue])

  return (
    <>
    <div className={`navbar  ${scrolled ? `scrollednav`: ''}`}>
      <Logo />
      {/* <div className="navlinksrow flexrow">
        {linksrow}
      </div> */}
      {/* <div className="searchbar">
        <AppInput placeholder={'Search users, posts or events'} removeText setValue={setSearchValue} value={searchValue}/>
        <div className="searchedusers">
          {usersrow}
        </div>
      </div> */}
      <div className="icons flexrow">
        <i className='fal fa-user-plus appicon'></i>
        <i className='fal fa-cog appicon'></i>
      </div>
    </div>
    {/* <Drawer setVisible={setVisible} navlinksrow={linksrow} visible={visible}/> */}
    {/* <i className={`scrolltotop fa fa-chevron-up ${scrolled? 'visiblebtn':''}`} onClick={()=> window.scrollTo({top: 0})}></i> */}
    </>
  )
}