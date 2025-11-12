'use client';

import { GSAPScrollReveal } from '@/components/animations/GSAPScrollReveal';

interface TrackingTimelineProps {
  status: string;
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
}

const statusSteps = [
  { key: 'PENDING', label: 'Order Placed', icon: '📦' },
  { key: 'PROCESSING', label: 'Processing', icon: '⚙️' },
  { key: 'SHIPPED', label: 'Shipped', icon: '🚚' },
  { key: 'DELIVERED', label: 'Delivered', icon: '✅' },
];

export function TrackingTimeline({
  status,
  trackingNumber,
  carrier,
  estimatedDelivery,
}: TrackingTimelineProps) {
  const currentStepIndex = statusSteps.findIndex((step) => step.key === status);

  return (
    <GSAPScrollReveal direction="up">
      <div className="glass p-8 rounded-2xl">
        <h2 className="text-2xl font-bold mb-6">Order Tracking</h2>

        {trackingNumber && (
          <div className="mb-6 p-4 bg-accent-primary/10 rounded-lg">
            <p className="text-sm text-text-secondary mb-1">Tracking Number</p>
            <p className="font-semibold text-lg">{trackingNumber}</p>
            {carrier && (
              <p className="text-sm text-text-secondary mt-1">Carrier: {carrier}</p>
            )}
          </div>
        )}

        <div className="space-y-4">
          {statusSteps.map((step, index) => {
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;

            return (
              <div key={step.key} className="flex items-start gap-4">
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all ${
                    isCompleted
                      ? 'bg-accent-primary text-white'
                      : 'bg-secondary text-text-secondary'
                  }`}
                >
                  {step.icon}
                </div>
                <div className="flex-1">
                  <div
                    className={`font-semibold mb-1 ${
                      isCurrent ? 'text-accent-primary' : 'text-foreground'
                    }`}
                  >
                    {step.label}
                  </div>
                  {isCurrent && (
                    <div className="text-sm text-text-secondary">
                      {status === 'SHIPPED' && estimatedDelivery
                        ? `Estimated delivery: ${new Date(estimatedDelivery).toLocaleDateString()}`
                        : 'In progress'}
                    </div>
                  )}
                </div>
                {index < statusSteps.length - 1 && (
                  <div
                    className={`absolute left-6 w-0.5 h-12 ${
                      isCompleted ? 'bg-accent-primary' : 'bg-secondary'
                    }`}
                    style={{ marginTop: '3rem' }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </GSAPScrollReveal>
  );
}

