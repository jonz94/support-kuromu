'use client'

import { env } from '@/env'
import { useEffect, useRef } from 'react'

export function RedirectForm({ formData }: { formData: Record<string, string | number> }) {
  console.log({ formData })

  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    setTimeout(() => {
      console.log(!!formRef.current, 'click')

      formRef.current?.submit()
    }, 100)
  }, [])

  return (
    <form
      ref={formRef}
      className="hidden"
      action={env.NEXT_PUBLIC_PAYMENT_TOOLS_WEB_ACTION}
      method={env.NEXT_PUBLIC_PAYMENT_TOOLS_WEB_METHOD}
      acceptCharset="UTF-8"
    >
      {Object.entries(formData).map(([name, value], index) => (
        <div key={index}>
          <label>{name}:</label>
          <input type="hidden" name={name} defaultValue={value} />
        </div>
      ))}
    </form>
  )
}
