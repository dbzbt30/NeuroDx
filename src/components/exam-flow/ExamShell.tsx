import React from 'react';

interface ExamShellProps {
  currentStep: number;
  children: React.ReactNode;
}

const ExamShell: React.FC<ExamShellProps> = ({ currentStep, children }) => {
  const totalSteps = 6;
  const steps = [
    'Quick Triage',
    'Cranial Nerves',
    'Motor Exam',
    'Sensory Exam',
    'Reflexes & Coordination',
    'Results'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, index) => (
            <div
              key={step}
              className={`flex-1 text-center ${
                index < currentStep ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              <div className="text-sm font-medium">{step}</div>
            </div>
          ))}
        </div>
        <div className="relative">
          <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
            <div
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-500"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-sm">
        {children}
      </div>
    </div>
  );
};

export default ExamShell; 