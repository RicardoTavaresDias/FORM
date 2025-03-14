export function Input({errors, placeholder, type, children, ...props}) {
  return (
    <>
      <div className="form-group">
        <label >{children}</label >
        <input  type={type} {...props} className={errors ? "form-control border-danger" : "form-control"} placeholder={placeholder} />
        {errors && <p className='text-danger font-weight-normal'>{errors.message}</p>}
      </div>
    </>
  )
}