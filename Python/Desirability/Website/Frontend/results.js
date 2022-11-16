const recup = document.querySelector('#recup')

fetch('http://localhost:3000/get_results')
    .then(res => {return res.json()})
    .then(data => {
        recup.textContent = data
        //sdf
    })
    .catch(err => console.log(err))


fetch('http://localhost:3000/get_results')
    .then(async response => {
        recup.textContent = await response.json()
    })
    .catch(err => console.log(err))