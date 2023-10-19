let formList = document.querySelector("form");
let contentList = document.querySelector("#content");
let allCards = document.querySelectorAll(".cards");
let cardsArray = Array.from(allCards);

//todo validation for add player in leader board
document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    let firstName = e.target.children[0].value;
    let secondName = e.target.children[1].value;
    let country = e.target.children[2].value;
    let playScore = e.target.children[3].value;
    let warning = document.querySelector("#addWarning");
    // console.log(warning);

    warning.style.display = "none";
    if (firstName == "" || secondName == "" || country == "" || playScore == "") {
        return (warning.style.display = "block");
    }

    //date 
    let d = new Date();
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let currentMonth = month[d.getMonth()].toUpperCase();
    let dateOfDiv = currentMonth +" "+d.getFullYear()+": "+d.getHours()+": "+d.getMinutes()+": "+d.getSeconds();
    console.log(dateOfDiv);

    let newDiv = document.createElement("div");
    newDiv.innerHTML = `
        <div class="cards">
            <div class="name">
                <h1>${firstName} ${secondName}</h1>
                <p>${dateOfDiv}</p>
            </div>
            <span class="countrynName">${country}</span>
            <span class="playerScore">${playScore}</span>
            <div class="addScore">
                <button>🗑️</button>
                <button>+5</button>
                <button>-5</button>
            </div>
        </div>
    `
    contentList.appendChild(newDiv);
    activeButtons();
    e.target.children[0].value = "";
    e.target.children[1].value = "";
    e.target.children[2].value = "";
    e.target.children[3].value = "";

    //fetch all cards and create array and sort that aaray
    cardsArray = Array.from(document.querySelectorAll(".cards"));
    sortTheArray(cardsArray);
})


function activeButtons() {
    let addScore = document.querySelectorAll(".addScore");
    addScore.forEach((element, idx) => {
        element.addEventListener("click", abc);
    });
}
activeButtons();

function abc(event) {
    console.log(event, "hi");
    let score = event.target.parentElement.parentElement;
    console.log(score.children[2].innerText);
    if (event.target.innerText == "+5") {
        score.children[2].innerText = parseInt(score.children[2].innerText) + 5;
    } else if (event.target.innerText == "-5") {
        score.children[2].innerText = parseInt(score.children[2].innerText) - 5;
    } else {
        event.target.parentElement.parentElement.remove();
    }

    cardsArray = Array.from(document.querySelectorAll(".cards"));
    sortTheArray(cardsArray);
}

//TODO sort the player list according to score
function sortTheArray(arr){
    arr.sort((a,b)=>{
        if(parseInt(a.children[2].innerText) > parseInt(b.children[2].innerText)){
            return -1;
        }else if(parseInt(a.children[2].innerText) < parseInt(b.children[2].innerText)){
            return 1;
        }else{
            return 0;
        }
    })
    console.log(arr[0].children[2].innerText);
    
    arr.forEach((item)=>{
        contentList.appendChild(item);
    })
}

sortTheArray(cardsArray);

