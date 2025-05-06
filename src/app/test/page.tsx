'use client';

import React, { useState } from 'react';
import { Finding } from '@/lib/diagnosis';
import { calculateDiagnosis } from '@/lib/diagnosis';
import { ALL_FINDINGS } from '@/lib/findings';

// Group findings by type for better organization
const groupedFindings = ALL_FINDINGS.reduce((acc, finding) => {
  if (!acc[finding.type]) {
    acc[finding.type] = [];
  }
  acc[finding.type].push(finding);
  return acc;
}, {} as Record<string, Finding[]>);

// Clinical names for finding types
const findingTypeNames = {
  motor: 'Motor System',
  sensory: 'Sensory System',
  cranialNerve: 'Cranial Nerves',
  reflex: 'Deep Tendon Reflexes',
  coordination: 'Coordination',
  special_test: 'Special Tests',
  cognitive: 'Mental Status'
};

export default function TestPage() {
  const [selectedFindings, setSelectedFindings] = useState<Finding[]>([]);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    motor: true,
    reflex: true,
    cranialNerve: true,
    coordination: true,
    sensory: true
  });

  const handleFindingToggle = (finding: Finding) => {
    if (selectedFindings.find(f => f.id === finding.id)) {
      setSelectedFindings(selectedFindings.filter(f => f.id !== finding.id));
    } else {
      setSelectedFindings([...selectedFindings, finding]);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const diagnosis = calculateDiagnosis(selectedFindings);

  // Helper function to format probability as percentage
  const formatProbability = (prob: number) => {
    return `${(prob * 100).toFixed(1)}%`;
  };

  // Get confidence level color
  const getConfidenceColor = (probability: number) => {
    if (probability >= 0.8) return 'bg-green-100 text-green-800 border-green-200';
    if (probability >= 0.5) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-blue-100 text-blue-800 border-blue-200';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Findings Selection Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Neurological Examination</h1>
              
              {/* Findings by Category */}
              {Object.entries(groupedFindings).map(([type, findings]) => (
                <div key={type} className="mb-6">
                  <button
                    onClick={() => toggleSection(type)}
                    className="w-full flex justify-between items-center py-2 px-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <h2 className="text-lg font-medium text-gray-900">
                      {findingTypeNames[type as keyof typeof findingTypeNames]}
                    </h2>
                    <span className="text-gray-500">
                      {expandedSections[type] ? '−' : '+'}
                    </span>
                  </button>
                  
                  {expandedSections[type] && (
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 pl-4">
                      {findings.map((finding) => (
                        <button
                          key={finding.id}
                          onClick={() => handleFindingToggle(finding)}
                          className={`
                            p-2 rounded-md text-sm text-left transition-colors
                            ${selectedFindings.find(f => f.id === finding.id)
                              ? 'bg-blue-100 text-blue-800 border-2 border-blue-200'
                              : 'bg-gray-50 text-gray-700 border-2 border-gray-100 hover:bg-gray-100'
                            }
                          `}
                        >
                          {finding.name}
                          {finding.laterality && (
                            <span className="text-xs ml-1 text-gray-500">
                              ({finding.laterality})
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Diagnosis Panel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Differential Diagnosis</h2>
              
              {diagnosis.diseases.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  Select findings to generate differential diagnoses
                </p>
              ) : (
                <div className="space-y-4">
                  {diagnosis.diseases.map((disease, index) => (
                    <div
                      key={disease.id}
                      className={`
                        p-4 rounded-lg border-2 transition-colors
                        ${getConfidenceColor(disease.posteriorProbability)}
                      `}
                    >
                      <div className="flex justify-between items-start">
                        <div className="font-medium">{disease.name}</div>
                        <div className="text-sm font-medium">
                          {formatProbability(disease.posteriorProbability)}
                        </div>
                      </div>
                      
                      {/* Disease Details */}
                      <div className="mt-2 space-y-1 text-sm">
                        <div className="text-gray-600">
                          ICD-10: {disease.icd10}
                        </div>
                        <div className="text-gray-600">
                          Location: {disease.lesionSite?.join(', ')}
                        </div>
                        {disease.redFlags?.length > 0 && (
                          <div className="text-red-600 font-medium">
                            Red Flags: {disease.redFlags.join(', ')}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Overall Confidence */}
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">
                      Diagnostic Confidence: {formatProbability(diagnosis.confidence)}
                    </div>
                    {diagnosis.lesionSite?.length > 0 && (
                      <div className="text-sm text-gray-600 mt-1">
                        Likely Location: {diagnosis.lesionSite.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 