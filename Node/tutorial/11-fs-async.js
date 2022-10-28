const {readFile, writeFile} = require('fs')
console.log('start')

readFile('./folder/first.txt','utf8', (err, result) => {
    if (err){
        console.log(err)
        return
    }
    const first = result
    readFile('./folder/second.txt', 'utf8', (err, result) => {
    if (err){
        console.log(err)
        return
    }
    const second = result
    writeFile(
        './folder/result-async.txt',
        `Here is the final result guyzz :\n${first}\n${second}`,
        (err, result)=>{
            if(err){
                console.log(err)
                return
            }
            console.log('done with this task')
        }
    )
    })
})
console.log('starting the next step')