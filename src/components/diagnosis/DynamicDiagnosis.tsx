import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Disease, Finding, calculateDiagnosis } from '@/lib/diagnosis';

interface DynamicDiagnosisProps {
  findings: Finding[];
}

const DynamicDiagnosis: React.FC<DynamicDiagnosisProps> = ({ findings }) => {
  const diagnosis = useMemo(() => calculateDiagnosis(findings), [findings]);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 0.7) return 'bg-green-600';
    if (probability >= 0.4) return 'bg-yellow-600';
    return 'bg-blue-600';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Dynamic Diagnosis</h2>
        <p className="mt-2 text-sm text-gray-600">
          Real-time differential diagnosis based on findings
        </p>
      </div>

      {/* Confidence Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm p-4"
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Diagnostic Confidence</h3>
          <div className={`text-lg font-bold ${getConfidenceColor(diagnosis.confidence)}`}>
            {Math.round(diagnosis.confidence * 100)}%
          </div>
        </div>
      </motion.div>

      {/* Lesion Sites */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm p-4"
      >
        <h3 className="text-lg font-medium text-gray-900 mb-2">Likely Lesion Sites</h3>
        <div className="flex flex-wrap gap-2">
          {diagnosis.lesionSite.map((site) => (
            <span
              key={site}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {site}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Red Flags */}
      {diagnosis.redFlags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-4"
        >
          <h3 className="text-lg font-medium text-red-600 mb-2">Red Flags</h3>
          <div className="flex flex-wrap gap-2">
            {diagnosis.redFlags.map((flag) => (
              <span
                key={flag}
                className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm"
              >
                {flag}
              </span>
            ))}
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
                  className={`absolute top-0 left-0 h-full transition-all duration-500 ${getProbabilityColor(disease.posteriorProbability)}`}
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