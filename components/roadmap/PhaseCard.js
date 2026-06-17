'use client';

import React, { useState, useEffect } from 'react';
import ReferenceProblemRow from '../problems/ReferenceProblemRow';
import styles from './PhaseCard.module.css';

export default function PhaseCard({ phase, problems, phaseNumber, isExpanded, onToggleExpand }) {
  const [completedCount, setCompletedCount] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || !phase.problems) return;

    const completed = phase.problems.filter(slug => {
      const problemTitle = problems[slug]?.title;
      if (!problemTitle) return false;
      
      try {
        const state = JSON.parse(localStorage.getItem('grind75_problems') || '{}');
        return state[problemTitle]?.done === true;
      } catch (e) {
        return false;
      }
    }).length;

    setCompletedCount(completed);
  }, [phase.problems, problems, hydrated, isExpanded]);

  if (!hydrated) return null;

  const totalProblems = phase.problems.length;
  const completionPercentage = totalProblems > 0 ? Math.round((completedCount / totalProblems) * 100) : 0;

  const phaseProblemsList = phase.problems
    .map(slug => problems[slug])
    .filter(Boolean);

  return (
    <div className={`${styles.card} ${isExpanded ? styles.expanded : ''}`}>
      <button
        className={styles.header}
        onClick={onToggleExpand}
        aria-expanded={isExpanded}
      >
        <div className={styles.titleSection}>
          <span className={styles.phaseNumber}>{phaseNumber}</span>
          <div className={styles.titleContent}>
            <h3 className={styles.title}>{phase.title}</h3>
            <p className={styles.description}>{phase.description}</p>
          </div>
        </div>
        <div className={styles.meta}>
          <div className={styles.progressIndicator}>
            <div className={styles.progressLabel}>
              {completedCount}/{totalProblems}
            </div>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
          <span className={styles.expandIcon}>{isExpanded ? '▼' : '▶'}</span>
        </div>
      </button>

      {isExpanded && (
        <div className={styles.content}>
          <div className={styles.problemsList}>
            {phaseProblemsList.map(problem => (
              <ReferenceProblemRow
                key={problem.slug}
                problem={problem}
                compact={true}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
