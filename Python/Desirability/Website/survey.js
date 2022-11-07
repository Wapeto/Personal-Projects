const selectBtnsData = {
    "hair": [],
    "eye": []
};

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

const submitBtn = document.querySelector(".submitBtn")


document.querySelectorAll(".item").forEach(elm => elm.addEventListener("click", e =>{
    elm.querySelector(".checkbox").classList.toggle("checked")
}))



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


submitBtn.addEventListener("click", () =>{
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
        return document.querySelector("#heightValue").textContent
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
        inputDataset[datasetKeys[i+4]] = slidersData[i]
    }
    
    console.log(inputDataset)

    doRequest('/Website/survey.html', inputDataset)

})

async function doRequest(url, data) {

    let res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (res.ok) {

        // let text = await res.text();
        // return text;

        let ret = await res.json();
        return JSON.parse(ret.data);

    } else {
        return `HTTP error: ${res.status}`;
    }
}

doRequest().then(data => {
    console.log(data);
});

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}


