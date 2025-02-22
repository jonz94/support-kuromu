import { z } from 'zod'

export const formSchema = z.object({
  opayName: z.string().min(1),
  opayAmount: z.number().gte(50),
  opayRemark: z.string().max(100).optional(),
  type: z.enum(['ecpay', 'opay']),
})

export type FormSchema = z.infer<typeof formSchema>
