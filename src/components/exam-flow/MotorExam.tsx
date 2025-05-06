import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Finding } from '@/lib/diagnosis';

interface MotorStrength {
  region: string;
  left: number;
  right: number;
}

interface MotorPattern {
  id: string;
  name: string;
  description: string;
  regions: string[];
}

const MOTOR_PATTERNS: MotorPattern[] = [
  {
    id: 'hemiparesis',
    name: 'Hemiparesis',
    description: 'Weakness affecting one side of the body',
    regions: ['face', 'arm', 'leg']
  },
  {
    id: 'paraparesis',
    name: 'Paraparesis',
    description: 'Weakness affecting both legs',
    regions: ['leg']
  },
  {
    id: 'quadriparesis',
    name: 'Quadriparesis',
    description: 'Weakness affecting all four limbs',
    regions: ['arm', 'leg']
  },
  {
    id: 'monoparesis',
    name: 'Monoparesis',
    description: 'Weakness affecting a single limb',
    regions: ['arm', 'leg']
  }
];

interface MotorExamProps {
  onComplete: (findings: Finding[]) => void;
}

const MotorExam: React.FC<MotorExamProps> = ({ onComplete }) => {
  const [strength, setStrength] = useState<MotorStrength[]>([
    { region: 'face', left: 5, right: 5 },
    { region: 'arm', left: 5, right: 5 },
    { region: 'leg', left: 5, right: 5 }
  ]);

  const [selectedPattern, setSelectedPattern] = useState<string | null>(null);
  const [tone, setTone] = useState<'normal' | 'spastic' | 'flaccid'>('normal');
  const [coordination, setCoordination] = useState<'normal' | 'ataxic'>('normal');

  const updateStrength = (region: string, side: 'left' | 'right', value: number) => {
    setStrength(prev => prev.map(s => 
      s.region === region ? { ...s, [side]: value } : s
    ));
  };

  const getStrengthColor = (value: number) => {
    if (value >= 4) return 'bg-green-100 text-green-800';
    if (value >= 3) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const handleComplete = () => {
    const findings: Finding[] = [];

    // Add strength findings
    strength.forEach(s => {
      if (s.left < 5) {
        findings.push({
          id: `motor_${s.region}_left`,
          name: `Left ${s.region} weakness (${s.left}/5)`,
          type: 'motor',
          laterality: 'left',
          location: s.region
        });
      }
      if (s.right < 5) {
        findings.push({
          id: `motor_${s.region}_right`,
          name: `Right ${s.region} weakness (${s.right}/5)`,
          type: 'motor',
          laterality: 'right',
          location: s.region
        });
      }
    });

    // Add pattern finding
    if (selectedPattern) {
      findings.push({
        id: `pattern_${selectedPattern}`,
        name: MOTOR_PATTERNS.find(p => p.id === selectedPattern)?.name || '',
        type: 'motor',
        location: 'pattern'
      });
    }

    // Add tone finding
    if (tone !== 'normal') {
      findings.push({
        id: `tone_${tone}`,
        name: `${tone.charAt(0).toUpperCase() + tone.slice(1)} tone`,
        type: 'motor',
        location: 'tone'
      });
    }

    // Add coordination finding
    if (coordination !== 'normal') {
      findings.push({
        id: `coordination_${coordination}`,
        name: `${coordination.charAt(0).toUpperCase() + coordination.slice(1)} coordination`,
        type: 'motor',
        location: 'coordination'
      });
    }

    onComplete(findings);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Motor Examination</h2>
        <p className="mt-2 text-sm text-gray-600">
          Assess strength, tone, and coordination
        </p>
      </div>

      {/* Strength Assessment */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Strength (MRC Scale)</h3>
        <div className="space-y-4">
          {strength.map((s) => (
            <div key={s.region} className="border-b border-gray-200 pb-4">
              <div className="font-medium text-gray-700 mb-2 capitalize">
                {s.region}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Left</label>
                  <div className="flex space-x-2">
                    {[0, 1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        onClick={() => updateStrength(s.region, 'left', value)}
                        className={`
                          flex-1 py-2 rounded-md text-sm font-medium
                          ${s.left === value ? getStrengthColor(value) : 'bg-gray-100 text-gray-600'}
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
                    {[0, 1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        onClick={() => updateStrength(s.region, 'right', value)}
                        className={`
                          flex-1 py-2 rounded-md text-sm font-medium
                          ${s.right === value ? getStrengthColor(value) : 'bg-gray-100 text-gray-600'}
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

      {/* Pattern Recognition */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Pattern Recognition</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MOTOR_PATTERNS.map((pattern) => (
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

      {/* Tone and Coordination */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Tone</h3>
          <div className="flex space-x-4">
            {(['normal', 'spastic', 'flaccid'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className={`
                  flex-1 py-2 rounded-md text-sm font-medium
                  ${tone === t
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }
                `}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Coordination</h3>
          <div className="flex space-x-4">
            {(['normal', 'ataxic'] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCoordination(c)}
                className={`
                  flex-1 py-2 rounded-md text-sm font-medium
                  ${coordination === c
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }
                `}
              >
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>
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

export default MotorExam; 