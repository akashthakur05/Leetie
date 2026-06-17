'use client';

import React from 'react';
import styles from './ViewTabs.module.css';

export default function ViewTabs({ activeView, onViewChange }) {
  const tabs = [
    { id: 'beginner', label: 'Beginner Roadmap', icon: '🎯' },
    { id: 'experienced', label: 'Experienced Roadmap', icon: '⚡' },
    { id: 'all', label: 'All Questions', icon: '📚' }
  ];

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabs}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onViewChange(tab.id)}
            className={`${styles.tab} ${activeView === tab.id ? styles.active : ''}`}
            aria-selected={activeView === tab.id}
          >
            <span className={styles.icon}>{tab.icon}</span>
            <span className={styles.label}>{tab.label}</span>
          </button>
        ))}
      </div>
      <div className={styles.underline} />
    </div>
  );
}
