import './Alert-module.css'
import { useAlert } from '../hooks/useAlert'
import { useState, useEffect } from 'react'

export function Alert(){
  const { message, setClose, close } = useAlert()
  const [show, setShow] = useState(close)

  useEffect(() => {   
    setTimeout(() => {
      setClose(false)
    }, 5540)
  },[close])

  return (
    <div className={"alert alert-" + message.value.type} role="alert" id={show ? 'open' : 'close'}>
      {message.value.message}
      <button type="button" className='close' onClick={() => setShow(false)} >
        ✕
      </button>
    </div>
  )
}