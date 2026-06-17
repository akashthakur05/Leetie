'use client';

import React, { useEffect, useState } from 'react';
import { useProblemState } from '@/lib/storage';
import styles from './ReferenceProblemRow.module.css';

import { getCompanyLogoData } from '@/lib/companyLogoService';

export default function ReferenceProblemRow({ problem, compact = false }) {
  const [state, setState] = useState({});
  const [hydrated, setHydrated] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Use the title from reference data as the key for localStorage
  const problemTitle = problem.title;

  useEffect(() => {
    setHydrated(true);
    try {
      const allState = JSON.parse(localStorage.getItem('grind75_problems') || '{}');
      setState(allState[problemTitle] || {});
    } catch (e) {
      setState({});
    }
  }, [problemTitle]);

  const handleMarkDone = (e) => {
    e.stopPropagation();
    if (!hydrated) return;

    const allState = JSON.parse(localStorage.getItem('grind75_problems') || '{}');
    const currentState = allState[problemTitle] || {};
    const isDone = currentState.done;

    const newState = {
      ...currentState,
      done: !isDone,
      doneAt: !isDone ? new Date().toISOString() : undefined,
    };

    allState[problemTitle] = newState;
    localStorage.setItem('grind75_problems', JSON.stringify(allState));
    setState(newState);
  };

  const handleToggleStar = (e) => {
    e.stopPropagation();
    if (!hydrated) return;

    const allState = JSON.parse(localStorage.getItem('grind75_problems') || '{}');
    const currentState = allState[problemTitle] || {};

    const newState = {
      ...currentState,
      starred: !currentState.starred,
    };

    allState[problemTitle] = newState;
    localStorage.setItem('grind75_problems', JSON.stringify(allState));
    setState(newState);
  };

  const openLeetCode = (e) => {
    e.stopPropagation();
    const url = problem.link || `https://leetcode.com/problems/${problem.slug || problem.title.toLowerCase().replace(/\s+/g, '-')}`;
    window.open(url, '_blank');
  };

  if (!hydrated) return null;

  const { done = false, starred = false } = state;
  const difficulty = problem.difficulty || 'Medium';
  const topCompany = problem.companies?.[0];
  const frequency = topCompany?.frequency || 0;

  if (compact) {
    return (
      <div className={styles.compactRow}>
        <button
          onClick={handleMarkDone}
          className={`${styles.checkbox} ${done ? styles.done : ''}`}
          title={done ? 'Mark as incomplete' : 'Mark as done'}
        >
          {done ? '✓' : '○'}
        </button>
        <a
          href="#"
          onClick={openLeetCode}
          className={`${styles.title} ${done ? styles.doneName : ''}`}
        >
          {problem.title}
        </a>
        <span className={`${styles.difficulty} ${styles[`difficulty-${difficulty.toLowerCase()}`]}`}>
          {difficulty.charAt(0)}
        </span>
      </div>
    );
  }

  return (
    <div className={`${styles.row} ${done ? styles.rowDone : ''}`}>
      <button
        onClick={handleMarkDone}
        className={`${styles.doneButton} ${done ? styles.done : ''}`}
        title={done ? 'Mark as incomplete' : 'Mark as done'}
      >
        {done ? '✓' : '○'}
      </button>

      <div className={styles.info}>
        <div className={styles.titleSection}>
          <a
            href="#"
            onClick={openLeetCode}
            className={`${styles.title} ${done ? styles.doneName : ''}`}
          >
            {problem.title}
          </a>
          
          <div className={styles.tagsRow}>
            {problem.pattern && problem.pattern.length > 0 && (
              <span className={styles.patternTag}>
                {problem.pattern[0]}
              </span>
            )}
            {problem.pattern && problem.pattern.length > 1 && (
              <span className={styles.patternTag}>
                {problem.pattern[1]}
              </span>
            )}
            <span className={`${styles.difficulty} ${styles[`difficulty-${difficulty.toLowerCase()}`]}`}>
              {difficulty}
            </span>
          </div>
        </div>

        {problem.companies && problem.companies.length > 0 && (
          <div className={styles.companiesRow}>
            {problem.companies.slice(0, 8).map((company) => {
              const logoData = getCompanyLogoData(company.slug);
              return (
                <div
                  key={company.slug}
                  className={styles.companyBadge}
                  title={`${logoData.name} (${company.frequency})`}
                  style={{
                    backgroundColor: logoData.bgColor,
                    color: logoData.color,
                    borderColor: logoData.color,
                  }}
                >
                  <span className={styles.companyInitial}>
                    {logoData.initials}
                  </span>
                </div>
              );
            })}
            {problem.companies.length > 8 && (
              <div className={styles.moreCompanies}>
                +{problem.companies.length - 8}
              </div>
            )}
          </div>
        )}

        {showHint && (
          <div className={styles.hint}>
            <p>💡 Try using a hash map or array to solve this problem efficiently.</p>
          </div>
        )}
      </div>

      <div className={styles.metricsRow}>
        {frequency && (
          <span className={styles.frequency} title="Frequency score">
            {frequency}
          </span>
        )}
        {problem.acceptance && (
          <span className={styles.acceptance} title="Acceptance rate">
            {problem.acceptance}%
          </span>
        )}
      </div>

      <div className={styles.actions}>
        <button
          onClick={() => setShowHint(!showHint)}
          className={styles.hintButton}
          title="Show hint"
        >
          💡 {showHint ? 'Hide' : 'Show'}
        </button>

        <button
          onClick={openLeetCode}
          className={styles.solveButton}
          title="Solve on LeetCode"
        >
          ▶ Solve
        </button>

        <button
          onClick={handleToggleStar}
          className={`${styles.starButton} ${starred ? styles.starred : ''}`}
          title="Star this problem"
        >
          ★
        </button>
      </div>
    </div>
  );
}
