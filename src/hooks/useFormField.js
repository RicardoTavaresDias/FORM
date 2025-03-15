import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { useShemaForm } from './useShemaForm'
import { api } from '../servers/api'

export function useFormField(){
  const { dataSchema } = useShemaForm()
  const [screm, setScrem] = useState('')

  const { register, handleSubmit, setValue, reset, watch, formState: {errors, isSubmitting} } = useForm(
    { 
      // configuração de inicialização dos campos, criteriaMode e mode ficara assistindo toda ação do formulario
      criteriaMode: 'all',
      mode: 'all',
      defaultValues: {
        name: '',
        email: '',
        date: '',
        access: 'Selecione...',
        field: false,
        street: {
          zipCode: '',
          address: '',
          number: '',
          complement: ''
        }
      },
      // realizará validação dos campos com Shema zod
      resolver: zodResolver(dataSchema),
    })

    // função de envio do formulario e atualizar os campos para vazio para novo preenchimento dos campos
  const  onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setScrem(JSON.stringify(data, null, 2))

    reset()
  }

  // Observando qualquer ação do field
  const field = watch('field')

  // função buscar na api CEP externo o endereço pelo digitação do campo cep e removendo o traço no meio enviando 00000000
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

  // função para formatação com mascara do cep e data, exemplo data: 15/03/2025, cep: 04459-000
  useEffect(() => {
    const zipCodeMask = watch('street.zipCode').replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2')
    setValue('street.zipCode', zipCodeMask)

    const dateMask = watch('date').replace(/\D/g, '').replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3')
    setValue('date', dateMask)

  },[watch('street.zipCode'), watch('date')])

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