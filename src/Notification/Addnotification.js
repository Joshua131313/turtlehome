
export  function addNotification(parameters, time=15, position='tc'){
  const options = parameters
   const notification = parameters.notifisystem.current
    notification &&  notification.addNotification({
     message:  <> 
      <div className={`notic ${options.type}`}>
      <i className={options.icon} ></i> 
      {options.type === 'input' ?
        <input autoFocus onClick={(e)=> e.stopPropagation()} type='text' className='input' placeholder={options.msg}  onChange={(e)=> options.onChange(e)} />
       :
        <strong>{options.msg}</strong>
      }
       {options&&options.button}
      </div>
       {options.type === 'input' ?
         <button className="appbtn" onClick={(e)=> {options.onDone()}}>
           Done
         </button>
         :
         <i className='fal fa-times'></i>  
       }
      </> ,
     level: 'warning',
     position:  position,
     autoDismiss: time
   })
 }
