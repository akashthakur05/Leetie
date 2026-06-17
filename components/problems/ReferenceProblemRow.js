'use client';

import React, { useEffect, useState } from 'react';
import { useProblemState } from '@/lib/storage';
import styles from './ReferenceProblemRow.module.css';

// Company logo URLs mapping
const COMPANY_LOGOS = {
  google: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
  amazon: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
  facebook: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.svg',
  microsoft: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg',
  apple: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
  goldman: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Goldman_Sachs.svg',
  jpmorgan: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/JPMorgan_Chase_%26_Co._Logo_2008-2014.svg',
  uber: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Uber_logo.svg',
  netflix: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Netflix_logo.svg',
  adobe: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Adobe_Systems_logo_and_wordmark.svg',
};

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
            {problem.companies.slice(0, 8).map((company) => (
              <div
                key={company.slug}
                className={styles.companyBadge}
                title={`${company.name} (${company.frequency} times)`}
              >
                <span className={styles.companyInitial}>
                  {company.name.charAt(0).toUpperCase()}
                </span>
              </div>
            ))}
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

      <button
        onClick={() => setShowHint(!showHint)}
        className={styles.hintButton}
        title="Show hint"
      >
        💡 {showHint ? 'Hide' : 'Show'} hint
      </button>

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
