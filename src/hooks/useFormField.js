import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useShemaForm } from './useShemaForm'

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
        campo: false,
        endereco: {
          cep: '',
          rua: '',
          numero: '',
          complemento: ''
        }
      },
      resolver: zodResolver(dataSchema),
    })

  const  onSubmit = async (data) => {
    setValue('name')
    setValue('email')
    setValue('endereco.cep')
    setValue('endereco.rua')
    setValue('endereco.numero')
    setValue('endereco.complemento')

    await new Promise((resolve) => setTimeout(resolve, 2000))
    setScrem(JSON.stringify(data, null, 2))
  }

  const campo = watch('campo')

  return {
    screm,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    campo,
    onSubmit
  }
}