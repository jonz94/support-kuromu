import { z } from 'zod'

export const formSchema = z.object({
  // TODO: temporarily ignore validation until the new payment method is fixed
  opayName: z.string(),
  // opayName: z.string().min(1),

  // TODO: temporarily ignore validation until the new payment method is fixed
  opayAmount: z.coerce.number(),
  // opayAmount: z.coerce.number().min(50),

  opayRemark: z.string().max(100).optional(),
  type: z.enum(['ecpay', 'opay']),
})

export type FormSchema = z.infer<typeof formSchema>
