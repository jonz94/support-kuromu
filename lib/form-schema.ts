import { z } from 'zod'

export const formSchema = z.object({
  // TODO: temporarily ignore validation until the new payment method is fixed
  opayName: z.string(),
  // opayName: z.string().min(1),

  opayAmount: z.preprocess((input) => parseInt(String(input ?? 0), 10), z.number().gte(50)),
  opayRemark: z.string().max(100).optional(),
  type: z.enum(['ecpay', 'opay']),
})

export type FormSchema = z.infer<typeof formSchema>
