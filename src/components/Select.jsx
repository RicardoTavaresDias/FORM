export function Select({ label, children, errors, ...props }){
  return (
    <div className="form-group">
      <label >{label}</label >
      <select className={errors ? "form-control border-danger" : "form-control"} {...props} >
        {children}
      </select>
      {errors && <p className='text-danger font-weight-normal'>{errors.message}</p>}
    </div>
   
    
    
  )
}