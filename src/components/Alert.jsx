import styles from './Alert.module.css'
import { useAlert } from '../hooks/useAlert'

export function Alert(){
  const { message, setClose } = useAlert()
 
  return (
    <div className={"alert alert-" + message.value.type} role="alert" id={styles.alert}>
      {message.value.message}
      <button type="button" className={styles.close}  onClick={() => setClose(false)} >
        ✕
      </button>
    </div>
  )
}