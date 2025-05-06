import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Finding } from '@/lib/diagnosis';

interface QuickTriageSheetProps {
  onComplete: (findings: Finding[]) => void;
}

const RED_FLAGS = [
  {
    id: 'sudden_onset',
    name: 'Sudden Onset',
    description: 'Symptoms developed rapidly over minutes to hours'
  },
  {
    id: 'focal_deficit',
    name: 'Focal Neurological Deficit',
    description: 'Weakness, numbness, or visual changes affecting one side'
  },
  {
    id: 'headache',
    name: 'Severe Headache',
    description: 'Worst headache of life or thunderclap headache'
  },
  {
    id: 'altered_mental',
    name: 'Altered Mental Status',
    description: 'Confusion, drowsiness, or decreased consciousness'
  },
  {
    id: 'seizure',
    name: 'Seizure',
    description: 'New onset seizure or status epilepticus'
  },
  {
    id: 'fever',
    name: 'Fever with Neurological Symptoms',
    description: 'Temperature > 38°C with neurological symptoms'
  }
];

const QuickTriageSheet: React.FC<QuickTriageSheetProps> = ({ onComplete }) => {
  const [selectedFlags, setSelectedFlags] = useState<string[]>([]);

  const toggleFlag = (flagId: string) => {
    setSelectedFlags(prev =>
      prev.includes(flagId)
        ? prev.filter(id => id !== flagId)
        : [...prev, flagId]
    );
  };

  const handleComplete = () => {
    const findings: Finding[] = selectedFlags.map(flagId => {
      const flag = RED_FLAGS.find(f => f.id === flagId);
      return {
        id: `redFlag_${flagId}`,
        name: flag?.name || flagId,
        type: 'redFlag'
      };
    });
    onComplete(findings);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Quick Triage</h2>
        <p className="mt-2 text-sm text-gray-600">
          Select any red flags present
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {RED_FLAGS.map((flag) => (
          <button
            key={flag.id}
            onClick={() => toggleFlag(flag.id)}
            className={`
              p-4 rounded-lg border-2 text-left transition-colors
              ${selectedFlags.includes(flag.id)
                ? 'bg-red-100 border-red-300'
                : 'bg-white border-gray-200 hover:bg-gray-50'
              }
            `}
          >
            <div className="font-medium">{flag.name}</div>
            <div className="text-sm mt-1 text-gray-600">
              {flag.description}
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={handleComplete}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Continue
        </button>
      </div>

      {selectedFlags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-0 left-0 right-0 p-4 bg-red-50 border-t border-red-200"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span className="ml-3 font-medium text-red-800">
                {selectedFlags.length} Red Flag{selectedFlags.length > 1 ? 's' : ''} Selected
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default QuickTriageSheet; 