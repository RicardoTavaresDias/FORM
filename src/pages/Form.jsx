import { string, z, ZodError, ZodIssueCode } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

  /*
   TREINO DE FORMULARIO DO BASICO AO AVANÇADO COM TODOS OS RECURSO ULTILIZADO
    [x] realizar validação dos campos
    [x] realizar validação input com borda vermelho
    [x] realizar o campo nome com as primeiras letras maiuscula
    [x] realizar value vazio apos envio do form
    [] realizar mascara do cep
    [] realizar validação input data
    [x] realizar validação checkbox
    [] realizar validação do select
    [x] realizar novos inputs ao clicar no checkbox
    [] realizar a busca api e preencher alguns campos com endereço
    [] separar regra de negocio
  */

export function Form() {
  const [screm, setScrem] = useState('')

  const dataSchema = z.object({
    name: z.string().min(1).trim().transform(value => value.split(' ').map(word => word.slice(0, 1).toLocaleUpperCase() + word.slice(1, word.length)).join(' ')),
    email: z.string().email(),
    campo: z.boolean(),
    endereco: z.object({
      cep: z.string().optional(),
      rua: z.string().optional(),
      numero: z.string().optional(),
      complemento: z.string().optional()
    })
  }).superRefine((value, contexo) => {
    if(value.campo){
      if(!value.endereco.cep.length){
        contexo.addIssue({
          path: ['endereco.cep'],
          type: "string",
          minimum: 1,
          inclusive: true,
          message: 'String must contain at least 1 character(s)'
        })
      }else if(isNaN(value.endereco.cep)){
        contexo.addIssue({
          path: ['endereco.cep'],
          type: "number",
          inclusive: true,
          message: 'Expected number, received string'
        })
      }
      if(!value.endereco.rua.length){
        contexo.addIssue({
          path: ['endereco.rua'],
          type: "string",
          minimum: 1,
          inclusive: true,
          message: 'String must contain at least 1 character(s)'
        })
      }
      if(!value.endereco.numero.length){
        contexo.addIssue({
          path: ['endereco.numero'],
          type: "number",
          minimum: 1,
          inclusive: true,
          message: 'String must contain at least 1 character(s)'
        })
      } else if(isNaN(value.endereco.numero)){
        contexo.addIssue({
          path: ['endereco.numero'],
          type: "number",
          inclusive: true,
          message: 'Expected number, received string'
        })
      }
      if(!value.endereco.complemento.length){
        contexo.addIssue({
          path: ['endereco.complemento'],
          type: "string",
          minimum: 1,
          inclusive: true,
          message: 'String must contain at least 1 character(s)'
        })
      } 
    }   
  }).transform(value => ({
    name: value.name,
    email: value.email,
    endereco: value.campo ? value.endereco : '',
  }))


  const { register, handleSubmit, setValue, watch, formState: {errors} } = useForm(
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

  const onSubmit = (data) => {
    setValue('name')
    setValue('email')
    setValue('endereco.cep')
    setValue('endereco.rua')
    setValue('endereco.numero')
    setValue('endereco.complemento')
    setScrem(JSON.stringify(data, null, 2))
  }

  const campo = watch('campo')

  return (
    <>
      <main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Cadastro</h3>

          <div className="form-group">
            <label >Nome</label>
            <input {...register('name')} type="text" className={errors.name ? "form-control border-danger" : "form-control"} placeholder="Nome" />
          </div>

          {errors.name && <p className='text-danger font-weight-normal'>{errors.name.message}</p>}
          
          <div className="form-group">
            <label >Email</label >
            <input {...register('email')} type="text" className={errors.email ? "form-control border-danger" : "form-control"} placeholder="email@email.com" />
          </div>

          {errors.email && <p className='text-danger font-weight-normal'>{errors.email.message}</p>}

          {/* <ENDEREÇO> */}

          <div className="form-check mb-3">
            <input {...register('campo')} className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
            <label className="form-check-label">
               Campos Adicionais
            </label>
          </div>

          {campo && (
            <>
              <div className="form-group">
                <label >CEP</label >
                <input {...register('endereco.cep')} type="text" className={errors.endereco?.cep ? "form-control border-danger" : "form-control"} placeholder="00000-000"  maxLength='9' />
               </div>
          
              {errors.endereco?.cep && <p className='text-danger font-weight-normal'>{errors.endereco?.cep.message}</p>}

              <div className="form-group">
                <label >Rua</label>
                <input {...register('endereco.rua')} type="text" className={errors.endereco?.rua ? "form-control border-danger" : "form-control"} placeholder="Rua" />
              </div>

              {errors.endereco?.rua && <p className='text-danger font-weight-normal'>{errors.endereco?.rua.message}</p>}

              <div className="form-group">
                <label >Numero</label>
                <input {...register('endereco.numero')} type="text" className={errors.endereco?.numero ? "form-control border-danger" : "form-control"} placeholder="Numero" />
              </div>

              {errors.endereco?.numero && <p className='text-danger font-weight-normal'>{errors.endereco?.numero.message}</p>}

              <div className="form-group">
                <label >Complemento</label>
                <input {...register('endereco.complemento')} type="text" className={errors.endereco?.complemento ? "form-control border-danger" : "form-control"} placeholder="Complemento" />
              </div>

              {errors.endereco?.complemento && <p className='text-danger font-weight-normal'>{errors.endereco.complemento?.message}</p>}
            </>
          )}

          {/* </ENDEREÇO> */}

          <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
      </main>
      <div id='screm'>{screm}</div>
    </>
    
  )
}

