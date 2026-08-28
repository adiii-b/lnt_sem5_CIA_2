// ============================================================
// Task 8: Asynchronous Programming & Callback Functions
// ============================================================
// Demonstrates the classic Node.js "error-first callback" pattern:
// the callback's first parameter is always the error (or null if
// nothing went wrong), and any real result comes after it.
const fs = require('fs');
const path = require('path');

const TASKS_FILE = path.join(__dirname, 'tasks.txt');

/**
 * Appends a task to tasks.txt using fs.appendFile with an
 * error-first callback.
 * @param {string} task - the task text to save
 * @param {(err: NodeJS.ErrnoException|null) => void} callback
 */
function saveTaskCallback(task, callback) {
  fs.appendFile(TASKS_FILE, task + '\n', (err) => {
    callback(err); // error-first: err is null on success
  });
}

// --- Demo call ---
saveTaskCallback('Buy groceries', (err) => {
  if (err) {
    console.log('Failed to save task:', err.message);
  } else {
    console.log('Task saved successfully (callback style).');
  }
});

// fs.appendFile is async, so this line is scheduled to run before
// the callback above fires - a good talking point for "the call
// stack keeps going, the callback waits in a queue".
console.log('saveTaskCallback triggered - notice this can print before the callback result above.');

// Expected sample output:
// saveTaskCallback triggered - notice this can print before the callback result above.
// Task saved successfully (callback style).
