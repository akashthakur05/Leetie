'use client';

import React, { useState, useEffect } from 'react';
import roadmapsData from '@/lib/data/roadmaps.json';
import questionsData from '@/lib/data/questions.json';
import { useProblemState } from '@/lib/storage';
import PhaseCard from './PhaseCard';
import styles from './RoadmapView.module.css';

export default function RoadmapView({ type = 'beginner' }) {
  const roadmapType = type === 'beginner' ? roadmapsData.beginner : roadmapsData.experienced;
  const [expandedPhase, setExpandedPhase] = useState(null);
  const [problems, setProblems] = useState({});
  const [loading, setLoading] = useState(true);

  // Load problems data
  useEffect(() => {
    if (questionsData?.data) {
      const problemsMap = {};
      questionsData.data.forEach(problem => {
        problemsMap[problem.slug] = problem;
      });
      setProblems(problemsMap);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading roadmap...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{roadmapType.name}</h1>
        <p className={styles.description}>{roadmapType.description}</p>
      </div>

      <div className={styles.phasesGrid}>
        {roadmapType.phases.map((phase, index) => (
          <PhaseCard
            key={phase.id}
            phase={phase}
            problems={problems}
            phaseNumber={index + 1}
            isExpanded={expandedPhase === phase.id}
            onToggleExpand={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
          />
        ))}
      </div>

      <div className={styles.footer}>
        <p>💡 Complete phases in order for best results. Each phase builds on the previous one.</p>
      </div>
    </div>
  );
}
