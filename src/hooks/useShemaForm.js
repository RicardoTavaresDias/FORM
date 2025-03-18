import { z } from 'zod'

export function useShemaForm(){

  // Validação dos campos do formulario
  const dataSchema = z.object({
    
    // Pega primeira letra de cada palavra e inclui letra Maiuscula
      name: z.string().min(1, { message: 'Campo Obrigatório'}).trim().transform(value => value.split(' ').map(word => word.slice(0, 1).toLocaleUpperCase() + word.slice(1, word.length)).join(' ')),
      email: z.string().email({message: 'E-mail inválido'}),

      // Refinando data manualmente
      date: z.string().min(8, {message: 'Data mínimo 8 números'}).refine((value) => {
        if((value.slice(0,2) > 31) || 
          (value.slice(3,5) > 12) || 
          (value.slice(6,10) > new Date().getFullYear()) || 
          (value.slice(6,10) < (new Date().getFullYear() - 100))
        ){
          return false
        } 

        if(value.slice(3,5) === '02')
          if(value.slice(0,2) > 29) return false
        
        return true
      }, 'Data inválido'),
      
      access: z.enum(['Member', 'Admin'], {message: 'Campo obrigatório, selecionar 1 opção'}),
      field: z.boolean(),
      street: z.object({
        zipCode: z.string().optional(),
        address: z.string().optional(),
        number: z.string().optional(),
        complement: z.string().optional()
      })

      // Validação dos campos não obrigatorios, só valida quando o fomulario endereço é aberto, aqui a validação é individual
      // value.field - verifica se o campo field esta true (aberto)
      // value.street.zipCode.length - verifica se o campo esta preenchido
      // isNaN(value.street.number) - verifica se o campo é nuúmero

    }).superRefine((value, contexo) => {
      if(value.field){
        if(!value.street.zipCode){
          contexo.addIssue({
            path: ['street.zipCode'],
            message: 'Campo Obrigatório'
          })
        }else if(value.street.zipCode.length < 9){
          contexo.addIssue({
            path: ['street.zipCode'],
            message: 'Campo mínimo de 9 digitos'
          })
        }
        if(!value.street.address){
          contexo.addIssue({
            path: ['street.address'],
            message: 'Campo Obrigatório'
          })
        }
        if(!value.street.number){
          contexo.addIssue({
            path: ['street.number'],
            message: 'Campo Obrigatório'
          })
        } else if(isNaN(value.street.number)){
          contexo.addIssue({
            path: ['street.number'],
            message: 'Campo somente número'
          })
        }
        if(!value.street.complement){
          contexo.addIssue({
            path: ['street.complement'],
            message: 'Campo Obrigatório'
          })
        } 
      }   

      // Tratamento quais campos será enviado e validado, stree so vai ser validado e enviado se existir
    }).transform(value => ({
      name: value.name,
      email: value.email,
      date: value.date,
      access: value.access,
      street: value.field ? value.street : '',
    }))
    
    return { dataSchema } 
}