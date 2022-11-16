// const { response } = require("express")

const recup = document.querySelector('#recup')
// recup.textContent = "EHOHHH"

fetch('http://localhost:3000/get_results')
    .then(response => {return response.json()})
    .then(data => {
        recup.textContent = data
    })
    .catch(err => console.log(err))