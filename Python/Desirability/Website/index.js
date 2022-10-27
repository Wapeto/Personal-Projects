const PORT = 8989
const express = require('express')


const app = express()

const inputDataset = {
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


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.get('/survey.html', (req, res) => {
    res.sendFile(__dirname + "/survey.html")
})

app.listen(PORT, () => console.log(`backend running on ${PORT}`))
