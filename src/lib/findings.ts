import { Finding } from './diagnosis';

// All possible findings that can be selected in the exam flow
export const ALL_FINDINGS: Finding[] = [
  // Motor Findings - Strength (MRC Scale)
  { id: 'motor_face_left', name: 'Left Face Weakness', type: 'motor', laterality: 'left', location: 'face' },
  { id: 'motor_face_right', name: 'Right Face Weakness', type: 'motor', laterality: 'right', location: 'face' },
  { id: 'motor_arm_left', name: 'Left Arm Weakness', type: 'motor', laterality: 'left', location: 'arm' },
  { id: 'motor_arm_right', name: 'Right Arm Weakness', type: 'motor', laterality: 'right', location: 'arm' },
  { id: 'motor_leg_left', name: 'Left Leg Weakness', type: 'motor', laterality: 'left', location: 'leg' },
  { id: 'motor_leg_right', name: 'Right Leg Weakness', type: 'motor', laterality: 'right', location: 'leg' },

  // Motor Patterns
  { id: 'pattern_hemiparesis', name: 'Hemiparesis Pattern', type: 'motor', location: 'pattern' },
  { id: 'pattern_paraparesis', name: 'Paraparesis Pattern', type: 'motor', location: 'pattern' },
  { id: 'pattern_quadriparesis', name: 'Quadriparesis Pattern', type: 'motor', location: 'pattern' },
  { id: 'pattern_monoparesis', name: 'Monoparesis Pattern', type: 'motor', location: 'pattern' },

  // Tone
  { id: 'tone_spastic', name: 'Spastic Tone', type: 'motor', location: 'tone' },
  { id: 'tone_flaccid', name: 'Flaccid Tone', type: 'motor', location: 'tone' },

  // Deep Tendon Reflexes
  { id: 'reflex_biceps_left', name: 'Left Biceps Reflex Abnormal', type: 'reflex', laterality: 'left', location: 'C5-C6' },
  { id: 'reflex_biceps_right', name: 'Right Biceps Reflex Abnormal', type: 'reflex', laterality: 'right', location: 'C5-C6' },
  { id: 'reflex_triceps_left', name: 'Left Triceps Reflex Abnormal', type: 'reflex', laterality: 'left', location: 'C7-C8' },
  { id: 'reflex_triceps_right', name: 'Right Triceps Reflex Abnormal', type: 'reflex', laterality: 'right', location: 'C7-C8' },
  { id: 'reflex_brachioradialis_left', name: 'Left Brachioradialis Reflex Abnormal', type: 'reflex', laterality: 'left', location: 'C5-C6' },
  { id: 'reflex_brachioradialis_right', name: 'Right Brachioradialis Reflex Abnormal', type: 'reflex', laterality: 'right', location: 'C5-C6' },
  { id: 'reflex_knee_left', name: 'Left Knee Reflex Abnormal', type: 'reflex', laterality: 'left', location: 'L3-L4' },
  { id: 'reflex_knee_right', name: 'Right Knee Reflex Abnormal', type: 'reflex', laterality: 'right', location: 'L3-L4' },
  { id: 'reflex_ankle_left', name: 'Left Ankle Reflex Abnormal', type: 'reflex', laterality: 'left', location: 'S1-S2' },
  { id: 'reflex_ankle_right', name: 'Right Ankle Reflex Abnormal', type: 'reflex', laterality: 'right', location: 'S1-S2' },

  // Plantar Response
  { id: 'plantar_upgoing_left', name: 'Left Plantar Response Upgoing', type: 'reflex', laterality: 'left', location: 'L5-S1' },
  { id: 'plantar_upgoing_right', name: 'Right Plantar Response Upgoing', type: 'reflex', laterality: 'right', location: 'L5-S1' },

  // Coordination Tests
  { id: 'coordination_finger_nose_left', name: 'Left Finger-to-Nose Abnormal', type: 'coordination', laterality: 'left' },
  { id: 'coordination_finger_nose_right', name: 'Right Finger-to-Nose Abnormal', type: 'coordination', laterality: 'right' },
  { id: 'coordination_heel_shin_left', name: 'Left Heel-to-Shin Abnormal', type: 'coordination', laterality: 'left' },
  { id: 'coordination_heel_shin_right', name: 'Right Heel-to-Shin Abnormal', type: 'coordination', laterality: 'right' },
  { id: 'coordination_rapid_alternating_left', name: 'Left Rapid Alternating Movements Abnormal', type: 'coordination', laterality: 'left' },
  { id: 'coordination_rapid_alternating_right', name: 'Right Rapid Alternating Movements Abnormal', type: 'coordination', laterality: 'right' },
  { id: 'coordination_gait', name: 'Gait Abnormal', type: 'coordination' },

  // Cranial Nerves
  { id: 'cn_I_left', name: 'Left CN I (Olfactory) Abnormal', type: 'cranialNerve', laterality: 'left', location: 'olfactory' },
  { id: 'cn_I_right', name: 'Right CN I (Olfactory) Abnormal', type: 'cranialNerve', laterality: 'right', location: 'olfactory' },
  { id: 'cn_II_left', name: 'Left CN II (Optic) Abnormal', type: 'cranialNerve', laterality: 'left', location: 'optic' },
  { id: 'cn_II_right', name: 'Right CN II (Optic) Abnormal', type: 'cranialNerve', laterality: 'right', location: 'optic' },
  { id: 'cn_III_left', name: 'Left CN III (Oculomotor) Abnormal', type: 'cranialNerve', laterality: 'left', location: 'oculomotor' },
  { id: 'cn_III_right', name: 'Right CN III (Oculomotor) Abnormal', type: 'cranialNerve', laterality: 'right', location: 'oculomotor' },
  { id: 'cn_IV_left', name: 'Left CN IV (Trochlear) Abnormal', type: 'cranialNerve', laterality: 'left', location: 'trochlear' },
  { id: 'cn_IV_right', name: 'Right CN IV (Trochlear) Abnormal', type: 'cranialNerve', laterality: 'right', location: 'trochlear' },
  { id: 'cn_V_left', name: 'Left CN V (Trigeminal) Abnormal', type: 'cranialNerve', laterality: 'left', location: 'trigeminal' },
  { id: 'cn_V_right', name: 'Right CN V (Trigeminal) Abnormal', type: 'cranialNerve', laterality: 'right', location: 'trigeminal' },
  { id: 'cn_VI_left', name: 'Left CN VI (Abducens) Abnormal', type: 'cranialNerve', laterality: 'left', location: 'abducens' },
  { id: 'cn_VI_right', name: 'Right CN VI (Abducens) Abnormal', type: 'cranialNerve', laterality: 'right', location: 'abducens' },
  { id: 'cn_VII_left', name: 'Left CN VII (Facial) Abnormal', type: 'cranialNerve', laterality: 'left', location: 'facial' },
  { id: 'cn_VII_right', name: 'Right CN VII (Facial) Abnormal', type: 'cranialNerve', laterality: 'right', location: 'facial' },
  { id: 'cn_VIII_left', name: 'Left CN VIII (Vestibulocochlear) Abnormal', type: 'cranialNerve', laterality: 'left', location: 'vestibulocochlear' },
  { id: 'cn_VIII_right', name: 'Right CN VIII (Vestibulocochlear) Abnormal', type: 'cranialNerve', laterality: 'right', location: 'vestibulocochlear' },
  { id: 'cn_IX_left', name: 'Left CN IX (Glossopharyngeal) Abnormal', type: 'cranialNerve', laterality: 'left', location: 'glossopharyngeal' },
  { id: 'cn_IX_right', name: 'Right CN IX (Glossopharyngeal) Abnormal', type: 'cranialNerve', laterality: 'right', location: 'glossopharyngeal' },
  { id: 'cn_X_left', name: 'Left CN X (Vagus) Abnormal', type: 'cranialNerve', laterality: 'left', location: 'vagus' },
  { id: 'cn_X_right', name: 'Right CN X (Vagus) Abnormal', type: 'cranialNerve', laterality: 'right', location: 'vagus' },
  { id: 'cn_XI_left', name: 'Left CN XI (Accessory) Abnormal', type: 'cranialNerve', laterality: 'left', location: 'accessory' },
  { id: 'cn_XI_right', name: 'Right CN XI (Accessory) Abnormal', type: 'cranialNerve', laterality: 'right', location: 'accessory' },
  { id: 'cn_XII_left', name: 'Left CN XII (Hypoglossal) Abnormal', type: 'cranialNerve', laterality: 'left', location: 'hypoglossal' },
  { id: 'cn_XII_right', name: 'Right CN XII (Hypoglossal) Abnormal', type: 'cranialNerve', laterality: 'right', location: 'hypoglossal' }
];

// Helper function to find a finding by ID
export function findFindingById(id: string): Finding | undefined {
  return ALL_FINDINGS.find(finding => finding.id === id);
}

// Helper function to get findings by type
export function getFindingsByType(type: Finding['type']): Finding[] {
  return ALL_FINDINGS.filter(finding => finding.type === type);
}

// Helper function to get findings by anatomical region
export function getFindingsByRegion(region: string): Finding[] {
  const regionMap: { [key: string]: Finding['type'][] } = {
    'brain': ['cognitive', 'cranialNerve'],
    'spinal_cord': ['motor', 'sensory', 'reflex'],
    'peripheral_nerve': ['motor', 'sensory', 'reflex'],
    'neuromuscular_junction': ['motor', 'special_test'],
    'muscle': ['motor', 'special_test']
  };
  
  const types = regionMap[region] || [];
  return ALL_FINDINGS.filter(finding => types.includes(finding.type));
} 