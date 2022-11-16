import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const useGetConvoIDFromPath = () => {
  const location = useLocation()
  const [pathName, setPathName] = useState(location.pathname)

  useEffect(()=> {
    setPathName(location.pathname)
  }, [location])

  return pathName.split('/')[2]
}