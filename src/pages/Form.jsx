import { useFormField } from '../hooks/useFormField'

import { Input } from '../components/Input'
import { CheckBox } from '../components/CheckBox'
import { Button } from '../components/Button'

  /*
   TREINO DE FORMULARIO DO BASICO AO AVANÇADO COM TODOS OS RECURSO ULTILIZADO
    [x] validação dos fields
    [x] validação input com borda vermelho
    [x] o field name com as primeiras letras maiusculas
    [x] value vazio apos envio do form
    [x] mascara do cep
    [] validação input data
    [x] validação checkbox
    [] validação do select
    [x] novos inputs ao clicar no checkbox
    [x] a busca api e preencher alguns fields com endereço
    [x] separar regra de negocio
    [] Documentar para posibilitar consultas
    [x] Criar components
  */

export function Form() {
  const { screm, register, handleSubmit, errors, isSubmitting, field, onSubmit } = useFormField()
  
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Cadastro</h3>
        <Input {...register('name')} type='text' errors={errors.name} placeholder='Nome' label='Nome' />
        <Input {...register('email')} type='text' errors={errors.email} placeholder='email@email.com' label='Email' />

        {/* <Street> */}
        <CheckBox {...register('field')}  label='Campos Adicionais' />

        {field && (
          <>
            <div className="form-group" id='numbers'>
              <div>
                <Input {...register('street.zipCode')} type='text' errors={errors.street?.zipCode} placeholder='00000-000' label='CEP' maxLength='9' id='cep'/>
              </div>
              <div>
                  <Input {...register('street.number')} type='text' errors={errors.street?.number} placeholder='Número' label='Número' id='number'/>
              </div>
            </div>
          
            <Input {...register('street.address')} type='text' errors={errors.street?.address} placeholder='Endereço' label='Endereço' />
            <Input {...register('street.complement')} type='text' errors={errors.street?.complement} placeholder='Complemento' label='Complemento' />
          </>
        )}

        {/* </Street> */}

        <Button disabled={isSubmitting} >{isSubmitting ? 'Loading...' : 'Enviar'}</Button>
      </form>
      <div id='screm'>{screm}</div>
    </>
  )
}