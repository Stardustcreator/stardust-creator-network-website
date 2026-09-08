'use client';

import { motion } from 'framer-motion';
import { Text } from '@/components/typography';

export default function PromoBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        boxShadow: [
          '0 0 0 0 rgba(87, 5, 139, 0.5)',
          '0 0 0 12px rgba(87, 5, 139, 0)',
          '0 0 0 0 rgba(87, 5, 139, 0.5)',
        ],
      }}
      transition={{
        opacity: { duration: 0.4, ease: 'easeOut' },
        y: { duration: 0.4, ease: 'easeOut' },
        boxShadow: { duration: 1.1, ease: 'easeInOut', repeat: Infinity, delay: 0.4 },
      }}
      className="max-w-2xl mx-auto mb-8 rounded-lg border border-comp-primary-100 bg-surface-action-primary px-4 py-3 text-center"
    >
      <Text
        variant="small"
        className="text-text-primary!"
      >
        Sign up for the <span className="font-semibold">Builder</span> plan and get your first month
        free — use code <span className="font-semibold text-brand-purple">BETA26</span> at checkout.
      </Text>
    </motion.div>
  );
}
