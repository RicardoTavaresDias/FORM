import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState, useEffect, useCallback } from 'react'
import { useShemaForm } from './useShemaForm'
import { api } from '../servers/api'
import { maskZipCode, maskDate } from '../utils/maskInput'
import { useAlert } from '../context/AlertContext'

export function useFormField(){
  const { dataSchema } = useShemaForm()
  const [formatDataString, setFormatDataString] = useState('')
  const{ openAlert } = useAlert()

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
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setFormatDataString(JSON.stringify(data, null, 2))
      
      reset()
      openAlert({ message: 'Usuário cadastrado com Sucesso', type: 'success' })
    } catch (error) {
      console.log(error)
      openAlert({ message: 'Erro ao cadastrar usuário', type: 'danger' })
    }
  }

  // Observando qualquer ação do field
  const field = watch('field')

  // função buscar na api CEP externo o endereço pelo digitação do campo cep e removendo o traço no meio enviando 00000000
  const fetchApiCep = useCallback(async () => {
    if(watch('street.zipCode')?.length === 9){
      try {
        const apiZipCode = await api.get(`/${watch('street.zipCode').replace('-', '')}/json`)
        setValue('street.address', apiZipCode.data.logradouro)
      } catch (error) {
        console.log(error)
        openAlert({ message: error, type:'danger' })
      }
    }
  })

  useEffect(() => {
    fetchApiCep()
  },[watch('street.zipCode')])

  // função para formatação com mascara do cep e data, exemplo data: 15/03/2025, cep: 04459-000
  useEffect(() => {
    setValue('street.zipCode', maskZipCode(watch('street.zipCode')))
    setValue('date', maskDate(watch('date')))
  },[watch('street.zipCode'), watch('date')])

  return {
    formatDataString,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    field,
    onSubmit
  }
}