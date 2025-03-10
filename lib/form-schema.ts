import { z } from 'zod'

export const formSchema = z.object({
  name: z.string().min(1),
  amount: z.coerce.number().min(50),
  message: z.string().max(100).optional(),
  type: z.enum(['ecpay', 'opay']),
})

export type FormSchema = z.infer<typeof formSchema>
