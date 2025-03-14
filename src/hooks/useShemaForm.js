import { z } from 'zod'

export function useShemaForm(){
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
    
    return { dataSchema } 
}