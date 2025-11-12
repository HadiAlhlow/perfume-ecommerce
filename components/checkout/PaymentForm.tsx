'use client';

import { GSAPScrollReveal } from '@/components/animations/GSAPScrollReveal';

interface PaymentFormProps {
  onPayment: (method: string) => void;
  onBack: () => void;
}

export function PaymentForm({ onPayment, onBack }: PaymentFormProps) {
  return (
    <GSAPScrollReveal direction="up">
      <div className="glass p-8 rounded-2xl space-y-6">
        <h2 className="text-2xl font-bold mb-6">Payment Method</h2>

        <div className="space-y-4">
          <button
            onClick={() => onPayment('stripe')}
            className="w-full p-6 border-2 border-border-color rounded-lg hover:border-accent-primary transition-colors text-left flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent-primary/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-accent-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.16 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.19-.72-2.23-1.64H8.04c.06 1.37 1.12 2.56 2.86 2.93V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
                </svg>
              </div>
              <div>
                <div className="font-semibold">Credit/Debit Card</div>
                <div className="text-sm text-text-secondary">Pay with Stripe</div>
              </div>
            </div>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            onClick={() => onPayment('paypal')}
            className="w-full p-6 border-2 border-border-color rounded-lg hover:border-accent-primary transition-colors text-left flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent-primary/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-accent-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.05zm14.146-14.42a.805.805 0 0 0-.796.96l.888 5.58a.81.81 0 0 1-.787.96H17.14a.695.695 0 0 1-.69.74h-1.38c-.524 0-.968.382-1.05.9l-1.12 7.05a.64.64 0 0 1-.633.74H7.76a.641.641 0 0 1-.633-.74l1.12-7.05a.64.64 0 0 1 .633-.74h1.38c.524 0 .968-.382 1.05-.9l.888-5.58a.81.81 0 0 1 .787-.96h5.48c.524 0 .968-.382 1.05-.9l.888-5.58a.81.81 0 0 1 .787-.96h5.48z"/>
                </svg>
              </div>
              <div>
                <div className="font-semibold">PayPal</div>
                <div className="text-sm text-text-secondary">Pay with your PayPal account</div>
              </div>
            </div>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <button
          onClick={onBack}
          className="w-full py-3 border border-border-color rounded-full hover:bg-white/10 transition-colors"
        >
          Back
        </button>
      </div>
    </GSAPScrollReveal>
  );
}

