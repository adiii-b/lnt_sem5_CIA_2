// ============================================================
// Task 6: Command-Line Task Logger - Node Packages: NodeMon &
//         Monitoring Applications
// ============================================================
// Setup steps performed for this task (run once, from the project root):
//
//   npm install --save-dev nodemon
//     -> adds nodemon to devDependencies in package.json
//
//   package.json scripts block:
//     "scripts": {
//       "start": "node Set1/Task6.js",
//       "dev": "nodemon Set1/Task6.js"
//     }
//
// How to run this file with NodeMon (auto-restart on save):
//
//   npm run dev
//
// Demonstration of auto-restart:
//   1. Run `npm run dev` in the terminal - nodemon starts this file
//      and prints "Task Logger Started" (see output below).
//   2. While it is still running, edit the taskLoggerVersion string
//      below and save the file.
//   3. NodeMon detects the file change, automatically kills the old
//      process and restarts it - the console prints
//      "[nodemon] restarting due to changes..." followed by this
//      script's output again, with NO manual restart needed.

const taskLoggerVersion = '1.0.0';

console.log('Task Logger Started');
console.log(`Task Logger version: ${taskLoggerVersion}`);
console.log('Edit and save this file while "npm run dev" is running to see nodemon auto-restart it.');

// Expected sample output (first run via `npm run dev`):
// [nodemon] starting `node Set1/Task6.js`
// Task Logger Started
// Task Logger version: 1.0.0
// Edit and save this file while "npm run dev" is running to see nodemon auto-restart it.
//
// Expected sample output (after editing and saving the file):
// [nodemon] restarting due to changes...
// [nodemon] starting `node Set1/Task6.js`
// Task Logger Started
// Task Logger version: 1.0.0
// Edit and save this file while "npm run dev" is running to see nodemon auto-restart it.
