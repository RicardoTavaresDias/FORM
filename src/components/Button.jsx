export function Button({ children, ...props }){
  return (
    <>
      <button type="submit" className="btn btn-primary" {...props} >{children}</button>
    </>
  )
}