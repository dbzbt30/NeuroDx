import { Disease } from './diagnosis';

// =====================================================================
// NEUROLOGICAL DISEASE DATABASE
// =====================================================================
// HOW TO ADD A NEW DISEASE (FOR CLINICIANS):
// 1. Copy the template below and paste it in the DISEASES array
// 2. Fill in the disease details
// 3. Add findings that map to the exam flow:
//    - Motor findings use: motor_[region]_[side], tone_[type], pattern_[type]
//    - Reflex findings use: reflex_[type]_[side]
//    - Cranial nerve findings use: cn_[number]_[side]
//    - Coordination findings use: coordination_[test]_[side]
//
// TEMPLATE:
/*
  {
    id: "disease_name",              // Lowercase with underscores
    name: "Disease Name",            // Full clinical name
    icd10: "G00.0",                 // ICD-10 code
    lesionSite: ["location"],       // Anatomical location
    redFlags: ["symptom1"],         // Critical findings
    findings: [
      // Motor Exam Findings:
      { id: "motor_arm_left", lrPositive: 8.0, lrNegative: 0.2 },     // Left arm weakness
      { id: "tone_flaccid", lrPositive: 5.0, lrNegative: 0.5 },       // Flaccid tone
      { id: "pattern_paraparesis", lrPositive: 4.0, lrNegative: 0.3 }, // Weakness pattern
      
      // Reflex Findings:
      { id: "reflex_biceps_left", lrPositive: 6.0, lrNegative: 0.3 }, // Left biceps reflex
      
      // Cranial Nerve Findings:
      { id: "cn_VII_left", lrPositive: 7.0, lrNegative: 0.4 },        // Left facial weakness
      
      // Coordination Findings:
      { id: "coordination_finger_nose_left", lrPositive: 3.0, lrNegative: 0.6 } // Left FNF
    ]
  }
*/

// Constants for evidence-based likelihood ratios (LR)
const LR = {
  VERY_STRONG_POSITIVE: 18.0,
  STRONG_POSITIVE: 10.0,
  MODERATE_POSITIVE: 5.0,
  WEAK_POSITIVE: 2.0,
  NEUTRAL: 1.0,
  WEAK_NEGATIVE: 0.8,
  MODERATE_NEGATIVE: 0.5,
  STRONG_NEGATIVE: 0.1
};

export const DISEASES: Disease[] = [
  // Guillain-Barré Syndrome (GBS)
  {
    id: "guillain_barre",
    name: "Guillain-Barré syndrome",
    icd10: "G61.0",
    lesionSite: ["peripheral_nerve"],
    redFlags: ["respiratory_weakness", "rapid_progression"],
    findings: [
      // Motor Findings
      { id: "motor_arm_left", lrPositive: LR.STRONG_POSITIVE, lrNegative: LR.MODERATE_NEGATIVE },
      { id: "motor_arm_right", lrPositive: LR.STRONG_POSITIVE, lrNegative: LR.MODERATE_NEGATIVE },
      { id: "motor_leg_left", lrPositive: LR.STRONG_POSITIVE, lrNegative: LR.MODERATE_NEGATIVE },
      { id: "motor_leg_right", lrPositive: LR.STRONG_POSITIVE, lrNegative: LR.MODERATE_NEGATIVE },
      { id: "tone_flaccid", lrPositive: LR.MODERATE_POSITIVE, lrNegative: LR.MODERATE_NEGATIVE },
      { id: "pattern_quadriparesis", lrPositive: LR.STRONG_POSITIVE, lrNegative: LR.MODERATE_NEGATIVE },
      
      // Reflex Findings (Areflexia)
      { id: "reflex_biceps_left", lrPositive: LR.VERY_STRONG_POSITIVE, lrNegative: LR.STRONG_NEGATIVE },
      { id: "reflex_biceps_right", lrPositive: LR.VERY_STRONG_POSITIVE, lrNegative: LR.STRONG_NEGATIVE },
      { id: "reflex_triceps_left", lrPositive: LR.VERY_STRONG_POSITIVE, lrNegative: LR.STRONG_NEGATIVE },
      { id: "reflex_triceps_right", lrPositive: LR.VERY_STRONG_POSITIVE, lrNegative: LR.STRONG_NEGATIVE },
      { id: "reflex_knee_left", lrPositive: LR.VERY_STRONG_POSITIVE, lrNegative: LR.STRONG_NEGATIVE },
      { id: "reflex_knee_right", lrPositive: LR.VERY_STRONG_POSITIVE, lrNegative: LR.STRONG_NEGATIVE },
      { id: "reflex_ankle_left", lrPositive: LR.VERY_STRONG_POSITIVE, lrNegative: LR.STRONG_NEGATIVE },
      { id: "reflex_ankle_right", lrPositive: LR.VERY_STRONG_POSITIVE, lrNegative: LR.STRONG_NEGATIVE },
      
      // Cranial Nerve Findings (Facial Diplegia)
      { id: "cn_VII_left", lrPositive: LR.STRONG_POSITIVE, lrNegative: LR.WEAK_NEGATIVE },
      { id: "cn_VII_right", lrPositive: LR.STRONG_POSITIVE, lrNegative: LR.WEAK_NEGATIVE }
    ],
    posteriorProbability: 0
  },

  // Cerebral Cortex / Subcortical White Matter (5 key conditions)
  {
    id: "mca_stroke",
    name: "Acute ischemic stroke – MCA territory",
    icd10: "I63.411",
    lesionSite: ["cortex"],
    redFlags: ["sudden_onset", "focal_deficit", "altered_consciousness", "malignant_edema"],
    findings: [
      // Motor Findings (based on PMID: 36201961, 30193963)
      { id: "motor_arm_right", lrPositive: 7.3, lrNegative: 0.43 },
      { id: "motor_arm_left", lrPositive: 7.3, lrNegative: 0.43 },
      { id: "motor_leg_right", lrPositive: 6.8, lrNegative: 0.45 },
      { id: "motor_leg_left", lrPositive: 6.8, lrNegative: 0.45 },
      { id: "tone_spastic", lrPositive: 4.2, lrNegative: 0.55 },
      { id: "pattern_hemiparesis", lrPositive: 8.2, lrNegative: 0.39 },
      
      // Reflex Findings
      { id: "reflex_biceps_right", lrPositive: 3.8, lrNegative: 0.62 },
      { id: "reflex_biceps_left", lrPositive: 3.8, lrNegative: 0.62 },
      { id: "reflex_knee_right", lrPositive: 3.8, lrNegative: 0.62 },
      { id: "reflex_knee_left", lrPositive: 3.8, lrNegative: 0.62 },
      
      // Cranial Nerve Findings
      { id: "cn_VII_right", lrPositive: 5.9, lrNegative: 0.51 },
      { id: "cn_VII_left", lrPositive: 5.9, lrNegative: 0.51 },
      { id: "gaze_preference", lrPositive: 4.2, lrNegative: 0.55 },
      
      // Coordination Findings
      { id: "coordination_finger_nose_right", lrPositive: 4.5, lrNegative: 0.58 },
      { id: "coordination_finger_nose_left", lrPositive: 4.5, lrNegative: 0.58 },
      
      // Other Key Findings
      { id: "aphasia", lrPositive: 4.8, lrNegative: 0.62 },
      { id: "neglect", lrPositive: 3.2, lrNegative: 0.72 },
      { id: "dysarthria", lrPositive: 3.8, lrNegative: 0.45 }
    ],
    posteriorProbability: 0
  },
  {
    id: "subdural_hematoma",
    name: "Acute / chronic subdural haematoma",
    icd10: "I62.00",
    lesionSite: ["cortex"],
    redFlags: ["head trauma", "anticoagulation", "altered consciousness"],
    findings: [
      { id: "head_trauma_history", lrPositive: 6.8, lrNegative: 0.42 },    // PMID: 22305025
      { id: "anticoagulation", lrPositive: 5.2, lrNegative: 0.48 },        // PMID: 22305025
      { id: "fluctuating_consciousness", lrPositive: 4.5, lrNegative: 0.55 }, // PMID: 22305025
      { id: "progressive_headache", lrPositive: 3.2, lrNegative: 0.65 },    // PMID: 22305025
      { id: "focal_weakness", lrPositive: 3.8, lrNegative: 0.58 },          // PMID: 22305025
      { id: "pupillary_asymmetry", lrPositive: 7.5, lrNegative: 0.35 }     // PMID: 22305025
    ],
    posteriorProbability: 0
  },
  {
    id: "status_epilepticus",
    name: "Status Epilepticus",
    icd10: "G40.901",
    lesionSite: ["cortex"],
    redFlags: ["seizure", "altered consciousness"],
    findings: [
      { id: "rhythmic_movements", lrPositive: LR.STRONG_POSITIVE, lrNegative: LR.MODERATE_NEGATIVE },
      { id: "post_ictal", lrPositive: LR.MODERATE_POSITIVE, lrNegative: LR.WEAK_NEGATIVE },
      { id: "tongue_bite", lrPositive: LR.MODERATE_POSITIVE, lrNegative: LR.WEAK_NEGATIVE }
    ],
    posteriorProbability: 0
  },

  // Basal Ganglia / Thalamus (3 key conditions)
  {
    id: "parkinsons",
    name: "Parkinson disease",
    icd10: "G20",
    lesionSite: ["basal ganglia"],
    redFlags: [],
    findings: [
      { id: "resting_tremor", lrPositive: 4.5, lrNegative: 0.38 },         // PMID: 27010827
      { id: "bradykinesia", lrPositive: 6.8, lrNegative: 0.32 },           // PMID: 27010827
      { id: "rigidity", lrPositive: 5.9, lrNegative: 0.35 },               // PMID: 27010827
      { id: "postural_instability", lrPositive: 3.2, lrNegative: 0.65 },   // PMID: 27010827
      { id: "asymmetric_onset", lrPositive: 4.1, lrNegative: 0.52 },       // PMID: 27010827
      { id: "levodopa_response", lrPositive: 7.2, lrNegative: 0.28 }       // PMID: 27010827
    ],
    posteriorProbability: 0
  },

  // Basal Ganglia / Thalamus (continued)
  {
    id: "huntingtons",
    name: "Huntington's disease",
    icd10: "G10",
    lesionSite: ["basal ganglia"],
    redFlags: ["family_history", "psychiatric_symptoms"],
    findings: [
      // Motor Findings (based on PMID: 28642124, 31424997)
      { id: "chorea", lrPositive: 8.5, lrNegative: 0.25 },
      { id: "motor_impersistence", lrPositive: 6.2, lrNegative: 0.38 },
      { id: "gait_disturbance", lrPositive: 4.8, lrNegative: 0.45 },
      { id: "oculomotor_abnormalities", lrPositive: 5.2, lrNegative: 0.42 },
      { id: "dystonia", lrPositive: 3.8, lrNegative: 0.58 }
    ],
    posteriorProbability: 0
  },
  {
    id: "wilson_disease",
    name: "Wilson's disease",
    icd10: "E83.01",
    lesionSite: ["basal ganglia"],
    redFlags: ["young_onset", "liver_disease", "kayser_fleischer_rings"],
    findings: [
      // Motor and Other Findings (based on PMID: 30041819, 27786453)
      { id: "tremor", lrPositive: 5.8, lrNegative: 0.42 },
      { id: "dystonia", lrPositive: 6.2, lrNegative: 0.38 },
      { id: "dysarthria", lrPositive: 4.5, lrNegative: 0.52 },
      { id: "kayser_fleischer_rings", lrPositive: 15.2, lrNegative: 0.15 },
      { id: "liver_dysfunction", lrPositive: 7.8, lrNegative: 0.35 }
    ],
    posteriorProbability: 0
  },
  {
    id: "psp",
    name: "Progressive Supranuclear Palsy",
    icd10: "G23.1",
    lesionSite: ["basal ganglia", "brainstem"],
    redFlags: ["early_falls", "vertical_gaze_palsy"],
    findings: [
      // Motor and Oculomotor Findings (based on PMID: 28122795, 29171412)
      { id: "vertical_gaze_palsy", lrPositive: 12.5, lrNegative: 0.18 },
      { id: "axial_rigidity", lrPositive: 7.2, lrNegative: 0.35 },
      { id: "early_falls", lrPositive: 8.5, lrNegative: 0.28 },
      { id: "bradykinesia", lrPositive: 4.8, lrNegative: 0.45 },
      { id: "frontal_release_signs", lrPositive: 3.9, lrNegative: 0.58 }
    ],
    posteriorProbability: 0
  },
  {
    id: "multiple_system_atrophy",
    name: "Multiple System Atrophy",
    icd10: "G90.3",
    lesionSite: ["basal ganglia", "cerebellum", "brainstem"],
    redFlags: ["autonomic_failure", "early_falls", "cerebellar_ataxia"],
    findings: [
      // Motor and Autonomic Findings (based on PMID: 31171647, 29171412)
      { id: "orthostatic_hypotension", lrPositive: 9.2, lrNegative: 0.25 },
      { id: "cerebellar_ataxia", lrPositive: 7.5, lrNegative: 0.32 },
      { id: "parkinsonism", lrPositive: 6.8, lrNegative: 0.38 },
      { id: "urinary_incontinence", lrPositive: 5.2, lrNegative: 0.45 },
      { id: "stridor", lrPositive: 8.5, lrNegative: 0.28 }
    ],
    posteriorProbability: 0
  },

  // Brainstem (Midbrain → Medulla) (5 key conditions)
  {
    id: "wallenberg_syndrome",
    name: "Wallenberg syndrome (Lateral medullary syndrome)",
    icd10: "G46.3",
    lesionSite: ["lateral_medulla"],
    redFlags: ["sudden_onset", "respiratory_failure", "aspiration_risk"],
    findings: [
      // Motor/Sensory Findings (based on systematic reviews)
      { id: "contralateral_pain_temp_loss_body", lrPositive: 8.2, lrNegative: 0.15 },
      { id: "ipsilateral_pain_temp_loss_face", lrPositive: 7.5, lrNegative: 0.25 },
      { id: "ipsilateral_horner", lrPositive: 6.8, lrNegative: 0.35 },
      { id: "ipsilateral_ataxia", lrPositive: 5.9, lrNegative: 0.42 },
      { id: "nystagmus", lrPositive: 4.2, lrNegative: 0.48 },
      { id: "dysphagia", lrPositive: 4.8, lrNegative: 0.45 },
      { id: "dysphonia", lrPositive: 3.9, lrNegative: 0.52 },
      { id: "vertigo", lrPositive: 3.5, lrNegative: 0.55 }
    ],
    posteriorProbability: 0
  },
  {
    id: "medial_medullary_syndrome",
    name: "Medial medullary syndrome (Dejerine syndrome)",
    icd10: "G46.4", 
    lesionSite: ["medial_medulla"],
    redFlags: ["sudden_onset", "quadriparesis"],
    findings: [
      // Motor/Sensory Findings (based on clinical studies)
      { id: "contralateral_hemiparesis", lrPositive: 7.8, lrNegative: 0.22 },
      { id: "contralateral_proprioception_loss", lrPositive: 6.5, lrNegative: 0.35 },
      { id: "ipsilateral_tongue_weakness", lrPositive: 5.9, lrNegative: 0.38 },
      { id: "contralateral_vibration_loss", lrPositive: 4.8, lrNegative: 0.45 }
    ],
    posteriorProbability: 0
  },
  {
    id: "locked_in_syndrome",
    name: "Locked-in syndrome (Ventral pontine syndrome)",
    icd10: "G83.5",
    lesionSite: ["ventral_pons"],
    redFlags: ["quadriplegia", "consciousness_preserved", "respiratory_failure"],
    findings: [
      // Motor/Communication Findings (based on clinical evidence)
      { id: "quadriplegia", lrPositive: 9.2, lrNegative: 0.12 },
      { id: "bilateral_facial_paralysis", lrPositive: 8.5, lrNegative: 0.18 },
      { id: "preserved_vertical_gaze", lrPositive: 7.8, lrNegative: 0.25 },
      { id: "preserved_consciousness", lrPositive: 7.2, lrNegative: 0.28 },
      { id: "anarthria", lrPositive: 6.5, lrNegative: 0.32 }
    ],
    posteriorProbability: 0
  },
  {
    id: "one_and_half_syndrome",
    name: "One-and-a-half syndrome",
    icd10: "H51.0",
    lesionSite: ["dorsal_pons"],
    redFlags: ["diplopia", "gaze_palsy"],
    findings: [
      // Ocular Motor Findings (based on neuro-ophthalmology studies)
      { id: "ipsilateral_horizontal_gaze_palsy", lrPositive: 8.8, lrNegative: 0.15 },
      { id: "ipsilateral_internuclear_ophthalmoplegia", lrPositive: 8.2, lrNegative: 0.18 },
      { id: "contraversive_eye_deviation", lrPositive: 6.5, lrNegative: 0.35 },
      { id: "nystagmus", lrPositive: 4.2, lrNegative: 0.55 }
    ],
    posteriorProbability: 0
  },
  {
    id: "dorsal_midbrain_syndrome",
    name: "Dorsal midbrain syndrome (Parinaud syndrome)",
    icd10: "H51.8",
    lesionSite: ["dorsal_midbrain"],
    redFlags: ["vertical_gaze_palsy", "pupillary_abnormalities"],
    findings: [
      // Neuro-ophthalmic Findings (based on clinical studies)
      { id: "upward_gaze_palsy", lrPositive: 8.5, lrNegative: 0.18 },
      { id: "convergence_retraction_nystagmus", lrPositive: 7.8, lrNegative: 0.25 },
      { id: "light_near_dissociation", lrPositive: 6.9, lrNegative: 0.32 },
      { id: "lid_retraction", lrPositive: 5.5, lrNegative: 0.42 },
      { id: "skew_deviation", lrPositive: 4.8, lrNegative: 0.48 }
    ],
    posteriorProbability: 0
  },

  // Spinal Cord (3 key conditions)
  {
    id: "cervical_myelopathy",
    name: "Cervical spondylotic myelopathy",
    icd10: "M47.12",
    lesionSite: ["spinal cord"],
    redFlags: ["progressive weakness", "bladder dysfunction"],
    findings: [
      { id: "spastic_gait", lrPositive: 6.2, lrNegative: 0.38 },           // PMID: 26223141
      { id: "hyperreflexia", lrPositive: 5.5, lrNegative: 0.42 },          // PMID: 26223141
      { id: "hoffman_sign", lrPositive: 4.8, lrNegative: 0.45 },           // PMID: 26223141
      { id: "sensory_level", lrPositive: 7.2, lrNegative: 0.32 },          // PMID: 26223141
      { id: "neck_pain", lrPositive: 2.8, lrNegative: 0.65 }              // PMID: 26223141
    ],
    posteriorProbability: 0
  },

  // Peripheral Nerve (3 key conditions)
  {
    id: "ophthalmoplegia",
    name: "Ophthalmoplegia",
    icd10: "G25.1",
    lesionSite: ["peripheral nerve"],
    redFlags: ["ophthalmoplegia"],
    findings: [
      { id: "ophthalmoplegia", lrPositive: LR.STRONG_POSITIVE, lrNegative: LR.MODERATE_NEGATIVE },
    ],
    posteriorProbability: 0
  },

  // Neuromuscular Junction (2 key conditions)
  {
    id: "myasthenia_gravis",
    name: "Myasthenia gravis",
    icd10: "G70.00",
    lesionSite: ["neuromuscular junction"],
    redFlags: ["respiratory weakness", "bulbar symptoms"],
    findings: [
      { id: "fatigable_weakness", lrPositive: 12.5, lrNegative: 0.15 },    // PMID: 24365361
      { id: "ptosis", lrPositive: 4.8, lrNegative: 0.52 },                 // PMID: 24365361
      { id: "diplopia", lrPositive: 4.2, lrNegative: 0.58 },               // PMID: 24365361
      { id: "bulbar_weakness", lrPositive: 3.9, lrNegative: 0.61 },        // PMID: 24365361
      { id: "neck_flexor_weakness", lrPositive: 3.2, lrNegative: 0.68 },   // PMID: 24365361
      { id: "normal_reflexes", lrPositive: 1.2, lrNegative: 0.95 },        // PMID: 24365361
      { id: "ice_pack_test", lrPositive: 15.0, lrNegative: 0.25 },         // PMID: 24365361
      { id: "edrophonium_test", lrPositive: 25.0, lrNegative: 0.11 }       // PMID: 24365361
    ],
    posteriorProbability: 0
  },

  // Additional Cerebral Cortex / Subcortical White Matter conditions
  {
    id: "aca_stroke",
    name: "Acute ischemic stroke – ACA territory",
    icd10: "I63.412",
    lesionSite: ["cortex"],
    redFlags: ["sudden_onset", "focal_deficit", "altered_consciousness"],
    findings: [
      // Motor Findings
      { id: "motor_leg_right", lrPositive: 8.5, lrNegative: 0.35 },
      { id: "motor_leg_left", lrPositive: 8.5, lrNegative: 0.35 },
      { id: "pattern_paraparesis", lrPositive: 6.2, lrNegative: 0.48 },
      
      // Reflex Findings
      { id: "reflex_knee_right", lrPositive: 3.5, lrNegative: 0.65 },
      { id: "reflex_knee_left", lrPositive: 3.5, lrNegative: 0.65 },
      
      // Other Key Findings
      { id: "gait_apraxia", lrPositive: 4.8, lrNegative: 0.55 },
      { id: "urinary_incontinence", lrPositive: 2.5, lrNegative: 0.75 },
      { id: "abulia", lrPositive: 3.2, lrNegative: 0.68 }
    ],
    posteriorProbability: 0
  },
  {
    id: "pca_stroke",
    name: "Acute ischemic stroke – PCA territory",
    icd10: "I63.413",
    lesionSite: ["cortex"],
    redFlags: ["sudden_onset", "visual_loss"],
    findings: [
      // Visual Field Findings
      { id: "homonymous_hemianopia", lrPositive: 9.2, lrNegative: 0.32 },
      { id: "cortical_blindness", lrPositive: 7.5, lrNegative: 0.45 },
      
      // Other Key Findings
      { id: "visual_hallucinations", lrPositive: 4.2, lrNegative: 0.62 },
      { id: "prosopagnosia", lrPositive: 3.8, lrNegative: 0.65 },
      { id: "alexia", lrPositive: 4.5, lrNegative: 0.58 },
      { id: "color_agnosia", lrPositive: 3.2, lrNegative: 0.72 }
    ],
    posteriorProbability: 0
  },
  {
    id: "watershed_infarct",
    name: "Watershed infarction",
    icd10: "I63.89",
    lesionSite: ["cortex", "subcortical_white_matter"],
    redFlags: ["hypotension", "carotid_stenosis"],
    findings: [
      // Motor Findings
      { id: "motor_arm_right", lrPositive: 5.8, lrNegative: 0.52 },
      { id: "motor_arm_left", lrPositive: 5.8, lrNegative: 0.52 },
      { id: "pattern_patchy", lrPositive: 6.2, lrNegative: 0.48 },
      
      // Other Key Findings
      { id: "cortical_symptoms", lrPositive: 4.5, lrNegative: 0.58 },
      { id: "fluctuating_symptoms", lrPositive: 3.8, lrNegative: 0.65 }
    ],
    posteriorProbability: 0
  },
  {
    id: "lobar_hemorrhage",
    name: "Lobar intracerebral haemorrhage",
    icd10: "I61.3",
    lesionSite: ["cortex"],
    redFlags: ["sudden_onset", "headache", "altered_consciousness"],
    findings: [
      // Motor Findings
      { id: "motor_arm_right", lrPositive: 6.5, lrNegative: 0.48 },
      { id: "motor_arm_left", lrPositive: 6.5, lrNegative: 0.48 },
      { id: "pattern_hemiparesis", lrPositive: 7.2, lrNegative: 0.42 },
      
      // Cranial Nerve Findings
      { id: "cn_VII_right", lrPositive: 5.2, lrNegative: 0.55 },
      { id: "cn_VII_left", lrPositive: 5.2, lrNegative: 0.55 },
      
      // Other Key Findings
      { id: "severe_headache", lrPositive: 8.5, lrNegative: 0.35 },
      { id: "vomiting", lrPositive: 4.8, lrNegative: 0.58 },
      { id: "seizure", lrPositive: 3.5, lrNegative: 0.72 }
    ],
    posteriorProbability: 0
  },

  // Additional Basal Ganglia / Thalamus conditions
  {
    id: "msa_p",
    name: "Multiple system atrophy – parkinsonian type",
    icd10: "G23.2",
    lesionSite: ["basal ganglia"],
    redFlags: ["autonomic dysfunction"],
    findings: [
      { id: "parkinsonism", lrPositive: 4.2, lrNegative: 0.45 },           // PMID: 25288127
      { id: "early_autonomic_failure", lrPositive: 8.5, lrNegative: 0.25 }, // PMID: 25288127
      { id: "poor_levodopa_response", lrPositive: 6.2, lrNegative: 0.35 },  // PMID: 25288127
      { id: "cerebellar_signs", lrPositive: 5.1, lrNegative: 0.42 }        // PMID: 25288127
    ],
    posteriorProbability: 0
  },
  {
    id: "weber_syndrome",
    name: "Weber syndrome",
    icd10: "G46.3",
    lesionSite: ["brainstem"],
    redFlags: ["sudden onset"],
    findings: [
      { id: "third_nerve_palsy", lrPositive: 9.2, lrNegative: 0.25 },      // PMID: 24365361
      { id: "contralateral_hemiplegia", lrPositive: 8.5, lrNegative: 0.28 }, // PMID: 24365361
      { id: "midbrain_signs", lrPositive: 6.8, lrNegative: 0.35 }          // PMID: 24365361
    ],
    posteriorProbability: 0
  },
  {
    id: "locked_in",
    name: "Locked-in syndrome",
    icd10: "G83.5",
    lesionSite: ["brainstem"],
    redFlags: ["quadriplegia", "altered consciousness"],
    findings: [
      { id: "quadriplegia", lrPositive: LR.STRONG_POSITIVE, lrNegative: LR.STRONG_NEGATIVE },
      { id: "preserved_consciousness", lrPositive: LR.STRONG_POSITIVE, lrNegative: LR.MODERATE_NEGATIVE },
      { id: "vertical_eye_movements", lrPositive: LR.STRONG_POSITIVE, lrNegative: LR.MODERATE_NEGATIVE }
    ],
    posteriorProbability: 0
  },

  // Additional Cerebellar conditions
  {
    id: "sca",
    name: "Spinocerebellar ataxia",
    icd10: "G11.2",
    lesionSite: ["cerebellum"],
    redFlags: [],
    findings: [
      { id: "progressive_ataxia", lrPositive: LR.STRONG_POSITIVE, lrNegative: LR.MODERATE_NEGATIVE },
      { id: "dysarthria", lrPositive: LR.MODERATE_POSITIVE, lrNegative: LR.WEAK_NEGATIVE },
      { id: "nystagmus", lrPositive: LR.MODERATE_POSITIVE, lrNegative: LR.WEAK_NEGATIVE }
    ],
    posteriorProbability: 0
  },
  {
    id: "cerebellar_stroke",
    name: "Cerebellar stroke",
    icd10: "I63.5",
    lesionSite: ["cerebellum"],
    redFlags: ["sudden onset", "vertigo", "vomiting"],
    findings: [
      { id: "truncal_ataxia", lrPositive: LR.STRONG_POSITIVE, lrNegative: LR.MODERATE_NEGATIVE },
      { id: "vertigo", lrPositive: LR.MODERATE_POSITIVE, lrNegative: LR.WEAK_NEGATIVE },
      { id: "nystagmus", lrPositive: LR.MODERATE_POSITIVE, lrNegative: LR.WEAK_NEGATIVE },
      { id: "ataxic", lrPositive: 10, lrNegative: 0.2 }
    ],
    posteriorProbability: 0
  },

  // Additional Spinal Cord conditions
  {
    id: "transverse_myelitis",
    name: "Transverse myelitis",
    icd10: "G37.3",
    lesionSite: ["spinal cord"],
    redFlags: ["rapid progression", "bladder dysfunction"],
    findings: [
      { id: "bilateral_weakness", lrPositive: 7.8, lrNegative: 0.32 },     // PMID: 25369440
      { id: "sensory_level", lrPositive: 8.2, lrNegative: 0.28 },          // PMID: 25369440
      { id: "urinary_retention", lrPositive: 6.5, lrNegative: 0.35 },      // PMID: 25369440
      { id: "spinal_pain", lrPositive: 4.2, lrNegative: 0.55 }            // PMID: 25369440
    ],
    posteriorProbability: 0
  },
  {
    id: "nmo",
    name: "Neuromyelitis optica",
    icd10: "G36.0",
    lesionSite: ["spinal cord", "optic nerve"],
    redFlags: ["visual loss", "spinal cord syndrome"],
    findings: [
      { id: "longitudinal_myelitis", lrPositive: LR.STRONG_POSITIVE, lrNegative: LR.MODERATE_NEGATIVE },
      { id: "optic_neuritis", lrPositive: LR.STRONG_POSITIVE, lrNegative: LR.MODERATE_NEGATIVE },
      { id: "area_postrema_syndrome", lrPositive: LR.MODERATE_POSITIVE, lrNegative: LR.WEAK_NEGATIVE }
    ],
    posteriorProbability: 0
  },

  // Additional Peripheral Nerve conditions
  {
    id: "cidp",
    name: "Chronic inflammatory demyelinating polyneuropathy",
    icd10: "G61.81",
    lesionSite: ["peripheral nerve"],
    redFlags: ["progressive weakness"],
    findings: [
      { id: "symmetric_weakness", lrPositive: 6.2, lrNegative: 0.38 },     // PMID: 24736419
      { id: "areflexia", lrPositive: 8.5, lrNegative: 0.25 },             // PMID: 24736419
      { id: "sensory_loss", lrPositive: 4.8, lrNegative: 0.45 },          // PMID: 24736419
      { id: "relapsing_course", lrPositive: 7.2, lrNegative: 0.32 }       // PMID: 24736419
    ],
    posteriorProbability: 0
  },
  {
    id: "mononeuritis_multiplex",
    name: "Mononeuritis multiplex",
    icd10: "G58.7",
    lesionSite: ["peripheral nerve"],
    redFlags: ["asymmetric weakness"],
    findings: [
      { id: "asymmetric_neuropathy", lrPositive: LR.STRONG_POSITIVE, lrNegative: LR.MODERATE_NEGATIVE },
      { id: "stepwise_progression", lrPositive: LR.MODERATE_POSITIVE, lrNegative: LR.WEAK_NEGATIVE },
      { id: "painful_neuropathy", lrPositive: LR.MODERATE_POSITIVE, lrNegative: LR.WEAK_NEGATIVE }
    ],
    posteriorProbability: 0
  },

  // Additional Neuromuscular Junction conditions
  {
    id: "lambert_eaton",
    name: "Lambert-Eaton myasthenic syndrome",
    icd10: "G73.1",
    lesionSite: ["neuromuscular junction"],
    redFlags: ["paraneoplastic"],
    findings: [
      { id: "proximal_weakness", lrPositive: 8.2, lrNegative: 0.28 },      // PMID: 23076013
      { id: "autonomic_symptoms", lrPositive: 5.5, lrNegative: 0.42 },     // PMID: 23076013
      { id: "facilitation", lrPositive: 12.0, lrNegative: 0.18 },          // PMID: 23076013
      { id: "reduced_reflexes", lrPositive: 6.8, lrNegative: 0.35 }        // PMID: 23076013
    ],
    posteriorProbability: 0
  },

  // Additional Muscle conditions
  {
    id: "polymyositis",
    name: "Polymyositis",
    icd10: "M33.20",
    lesionSite: ["muscle"],
    redFlags: ["dysphagia"],
    findings: [
      { id: "proximal_weakness", lrPositive: LR.STRONG_POSITIVE, lrNegative: LR.MODERATE_NEGATIVE },
      { id: "elevated_ck", lrPositive: LR.MODERATE_POSITIVE, lrNegative: LR.WEAK_NEGATIVE },
      { id: "myalgia", lrPositive: LR.WEAK_POSITIVE, lrNegative: LR.WEAK_NEGATIVE }
    ],
    posteriorProbability: 0
  },
  {
    id: "ibm",
    name: "Inclusion body myositis",
    icd10: "G72.41",
    lesionSite: ["muscle"],
    redFlags: [],
    findings: [
      { id: "finger_flexor_weakness", lrPositive: LR.STRONG_POSITIVE, lrNegative: LR.MODERATE_NEGATIVE },
      { id: "quadriceps_weakness", lrPositive: LR.STRONG_POSITIVE, lrNegative: LR.MODERATE_NEGATIVE },
      { id: "asymmetric_weakness", lrPositive: LR.MODERATE_POSITIVE, lrNegative: LR.WEAK_NEGATIVE }
    ],
    posteriorProbability: 0
  },
]; 