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

const modelKeys = Object.keys(dictModel)

app.use(express.json());

//* Verify that the client accessing is me :
// app.use(cors({origin: 'http://127.0.0.1:5501'}))
app.use(cors())

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

app.post('/post-dict/', (req, res) => {
    const dict = req.body;
    if (dict.constructor === dictModel.constructor &&
        Object.keys(dict).every(key => Object.keys(dictModel).includes(key))) {
            console.log('Dict keys OK')
            checkDictIntegrity(dict)
    }else{
        console.log('Error in the dictionary')
    }
})

//?  ---------GET STATS---------
app.get('/get_stats/men', async (req, res) => {
    let stat_list = []
    // * Height
    const sizes = await selectFrom('dataset', ['size'], ['sex', '1'])
    sizes.forEach((elm, index) => {sizes[index] = elm.size})

    // * Hair color
    let hairs = await selectFrom('dataset', ['haircol'], ['sex', '1'])
    hairs.forEach((elm, index) => {
        hairs[index] = elm.haircol
        hairs[index] = hairs[index].slice(2, -2).split(',')
    })
    hairs = hairs.flat(1)
    hairs = sortStringTendency(hairs)[0][0]

    // * Eye color
    let eyes = await selectFrom('dataset', ['eyecol'], ['sex', '1'])
    eyes.forEach((elm, index) => {
        eyes[index] = elm.eyecol
        eyes[index] = eyes[index].slice(2, -2).split(',')
    })
    eyes = eyes.flat(1)
    eyes = sortStringTendency(eyes)[0][0]

    stat_list.push(average(sizes))
    stat_list.push(hairs)
    stat_list.push(eyes)

    //* Sliders
    for (let i = 4; i < Object.keys(dictModel).length;i++){
        let data = await selectFrom('dataset', [modelKeys[i]], ['sex', '1'])
        data.forEach((elm, index) => {
            let jsonDict = JSON.parse(JSON.stringify(elm))
            let key = Object.keys(jsonDict)
            data[index] = jsonDict[key]
        })
        stat_list.push(average(data))
    }
    
    console.log(stat_list)
    res.send(stat_list)
})

app.get('/get_stats/women', async (req, res) => {
    let stat_list = []
    // * Height
    const sizes = await selectFrom('dataset', ['size'], ['sex', '2'])
    sizes.forEach((elm, index) => {sizes[index] = elm.size})

    // * Hair color
    let hairs = await selectFrom('dataset', ['haircol'], ['sex', '2'])
    hairs.forEach((elm, index) => {
        hairs[index] = elm.haircol
        hairs[index] = hairs[index].slice(2, -2).split(',')
    })
    hairs = hairs.flat(1)
    hairs = sortStringTendency(hairs)[0][0]

    // * Eye color
    let eyes = await selectFrom('dataset', ['eyecol'], ['sex', '2'])
    eyes.forEach((elm, index) => {
        eyes[index] = elm.eyecol
        eyes[index] = eyes[index].slice(2, -2).split(',')
    })
    eyes = eyes.flat(1)
    eyes = sortStringTendency(eyes)[0][0]

    stat_list.push(average(sizes))
    stat_list.push(hairs)
    stat_list.push(eyes)

    //* Sliders
    for (let i = 4; i < Object.keys(dictModel).length;i++){
        let data = await selectFrom('dataset', [modelKeys[i]], ['sex', '2'])
        data.forEach((elm, index) => {
            let jsonDict = JSON.parse(JSON.stringify(elm))
            let key = Object.keys(jsonDict)
            data[index] = jsonDict[key]
        })
        stat_list.push(average(data))
    }
    
    console.log(stat_list)
    res.send(stat_list)
})


function checkDictIntegrity(dict){
    let tests = 0
    const dictKeys = Object.keys(dict)
    //* sex TEST
    if (typeof dict["sex"] === 'number' && dict['sex'].toString.length <= 3 && dict["sex"] != 0){
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
        insertInto('dataset', {
            'sex': `${dict["sex"]}`,
            'size': `${dict["size"]}`,
            'haircol': `\'["${dict["haircol"]}"]\'`,
            'eyecol': `\'["${dict["eyecol"]}"]\'`,
            'sport': `${dict["sport"]}`,
            'money': `${dict["money"]}`,
            'playgame': `${dict["playgame"]}`,
            'possessive': `${dict["possessive"]}`,
            'honesty': `${dict["honesty"]}`,
            'tactile': `${dict["tactile"]}`,
            'religious': `${dict["religious"]}`,
            'patient': `${dict["patient"]}`,
            'artist': `${dict["artist"]}`,
            'introvert': `${dict["introvert"]}`,
            'polyglote': `${dict["polyglote"]}`,
            'intelligent': `${dict["intelligent"]}`,
        })

        // TODO: Make this shit work
        app.get('/dict-validation', (req, res) => {
            res.send('Valid')
        })
    }else{
        console.log('ALTERED DICTIONARY !')
        app.get('/dict-validation', (req, res) => {
            res.send('Invalid')
        })
    }
}

function insertInto(table, dict) {
    let sql = `INSERT INTO ${table} (${Object.keys(dict).join(', ')}) VALUES (${Object.values(dict).join(', ')})`;
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log(`Value inserted in ${table}`);
    });
};

function selectFrom(table, args = [], where = []) {
    let sql = `SELECT ${(args.length === 0) ? "*" : args.join()} FROM ${table}`;
    if (where.length !== 0) {
        sql += ` WHERE ${where[0]} = ${where[1]}`;
    };

    return new Promise((resolve, reject) => {
        con.query(sql, function (err, result, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(result)
            }
        });
    });
};

function average(array){
    let total = 0;
    array.forEach(elm => {
        total += elm
    });
    total /= array.length
    return total.toFixed(1)
}

function sortStringTendency(array){
    let sortedList = [];
    for(let i = 0; i < array.length; i++){
        let counter = 0;
        for(let y = 0; y<array.length; y++){
            if(array[i]===array[y]){
                counter ++;
            }
        }
        let tup = [array[i], counter]
        if (!isIn(sortedList, tup)){
            sortedList.push(tup)
        }
    }
    while (!isSorted(sortedList)){
        for(let i=0;i<sortedList.length-1; i++){
            if(sortedList[i][1]<sortedList[i+1][1]){
                let temp = sortedList[i]
                sortedList[i] = sortedList[i+1]
                sortedList[i+1] = temp
            }
        }
    }
    return sortedList
    
}

function isIn(array, elm){
    for (thing of array){
        if(JSON.stringify(elm)==JSON.stringify(thing)){
            return true
        }
    }
    return false
}

function isSorted(array){
    for(let i=0; i<array.length-1; i++){
        if(array[i][1]<array[i+1][1]){
            return false
        }
    }
    return true
}