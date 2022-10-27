const os = require('os')

// info about current user
const user = os.userInfo()

// System uptime in seconds
console.log(`The system uptime is ${os.uptime()} seconds`)

const currentOS = {
    name:os.type(),
    release:os.release(),
    totalMem:(os.totalmem()/1e+9).toFixed(2),
    freeMem:(os.freemem()/1e+9).toFixed(2),
}

console.log(currentOS)