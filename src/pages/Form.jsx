import { useFormField } from '../hooks/useFormField'

  /*
   TREINO DE FORMULARIO DO BASICO AO AVANÇADO COM TODOS OS RECURSO ULTILIZADO
    [x] validação dos campos
    [x] validação input com borda vermelho
    [x] o campo name com as primeiras letras maiusculas
    [x] value vazio apos envio do form
    [] mascara do cep
    [] validação input data
    [x] validação checkbox
    [] validação do select
    [x] novos inputs ao clicar no checkbox
    [] a busca api e preencher alguns campos com endereço
    [x] separar regra de negocio
  */

export function Form() {
  const { screm, register, handleSubmit, errors, isSubmitting, campo, onSubmit } = useFormField()
  
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
              <div className="form-group" id='numbers'>
                <div>
                  <label >CEP</label >
                  <input {...register('endereco.cep')} type="text" className={errors.endereco?.cep ? "form-control border-danger" : "form-control"} placeholder="00000-000"  maxLength='9' id='cep' />

                  {errors.endereco?.cep && <p className='text-danger font-weight-normal' id='text-error'>{errors.endereco?.cep.message}</p>}
                </div>
                <div>
                  <label >Numero</label>
                  <input {...register('endereco.numero')} type="text" className={errors.endereco?.numero ? "form-control border-danger" : "form-control"} placeholder="Numero" id='number'/>

                  {errors.endereco?.numero && <p className='text-danger font-weight-normal' id='text-error'>{errors.endereco?.numero.message}</p>}
                </div>
               </div>
          

              <div className="form-group">
                <label >Rua</label>
                <input {...register('endereco.rua')} type="text" className={errors.endereco?.rua ? "form-control border-danger" : "form-control"} placeholder="Rua" />
              </div>

              {errors.endereco?.rua && <p className='text-danger font-weight-normal'>{errors.endereco?.rua.message}</p>}

              <div className="form-group">
                <label >Complemento</label>
                <input {...register('endereco.complemento')} type="text" className={errors.endereco?.complemento ? "form-control border-danger" : "form-control"} placeholder="Complemento" />
              </div>

              {errors.endereco?.complemento && <p className='text-danger font-weight-normal'>{errors.endereco.complemento?.message}</p>}
            </>
          )}

          {/* </ENDEREÇO> */}

          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? 'Loading...' : 'Enviar'}</button>
        </form>
      </main>
      <div id='screm'>{screm}</div>
    </>
    
  )
}

