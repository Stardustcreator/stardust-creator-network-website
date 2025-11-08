
interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
}

const STEP_LABELS = [
  'Personal Info',
  'Creator Identity',
  'Brand Experience',
  'Tools Interest',
  'Verification',
];

export default function FormProgress({ currentStep, totalSteps }: FormProgressProps) {
  const progressPercentage = Math.round(((currentStep + 1) / totalSteps) * 100);

  return (
    <div className="mt-16 mb-8">
      {/* Progress bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-white/70 text-sm">
          Step {currentStep + 1} of {totalSteps}
        </div>
        <div className="text-white/70 text-sm">{progressPercentage}% Complete</div>
      </div>

      {/* Visual progress bar */}
      <div className="w-full bg-white/10 rounded-full h-2 mb-6">
        <div
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Step indicators */}
      <div className="flex justify-between items-center">
        {STEP_LABELS.map((label, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div
              key={label}
              className="flex flex-col items-center"
            >
              {/* Step circle */}
              <div
                className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-2 transition-all duration-300
                ${
                  isCompleted
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : isCurrent
                      ? 'bg-white/20 text-white border-2 border-purple-400'
                      : 'bg-white/10 text-white/50'
                }
              `}
              >
                {isCompleted ? (
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>

              {/* Step label */}
              <div
                className={`
                text-xs text-center max-w-16 leading-tight
                ${isCompleted || isCurrent ? 'text-white' : 'text-white/50'}
              `}
              >
                {label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
