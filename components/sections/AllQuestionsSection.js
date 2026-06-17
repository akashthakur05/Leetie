'use client';

import React, { useState, useEffect, useMemo } from 'react';
import questionsData from '@/lib/data/questions.json';
import ReferenceProblemRow from '../problems/ReferenceProblemRow';
import EnhancedFilterBar from '../filters/EnhancedFilterBar';
import ImportExportUI from '../ImportExportUI';
import { useLazyLoad } from '@/lib/useLazyLoad';
import styles from './AllQuestionsSection.module.css';

export default function AllQuestionsSection() {
  const [allProblems, setAllProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [selectedPatterns, setSelectedPatterns] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('frequency');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'pattern'
  const [loading, setLoading] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  
  // Lazy loading for list view
  const lazyLoad = useLazyLoad(filteredProblems);

  // Load problems
  useEffect(() => {
    if (questionsData?.data) {
      setAllProblems(questionsData.data);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Extract unique patterns from all problems
  const allPatterns = useMemo(() => {
    const patterns = new Set();
    allProblems.forEach(problem => {
      if (problem.pattern && Array.isArray(problem.pattern)) {
        problem.pattern.forEach(p => patterns.add(p));
      }
    });
    return Array.from(patterns).sort();
  }, [allProblems]);

  // Extract unique companies
  const allCompanies = useMemo(() => {
    const companies = new Set();
    allProblems.forEach(problem => {
      if (problem.companies && Array.isArray(problem.companies)) {
        problem.companies.forEach(c => companies.add(c.name));
      }
    });
    return Array.from(companies).sort();
  }, [allProblems]);

  // Apply filters
  useEffect(() => {
    let filtered = [...allProblems];

    // Pattern filter
    if (selectedPatterns.length > 0) {
      filtered = filtered.filter(p =>
        selectedPatterns.some(pattern => p.pattern?.includes(pattern))
      );
    }

    // Difficulty filter
    if (selectedDifficulty.length > 0) {
      filtered = filtered.filter(p =>
        selectedDifficulty.includes(p.difficulty)
      );
    }

    // Company filter
    if (selectedCompanies.length > 0) {
      filtered = filtered.filter(p =>
        selectedCompanies.some(company =>
          p.companies?.some(c => c.name === company)
        )
      );
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.pattern?.some(pattern => pattern.toLowerCase().includes(query))
      );
    }

    // Sort
    switch (sortBy) {
      case 'frequency':
        filtered.sort((a, b) => {
          const freqA = a.companies?.[0]?.frequency || 0;
          const freqB = b.companies?.[0]?.frequency || 0;
          return freqB - freqA;
        });
        break;
      case 'difficulty':
        const diffOrder = { Easy: 0, Medium: 1, Hard: 2 };
        filtered.sort((a, b) =>
          (diffOrder[a.difficulty] || 999) - (diffOrder[b.difficulty] || 999)
        );
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    setFilteredProblems(filtered);
  }, [selectedPatterns, selectedDifficulty, selectedCompanies, searchQuery, sortBy, allProblems]);

  // Group by pattern for pattern view
  const groupedByPattern = useMemo(() => {
    const grouped = {};
    filteredProblems.forEach(problem => {
      const patterns = problem.pattern || ['Uncategorized'];
      patterns.forEach(pattern => {
        if (!grouped[pattern]) {
          grouped[pattern] = [];
        }
        grouped[pattern].push(problem);
      });
    });
    return grouped;
  }, [filteredProblems]);

  if (loading) {
    return <div className={styles.loading}>Loading questions...</div>;
  }

  if (!hydrated) return null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>All Questions</h1>
        <p className={styles.subtitle}>
          Explore all {allProblems.length} problems organized by patterns and companies
        </p>
      </div>

      <ImportExportUI />

      <EnhancedFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedPatterns={selectedPatterns}
        onPatternsChange={setSelectedPatterns}
        allPatterns={allPatterns}
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={setSelectedDifficulty}
        selectedCompanies={selectedCompanies}
        onCompaniesChange={setSelectedCompanies}
        allCompanies={allCompanies}
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <div className={styles.resultsHeader}>
        <span className={styles.resultCount}>
          {filteredProblems.length} question{filteredProblems.length !== 1 ? 's' : ''} found
        </span>
      </div>

      {filteredProblems.length === 0 ? (
        <div className={styles.empty}>
          <p>No problems match your filters. Try adjusting your selection.</p>
        </div>
      ) : viewMode === 'pattern' ? (
        <div className={styles.patternView}>
          {Object.entries(groupedByPattern)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([pattern, problems]) => (
              <div key={pattern} className={styles.patternSection}>
                <h3 className={styles.patternTitle}>
                  {pattern}
                  <span className={styles.problemCount}>({problems.length})</span>
                </h3>
                <div className={styles.problemsList}>
                  {problems.map(problem => (
                    <ReferenceProblemRow key={problem.slug} problem={problem} />
                  ))}
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className={styles.listView}>
          {lazyLoad.displayedItems.map(problem => (
            <ReferenceProblemRow key={problem.slug} problem={problem} />
          ))}
          {lazyLoad.hasMore && (
            <div className={styles.loadingMore} ref={lazyLoad.observerTarget}>
              <div className={styles.spinner}></div>
              <p>Loading more problems...</p>
            </div>
          )}
          {!lazyLoad.hasMore && lazyLoad.loadedCount > 0 && (
            <div className={styles.endMessage}>
              <p>All {lazyLoad.loadedCount} problems loaded</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
