import React, {useState, useEffect} from 'react'
import './AppSwitch.css'

function AppSwitch (props) {
  const {checked, setChecked, function1} =props
  return (
   <div className='switchdiv'>
      <label className='form-switch'>
        <input type="checkbox" checked={checked} onChange={(e)=>{setChecked && setChecked(e.target.checked); function1 && function1()}}/>
        <i></i>
      </label>
  </div>
  )
}
export default AppSwitch