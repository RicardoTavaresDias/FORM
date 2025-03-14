export function Input({errors, placeholder, type, label, ...props}) {
  return (
    <>
      <div className="form-group">
        <label >{label}</label >
        <input  type={type} {...props} className={errors ? "form-control border-danger" : "form-control"} placeholder={placeholder} />
      </div>

      {errors && <p className='text-danger font-weight-normal'>{errors.message}</p>}
    </>
  )
}