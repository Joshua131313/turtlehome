import {useState, useEffect, useContext} from 'react'
import Appbtn from '../Appbtn/Appbtn'
import { StoreContext } from '../ContextAPI'
import { addNotification } from './Addnotification'

const Addnoti = (msg, icon) => {
  const {notifisystem} = useContext(StoreContext)
  const useNoti = addNotification({
    notifisystem,
    msg,
    icon
  })

  return (
    <Appbtn />
  )
}
export default Addnoti