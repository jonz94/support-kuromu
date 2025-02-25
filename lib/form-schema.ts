import { z } from 'zod'

export const formSchema = z.object({
  opayName: z.string().min(1),
  opayAmount: z.preprocess((input) => parseInt(String(input ?? 0), 10), z.number().gte(50)),
  opayRemark: z.string().min(1).max(100),
  type: z.enum(['ecpay', 'opay']),
})

export type FormSchema = z.infer<typeof formSchema>
