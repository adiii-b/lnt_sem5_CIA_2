// ============================================================
// Task 9: Node Timers & Global Objects
// ============================================================
// setTimeout, setInterval and clearInterval are Node "global"
// functions (technically methods on the `timers` module, exposed
// globally) - no require() needed.
//
// Run with: node Set1/Task9.js
// Let it run for at least 15 seconds to see the full demo.

console.log('Task Logger Started');

// Stand-in counter representing "tasks logged so far" for this demo.
let tasksLoggedCount = 0;
const fakeTaskGenerator = setInterval(() => {
  tasksLoggedCount++;
}, 1000);

// setTimeout: fires exactly ONCE, 5 seconds after the app starts.
setTimeout(() => {
  console.log('Reminder: review your tasks');
}, 5000);

// setInterval: fires repeatedly, every 3 seconds, printing the count.
const printInterval = setInterval(() => {
  console.log(`Tasks logged so far: ${tasksLoggedCount}`);
}, 3000);

// clearInterval: after 15 seconds, stop both intervals so the
// process can exit cleanly instead of running forever.
setTimeout(() => {
  clearInterval(printInterval);
  clearInterval(fakeTaskGenerator);
  console.log('Stopped periodic logging (clearInterval called).');
}, 15000);

// Expected sample output:
// Task Logger Started
// Tasks logged so far: 2
// Reminder: review your tasks
// Tasks logged so far: 5
// Tasks logged so far: 8
// Tasks logged so far: 11
// Stopped periodic logging (clearInterval called).
