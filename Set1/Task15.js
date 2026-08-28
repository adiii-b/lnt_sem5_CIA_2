// ============================================================
// Task 15 (continued): importing a local module with require()
// ============================================================
// This is the "final" version of the app: instead of defining the
// save functions here, we require() them from ./Task15_taskModule.js
// and confirm everything still works after the refactor.
const {
  saveTaskCallback,
  saveTaskPromise,
  saveTaskAsync,
  taskEmitter,
} = require('./Task15_taskModule');

console.log('Task Logger Started');

// Re-attach the listener here too, so this file shows the full
// picture of Task 14's EventEmitter alongside the module import.
taskEmitter.on('taskAdded', (task) => {
  console.log(`New task added: ${task}`);
});

// Exercise all three saving styles to prove the app still behaves
// correctly now that the logic lives in a separate local module.
saveTaskCallback('Task via callback', (err) => {
  console.log(err ? `Callback failed: ${err.message}` : 'Callback style OK.');
});

saveTaskPromise('Task via promise')
  .then(() => console.log('Promise style OK.'))
  .catch((err) => console.log('Promise failed:', err.message));

saveTaskAsync('Task via async/await'); // also triggers the 'taskAdded' event

// Expected sample output:
// Task Logger Started
// Callback style OK.
// Promise style OK.
// New task added: Task via async/await
