// ============================================================
// Task 14: Recursive Functions, Event Loop Execution Flow & EventEmitter
// ============================================================
// EventEmitter is a core Node.js class (from the 'events' module)
// that implements the observer pattern: code can .emit() a named
// event, and any number of .on() listeners registered for that
// name will run in response.
const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');

const TASKS_FILE = path.join(__dirname, 'tasks.txt');

// Create the emitter named `taskEmitter`.
const taskEmitter = new EventEmitter();

// Listener: runs every time 'taskAdded' is emitted.
taskEmitter.on('taskAdded', (task) => {
  console.log(`New task added: ${task}`);
});

function saveTaskPromise(task) {
  return fs.promises.appendFile(TASKS_FILE, task + '\n');
}

/**
 * Saves a task with async/await + try/catch (Task 11 pattern), and
 * emits 'taskAdded' once the save succeeds.
 * @param {string} task
 */
async function saveTaskAsync(task) {
  try {
    await saveTaskPromise(task);
    taskEmitter.emit('taskAdded', task); // fires the listener above
  } catch (err) {
    console.log(`Failed to save task "${task}":`, err.message);
  }
}

console.log('Task Logger Started');
saveTaskAsync('Prepare demo slides');

// Expected sample output:
// Task Logger Started
// New task added: Prepare demo slides
