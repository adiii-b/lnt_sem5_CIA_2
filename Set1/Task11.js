// ============================================================
// Task 11: Try/Catch Error Handling & Async/Await Concepts
// ============================================================
// async/await is syntax sugar over Promises: `await` pauses the
// async function until the Promise settles, and try/catch lets us
// handle a rejection the same way we'd handle a thrown error.
const fs = require('fs');
const path = require('path');

// `let`, not `const`, because the demo below deliberately changes
// this path partway through to force a failure.
let TASKS_FILE = path.join(__dirname, 'tasks.txt');

function saveTaskPromise(task) {
  return fs.promises.appendFile(TASKS_FILE, task + '\n');
}

/**
 * Awaits saveTaskPromise inside a try/catch block.
 * @param {string} task
 */
async function saveTaskAsync(task) {
  try {
    await saveTaskPromise(task);
    console.log(`Task saved successfully (async/await): "${task}"`);
  } catch (err) {
    console.log(`Failed to save task "${task}":`, err.message);
  }
}

console.log('Task Logger Started');

(async () => {
  // 1) Normal path - this succeeds.
  await saveTaskAsync('Write lecture notes');

  // 2) Force the catch block to fire: point TASKS_FILE at a folder
  //    that does not exist, so fs.promises.appendFile rejects with
  //    an ENOENT error, which our try/catch then handles.
  TASKS_FILE = path.join(__dirname, 'no-such-folder', 'tasks.txt');
  await saveTaskAsync('This one will fail');
})();

// Expected sample output:
// Task Logger Started
// Task saved successfully (async/await): "Write lecture notes"
// Failed to save task "This one will fail": ENOENT: no such file or directory, open '<project-path>\Set1\no-such-folder\tasks.txt'
