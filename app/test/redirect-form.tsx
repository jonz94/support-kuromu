'use client'

import { useEffect, useRef } from 'react'

export type RedirectFormData = {
  action: string
  method: string
  inputs: Array<{ name: string; value: string; type: string }>
}

export function RedirectForm({ formData }: { formData: RedirectFormData }) {
  const submitButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setTimeout(() => {
      console.log(!!submitButtonRef.current, 'click')

      // submitButtonRef.current?.click()
    }, 100)
  }, [])

  return (
    <form className="hidden" method={formData.method} action={formData.action} acceptCharset="UTF-8">
      {formData.inputs.map((input, index) => (
        <div key={index}>
          <label>{input.name}:</label>
          <input type={input.type} name={input.name} defaultValue={input.value} />
          <br />
        </div>
      ))}

      <button ref={submitButtonRef} type="submit">
        Submit
      </button>
    </form>
  )
}
