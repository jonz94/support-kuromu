import { ModeToggle } from '@/components/mode-toggle'
import { PaymentForm } from './payment-form'

export default function TestPage() {
  return (
    <div className="grid min-h-screen place-items-center p-4">
      <main className="flex size-full flex-col items-center justify-center gap-y-4">
        <div className="container flex justify-center">
          <PaymentForm></PaymentForm>
        </div>

        <div className="absolute right-4 top-4">
          <ModeToggle></ModeToggle>
        </div>
      </main>
    </div>
  )
}
