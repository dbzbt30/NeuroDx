import React, { useState } from 'react';
import { Finding } from '@/lib/diagnosis';

interface SensoryModality {
  id: string;
  name: string;
  description: string;
}

const SENSORY_MODALITIES: SensoryModality[] = [
  {
    id: 'light_touch',
    name: 'Light Touch',
    description: 'Assess light touch sensation using cotton wool'
  },
  {
    id: 'pinprick',
    name: 'Pinprick',
    description: 'Assess pain sensation using a pin'
  },
  {
    id: 'vibration',
    name: 'Vibration',
    description: 'Assess vibration sense using a tuning fork'
  },
  {
    id: 'proprioception',
    name: 'Proprioception',
    description: 'Assess joint position sense'
  }
];

interface SensoryPattern {
  id: string;
  name: string;
  description: string;
  regions: string[];
}

const SENSORY_PATTERNS: SensoryPattern[] = [
  {
    id: 'hemisensory',
    name: 'Hemisensory Loss',
    description: 'Sensory loss affecting one side of the body',
    regions: ['face', 'arm', 'leg']
  },
  {
    id: 'stocking_glove',
    name: 'Stocking-Glove Pattern',
    description: 'Distal sensory loss in hands and feet',
    regions: ['hand', 'foot']
  },
  {
    id: 'dermatomal',
    name: 'Dermatomal Pattern',
    description: 'Sensory loss following a specific nerve root',
    regions: ['dermatome']
  },
  {
    id: 'saddle',
    name: 'Saddle Distribution',
    description: 'Sensory loss in perineal region',
    regions: ['saddle']
  }
];

interface SensoryExamProps {
  onComplete: (findings: Finding[]) => void;
}

const SensoryExam: React.FC<SensoryExamProps> = ({ onComplete }) => {
  const [selectedModalities, setSelectedModalities] = useState<string[]>([]);
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null);
  const [laterality, setLaterality] = useState<'left' | 'right' | 'bilateral'>('bilateral');
  const [level, setLevel] = useState<string | null>(null);

  const toggleModality = (modalityId: string) => {
    setSelectedModalities(prev =>
      prev.includes(modalityId)
        ? prev.filter(id => id !== modalityId)
        : [...prev, modalityId]
    );
  };

  const handleComplete = () => {
    const findings: Finding[] = [];

    // Add modality findings
    selectedModalities.forEach(modalityId => {
      const modality = SENSORY_MODALITIES.find(m => m.id === modalityId);
      if (modality) {
        findings.push({
          id: `sensory_${modalityId}`,
          name: `${modality.name} loss`,
          type: 'sensory',
          laterality,
          location: level || 'general'
        });
      }
    });

    // Add pattern finding
    if (selectedPattern) {
      const pattern = SENSORY_PATTERNS.find(p => p.id === selectedPattern);
      if (pattern) {
        findings.push({
          id: `pattern_${selectedPattern}`,
          name: pattern.name,
          type: 'sensory',
          laterality,
          location: pattern.regions.join(',')
        });
      }
    }

    onComplete(findings);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Sensory Examination</h2>
        <p className="mt-2 text-sm text-gray-600">
          Assess different sensory modalities and patterns
        </p>
      </div>

      {/* Sensory Modalities */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Sensory Modalities</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SENSORY_MODALITIES.map((modality) => (
            <button
              key={modality.id}
              onClick={() => toggleModality(modality.id)}
              className={`
                p-4 rounded-lg border-2 text-left transition-colors
                ${selectedModalities.includes(modality.id)
                  ? 'bg-blue-100 border-blue-300'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
                }
              `}
            >
              <div className="font-medium">{modality.name}</div>
              <div className="text-sm mt-1 text-gray-600">
                {modality.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Pattern Recognition */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Pattern Recognition</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SENSORY_PATTERNS.map((pattern) => (
            <button
              key={pattern.id}
              onClick={() => setSelectedPattern(pattern.id)}
              className={`
                p-4 rounded-lg border-2 text-left transition-colors
                ${selectedPattern === pattern.id
                  ? 'bg-blue-100 border-blue-300'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
                }
              `}
            >
              <div className="font-medium">{pattern.name}</div>
              <div className="text-sm mt-1 text-gray-600">
                {pattern.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Laterality and Level */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Laterality</h3>
          <div className="flex space-x-4">
            {(['left', 'right', 'bilateral'] as const).map((side) => (
              <button
                key={side}
                onClick={() => setLaterality(side)}
                className={`
                  flex-1 py-2 rounded-md text-sm font-medium
                  ${laterality === side
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }
                `}
              >
                {side.charAt(0).toUpperCase() + side.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Level (if applicable)</h3>
          <select
            value={level || ''}
            onChange={(e) => setLevel(e.target.value || null)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select level</option>
            <option value="cervical">Cervical</option>
            <option value="thoracic">Thoracic</option>
            <option value="lumbar">Lumbar</option>
            <option value="sacral">Sacral</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={handleComplete}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SensoryExam; 