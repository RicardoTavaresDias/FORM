import styles from './BoxInputs.module.css'

export function BoxInputs({children, ...props}){
  return (
    <div className="form-group" id={styles.numbers} {...props}>
      {children}
    </div>
  )
}