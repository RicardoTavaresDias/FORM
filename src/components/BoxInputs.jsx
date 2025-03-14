export function BoxInputs({children, ...props}){
  return (
    <div className="form-group" id='numbers' {...props}>
      {children}
    </div>
  )
}