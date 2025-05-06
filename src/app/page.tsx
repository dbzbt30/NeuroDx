'use client';

import React, { useState, useEffect, useMemo } from 'react';
import ExamShell from '@/components/exam-flow/ExamShell';
import QuickTriageSheet from '@/components/exam-flow/QuickTriageSheet';
import CranialNervesGrid from '@/components/exam-flow/CranialNervesGrid';
import MotorExam from '@/components/exam-flow/MotorExam';
import SensoryExam from '@/components/exam-flow/SensoryExam';
import ReflexesExam from '@/components/exam-flow/ReflexesExam';
import DynamicDiagnosis from '@/components/diagnosis/DynamicDiagnosis';
import { Finding, Disease, calculateDiagnosis } from '@/lib/diagnosis';

interface ExamState {
  findings: Finding[];
}

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [examState, setExamState] = useState<ExamState>({
    findings: []
  });

  const allFindings = useMemo(() => examState.findings, [examState.findings]);

  useEffect(() => {
    const diagnosis = calculateDiagnosis(allFindings);
    // You can use the diagnosis for further processing if needed
  }, [allFindings]);

  const handleTriageComplete = (findings: Finding[]) => {
    setExamState(prev => ({
      ...prev,
      findings: [...prev.findings, ...findings]
    }));
    setCurrentStep(2);
  };

  const handleCranialNervesComplete = (findings: Finding[]) => {
    setExamState(prev => ({
      ...prev,
      findings: [...prev.findings, ...findings]
    }));
    setCurrentStep(3);
  };

  const handleMotorExamComplete = (findings: Finding[]) => {
    setExamState(prev => ({
      ...prev,
      findings: [...prev.findings, ...findings]
    }));
    setCurrentStep(4);
  };

  const handleSensoryExamComplete = (findings: Finding[]) => {
    setExamState(prev => ({
      ...prev,
      findings: [...prev.findings, ...findings]
    }));
    setCurrentStep(5);
  };

  const handleReflexesExamComplete = (findings: Finding[]) => {
    setExamState(prev => ({
      ...prev,
      findings: [...prev.findings, ...findings]
    }));
    setCurrentStep(6);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <QuickTriageSheet onComplete={handleTriageComplete} />;
      case 2:
        return <CranialNervesGrid onComplete={handleCranialNervesComplete} />;
      case 3:
        return <MotorExam onComplete={handleMotorExamComplete} />;
      case 4:
        return <SensoryExam onComplete={handleSensoryExamComplete} />;
      case 5:
        return <ReflexesExam onComplete={handleReflexesExamComplete} />;
      case 6:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Examination Complete</h2>
            <p className="mt-2 text-gray-600">
              Review the findings and differential diagnosis below
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ExamShell currentStep={currentStep}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {renderStep()}
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <DynamicDiagnosis findings={allFindings} />
          </div>
        </div>
      </ExamShell>
    </div>
  );
}
