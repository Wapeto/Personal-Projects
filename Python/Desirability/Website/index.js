const mysql = require('mysql')
const con = mysql.createConnection({
    host:'localhost',
    user:'josh',
    password:'d@t@',
    database:'desirability'
});


function addDataset(datasetTable){
    const keys = Object.keys(datasetTable)
    con.connect(function(err){
        if (err){
            console.log(err)
        }
        console.log('Connected to database !')
        var sql = (function() {
            let command = `INSERT INTO dataset (`
            keys.forEach(k =>{
                command += k + ', '
            })
            command = command.slice(0, -2) + ') VALUES ('
            keys.forEach(k =>{
                command += datasetTable[k] + ', '
            })
            command = command.slice(0, -2) + ')'
            return command;
        })();
        console.log(sql)
        con.query(sql, function(err, result){
            console.log('pushing results...')
            if (err){
                console.log('aie...\n\n')
                console.log(err)
            }
            else{
                console.log('sucess ! : 1 new data has been inserted')
            }
        })
    })
}