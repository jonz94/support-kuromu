import { z } from 'zod'

export const formSchema = z.object({
  name: z.string().min(1),
  amount: z.preprocess((input) => parseInt(String(input ?? 0), 10), z.number().gte(50)),
  message: z.string().max(100).optional(),
  type: z.enum(['ecpay', 'opay']),
})

export type FormSchema = z.infer<typeof formSchema>
