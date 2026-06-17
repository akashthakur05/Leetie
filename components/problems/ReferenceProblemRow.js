'use client';

import React, { useEffect, useState } from 'react';
import { useProblemState } from '@/lib/storage';
import styles from './ReferenceProblemRow.module.css';

export default function ReferenceProblemRow({ problem, compact = false }) {
  const [state, setState] = useState({});
  const [hydrated, setHydrated] = useState(false);

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
        <div className={styles.titleRow}>
          <a
            href="#"
            onClick={openLeetCode}
            className={`${styles.title} ${done ? styles.doneName : ''}`}
          >
            {problem.title}
          </a>
          {topCompany && (
            <span className={styles.company}>{topCompany.name}</span>
          )}
        </div>
        {problem.pattern && problem.pattern.length > 0 && (
          <div className={styles.patterns}>
            {problem.pattern.slice(0, 3).map((p) => (
              <span key={p} className={styles.pattern}>
                {p}
              </span>
            ))}
          </div>
        )}
      </div>

      <span className={`${styles.difficulty} ${styles[`difficulty-${difficulty.toLowerCase()}`]}`}>
        {difficulty}
      </span>

      <span className={styles.frequency}>{frequency > 0 ? frequency : '—'}</span>

      <button
        onClick={handleToggleStar}
        className={`${styles.starButton} ${starred ? styles.starred : ''}`}
        title="Star this problem"
      >
        ★
      </button>
    </div>
  );
}
