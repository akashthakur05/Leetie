// Import/Export functionality for problem progress and state

const EXPORT_VERSION = '1.0';
const STORAGE_KEY = 'grind75_problems';

export function exportProgress() {
  try {
    const problemsData = localStorage.getItem(STORAGE_KEY);
    const exportData = {
      version: EXPORT_VERSION,
      exportDate: new Date().toISOString(),
      data: problemsData ? JSON.parse(problemsData) : {},
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `leetie-progress-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return { success: true, message: 'Progress exported successfully' };
  } catch (error) {
    console.error('[v0] Export error:', error);
    return { success: false, message: 'Failed to export progress', error };
  }
}

export function importProgress(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file selected'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);

        // Validate structure
        if (!importedData.version || !importedData.data) {
          throw new Error('Invalid file format');
        }

        // Import the data
        localStorage.setItem(STORAGE_KEY, JSON.stringify(importedData.data));
        resolve({
          success: true,
          message: 'Progress imported successfully',
          problemsCount: Object.keys(importedData.data).length,
        });
      } catch (error) {
        console.error('[v0] Import error:', error);
        reject(new Error(`Failed to import file: ${error.message}`));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsText(file);
  });
}

export function getCompletionStats() {
  try {
    const problemsData = localStorage.getItem(STORAGE_KEY);
    const problems = problemsData ? JSON.parse(problemsData) : {};
    const completed = Object.values(problems).filter((p) => p.done).length;
    const total = Object.keys(problems).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { completed, total, percentage };
  } catch (error) {
    console.error('[v0] Stats error:', error);
    return { completed: 0, total: 0, percentage: 0 };
  }
}
