// ============================================================
// Task 2: Understanding How Node.js Works & Node.js Architecture
// ============================================================
// Node.js is not a language of its own - it's a runtime that lets
// JavaScript run outside a browser, on the server / command line.
// Two things work together under the hood to make that possible:
//
// 1. V8 (Google's JavaScript engine, also used inside Chrome)
//    - Parses and executes our JavaScript, compiling it to fast
//      machine code.
//    - Owns the call stack, the memory heap, and garbage collection.
//    - On its own, V8 knows nothing about files, the network, or
//      timers - it only understands the JS language itself.
//
// 2. libuv (a C library bundled with Node)
//    - Provides the event loop, a background thread pool, and
//      access to OS-level asynchronous I/O (filesystem, networking,
//      DNS, timers).
//    - When code calls an async Node API such as fs.readFile(),
//      Node's C++ bindings hand that work to libuv instead of
//      blocking V8's single JavaScript thread.
//
// How they work together to run a script like this one:
//   1. V8 runs our synchronous JS, top to bottom, on the call stack.
//   2. When it reaches an async Node API (fs, timers, network...),
//      Node hands that work off to libuv.
//   3. libuv performs the work in the background (via its thread
//      pool or the OS's own async facilities) without blocking V8.
//   4. Once the work finishes, libuv queues the associated callback.
//   5. The event loop keeps checking: is the call stack empty? If
//      so, it takes the next callback off the queue and pushes it
//      onto the stack for V8 to run.

const fs = require('fs'); // core module used to prove non-blocking I/O

console.log('Task Logger Started');

// fs.readFile is asynchronous: Node immediately hands this request
// to libuv and moves straight on to the next line, WITHOUT waiting
// for the disk read to finish.
fs.readFile(__filename, 'utf8', (err, fileContents) => {
  if (err) {
    console.error('Error reading file:', err.message);
    return;
  }
  console.log(`[fs.readFile callback] File contents loaded (${fileContents.length} characters).`);
});

// Because fs.readFile did not block, this line runs and prints
// BEFORE the callback above does - proving the non-blocking behaviour.
console.log('This prints immediately after triggering fs.readFile (proves non-blocking behaviour).');

// Expected sample output:
// Task Logger Started
// This prints immediately after triggering fs.readFile (proves non-blocking behaviour).
// [fs.readFile callback] File contents loaded (2706 characters).
