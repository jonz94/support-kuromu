'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { RedirectForm, type RedirectFormData } from './redirect-form'

const formSchema = z.object({
  opayName: z.string().min(1),
  opayAmount: z.preprocess((input) => parseInt(String(input ?? 0), 10), z.number().gte(50)),
  opayRemark: z.string().max(100).optional(),
  type: z.enum(['ecpay', 'opay']),
})

export function PaymentForm() {
  const [redirectFormData, setRedirectFormData] = useState<RedirectFormData | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      opayName: '',
      opayAmount: 50,
      opayRemark: '',
      type: 'ecpay',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)

    const response = await fetch('https://support-kuromu.onrender.com/CheckOut/OPayCheckOut', {
      method: 'POST',
      body: JSON.stringify({ ...values, opayAmount: String(values.opayAmount) }),
    })

    console.log(response.ok)

    const htmlString = await response.text()
    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlString, 'text/html')

    console.log(htmlString)

    const form = doc.querySelector('form')

    if (!form) {
      return
    }

    const action = form.getAttribute('action') ?? '/'
    const method = form.getAttribute('method') ?? 'POST'

    const formData: RedirectFormData = {
      action,
      method,
      inputs: [],
    }

    form.querySelectorAll('input').forEach((input) => {
      formData.inputs.push({
        name: input.getAttribute('name') ?? '',
        value: input.getAttribute('value') ?? '',
        type: input.getAttribute('type') ?? 'text',
      })
    })

    console.log({ action, method, formData })

    setRedirectFormData(formData)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[768px] max-w-full space-y-8">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>付款方式</FormLabel>
              <FormControl>
                <RadioGroup className="grid-cols-2" onValueChange={field.onChange} defaultValue={field.value}>
                  <label className="relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-input px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[[data-state=checked]]:border-ring has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70">
                    <RadioGroupItem value="ecpay" className="sr-only after:absolute after:inset-0" />
                    <picture className="grid h-20 w-auto place-content-center">
                      <img
                        src="https://www.ecpay.com.tw/Content/Themes/WebStyle20131201/images/header_logo.png"
                        alt="opay logo"
                      />
                    </picture>
                    <p className="text-xs font-medium leading-none text-foreground">綠界 ECPay</p>
                  </label>

                  <label className="relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-input px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[[data-state=checked]]:border-ring has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70">
                    <RadioGroupItem value="opay" className="sr-only after:absolute after:inset-0" />
                    <picture className="grid h-20 w-auto place-content-center">
                      <img
                        src="https://www.opay.tw/Content/Themes/WebStyle20131201/images/header_logo.png"
                        alt="opay logo"
                      />
                    </picture>
                    <p className="text-xs font-medium leading-none text-foreground">歐付寶 OPay</p>
                  </label>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="opayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>贊助者名稱</FormLabel>
              <FormControl>
                <Input placeholder="請輸入贊助者名稱" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="opayAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>贊助金額</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <div className="relative">
                    <Input className="peer ps-16" placeholder="50" type="text" inputMode="numeric" {...field} />
                    <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground peer-disabled:opacity-50">
                      新台幣
                    </span>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="opayRemark"
          render={({ field }) => (
            <FormItem>
              <FormLabel>留言</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <Textarea maxLength={100} rows={6} {...field} placeholder="請輸入留言" />
                  <p className="mt-2 text-right text-xs text-muted-foreground" role="status" aria-live="polite">
                    已輸入 <span className="tabular-nums">{field.value?.length ?? 0} / 100</span>
                  </p>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">前往付款</Button>
        </div>
      </form>

      {redirectFormData && <RedirectForm formData={redirectFormData}></RedirectForm>}
    </Form>
  )
}
