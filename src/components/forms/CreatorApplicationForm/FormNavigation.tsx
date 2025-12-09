interface FormNavigationProps {
  canGoBack: boolean;
  canGoNext: boolean;
  onBack: () => void;
  onNext: () => void;
  isLoading?: boolean;
}

export default function FormNavigation({
  canGoBack,
  canGoNext,
  onBack,
  onNext,
  isLoading = false,
}: FormNavigationProps) {
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="flex justify-between items-center">
        {/* Back button */}
        <button
          type="button"
          onClick={onBack}
          disabled={!canGoBack || isLoading}
          className={`
            px-6 py-3 rounded-full font-medium transition-all duration-200
            ${
              canGoBack && !isLoading
                ? 'text-white bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 focus-visible:outline-2 focus-visible:outline-purple-400 focus-visible:outline-offset-2'
                : 'text-white/30 bg-white/5 border border-white/10 cursor-not-allowed'
            }
          `}
        >
          ← Back
        </button>

        {/* Next button */}
        <button
          type="button"
          onClick={onNext}
          disabled={!canGoNext || isLoading}
          className={`
            px-8 py-3 rounded-full font-medium transition-all duration-200 flex items-center gap-2
            ${
              canGoNext && !isLoading
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 focus-visible:outline-2 focus-visible:outline-purple-400 focus-visible:outline-offset-2 focus-visible:ring-2 focus-visible:ring-purple-400/50'
                : 'bg-white/10 text-white/50 cursor-not-allowed'
            }
          `}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>Continue →</>
          )}
        </button>
      </div>
    </div>
  );
}
