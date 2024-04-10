const kartyak = document.querySelector(".kartyak");
let pics = [];
let dbpics = [];
/* Saját sum függvény, amit végül nem kellett használnom
function Sum(tomb = []) {
    var osszeg = 0;
    tomb.forEach(tomb => {
        osszeg += tomb;
    });
    return osszeg;
}*/
let probak = 0;
fetch("./cards.json")
    .then((response) => {
        if (!response.ok) {
            throw new Error("A kérés nem sikerült.");
        }
        return response.json();
    })
    .then(data => {
        console.log("data: ", data);
        for (let key in data) {
            pics.push(data[key]);
        }
        dbpics = pics.concat(pics);
        console.log("pics: ", pics);
        console.log("dbpics: ", dbpics);
        var taken = [];
        for (let i = 0; i < dbpics.length; i++) {
            let x = 0;
            while (taken.includes(x)) {
                x = Math.floor(Math.random() * dbpics.length);
            }
            taken.push(x);
            kartyak.innerHTML += `
            <div class="kartya"><img class="${dbpics[x]}" src="${dbpics[x]}" alt="">
            <div class="takaro"></div></div>
            `
            console.log(taken);
        }
        //Trying--not workin
        takarok = document.querySelectorAll('.takaro');
        nyitott = 0;
        nyitottak = [];
        hiddenTakarok = [];
        talalt = false;
        takarok.forEach(item => {
            item.addEventListener('click', chechTakaro)
        })
        function chechTakaro() {
            probak++;
            hiddenTakarok.push(event.target);
            console.log("hiddenTakarok: ", hiddenTakarok);
            event.target.style.visibility = "hidden";
            nyitott++;
            nyitottak.push(event.target.parentElement.children[0].className);
            if (nyitott == 2) {
                if (nyitottak[0] == nyitottak[1]) {
                    console.log("Egyforma");
                    nyitott = 0;
                    nyitottak = [];
                    talalt = true;
                    hiddenTakarok = [];
                } else {
                    console.log("Nem egyforma");
                    nyitott = 0;
                    nyitottak = [];
                    talalt = false;
                    document.querySelectorAll(".takaro").forEach(item => {
                        item.removeEventListener('click', chechTakaro)});
                    setTimeout(function () {
                        if (talalt == false) {
                            hiddenTakarok[0].style.visibility = "visible";
                            hiddenTakarok[1].style.visibility = "visible";
                            hiddenTakarok = [];
                            document.querySelectorAll(".takaro").forEach(item => {
                                item.addEventListener('click', chechTakaro)})
                        }
                        console.log("1sec")
                    }, 1000);
                }
            };
        }
    })
    //trying
    .catch(error => console.log(error));

const btn = document.querySelector(".btn");
btn.addEventListener("click", () => {
    let points = 0;
    if(probak < 11){
        points = 10;
    } else if (probak <= 16){
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
})
    /*
var taken = [];
for (let i = 0; i < (pics.length * 2); i++) {
    let x = 0;
    while (taken.includes(x)) {
        x = Math.floor(Math.random(1, (pics.length * 2)));
    }
    taken.push(x);
    kartyak.innerHTML += `<div class="kartya"><img src="${doubPics[x]}" alt=""></div>`
    console.log(taken);
}*/