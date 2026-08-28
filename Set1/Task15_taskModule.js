// ============================================================
// Task 15: Node Modules - Types, Core & Local Modules & Import/Export
// ============================================================
// Node.js has three kinds of modules:
//   1. Core modules   - ship with Node itself, e.g. 'fs', 'path', 'events'.
//   2. Local modules  - files we write ourselves in this project,
//                       loaded with a relative path, e.g. './Task15_taskModule'.
//   3. Third-party    - installed from npm into node_modules, e.g. 'nodemon'.
//
// This file IS a local module. It bundles the three task-saving
// styles built up across the earlier tasks (callback -> promise ->
// async/await) plus the EventEmitter from Task 14, and exposes them
// with module.exports so Task15.js can pull them in with require().
const fs = require('fs');       // core module
const path = require('path');   // core module
const EventEmitter = require('events'); // core module

const TASKS_FILE = path.join(__dirname, 'tasks.txt');
const taskEmitter = new EventEmitter();

// --- Task 8 style: error-first callback ---
function saveTaskCallback(task, callback) {
  fs.appendFile(TASKS_FILE, task + '\n', (err) => callback(err));
}

// --- Task 10 style: Promise ---
function saveTaskPromise(task) {
  return fs.promises.appendFile(TASKS_FILE, task + '\n');
}

// --- Task 11 + 14 style: async/await, try/catch, emits 'taskAdded' ---
async function saveTaskAsync(task) {
  try {
    await saveTaskPromise(task);
    taskEmitter.emit('taskAdded', task);
    return true;
  } catch (err) {
    console.log(`Failed to save task "${task}":`, err.message);
    return false;
  }
}

// Export everything Task15.js needs.
module.exports = {
  saveTaskCallback,
  saveTaskPromise,
  saveTaskAsync,
  taskEmitter,
};
