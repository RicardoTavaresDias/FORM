import './Form-module.css'
import { useFormField } from '../hooks/useFormField'

import { Input } from '../components/Input'
import { CheckBox } from '../components/CheckBox'
import { Button } from '../components/Button'
import { BoxInputs } from '../components/BoxInputs'
import { Select } from '../components/Select'

export function Form() {
  const { formatDataString, register, handleSubmit, errors, isSubmitting, field, onSubmit } = useFormField()
  
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} >
        <h3>Cadastro</h3>
        <Input {...register('name')} type='text' errors={errors.name} placeholder='Nome' >Nome</Input>
        <Input {...register('email')} type='text' errors={errors.email} placeholder='email@email.com' >E-mail</Input>

        <BoxInputs>
          <Input {...register('date')} type='text' placeholder='__/__/____' id='box' errors={errors.date} maxLength='8' >Data Nascimento</Input>
          <Select {...register('access')} type='text' label="Acesso" id='box' errors={errors.access}>
            <option disabled>Selecione...</option>
            <option>Member</option>
            <option>Admin</option>
          </Select>
        </BoxInputs>

        {/* <Street> */}
        <CheckBox {...register('field')}  label='Campos Adicionais' />

        {field && (
          <>
            <BoxInputs>
              <Input {...register('street.zipCode')} type='text' errors={errors.street?.zipCode} placeholder='00000-000' maxLength='9' id='box' >CEP</Input>
              <Input {...register('street.number')} type='text' errors={errors.street?.number} placeholder='Número' id='box' >Número</Input>
            </BoxInputs>
          
            <Input {...register('street.address')} type='text' errors={errors.street?.address} placeholder='Endereço' >Endereço</Input>
            <Input {...register('street.complement')} type='text' errors={errors.street?.complement} placeholder='Complemento' >Complemento</Input>
          </>
        )}

        {/* </Street> */}

        <Button disabled={isSubmitting} >{isSubmitting ? 'Loading...' : 'Enviar'}</Button>
      </form>
      <div className='screm'>{formatDataString}</div>
    </>
  )
}