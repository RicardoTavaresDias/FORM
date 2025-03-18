import { useAlert } from '../hooks/useAlert'

export function Alert(){
  const { message, setClose } = useAlert()
 
  return (
    <div className={"alert alert-" + message.value.type} role="alert">
      {message.value.message}
      <button type="button" className="close"  onClick={() => setClose(false)} >
        &times;
      </button>
    </div>
  )
}