const container = document.querySelector(".containerOwn");

function Site(){
    for (let i = 0; i < 10; i++) {
        if (i == 0) {//---------------------------------------If
    
            const row = document.createElement("div");
            row.classList.add("rowOwn", `rowOwn${i + 1}`);
    
            const resultDiv = document.createElement("div");
            resultDiv.classList.add("result");
            for (let j = 0; j < 4; j++) {
                const itemDiv = document.createElement("div");
                itemDiv.classList.add("items", `item${j + 1}`);
                resultDiv.appendChild(itemDiv);
            }
    
            const guessDiv = document.createElement("div");
            guessDiv.classList.add("guess");
            for (let j = 0; j < 5; j++) {
                if (j == 4) {
                    const colorDiv = document.createElement("div");
                    colorDiv.addEventListener("click", check);
                    colorDiv.innerText = "Check";
                    colorDiv.classList.add("colors", "btn", "btn-outline-success")
                    guessDiv.appendChild(colorDiv);
                } else {
                    const colorDiv = document.createElement("div");
                    colorDiv.classList.add("colors", `color${j + 1}`);
                    colorDiv.addEventListener("click", rotateColor);
                    colorDiv.id = 0;
                    guessDiv.appendChild(colorDiv);
                }
            }
    
            row.appendChild(resultDiv);
            row.appendChild(guessDiv);
            container.appendChild(row);
        } else {//--------------------------------------------Else
            const row = document.createElement("div");
            row.classList.add("rowOwn", `rowOwn${i + 1}`, "passiveField");
    
            const resultDiv = document.createElement("div");
            resultDiv.classList.add("result");
            for (let j = 0; j < 4; j++) {
                const itemDiv = document.createElement("div");
                itemDiv.classList.add("items", `item${j + 1}`);
                resultDiv.appendChild(itemDiv);
            }
    
            const guessDiv = document.createElement("div");
            guessDiv.classList.add("guess");
            for (let j = 0; j < 5; j++) {
                if (j == 4) {
                    const colorDiv = document.createElement("div");
                    colorDiv.addEventListener("click", check);
                    colorDiv.innerText = "Check";
                    colorDiv.classList.add("colors", "btn", "btn-outline-success")
                    guessDiv.appendChild(colorDiv);
                } else {
                    const colorDiv = document.createElement("div");
                    colorDiv.classList.add("colors", `color${j + 1}`);
                    colorDiv.addEventListener("click", rotateColor);
                    colorDiv.id = 0;
                    guessDiv.appendChild(colorDiv);
                }
            }
    
            row.appendChild(resultDiv);
            row.appendChild(guessDiv);
            container.appendChild(row);
        }
    }
}
Site();

//-----------------------------------Elágazás vége
//-----------------------------------Tömbök, adatok
var szinek = {
    zöld: "rgb(0, 204, 0)",
    kék: "rgb(0, 0, 255)",
    piros: "rgb(255, 0, 0)",
    sárga: "rgb(255, 255, 0)",
    narancs: "rgb(255, 128, 0)",
    türkiz: "rgb(0, 255, 255)",
    lila: "rgb(128, 0, 128)",
    fehér: "rgb(255, 255, 255)",
    fekete: "rgb(0, 0, 0)"

};
var guesses = [null, null, null, null];
var generatedColors = [null, null, null, null];

function rotateColor() {
    const colorName = event.target.id;
    let currentIndex = Object.keys(szinek).indexOf(colorName);
    const colorKeys = Object.keys(szinek);

    currentIndex = (currentIndex + 1) % colorKeys.length;
    const nextColorName = colorKeys[currentIndex];

    event.target.id = nextColorName;
    event.target.style.backgroundColor = szinek[nextColorName];
    if (event.target.classList.contains("color1")) {
        guesses[0] = event.target.style.backgroundColor;
    }
    if (event.target.classList.contains("color2")) {
        guesses[1] = event.target.style.backgroundColor;
    }
    if (event.target.classList.contains("color3")) {
        guesses[2] = event.target.style.backgroundColor;
    }
    if (event.target.classList.contains("color4")) {
        guesses[3] = event.target.style.backgroundColor;
    }

}
//generating
function generateColors() {
    // Függvény, amely véletlenszerűen választ egy elemet egy tömbből
    function getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    // Megismételhetetlen színek generálása
    const usedColors = []; // Tartalmazza az eddig kiválasztott színeket
    for (const key in generatedColors) {
        let randomColor;
        do {
            randomColor = getRandomElement(Object.keys(szinek));
        } while (usedColors.includes(randomColor)); // Ellenőrizzük, hogy az adott szín már fel van-e használva
        generatedColors[key] = szinek[randomColor]; // Adjuk hozzá az új színt az objektumhoz
        usedColors.push(randomColor); // Adjuk hozzá az eddig kiválasztott színekhez
    }
    container.innerHTML = "";
    Site();
    alert("Sikeres generálás");
    console.log(generatedColors);
}
let probak = 0;
//check
var currentRow = 0;
function check() {
    probak++;
    event.target.removeEventListener("click", check);
    const items = event.target.parentNode.parentNode.children[0].querySelectorAll(".items");
    console.log("items", items);
    var results = [0, 0, 0, 0];
    console.log(guesses);
    //TODO: Megcsinálni a lapokat, tömbre rakni a sorokat, kövi sor visible, generálást megcsinálni, gnerálás gomb(ami resetel), check DONE
    const buttons = event.target.parentNode.querySelectorAll(".colors");
    buttons.forEach(element => {
        element.removeEventListener("click", rotateColor);
    });
    for (let i = 0; i < guesses.length; i++) {
        if (generatedColors.includes(guesses[i])) {
            results[i]++;
            if (guesses[i] === generatedColors[i]) {
                results[i]++;
            }
        }
    }
    console.log(results);
    for (let i = 0; i < 4; i++) {
        if (results[i] == 2) {
            console.log(items[i])
            items[i].style.backgroundColor = "white";
        } else if (results[i] === 1) {
            items[i].style.backgroundColor = "black";
        }
    }
    if (results[0]===2 && results[1]===2 && results[2]===2 && results[3]===2){
        alert("Gratulálok, sikeresen kitaláltad!");
    } else {
        if (probak==11){
            alert("Nem sikerült kitalálnod!");
            location.href = "../main.html";
        } else {

            console.log("Current row");
            currentRow++;
            event.target.parentNode.parentNode.parentNode.children[currentRow].classList.remove("passiveField");
        }
    }
    
}
const generate = document.querySelector(".btn-warning");
generate.addEventListener("click", generateColors);
//Saving
const menu = document.querySelector(".btn-success");
menu.addEventListener("click", () => {
    let points = 0;
    if (probak == 0){
        points = 0;
    } else if(probak == 1){
        points = 10;
    } else if (probak <= 3){
        points = 5;
    } else{
        points = 1;
    }
    fetch("./save.php", {
        method: "POST",
        headers: { "ContentType": "Application/json" },
        body: JSON.stringify({
            pts: points
        })
    })
    .then(response => {
        console.log(response);
        if (!response.ok) {
            throw new Error("Hiba a kérésben")
        }
        return response.json();
    })
    .then(datas => {
        if (datas["errorCode"] === 0) {
            document.querySelector(".message").innerText = datas.errorMessage;
            document.querySelector(".message").classList.remove("hidden");
            setTimeout(function() {
                location.href = "../main.html";
            }, 1500);
        } else {
            document.querySelector(".message").innerText = datas.errorMessage;
        }
    })
    .catch(error => console.log(error))
    
});