import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Finding } from '@/lib/diagnosis';

interface CranialNerve {
  number: string;
  name: string;
  function: string;
  test: string;
}

const CRANIAL_NERVES: CranialNerve[] = [
  {
    number: 'I',
    name: 'Olfactory',
    function: 'Smell',
    test: 'Test each nostril with familiar odors'
  },
  {
    number: 'II',
    name: 'Optic',
    function: 'Vision',
    test: 'Visual acuity, fields, and fundoscopy'
  },
  {
    number: 'III',
    name: 'Oculomotor',
    function: 'Eye movement, pupil, lid',
    test: 'Pupillary light reflex, eye movements'
  },
  {
    number: 'IV',
    name: 'Trochlear',
    function: 'Eye movement',
    test: 'Down and in eye movement'
  },
  {
    number: 'V',
    name: 'Trigeminal',
    function: 'Face sensation, jaw movement',
    test: 'Facial sensation, jaw strength'
  },
  {
    number: 'VI',
    name: 'Abducens',
    function: 'Eye movement',
    test: 'Lateral eye movement'
  },
  {
    number: 'VII',
    name: 'Facial',
    function: 'Facial movement, taste',
    test: 'Facial symmetry, taste'
  },
  {
    number: 'VIII',
    name: 'Vestibulocochlear',
    function: 'Hearing, balance',
    test: 'Hearing, balance testing'
  },
  {
    number: 'IX',
    name: 'Glossopharyngeal',
    function: 'Taste, swallowing',
    test: 'Gag reflex, taste'
  },
  {
    number: 'X',
    name: 'Vagus',
    function: 'Swallowing, voice',
    test: 'Voice quality, swallowing'
  },
  {
    number: 'XI',
    name: 'Accessory',
    function: 'Shoulder movement',
    test: 'Shoulder shrug, head turn'
  },
  {
    number: 'XII',
    name: 'Hypoglossal',
    function: 'Tongue movement',
    test: 'Tongue protrusion'
  }
];

interface CranialNervesGridProps {
  onComplete: (findings: Finding[]) => void;
}

const CranialNervesGrid: React.FC<CranialNervesGridProps> = ({ onComplete }) => {
  const [abnormalities, setAbnormalities] = useState<Record<string, { left: boolean; right: boolean }>>(
    CRANIAL_NERVES.reduce((acc, nerve) => ({
      ...acc,
      [nerve.number]: { left: false, right: false }
    }), {})
  );

  const toggleAbnormality = (nerveNumber: string, side: 'left' | 'right') => {
    setAbnormalities(prev => ({
      ...prev,
      [nerveNumber]: {
        ...prev[nerveNumber],
        [side]: !prev[nerveNumber][side]
      }
    }));
  };

  const handleComplete = () => {
    const findings: Finding[] = [];

    Object.entries(abnormalities).forEach(([nerveNumber, sides]) => {
      const nerve = CRANIAL_NERVES.find(n => n.number === nerveNumber);
      if (nerve) {
        if (sides.left) {
          findings.push({
            id: `cn_${nerveNumber}_left`,
            name: `Left CN ${nerveNumber} (${nerve.name}) abnormality`,
            type: 'cranialNerve',
            laterality: 'left',
            location: nerve.name.toLowerCase()
          });
        }
        if (sides.right) {
          findings.push({
            id: `cn_${nerveNumber}_right`,
            name: `Right CN ${nerveNumber} (${nerve.name}) abnormality`,
            type: 'cranialNerve',
            laterality: 'right',
            location: nerve.name.toLowerCase()
          });
        }
      }
    });

    onComplete(findings);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Cranial Nerves Examination</h2>
        <p className="mt-2 text-sm text-gray-600">
          Assess each cranial nerve for abnormalities
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CRANIAL_NERVES.map((nerve) => (
          <div
            key={nerve.number}
            className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="font-medium">
                  CN {nerve.number}: {nerve.name}
                </div>
                <div className="text-sm text-gray-600">{nerve.function}</div>
              </div>
            </div>
            <div className="text-sm text-gray-500 mb-3">{nerve.test}</div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => toggleAbnormality(nerve.number, 'left')}
                className={`
                  py-2 rounded-md text-sm font-medium
                  ${abnormalities[nerve.number].left
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }
                `}
              >
                Left
              </button>
              <button
                onClick={() => toggleAbnormality(nerve.number, 'right')}
                className={`
                  py-2 rounded-md text-sm font-medium
                  ${abnormalities[nerve.number].right
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }
                `}
              >
                Right
              </button>
            </div>
          </div>
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
    </div>
  );
};

export default CranialNervesGrid; 