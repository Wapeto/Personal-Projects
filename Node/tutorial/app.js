const fs = require("fs");
console.log("started the 1st task");

fs.readFile("./folder/first.txt", "utf-8", (err, result) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(result);
  console.log("completed the 1st task");
});
console.log("ready for the next task");
