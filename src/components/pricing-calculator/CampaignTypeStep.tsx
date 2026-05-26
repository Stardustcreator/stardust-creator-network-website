'use client';

import CheckIcon from '../icons/CheckIcon';
import Button from '../ui/Button';
import { usePricingCalculator } from '@/lib/contexts';
import type { CampaignType } from './types';

interface CampaignTypeStepProps {
  onContinue: () => void;
}

const options: { id: CampaignType; title: string; description: string }[] = [
  {
    id: 'creator',
    title: 'Sponsored Content (Post on Your Page)',
    description: 'You create the content and publish it on your own social media page.',
  },
  {
    id: 'ugc',
    title: 'UGC Content Only',
    description: 'You create the content for the brand, but do not post it on your own page.',
  },
  {
    id: 'brand',
    title: 'Posting Only (Brand Provides Content)',
    description: 'The brand already created the content. You only post it on your page.',
  },
];

export default function CampaignTypeStep({ onContinue }: CampaignTypeStepProps) {
  const { campaign: value, setCampaign: onChange } = usePricingCalculator();
  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">What kind of campaign is this?</h2>
        <p className="text-sm text-gray-500">Choose the campaign type.</p>
      </div>

      <div className="space-y-4 mb-6">
        {options.map(option => {
          const selected = value === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={`w-full text-left p-4 rounded-lg border-2 hover:border-comp-secondary-1 transition-all cursor-pointer ${
                selected ? 'bg-surface-action-primary' : 'bg-surface-primary border-[#F3F4F6]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-base font-medium text-text-primary mb-1">{option.title}</h3>
                  <p className="text-sm text-text-secondary">{option.description}</p>
                </div>
                <div className="ml-4 shrink-0">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all`}
                    style={selected ? { background: 'var(--gradient-primary)' } : undefined}
                  >
                    {selected && <CheckIcon className="w-4 h-4 text-white" />}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div>
        <Button
          type="button"
          onClick={onContinue}
          variant="primary"
          className="py-2.5! text-sm! rounded-md!"
        >
          Continue
        </Button>
      </div>
    </>
  );
}
