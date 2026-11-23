const readline = require("readline");

let tasks = [];

function addTask(task) {
  if (!task) {
    console.log("Please enter a task description.");
    return;
  }
  tasks.push(task);
  console.log(`Task added: "${task}"`);
}

function removeTask(index) {
  const i = parseInt(index, 10) - 1; 
  if (isNaN(i) || i < 0 || i >= tasks.length) {
    console.log("Invalid task number.");
    return;
  }
  const removed = tasks.splice(i, 1);
  console.log(`Removed: "${removed[0]}"`);
}

function displayTasks() {
  if (tasks.length === 0) {
    console.log("Your to-do list is empty.");
    return;
  }
  console.log("\nYour Tasks:");
  tasks.forEach((t, i) => console.log(`${i + 1}. ${t}`));
  console.log();
}

function clearTasks() {
  tasks = [];
  console.log("All tasks cleared.");
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function prompt() {
  rl.question("Enter command (add, remove, view, clear, exit): ", (cmd) => {
    switch (cmd.trim().toLowerCase()) {
      case "add":
        rl.question("Enter task: ", (t) => { addTask(t.trim()); prompt(); });
        return;
      case "remove":
        displayTasks();
        rl.question("Enter task number to remove: ", (n) => { removeTask(n); prompt(); });
        return;
      case "view":
        displayTasks();
        break;
      case "clear":
        clearTasks();
        break;
      case "exit":
        console.log("Goodbye!");
        rl.close();
        return;
      default:
        console.log("Unknown command. Try: add, remove, view, clear, or exit.");
    }
    prompt();
  });
}

prompt();
