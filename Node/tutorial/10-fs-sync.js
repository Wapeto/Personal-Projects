const {readFileSync, writeFileSync} = require('fs')

const first = readFileSync('./folder/first.txt', 'utf-8')
const second = readFileSync('./folder/second.txt', 'utf-8')

console.log('start')

writeFileSync('./folder/result-sync.txt', `Here is the result of all this hard work : \n${first} \n${second}`,{flag:'a'})//flag:a appends the doc

console.log("Done with this task")
console.log("Starting the next one")
