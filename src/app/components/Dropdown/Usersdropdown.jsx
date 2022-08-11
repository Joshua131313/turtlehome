import React from 'react'
import ImgLoaded from '../Imgloaded/Imgloaded'
import { Searcheduser } from './Searcheduser'

export const Usersdropdown = (props) => {
  const {members, handleAddRemove, visibleDrop, search} = props

  const searchedUsersRow = members?.map(user=> {
    return (
     <Searcheduser search={search} userInfo={user} handleAddRemove={handleAddRemove} />
    )
  })
  return (
    <div className={`dropusers ${visibleDrop ? 'visibledrop': ''}`}>
    {searchedUsersRow}
   </div>
  )
}