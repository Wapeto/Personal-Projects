const containers_men = document.querySelectorAll('.get.men')
const containers_women = document.querySelectorAll('.get.women')


fetch('http://localhost:3000/get_stats/men')
    .then(async response => {
        let resp_array = await response.text()
        resp_array = JSON.parse(resp_array)
        console.log(resp_array);

        containers_men.forEach((elm, index) => {
            elm.textContent = resp_array[index]
        })
    })
    .catch(err => console.log(err))

fetch('http://localhost:3000/get_stats/women')
    .then(async response => {
        let resp_array = await response.text()
        resp_array = JSON.parse(resp_array)
        console.log(resp_array);

        containers_women.forEach((elm, index) => {
            elm.textContent = resp_array[index]
        })
    })
    .catch(err => console.log(err))