const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000


const mysql = require('mysql')
const con = mysql.createConnection({
    host:'localhost',
    user:'josh',
    password:'d@t@',
    database:'desirability'
});



const dictModel = {
    "sex": "",
    "size": 0,
    "haircol": 0,
    "eyecol": 0,
    "sport": 0,
    "money": 0,
    "playgame": 0,
    "possessive": 0,
    "honesty": 0,
    "tactile": 0,
    "religious": 0,
    "patient": 0,
    "artist": 0,
    "introvert": 0,
    "polyglote": 0,
    "intelligent": 0
}

app.use(express.json());

//* Verify that the client accessing is me :
app.use(cors({origin: 'http://127.0.0.1:5501'}))

app.post('/post-dict/', (req, res) => {
    const dict = req.body;
    if (dict.constructor === dictModel.constructor &&
        Object.keys(dict).every(key => Object.keys(dictModel).includes(key))) {
            console.log('Dict keys OK')
            checkDictIntegrity(dict)
        // Vérifie si le dictionnaire passé en paramètre possède bien les mêmes clefs
        // ... faire le traitement sur le dico en pensant à bien vérifier chaque type de donnée et y effectuer des controles (comme la taille par exemple)
    }else{
        console.log('Error in the dictionary')
    }
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

function checkDictIntegrity(dict){
    let tests = 0
    const dictKeys = Object.keys(dict)
    //* sex TEST
    if (typeof dict["sex"] === 'number' && dict['sex'].toString.length <= 3){
        console.log('sex OK')
        tests ++
    }else {
        console.log('sex ERR')
    }
    //* size TEST
    if (typeof dict["size"] === 'number' && dict['size'].toString.length <= 3){
        console.log('size OK')
        tests ++
    }else {
        console.log('size ERR')
    }
    //* hair TEST
    if (Array.isArray(dict["haircol"]) && dict["haircol"].length > 0){
        let check = 0
        for(value of dict["haircol"]){
            if (typeof value === 'string' && value.length <= 20){
                check ++
            }
        }
        if(check === dict['haircol'].length){
            console.log('hair OK')
            tests ++
        }else {
            console.log('hair ERR')
        }
    }else {
        console.log('hair ERR')
    }
    //* Eye TEST
    if (Array.isArray(dict["eyecol"]) && dict["eyecol"].length > 0){
        let check = 0
        for(value of dict["eyecol"]){
            if (typeof value === 'string' && value.length <= 20){
                check ++
            }
        }
        if(check === dict['eyecol'].length){
            console.log('eye OK')
            tests ++
        }else {
            console.log('eye ERR')
        }
    }else {
        console.log('eye ERR')
    }
    for(let i = 4; i < dictKeys.length; i++){
        if (typeof dict[dictKeys[i]] === 'number' && dict[dictKeys[i]] <= 10) {
            console.log(`${dictKeys[i]} OK`)
            tests ++
        }else{
            console.log(`${dictKeys[i]} ERR`)
        }
    }
    

    if (tests === dictKeys.length){
        console.log('VALID DICTIONARY !')
        // insertInto('dataset', {
        //     'sex': `${dict["sex"]}`,
        //     'size': `${dict["size"]}`,
        //     'haircol': `[${dict["haircol"]}]`,
        //     'eyecol': `[${dict["eyecol"]}]`,
        //     'sport': `${dict["sport"]}`,
        //     'money': `${dict["money"]}`,
        //     'playgame': `${dict["playgame"]}`,
        //     'possessive': `${dict["possessive"]}`,
        //     'honesty': `${dict["honesty"]}`,
        //     'tactile': `${dict["tactile"]}`,
        //     'religious': `${dict["religious"]}`,
        //     'patient': `${dict["patient"]}`,
        //     'artist': `${dict["artist"]}`,
        //     'introvert': `${dict["introvert"]}`,
        //     'polyglote': `${dict["polyglote"]}`,
        //     'intelligent': `${dict["intelligent"]}`,
        // })
    }else{
        console.log('ALTERED DICTIONARY !')
    }
}

function insertInto(table, dict) {
    let sql = `INSERT INTO ${table} (${Object.keys(dict).join(', ')}) VALUES (${Object.values(dict).join(', ')})`;
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log(`Value inserted in ${table}`);
    });
};



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