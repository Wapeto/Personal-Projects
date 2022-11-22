const selectBtnsData = {
    "hair": [],
    "eye": []
};

const inputDataset = {
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

const testDict = {
    "sex": 12,
    "size": 0,
    "hair_color": ["Don't know/Dont care"],
    "eye_color": ["Don't know/Dont care"],
    "sport": 0,
    "money": 0,
    "play_videogame": 0,
    "possessive": 0,
    "honesty": 0,
    "tactile": 0,
    "religious": 44,
    "patient": 0,
    "artist": "Hey",
    "introvert": 0,
    "polyglote": 0,
    "intelligent": 0,
}

const submitBtn = document.querySelector(".submitBtn")


document.querySelectorAll(".item").forEach(elm => elm.addEventListener("click", e =>{
    elm.querySelector(".checkbox").classList.toggle("checked")
}))

document.querySelectorAll(".slider").forEach(elm => elm.value = 0)

document.body.addEventListener('click', e =>{
    if (!e.target.classList.contains('select-btn') && !e.target.closest('.select-btn-list')){
        document.querySelectorAll('.select-btn').forEach(elm => {
            if(elm.classList.contains('open')){
                elm.classList.remove('open')
            }
        })
    }
})


document.querySelectorAll(".select-btn").forEach(elm => elm.addEventListener("click", e =>{ 
    if (!e.currentTarget.classList.contains("open")) {
        const previousPopup = document.querySelector(".select-btn.open")
        if (previousPopup != null)
        previousPopup.classList.remove("open")
        
        e.currentTarget.classList.add("open")
    }
    else
    e.currentTarget.classList.remove("open")    
}))



document.querySelectorAll(".select-btn-container").forEach(btn => {
    const dataType = btn.getAttribute("data-type")
    
    if (dataType != null && Object.keys(selectBtnsData).includes(dataType)) {
        const data = selectBtnsData[dataType]
        btn.querySelectorAll(".item").forEach(item => item.addEventListener("click", event => {
            const elm = event.currentTarget
            
            const btnText = btn.querySelector(".btn-text")
            
            if (elm.classList.contains("checked")) {
                elm.classList.remove("checked")
                data.pop()
            } else {
                elm.classList.add("checked")
                data.push("test")
            }
            
            btnText.textContent = data.length > 0 ? `${data.length} Selected` : `Select ${dataType} Color`
            
        }))
    }
})


submitBtn.onclick = ()=>{
    const questions = document.querySelectorAll(".question")
    const datasetKeys = Object.keys(inputDataset)
    
    inputDataset[datasetKeys[0]] = ( () =>{
        let men = document.querySelector(".checkbox.men"),
        women = document.querySelector(".checkbox.women"),
        other = document.querySelector(".checkbox.other")
        let sexStr = ""
        
        if (men.classList.contains("checked")){
            sexStr += "1"
        }
        if (women.classList.contains("checked")){
            sexStr += "2"
        }
        if (other.classList.contains("checked")){
            sexStr += "3"
        }
        return +`${sexStr}`
    })()
    inputDataset[datasetKeys[1]] = (()=>{
        const size = document.querySelector("#heightValue").textContent
        return parseInt(size)
    })()
    inputDataset[datasetKeys[2]] = (()=>{
        let hairLst = []
        document.querySelector(".select-btn-container[data-type='hair']")
        .querySelectorAll(".checkbox.checked + .item-text").forEach(hair =>{
            hairLst.push(hair.textContent)
        })
        return hairLst
    })()
    inputDataset[datasetKeys[3]] = (()=>{
        let eyeLst = []
        document.querySelector(".select-btn-container[data-type='eye']")
        .querySelectorAll(".checkbox.checked + .item-text").forEach(eye =>{
            eyeLst.push(eye.textContent)
        })
        return eyeLst
    })()
    
    let slidersData = []
    document.querySelectorAll(".question.rate .slider").forEach(sldr =>{
        slidersData.push(sldr.value)
    })
    for (let i = 0; i < slidersData.length; i++) {
        inputDataset[datasetKeys[i+4]] = parseInt(slidersData[i])
    }
    
    console.log(inputDataset)

    fetch('http://localhost:3000/post-dict/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputDataset)
            // body: JSON.stringify(testDict)
    })

    // TODO: Make this shit work
    fetch('http://localhost:3000/dict-validation/')
        .then(async response => {
            let state = await response.text()
            console.log(state)
        })
        .catch(err => console.log(err))
        
}
