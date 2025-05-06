import React from 'react';
import { motion } from 'framer-motion';

interface ExamShellProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  probability: number;
  onBack?: () => void;
  onNext?: () => void;
}

const ExamShell: React.FC<ExamShellProps> = ({
  children,
  currentStep,
  totalSteps,
  probability,
  onBack,
  onNext
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Status Bar */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            {onBack && (
              <button
                onClick={onBack}
                className="mr-4 p-2 rounded-full hover:bg-gray-100"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}
            <span className="font-semibold text-gray-900">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          
          {/* Probability Indicator */}
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Confidence: {Math.round(probability * 100)}%
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-1">
        <motion.div
          className="bg-blue-600 h-1"
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>

      {/* Bottom Navigation */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20">
          <div className="flex justify-between items-center h-full">
            {onBack && (
              <button
                onClick={onBack}
                className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Back
              </button>
            )}
            {onNext && (
              <button
                onClick={onNext}
                className="px-6 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 ml-auto"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ExamShell; 