import { z } from 'zod'

export function useShemaForm(){

  // Validação dos campos do formulario
  const dataSchema = z.object({
    
    // Pega primeira letra de cada palavra e inclui letra Maiuscula
      name: z.string().min(1).trim().transform(value => value.split(' ').map(word => word.slice(0, 1).toLocaleUpperCase() + word.slice(1, word.length)).join(' ')),
      email: z.string().email(),
      date: z.string().min(8),
      access: z.enum(['Member', 'Admin']),
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
        if(!value.street.zipCode.length){
          contexo.addIssue({
            path: ['street.zipCode'],
            message: 'String must contain at least 1 number(s)'
          })
        }else if(value.street.zipCode.length < 9){
          contexo.addIssue({
            path: ['street.zipCode'],
            message: 'Number must contain at least 9 character(s)'
          })
        }
        if(!value.street.address.length){
          contexo.addIssue({
            path: ['street.address'],
            message: 'String must contain at least 1 character(s)'
          })
        }
        if(!value.street.number.length){
          contexo.addIssue({
            path: ['street.number'],
            message: 'String must contain at least 1 character(s)'
          })
        } else if(isNaN(value.street.number)){
          contexo.addIssue({
            path: ['street.number'],
            message: 'Expected number, received string'
          })
        }
        if(!value.street.complement.length){
          contexo.addIssue({
            path: ['street.complement'],
            message: 'String must contain at least 1 character(s)'
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