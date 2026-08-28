// ============================================================
// Task 13: Callback Examples & the Event Loop, Job Queue
// ============================================================
//
// PREDICTION (written before running):
//
//   1. "Synchronous log"   -> runs immediately, on the main call stack.
//   2. "Promise resolved"  -> Promises use the MICROTASK queue
//                             (a.k.a. the "job queue"), which is
//                             always drained before the next
//                             macrotask - even a 0ms setTimeout.
//   3. "Timeout fired"     -> setTimeout uses the MACROTASK queue,
//                             which only runs once the call stack
//                             AND the microtask queue are empty.
//
//   Expected order: Synchronous log -> Promise resolved -> Timeout fired

console.log('--- start ---');

setTimeout(() => {
  console.log('Timeout fired');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise resolved');
});

console.log('Synchronous log');

// Expected sample output (confirms the prediction above):
// --- start ---
// Synchronous log
// Promise resolved
// Timeout fired
//
// CONFIRMATION: synchronous code always finishes first (it's already
// on the call stack). Once the stack is empty, the event loop fully
// drains the microtask queue (Promise callbacks) before it looks at
// the macrotask queue (timers), which is why "Promise resolved" beats
// "Timeout fired" even though the timeout was scheduled with a 0ms delay.
