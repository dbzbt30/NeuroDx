import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Disease, Finding, calculateDiagnosis } from '@/lib/diagnosis';

interface DynamicDiagnosisProps {
  findings: Finding[];
}

const DynamicDiagnosis: React.FC<DynamicDiagnosisProps> = ({ findings }) => {
  const diagnosis = useMemo(() => calculateDiagnosis(findings), [findings]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Dynamic Diagnosis</h2>
        <p className="mt-2 text-sm text-gray-600">
          Real-time differential diagnosis based on findings
        </p>
      </div>

      {/* Lesion Localization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <h3 className="text-lg font-medium text-gray-900 mb-4">Lesion Localization</h3>
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="font-medium text-blue-900">{diagnosis.lesionSite}</div>
        </div>
      </motion.div>

      {/* Red Flags */}
      {diagnosis.redFlags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 rounded-lg p-4"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Red Flags Detected
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <ul className="list-disc pl-5 space-y-1">
                  {diagnosis.redFlags.map((flag, index) => (
                    <li key={index}>{flag}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Differential Diagnosis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <h3 className="text-lg font-medium text-gray-900 mb-4">Differential Diagnosis</h3>
        <div className="space-y-4">
          {diagnosis.diseases.map((disease) => (
            <div key={disease.id} className="border-b border-gray-200 pb-4 last:border-0">
              <div className="flex justify-between items-center mb-2">
                <div className="font-medium">{disease.name}</div>
                <div className="text-sm text-gray-500">ICD-10: {disease.icd10}</div>
              </div>
              <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-500"
                  style={{ width: `${disease.posteriorProbability * 100}%` }}
                />
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {Math.round(disease.posteriorProbability * 100)}% probability
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DynamicDiagnosis; 