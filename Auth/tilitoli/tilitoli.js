const board = document.querySelector(".board");
const menu = document.querySelector(".btn-success");
const shuffle = document.querySelector(".btn-warning");

shuffle.addEventListener("click", kever);
const imgs = [
    "./img/face1.png",
    "./img/face2.png",
    "./img/face3.png",
    "./img/face4.png",
    "./img/face5.png",
    "./img/face6.png",
    "./img/face7.png",
    "./img/face8.png",
    "./img/face9.png"
]
let pontok = 0;
function kever() {
    pontok = 0;
    board.innerHTML = "";
    let generaltak = [];
    while (generaltak.length < 9) {
        let index = Math.floor(Math.random() * 9);
        if (!generaltak.includes(index)) {
            const div = document.createElement("div");
            div.classList.add("kocka");
            div.id = `kocka${index}`;
            div.addEventListener("click", () => {
                pontok++;
                let currId = event.target.id;
                let spaceId = "kocka3";
                let space = document.getElementById(spaceId);
                event.target.id = spaceId;
                space.id = currId;
                if (board.children[0].id === "kocka0" && board.children[1].id === "kocka1" && board.children[2].id === "kocka2" && board.children[3].id === "kocka3" && board.children[4].id === "kocka4" && board.children[5].id === "kocka5" && board.children[6].id === "kocka6" && board.children[7].id === "kocka7" && board.children[8].id === "kocka8") {
                    setTimeout(() => {
                        alert("Gratulálok, sikerült!");

                    }, 300);
                }
            })
            board.appendChild(div);
            generaltak.push(index);
        }
    }
}
//div.style.backgroundImage = `url(${imgs[i]})`;
//div.style.backgroundSize = "200px 200px";
kever();


document.querySelector(".btn-success").addEventListener("click", () => {
    let points = 0;
    if (pontok <= 10) {
        points = 10;
    } else if (pontok <= 15) {
        points = 5;
    } else {
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
                setTimeout(function () {
                    location.href = "../main.html";
                }, 1500);
            } else {
                document.querySelector(".message").innerText = datas.errorMessage;
            }
        })
        .catch(error => console.log(error))
})
/*
if(event.target.parentNode.children[event.target.id-1]){

        }
*/