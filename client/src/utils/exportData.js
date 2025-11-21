/**
 * Export Data Utilities
 * Functions to export user data in various formats
 */

/**
 * Convert data to JSON and download
 */
export function exportToJSON(data, filename = 'lifeboard-data') {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  downloadBlob(blob, `${filename}.json`);
}

/**
 * Convert data to CSV and download
 */
export function exportToCSV(data, filename = 'lifeboard-data') {
  if (!Array.isArray(data) || data.length === 0) {
    console.error('Data must be a non-empty array');
    return;
  }

  // Get headers from first object
  const headers = Object.keys(data[0]);
  
  // Create CSV content
  const csvContent = [
    headers.join(','), // Header row
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escape commas and quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  downloadBlob(blob, `${filename}.csv`);
}

/**
 * Download blob as file
 */
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Get all exportable data
 */
export function getAllData() {
  const data = {
    user: JSON.parse(localStorage.getItem('lifeboard-user') || '{}'),
    tasks: JSON.parse(localStorage.getItem('lifeboard-todos') || '{}'),
    activities: JSON.parse(localStorage.getItem('lifeboard-activities') || '{}'),
    preferences: JSON.parse(localStorage.getItem('lifeboard-preferences') || '{}'),
    community: JSON.parse(localStorage.getItem('lifeboard-community') || '{}'),
    messages: JSON.parse(localStorage.getItem('lifeboard-messages') || '{}'),
    exportedAt: new Date().toISOString(),
  };

  return data;
}

/**
 * Export tasks only
 */
export function exportTasks(format = 'json') {
  const tasksData = JSON.parse(localStorage.getItem('lifeboard-todos') || '{}');
  const tasks = tasksData.state?.tasks || [];

  if (format === 'csv') {
    exportToCSV(tasks, 'lifeboard-tasks');
  } else {
    exportToJSON({ tasks, exportedAt: new Date().toISOString() }, 'lifeboard-tasks');
  }
}

/**
 * Export activities only
 */
export function exportActivities(format = 'json') {
  const activitiesData = JSON.parse(localStorage.getItem('lifeboard-activities') || '{}');
  const activities = activitiesData.state?.activities || [];

  if (format === 'csv') {
    exportToCSV(activities, 'lifeboard-activities');
  } else {
    exportToJSON({ activities, exportedAt: new Date().toISOString() }, 'lifeboard-activities');
  }
}

/**
 * Export all data
 */
export function exportAllData(format = 'json') {
  const data = getAllData();

  if (format === 'json') {
    exportToJSON(data, 'lifeboard-complete-export');
  } else {
    // For CSV, export each section separately
    exportTasks('csv');
    exportActivities('csv');
  }
}
