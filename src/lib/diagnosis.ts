// Import the disease database first
import { DISEASES } from './diseaseDatabase';

export interface Finding {
  id: string;
  name: string;
  type: "motor" | "sensory" | "redFlag" | "cranialNerve" | "reflex" | "coordination" | "special_test" | "cognitive";
  laterality?: "left" | "right" | "bilateral";
  location?: string;
}

export interface Disease {
  id: string;
  name: string;
  icd10: string;
  findings: {
    id: string;
    lrPositive: number;
    lrNegative: number;
  }[];
  lesionSite: string[];
  redFlags: string[];
  posteriorProbability: number;
}

export interface DiagnosisResult {
  diseases: Disease[];
  lesionSite: string[];
  redFlags: string[];
  confidence: number;
}

// Helper function to calculate posterior probability using Bayes' theorem
function calculatePosteriorProbability(prior: number, lrPositive: number, lrNegative: number, isPresent: boolean): number {
  const lr = isPresent ? lrPositive : lrNegative;
  const posterior = (prior * lr) / ((prior * lr) + (1 - prior));
  return posterior;
}

// Helper function to determine if findings suggest a pattern
function detectPatterns(findings: Finding[]): string[] {
  const patterns: string[] = [];
  
  // Check for bilateral findings
  const leftFindings = findings.filter(f => f.laterality === 'left');
  const rightFindings = findings.filter(f => f.laterality === 'right');
  
  // Pattern detection logic
  if (leftFindings.length > 0 && rightFindings.length > 0) {
    // Check for symmetric patterns
    const leftMotor = leftFindings.filter(f => f.type === 'motor').length;
    const rightMotor = rightFindings.filter(f => f.type === 'motor').length;
    if (leftMotor > 0 && rightMotor > 0) {
      patterns.push('bilateral');
    }
  }
  
  return patterns;
}

// Main diagnosis calculation function
export function calculateDiagnosis(findings: Finding[]): DiagnosisResult {
  // Initialize all diseases with a prior probability
  const diseases = DISEASES.map(disease => ({
    ...disease,
    posteriorProbability: 0.01 // 1% prior probability for each disease
  }));

  // Calculate posterior probabilities for each disease
  diseases.forEach(disease => {
    let probability = disease.posteriorProbability;

    // Update probability based on each finding
    findings.forEach(finding => {
      const diseaseFindings = disease.findings.find(df => df.id === finding.id);
      if (diseaseFindings) {
        probability = calculatePosteriorProbability(
          probability,
          diseaseFindings.lrPositive,
          diseaseFindings.lrNegative,
          true
        );
      }
    });

    // Update disease probability
    disease.posteriorProbability = probability;
  });

  // Sort diseases by probability
  const sortedDiseases = diseases
    .filter(d => d.posteriorProbability > 0.01)
    .sort((a, b) => b.posteriorProbability - a.posteriorProbability);

  // Collect unique lesion sites from top diseases
  const lesionSites = Array.from(new Set(
    sortedDiseases
      .slice(0, 3)
      .flatMap(d => d.lesionSite)
  ));

  // Collect red flags from findings and top diseases
  const redFlags = Array.from(new Set(
    sortedDiseases
      .slice(0, 3)
      .flatMap(d => d.redFlags)
  ));

  // Calculate overall confidence based on:
  // 1. Strength of top diagnosis
  // 2. Gap between first and second diagnosis
  // 3. Pattern matching
  let confidence = 0;
  if (sortedDiseases.length > 0) {
    const topDisease = sortedDiseases[0];
    confidence = topDisease.posteriorProbability;

    // Increase confidence if there's a clear leader
    if (sortedDiseases.length > 1) {
      const probabilityGap = topDisease.posteriorProbability - sortedDiseases[1].posteriorProbability;
      if (probabilityGap > 0.3) {
        confidence *= 1.2;
      }
    }

    // Adjust confidence based on pattern matching
    const patterns = detectPatterns(findings);
    if (patterns.length > 0) {
      confidence *= 1.1;
    }
  }

  return {
    diseases: sortedDiseases,
    lesionSite: lesionSites,
    redFlags,
    confidence: Math.min(confidence, 1) // Cap at 100%
  };
}
