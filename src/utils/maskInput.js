function maskZipCode(value){
  return value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2')
}

function maskDate(value){
  return value.replace(/\D/g, '').replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3')
}

export { maskDate, maskZipCode }