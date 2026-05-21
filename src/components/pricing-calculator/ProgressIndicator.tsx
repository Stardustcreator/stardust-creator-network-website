'use client';

import CheckIcon from '../icons/CheckIcon';

const steps = [
  { number: 1, label: 'Campaign type' },
  { number: 2, label: 'Your reach' },
  { number: 3, label: 'Deliverables' },
  { number: 4, label: 'Rights & quote' },
];

interface ProgressIndicatorProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

export default function ProgressIndicator({ currentStep, onStepClick }: ProgressIndicatorProps) {
  return (
    <div className="flex items-center justify-center mb-12 relative">
      <div className="w-full h-px bg-surface-secondary mt-3.5 shrink-0 absolute z-5 top-0.5" />

      {steps.map((step, index) => {
        const isActive = step.number === currentStep;
        const isComplete = step.number < currentStep;
        return (
          <div
            key={step.number}
            className="flex items-center w-full justify-around z-10"
          >
            <button
              type="button"
              onClick={() => onStepClick(step.number)}
              className="flex flex-col items-center cursor-pointer bg-transparent border-0 p-0"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  isActive || isComplete
                    ? 'bg-surface-primary text-comp-secondary-1 border-2 border-comp-secondary-1'
                    : 'bg-white text-gray-400 border-2 border-gray-300'
                }`}
                style={isComplete ? { background: 'var(--gradient-primary)' } : undefined}
              >
                {isComplete ? <CheckIcon className="w-4 h-4 text-white" /> : step.number}
              </div>
              <p
                className={`text-xs mt-2 transition-colors whitespace-nowrap ${
                  isActive ? 'text-text-action font-medium' : 'text-gray-500'
                }`}
              >
                {step.label}
              </p>
            </button>
            {/* {index < steps.length - 1 && (
              <div
                className={`w-16 h-0.5 mx-2 mb-6 transition-colors ${
                  step.number < currentStep ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              />
            )} */}
          </div>
        );
      })}
    </div>
  );
}
