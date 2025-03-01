'use client'

import { Banner } from '@/components/banner'
import { Kuromu } from '@/components/kuromu'
import { RedirectForm } from '@/components/redirect-form'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { formSchema, type FormSchema } from '@/lib/form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import icon from '../app/icon.png'

export function PaymentForm() {
  const [redirectFormData, setRedirectFormData] = useState<FormSchema | null>(null)
  const [isPending, startTransition] = useTransition()

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      opayName: '',
      opayAmount: 50,
      opayRemark: '',
      type: 'ecpay',
    },
  })

  function onSubmit(values: FormSchema) {
    console.log(values)

    startTransition(() => {
      setRedirectFormData(values)
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex max-w-2xl flex-col gap-y-8">
        <Banner></Banner>

        <div className="flex flex-col gap-y-4">
          <h1 className="flex items-center gap-x-1 text-2xl font-bold">
            <span>
              <Image src={icon} alt="logo" height={32} />
            </span>
            <span>
              贊助
              <Link
                href="https://www.youtube.com/channel/UC2ZWggon1NOT2TGaVUMzY7A"
                target="_blank"
                rel="noopener"
                prefetch={false}
                className="underline underline-offset-8 ring-offset-background transition-colors hover:text-primary hover:decoration-primary focus-visible:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                庫洛姆
              </Link>
            </span>
          </h1>
          <p className="text-balance text-sm">
            贊助庫洛姆換配備買遊戲還有Kuro的罐罐! <span className="text-nowrap">٩(ˊᗜˋ )و</span>{' '}
            你們ㄉ支持是我最大ㄉ動力，愛貓草們ㄡ💜
          </p>
        </div>

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>付款方式</FormLabel>
              <FormControl>
                <RadioGroup
                  className="grid-cols-1 xs:grid-cols-2"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <label className="relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-input px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[[data-state=checked]]:border-2 has-[[data-state=checked]]:border-ring has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70">
                    <RadioGroupItem value="ecpay" className="sr-only after:absolute after:inset-0" />
                    <picture className="grid h-20 w-auto place-content-center">
                      <img src="/ecpay-logo-outline.png" alt="ecpay logo" />
                    </picture>
                    <p className="font-medium leading-none text-foreground">綠界 ECPay</p>
                  </label>

                  <label className="relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-input px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[[data-state=checked]]:border-2 has-[[data-state=checked]]:border-ring has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70">
                    <RadioGroupItem value="opay" className="sr-only after:absolute after:inset-0" />
                    <picture className="grid h-20 w-auto place-content-center">
                      <img src="/opay-logo-outline.png" alt="opay logo" />
                    </picture>
                    <p className="font-medium leading-none text-foreground">歐付寶 OPay</p>
                  </label>
                </RadioGroup>
              </FormControl>
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
                <div className="relative">
                  <Input className="peer ps-16" type="number" inputMode="numeric" {...field} />
                  <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground peer-disabled:opacity-50">
                    新台幣
                  </span>
                </div>
              </FormControl>
              <FormDescription>贊助金額最低為 50 元。</FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="opayRemark"
          render={({ field }) => (
            // NOTE: `z-10` to avoid overflowed image cover the textarea
            <FormItem className="z-10">
              <FormLabel>留言</FormLabel>
              <FormControl>
                <div>
                  <Textarea maxLength={100} rows={6} {...field} placeholder="請輸入留言" />
                  <p className="mt-2 text-right text-xs text-muted-foreground" role="status" aria-live="polite">
                    已輸入 <span className="tabular-nums">{field.value?.length ?? 0} / 100</span>
                  </p>
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex max-h-20 justify-between">
          <Kuromu></Kuromu>

          <Button type="submit" disabled={isPending}>
            前往付款
          </Button>
        </div>
      </form>

      {redirectFormData && <RedirectForm formData={redirectFormData}></RedirectForm>}
    </Form>
  )
}
