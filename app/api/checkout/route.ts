import { env } from '@/env'
import { generateCheckMacValue, generateMerchantTrade } from '@/lib/payment'
import { z } from 'zod'

const requestSchema = z.object({
  name: z.string().min(1),
  amount: z.number().int().min(50),
  message: z.string().optional(),
})

export async function POST(request: Request) {
  const body = await request.text()

  if (!body) {
    return new Response(JSON.stringify({}), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const result = requestSchema.safeParse(JSON.parse(body))

  if (!result.success) {
    return new Response(
      JSON.stringify({
        errors: result.error.errors,
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }

  const input = result.data

  const { merchantTradeNo, merchantTradeDate } = generateMerchantTrade()

  const response = {
    MerchantID: env.ECPAY_ID,
    MerchantTradeNo: merchantTradeNo,
    MerchantTradeDate: merchantTradeDate,
    PaymentType: 'aio',
    TotalAmount: input.amount,
    TradeDesc: input.message ?? env.ECPAY_DESCRIPTION,
    ItemName: env.ECPAY_DESCRIPTION,
    ReturnURL: 'https://ecpay-log.vercel.app/api/callback',
    ClientBackURL: 'http://localhost:3000',
    OrderResultURL: 'https://ecpay-log.vercel.app/api/callback',
    ChoosePayment: 'ALL',
    EncryptType: '1',
    ...(input.message ? { Remark: input.message } : {}),
  }

  return new Response(
    JSON.stringify({
      ...response,
      CheckMacValue: generateCheckMacValue({ input: response, hashKey: env.ECPAY_HASH_KEY, hashIV: env.ECPAY_HASH_IV }),
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    },
  )
}
