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

  useEffect(() => {
    async function streetCep(){
      if(watch('endereco.cep')?.length === 8 && !isNaN(watch('endereco.cep'))){
        console.log('entrou')
        try {
          const apiCep = await api.get(`/${watch('endereco.cep')}`)
          setValue('endereco.rua', apiCep.data.street)
        } catch (error) {
          console.log(error)
        }
      }
    }
    streetCep()
  },[watch('endereco.cep')])

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