import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { useShemaForm } from './useShemaForm'
import { api } from '../servers/api'

export function useFormField(){
  const { dataSchema } = useShemaForm()
  const [screm, setScrem] = useState('')

  const { register, handleSubmit, setValue, watch, formState: {errors, isSubmitting} } = useForm(
    { 
      criteriaMode: 'all',
      mode: 'all',
      defaultValues: {
        name: '',
        email: '',
        field: false,
        street: {
          zipCode: '',
          address: '',
          number: '',
          complement: ''
        }
      },
      resolver: zodResolver(dataSchema),
    })

  const  onSubmit = async (data) => {
    setValue('name', '')
    setValue('email', '')
    setValue('street.zipCode', '')
    setValue('street.address', '')
    setValue('street.number', '')
    setValue('street.complement', '')

    await new Promise((resolve) => setTimeout(resolve, 2000))
    setScrem(JSON.stringify(data, null, 2))
  }

  const field = watch('field')

  useEffect(() => {
    async function streetZipCode(){
      if(watch('street.zipCode')?.length === 9){
        try {
          const apiZipCode = await api.get(`/${watch('street.zipCode').replace('-', '')}`)
          setValue('street.address', apiZipCode.data.street)
        } catch (error) {
          console.log(error)
        }
      }
    }
    streetZipCode()
  },[watch('street.zipCode')])

  useEffect(() => {
    const zipCodeMask = watch('street.zipCode').replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2')
    setValue('street.zipCode', zipCodeMask)
  },[watch('street.zipCode')])

  return {
    screm,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    field,
    onSubmit
  }
}