// ============================================================
// Task 10: JavaScript Promises - Introduction, Detail & Revisited
// ============================================================
// Rewrites Task 8's saveTaskCallback as a Promise-based function,
// using fs.promises (the Promise-returning version of the fs API)
// instead of the callback-style fs.appendFile.
const fs = require('fs');
const path = require('path');

const TASKS_FILE = path.join(__dirname, 'tasks.txt');

/**
 * Appends a task to tasks.txt and returns a Promise.
 * @param {string} task
 * @returns {Promise<void>}
 */
function saveTaskPromise(task) {
  return fs.promises.appendFile(TASKS_FILE, task + '\n');
}

console.log('Task Logger Started');

// --- Demo call: .then() for success, .catch() for failure ---
saveTaskPromise('Read Node.js docs')
  .then(() => {
    console.log('Task saved successfully (promise style).');
  })
  .catch((err) => {
    console.log('Failed to save task:', err.message);
  });

console.log('saveTaskPromise called - .then()/.catch() run later, once the write finishes.');

// Expected sample output:
// Task Logger Started
// saveTaskPromise called - .then()/.catch() run later, once the write finishes.
// Task saved successfully (promise style).
