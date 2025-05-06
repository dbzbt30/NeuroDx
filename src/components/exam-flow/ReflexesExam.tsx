import React, { useState } from 'react';
import { Finding } from '@/lib/diagnosis';

interface Reflex {
  id: string;
  name: string;
  description: string;
  level: string;
}

const REFLEXES: Reflex[] = [
  {
    id: 'biceps',
    name: 'Biceps',
    description: 'C5-C6',
    level: 'C5-C6'
  },
  {
    id: 'triceps',
    name: 'Triceps',
    description: 'C7-C8',
    level: 'C7-C8'
  },
  {
    id: 'brachioradialis',
    name: 'Brachioradialis',
    description: 'C5-C6',
    level: 'C5-C6'
  },
  {
    id: 'knee',
    name: 'Knee',
    description: 'L3-L4',
    level: 'L3-L4'
  },
  {
    id: 'ankle',
    name: 'Ankle',
    description: 'S1-S2',
    level: 'S1-S2'
  }
];

interface CoordinationTest {
  id: string;
  name: string;
  description: string;
}

const COORDINATION_TESTS: CoordinationTest[] = [
  {
    id: 'finger_nose',
    name: 'Finger-to-Nose',
    description: 'Test for dysmetria and intention tremor'
  },
  {
    id: 'heel_shin',
    name: 'Heel-to-Shin',
    description: 'Test for lower limb coordination'
  },
  {
    id: 'rapid_alternating',
    name: 'Rapid Alternating Movements',
    description: 'Test for dysdiadochokinesia'
  },
  {
    id: 'gait',
    name: 'Gait',
    description: 'Assess walking pattern and balance'
  }
];

interface ReflexesExamProps {
  onComplete: (findings: Finding[]) => void;
}

const ReflexesExam: React.FC<ReflexesExamProps> = ({ onComplete }) => {
  const [reflexes, setReflexes] = useState<Record<string, { left: number; right: number }>>(
    REFLEXES.reduce((acc, reflex) => ({
      ...acc,
      [reflex.id]: { left: 2, right: 2 }
    }), {})
  );

  const [coordination, setCoordination] = useState<Record<string, { left: boolean; right: boolean }>>(
    COORDINATION_TESTS.reduce((acc, test) => ({
      ...acc,
      [test.id]: { left: false, right: false }
    }), {})
  );

  const [plantar, setPlantar] = useState<{ left: 'normal' | 'upgoing' | 'absent'; right: 'normal' | 'upgoing' | 'absent' }>({
    left: 'normal',
    right: 'normal'
  });

  const updateReflex = (reflexId: string, side: 'left' | 'right', value: number) => {
    setReflexes(prev => ({
      ...prev,
      [reflexId]: {
        ...prev[reflexId],
        [side]: value
      }
    }));
  };

  const toggleCoordination = (testId: string, side: 'left' | 'right') => {
    setCoordination(prev => ({
      ...prev,
      [testId]: {
        ...prev[testId],
        [side]: !prev[testId][side]
      }
    }));
  };

  const handleComplete = () => {
    const findings: Finding[] = [];

    // Add reflex findings
    Object.entries(reflexes).forEach(([reflexId, values]) => {
      const reflex = REFLEXES.find(r => r.id === reflexId);
      if (reflex) {
        if (values.left !== 2) {
          findings.push({
            id: `reflex_${reflexId}_left`,
            name: `Left ${reflex.name} reflex ${values.left > 2 ? 'hyperactive' : 'hypoactive'}`,
            type: 'reflex',
            laterality: 'left',
            location: reflex.level
          });
        }
        if (values.right !== 2) {
          findings.push({
            id: `reflex_${reflexId}_right`,
            name: `Right ${reflex.name} reflex ${values.right > 2 ? 'hyperactive' : 'hypoactive'}`,
            type: 'reflex',
            laterality: 'right',
            location: reflex.level
          });
        }
      }
    });

    // Add coordination findings
    Object.entries(coordination).forEach(([testId, values]) => {
      const test = COORDINATION_TESTS.find(t => t.id === testId);
      if (test) {
        if (values.left) {
          findings.push({
            id: `coordination_${testId}_left`,
            name: `Left ${test.name} abnormal`,
            type: 'coordination',
            laterality: 'left',
            location: 'general'
          });
        }
        if (values.right) {
          findings.push({
            id: `coordination_${testId}_right`,
            name: `Right ${test.name} abnormal`,
            type: 'coordination',
            laterality: 'right',
            location: 'general'
          });
        }
      }
    });

    // Add plantar response findings
    if (plantar.left !== 'normal') {
      findings.push({
        id: 'plantar_left',
        name: `Left plantar response ${plantar.left}`,
        type: 'reflex',
        laterality: 'left',
        location: 'L5-S1'
      });
    }
    if (plantar.right !== 'normal') {
      findings.push({
        id: 'plantar_right',
        name: `Right plantar response ${plantar.right}`,
        type: 'reflex',
        laterality: 'right',
        location: 'L5-S1'
      });
    }

    onComplete(findings);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Reflexes & Coordination</h2>
        <p className="mt-2 text-sm text-gray-600">
          Assess deep tendon reflexes and coordination
        </p>
      </div>

      {/* Reflexes */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Deep Tendon Reflexes</h3>
        <div className="space-y-4">
          {REFLEXES.map((reflex) => (
            <div key={reflex.id} className="border-b border-gray-200 pb-4">
              <div className="font-medium text-gray-700 mb-2">
                {reflex.name} ({reflex.description})
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Left</label>
                  <div className="flex space-x-2">
                    {[0, 1, 2, 3, 4].map((value) => (
                      <button
                        key={value}
                        onClick={() => updateReflex(reflex.id, 'left', value)}
                        className={`
                          flex-1 py-2 rounded-md text-sm font-medium
                          ${reflexes[reflex.id].left === value
                            ? value > 2
                              ? 'bg-red-100 text-red-800'
                              : value < 2
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-600'
                          }
                        `}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Right</label>
                  <div className="flex space-x-2">
                    {[0, 1, 2, 3, 4].map((value) => (
                      <button
                        key={value}
                        onClick={() => updateReflex(reflex.id, 'right', value)}
                        className={`
                          flex-1 py-2 rounded-md text-sm font-medium
                          ${reflexes[reflex.id].right === value
                            ? value > 2
                              ? 'bg-red-100 text-red-800'
                              : value < 2
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-600'
                          }
                        `}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plantar Response */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Plantar Response</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Left</label>
            <select
              value={plantar.left}
              onChange={(e) => setPlantar(prev => ({ ...prev, left: e.target.value as any }))}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="normal">Normal</option>
              <option value="upgoing">Upgoing</option>
              <option value="absent">Absent</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Right</label>
            <select
              value={plantar.right}
              onChange={(e) => setPlantar(prev => ({ ...prev, right: e.target.value as any }))}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="normal">Normal</option>
              <option value="upgoing">Upgoing</option>
              <option value="absent">Absent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Coordination Tests */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Coordination Tests</h3>
        <div className="space-y-4">
          {COORDINATION_TESTS.map((test) => (
            <div key={test.id} className="border-b border-gray-200 pb-4">
              <div className="font-medium text-gray-700 mb-2">{test.name}</div>
              <div className="text-sm text-gray-600 mb-2">{test.description}</div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Left</label>
                  <button
                    onClick={() => toggleCoordination(test.id, 'left')}
                    className={`
                      w-full py-2 rounded-md text-sm font-medium
                      ${coordination[test.id].left
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-600'
                      }
                    `}
                  >
                    {coordination[test.id].left ? 'Abnormal' : 'Normal'}
                  </button>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Right</label>
                  <button
                    onClick={() => toggleCoordination(test.id, 'right')}
                    className={`
                      w-full py-2 rounded-md text-sm font-medium
                      ${coordination[test.id].right
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-600'
                      }
                    `}
                  >
                    {coordination[test.id].right ? 'Abnormal' : 'Normal'}
                  </button>
                </div>
              </div>
            </div>
          ))}
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

export default ReflexesExam; 