export function CheckBox({ label, ...props }){
  return (
    <div className="form-check mb-3">
      <input {...props} className="form-check-input" type="checkbox"  id="defaultCheck1" />
      <label className="form-check-label">
        {label}
      </label>
    </div>
  )
}