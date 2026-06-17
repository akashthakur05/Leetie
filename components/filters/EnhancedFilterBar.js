'use client';

import React, { useState } from 'react';
import styles from './EnhancedFilterBar.module.css';

export default function EnhancedFilterBar({
  searchQuery,
  onSearchChange,
  selectedPatterns,
  onPatternsChange,
  allPatterns,
  selectedDifficulty,
  onDifficultyChange,
  selectedCompanies,
  onCompaniesChange,
  allCompanies,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange
}) {
  const [expandedFilter, setExpandedFilter] = useState(null);

  const difficulties = ['Easy', 'Medium', 'Hard'];

  const togglePattern = (pattern) => {
    onPatternsChange(
      selectedPatterns.includes(pattern)
        ? selectedPatterns.filter(p => p !== pattern)
        : [...selectedPatterns, pattern]
    );
  };

  const toggleDifficulty = (diff) => {
    onDifficultyChange(
      selectedDifficulty.includes(diff)
        ? selectedDifficulty.filter(d => d !== diff)
        : [...selectedDifficulty, diff]
    );
  };

  const toggleCompany = (company) => {
    onCompaniesChange(
      selectedCompanies.includes(company)
        ? selectedCompanies.filter(c => c !== company)
        : [...selectedCompanies, company]
    );
  };

  const clearAllFilters = () => {
    onSearchChange('');
    onPatternsChange([]);
    onDifficultyChange([]);
    onCompaniesChange([]);
    setSortBy('frequency');
  };

  const hasActiveFilters = selectedPatterns.length > 0 || selectedDifficulty.length > 0 || selectedCompanies.length > 0;

  return (
    <div className={styles.filterBar}>
      {/* Search */}
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search problems..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className={styles.searchInput}
        />
        <span className={styles.searchIcon}>🔍</span>
      </div>

      {/* Filter Controls */}
      <div className={styles.filterControls}>
        {/* Pattern Filter */}
        <div className={styles.filterDropdown}>
          <button
            className={`${styles.filterButton} ${selectedPatterns.length > 0 ? styles.active : ''}`}
            onClick={() => setExpandedFilter(expandedFilter === 'pattern' ? null : 'pattern')}
          >
            <span>Patterns {selectedPatterns.length > 0 && `(${selectedPatterns.length})`}</span>
            <span className={styles.arrow}>▼</span>
          </button>
          {expandedFilter === 'pattern' && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownContent}>
                {allPatterns.map(pattern => (
                  <label key={pattern} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={selectedPatterns.includes(pattern)}
                      onChange={() => togglePattern(pattern)}
                      className={styles.checkbox}
                    />
                    <span>{pattern}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Difficulty Filter */}
        <div className={styles.filterDropdown}>
          <button
            className={`${styles.filterButton} ${selectedDifficulty.length > 0 ? styles.active : ''}`}
            onClick={() => setExpandedFilter(expandedFilter === 'difficulty' ? null : 'difficulty')}
          >
            <span>Difficulty {selectedDifficulty.length > 0 && `(${selectedDifficulty.length})`}</span>
            <span className={styles.arrow}>▼</span>
          </button>
          {expandedFilter === 'difficulty' && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownContent}>
                {difficulties.map(diff => (
                  <label key={diff} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={selectedDifficulty.includes(diff)}
                      onChange={() => toggleDifficulty(diff)}
                      className={styles.checkbox}
                    />
                    <span className={styles[`difficulty-${diff.toLowerCase()}`]}>
                      {diff}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Company Filter */}
        <div className={styles.filterDropdown}>
          <button
            className={`${styles.filterButton} ${selectedCompanies.length > 0 ? styles.active : ''}`}
            onClick={() => setExpandedFilter(expandedFilter === 'company' ? null : 'company')}
          >
            <span>Companies {selectedCompanies.length > 0 && `(${selectedCompanies.length})`}</span>
            <span className={styles.arrow}>▼</span>
          </button>
          {expandedFilter === 'company' && (
            <div className={styles.dropdown} style={{ maxHeight: '300px', overflowY: 'auto' }}>
              <div className={styles.dropdownContent}>
                {allCompanies.map(company => (
                  <label key={company} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={selectedCompanies.includes(company)}
                      onChange={() => toggleCompany(company)}
                      className={styles.checkbox}
                    />
                    <span>{company}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sort */}
        <div className={styles.filterDropdown}>
          <button
            className={styles.filterButton}
            onClick={() => setExpandedFilter(expandedFilter === 'sort' ? null : 'sort')}
          >
            <span>Sort: {sortBy === 'frequency' ? 'Frequency' : sortBy === 'difficulty' ? 'Difficulty' : 'Title'}</span>
            <span className={styles.arrow}>▼</span>
          </button>
          {expandedFilter === 'sort' && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownContent}>
                {[
                  { value: 'frequency', label: 'Frequency' },
                  { value: 'difficulty', label: 'Difficulty' },
                  { value: 'title', label: 'Title A-Z' }
                ].map(option => (
                  <button
                    key={option.value}
                    className={`${styles.sortOption} ${sortBy === option.value ? styles.selected : ''}`}
                    onClick={() => {
                      onSortChange(option.value);
                      setExpandedFilter(null);
                    }}
                  >
                    {sortBy === option.value && '✓ '}
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* View Mode Toggle */}
        <div className={styles.viewToggle}>
          <button
            className={`${styles.viewButton} ${viewMode === 'list' ? styles.active : ''}`}
            onClick={() => onViewModeChange('list')}
            title="List view"
          >
            ≡
          </button>
          <button
            className={`${styles.viewButton} ${viewMode === 'pattern' ? styles.active : ''}`}
            onClick={() => onViewModeChange('pattern')}
            title="Pattern view"
          >
            ≣
          </button>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            className={styles.clearButton}
            onClick={clearAllFilters}
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}
