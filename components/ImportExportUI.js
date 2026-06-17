'use client';

import React, { useRef, useState } from 'react';
import { exportProgress, importProgress, getCompletionStats } from '@/lib/importExport';
import styles from './ImportExportUI.module.css';

export default function ImportExportUI() {
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleExport = async () => {
    try {
      const result = exportProgress();
      if (result.success) {
        setMessageType('success');
        setMessage('Progress exported successfully!');
      } else {
        setMessageType('error');
        setMessage('Failed to export progress');
      }
    } catch (error) {
      setMessageType('error');
      setMessage('Export failed: ' + error.message);
    }
    setTimeout(() => setMessage(''), 3000);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const result = await importProgress(file);
      setMessageType('success');
      setMessage(`Imported ${result.problemsCount} problems successfully!`);
      
      // Trigger a page reload to reflect changes
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      setMessageType('error');
      setMessage('Import failed: ' + error.message);
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    setTimeout(() => setMessage(''), 3000);
  };

  const stats = getCompletionStats();

  return (
    <div className={styles.container}>
      <div className={styles.stats}>
        <span className={styles.completion}>
          {stats.completed}/{stats.total} completed ({stats.percentage}%)
        </span>
      </div>

      <div className={styles.actions}>
        <button onClick={handleExport} className={styles.exportBtn} title="Export progress">
          ⬇ Export
        </button>
        <button onClick={handleImportClick} className={styles.importBtn} title="Import progress">
          ⬆ Import
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
        aria-label="Import progress file"
      />

      {message && (
        <div className={`${styles.message} ${styles[messageType]}`}>
          {message}
        </div>
      )}
    </div>
  );
}
