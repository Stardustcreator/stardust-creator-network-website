/**
 * Draft Resume Modal
 * Shows when a user has a saved draft and offers to resume
 */

'use client';

import { Text } from '@/components/typography/Text';
import { Heading } from '@/components/typography/Heading';

interface DraftResumeModalProps {
  isOpen: boolean;
  lastUpdated: string;
  onResume: () => void;
  onStartFresh: () => void;
}

export default function DraftResumeModal({
  isOpen,
  lastUpdated,
  onResume,
  onStartFresh,
}: DraftResumeModalProps) {
  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'less than an hour ago';
    } else if (diffInHours < 24) {
      const hours = Math.floor(diffInHours);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInHours / 24);
      if (days < 7) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
      } else {
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl border border-white/10 overflow-hidden animate-scale-in">
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 pointer-events-none" />

        {/* Content */}
        <div className="relative p-8">
          {/* Icon */}
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>

          {/* Title */}
          <Heading
            level={2}
            className="text-white text-2xl text-center mb-3"
          >
            Welcome Back!
          </Heading>

          {/* Description */}
          <Text
            variant="body"
            className="text-white/80 text-center mb-2"
          >
            We found a saved application from
          </Text>
          <Text
            variant="body"
            className="text-purple-300 text-center font-semibold mb-6"
          >
            {formatDate(lastUpdated)}
          </Text>

          <Text
            variant="caption"
            className="text-white/60 text-center block mb-8"
          >
            Would you like to continue where you left off?
          </Text>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={onResume}
              className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Continue Application
            </button>

            <button
              onClick={onStartFresh}
              className="w-full px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-medium transition-all duration-200 border border-white/10 hover:border-white/20"
            >
              Start Fresh
            </button>
          </div>

          {/* Info Note */}
          <div className="mt-6 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <div className="flex items-start gap-2">
              <svg
                className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <Text
                variant="caption"
                className="text-blue-300/80 leading-relaxed"
              >
                Starting fresh will create a new application and keep your old draft for reference.
              </Text>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
