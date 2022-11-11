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
    "hair_color": 0,
    "eye_color": 0,
    "sport": 0,
    "money": 0,
    "play_videogame": 0,
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
app.use(cors({origin: 'http://127.0.0.1:5500'}))

app.post('/post-dict/', (req, res) => {
    const dict = req.body;
    if (dict.constructor === dictModel.constructor &&
        Object.keys(dict).every(key => Object.keys(dictModel).includes(key))) {
            console.log(dict)
        // Vérifie si le dictionnaire passé en paramètre possède bien les mêmes clefs
        // ... faire le traitement sur le dico en pensant à bien vérifier chaque type de donnée et y effectuer des controles (comme la taille par exemple)
    }
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

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