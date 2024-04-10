const container = document.querySelector(".containerOwn");
const popupBtn = document.querySelector(".popupBtn");
const logoutBtn = document.querySelector(".logoutBtn");
popupBtn.addEventListener("click", () => {
    const popup = document.querySelector('.popup');
    popup.classList.toggle('active');
})
const popupBtn2 = document.querySelector('.popupBtn2');
popupBtn2.addEventListener("click", () => {
    const popup2 = document.querySelector('.popup2');
    popup2.classList.toggle('active');
})
logoutBtn.addEventListener("click", () => {
    fetch("./logout.php", {
        method: "POST",
        headers: { "ContentType": "Application/json" },
        body: JSON.stringify({
            game1:Number(document.querySelectorAll(".points")[0].innerText),
            game2:Number(document.querySelectorAll(".points")[1].innerText),
            game3:Number(document.querySelectorAll(".points")[2].innerText)
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
        if (datas == "Sikeres kijelentkezés"){
            document.querySelector(".message").classList.remove("hidden");
            document.querySelector(".message").innerHTML = datas;
            setTimeout(function() {
                location.href = "./login.html";
            }, 1500);
        }
    })
    .catch(error => console.log(error))

})
fetch("./games.json")
.then(response => {
    console.log(response);
    if (!response.ok) {
        throw new Error("Hiba a kérésben")
    }
    return response.json();
})
.then(datas => {
    console.log(datas.length);
    for (let i = 0; i < datas.length; i++) {
        console.log(datas[i]);
        container.innerHTML += `
        <div class="gameCard">
        <img src="${datas[i].pic}" alt="${datas[i].pic  }">
        <h1>${datas[i].name}</h1>
        <h5>Pontok: <span class="points">${document.querySelector(`.game${i+1}`).innerText}</span></h5>
        </div>`;
    }
    const gameCards = document.querySelectorAll(".gameCard");
    for (let i = 0; i < gameCards.length; i++) {
        gameCards[i].addEventListener("click", () => {
            location.href = datas[i].url;
    })
}})
.catch(error => console.log(error))
