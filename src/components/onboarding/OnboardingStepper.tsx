import CheckIcon from '@/components/icons/CheckIcon';

interface OnboardingStepperProps {
  currentStep: 1 | 2 | 3;
}

const STEPS = [
  { number: 1, label: 'Select Plan' },
  { number: 2, label: 'Create Account' },
  { number: 3, label: 'Make payment' },
] as const;

export default function OnboardingStepper({ currentStep }: OnboardingStepperProps) {
  return (
    <nav
      aria-label="Onboarding progress"
      className="flex items-start w-full md:w-auto relative gap-8"
    >
      <div className="w-full h-px bg-neutral-200 mt-3.5 shrink-0 absolute z-5" />
      {STEPS.map((step, idx) => {
        const isCompleted = step.number < currentStep;
        const isActive = step.number === currentStep;

        return (
          <div
            key={step.number}
            className="flex items-start w-full justify-between md:justify-normal z-10"
          >
            <div className="flex flex-col items-center justify-center w-full gap-1.5">
              {/* Step circle */}
              <div
                className={`w-7 h-7 bg-white rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                  isCompleted
                    ? 'text-white'
                    : isActive
                      ? 'border-2 text-brand-purple border-brand-purple'
                      : 'border-2 border-neutral-300 text-neutral-400'
                }`}
                style={isCompleted ? { background: 'var(--gradient-primary)' } : undefined}
                aria-current={isActive ? 'step' : undefined}
              >
                {isCompleted ? <CheckIcon className="w-3.5 h-3.5" /> : step.number}
              </div>

              {/* Step label */}
              <span
                className={`text-xs font-medium whitespace-nowrap ${
                  isActive
                    ? 'text-neutral-900'
                    : isCompleted
                      ? 'text-neutral-500'
                      : 'text-neutral-400'
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector */}
            {/* {idx < STEPS.length - 1 && (
              <div className="w-8 h-px bg-neutral-200 mt-3.5 mx-1.5 shrink-0" />
            )} */}
          </div>
        );
      })}
    </nav>
  );
}
