const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const userName = document.querySelector("#userName");
const email = document.querySelector("#email");
const userPassword = document.querySelector("#userPassword");
const userPassword2 = document.querySelector("#userPassword2");

document.querySelector(".loginBtn").addEventListener("click", function() {
    location.href = "./login.html";
});
const btn = document.querySelector(".btn");
btn.addEventListener("click", Regist);
firstName.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        Regist();
    }
});
lastName.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        Regist();
    }
});
userName.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        Regist();
    }
});
email.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        Regist();
    }
});
userPassword.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        Regist();
    }
});
userPassword2.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        Regist();
    }
});


function Regist() {
    if(firstName.value.length<1){
        alert("A vezetéknév megadása kötelező");
        firstName.focus();
        return;
    }
    if(lastName.value.length<1){
        alert("A keresztnév megadása kötelező");
        lastName.focus();
        return;
    }
    if(userName.value.length<1){
        alert("A felhasználónév megadása kötelező");
        userName.focus();
        return;
    }
    if(email.value.length<1){
        alert("A e-mail cím megadása kötelező");
        email.focus();
        return;
    }
    if(userPassword.value.length<1){
        alert("A jelszó megadása kötelező");
        userPassword.focus();
        return;
    }
    if(userPassword2.value.length<1){
        alert("A jelszó ismételt megadása kötelező");
        userPassword2.focus();
        return;
    }
    if (userPassword.value != userPassword2.value){
        alert("A jelszavak nem eggyeznek");
        userPassword.innerHTML="";
        userPassword2.innerHTML="";
        userPassword.focus();
        return;
    }

    fetch("./regist.php", {
        method: "POST",
        headers: { "ContentType": "Application/json" },
        body: JSON.stringify({
            firstName: firstName.value,
            lastName: lastName.value,
            userName: userName.value,
            email: email.value,
            password: userPassword.value
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
            if (datas.errorCode === 0) {
                firstName.innerHTML = "";
                lastName.innerHTML = "";
                userName.innerHTML = "";
                email.innerHTML = "";
                document.querySelector(".message").classList.remove("hidden");
                document.querySelector(".message").innerText = datas.errorMessage;
                setTimeout(function() {
                    location.href = "./login.html";
                }, 1500);
            }
            if (datas.errorCode === 1) {
                document.querySelector(".message").classList.remove("hidden");
                document.querySelector(".message").innerText = datas.errorMessage;
            }
        })
        .catch(error => console.log(error));
}