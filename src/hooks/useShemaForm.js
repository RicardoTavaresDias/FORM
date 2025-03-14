import { z } from 'zod'

export function useShemaForm(){
  const dataSchema = z.object({
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
    }).superRefine((value, contexo) => {
      if(value.field){
        if(!value.street.zipCode.length){
          contexo.addIssue({
            path: ['street.zipCode'],
            type: "string",
            minimum: 1,
            inclusive: true,
            message: 'String must contain at least 1 number(s)'
          })
        }else if(value.street.zipCode.length < 9){
          contexo.addIssue({
            path: ['street.zipCode'],
            type: "string",
            inclusive: true,
            message: 'Number must contain at least 9 character(s)'
          })
        }
        if(!value.street.address.length){
          contexo.addIssue({
            path: ['street.address'],
            type: "string",
            minimum: 1,
            inclusive: true,
            message: 'String must contain at least 1 character(s)'
          })
        }
        if(!value.street.number.length){
          contexo.addIssue({
            path: ['street.number'],
            type: "number",
            minimum: 1,
            inclusive: true,
            message: 'String must contain at least 1 character(s)'
          })
        } else if(isNaN(value.street.number)){
          contexo.addIssue({
            path: ['street.number'],
            type: "number",
            inclusive: true,
            message: 'Expected number, received string'
          })
        }
        if(!value.street.complement.length){
          contexo.addIssue({
            path: ['street.complement'],
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
      date: value.date,
      access: value.access,
      street: value.field ? value.street : '',
    }))
    
    return { dataSchema } 
}