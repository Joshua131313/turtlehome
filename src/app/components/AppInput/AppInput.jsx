import React, { useEffect, useRef } from 'react'
import './AppInput.css'

export const AppInput = ({placeholder, value, setValue, removeText, shouldFocusOnKey}) => {
  let inputRef = useRef()
  useEffect(()=> {
    if(shouldFocusOnKey) {
      window.onkeydown = (e) => {
        if(e.ctrlKey && e.key === 'm') {
          inputRef.current.focus()
        }
      }
    }
  }, [shouldFocusOnKey])
  return (
    <div className="appinput">
     {!removeText && <span>{placeholder}</span>}
      <input ref={inputRef} placeholder={placeholder} value={value} onChange={(e)=> setValue(e.target.value)} type="text" />
    </div>
  )
}