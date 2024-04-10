const usName = document.querySelector("#loginName");
const pswd = document.querySelector("#loginPassword");
const btn = document.querySelector(".btn");
usName.focus();
document.querySelector(".registBtn").addEventListener("click", function() {
    location.href = "./regist.html";
});
btn.addEventListener("click", Login);

usName.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        Login();
    }
});
pswd.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        Login();
    }
});
function Login(){
    //Mezők ellenőrzése
    if(usName.value.length<1){
        alert("A felhasználónév megadása kötelező");
        usName.focus();
        return;
    }
    if(pswd.value.length<1){
        alert("A jelszó megadása kötelező");
        pswd.focus();
        return;
    }
    //felhasználói adatok ellenőrzése az adatbázisban
    fetch("./login.php", {
        method: "POST",
        headers: { "ContentType": "Application/json" },
        body: JSON.stringify({
            userName: usName.value,
            password: pswd.value
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
            usName.value="";
            pswd.value="";
            setTimeout(function() {
                location.href = "./main.html";
            }, 1500);
        } else {
            document.querySelector(".message").innerText = datas.errorMessage;
            document.querySelector(".message").classList.remove("hidden");
            usName.value="";
            pswd.value="";
        }
    })
    .catch(error => console.log(error))

}