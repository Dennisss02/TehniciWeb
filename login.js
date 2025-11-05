window.onload = function(){
    if(sessionStorage.length == 0)
        document.querySelector(".meniu_ultim .submeniu").style.display = "none";
    let login = document.getElementById("login");
    let conectare = document.getElementById("conectare");
    let inregistrare = document.getElementById("inregistrare");
    let inr = document.getElementById("inr");
    let logout = document.getElementById("logout");
    let b_conectare = document.querySelector("#conectare button");
    let b_inregistrare = document.querySelector("#inregistrare button");
    let b_inr = document.querySelector("#inr button");
    let b_logout = document.querySelector("#logout button");
    
    b_inr.onclick = function(){
        inregistrare.style.display = "block";
        conectare.style.display = "none";
        inr.style.display = "none";
    }
    if(localStorage.length == 0){
        b_conectare.disabled = "true";
        conectare.style.opacity = "50%";
    }

    b_conectare.onclick = function(){
        let email = document.getElementById("email").value;
        let parola = document.getElementById("parola").value;
        let date = JSON.parse(localStorage.getItem(email));
        if(date.password != parola){
            alert("Date de conectare incorecte, încearcă din nou!");
        }
        else{
            sessionStorage.setItem(email, date.name);
            alert(`Bine ai venit, ${date.name}, te-ai conectat cu succes!`);
            location.reload();
        }
    }

    b_inregistrare.onclick = function(){
        let email = document.getElementById("email_inr").value;
        let parola = document.getElementById("parola_inr").value;
        let nume = document.getElementById("nume_inr").value;
        email.toLowerCase();
        let regex_email = /^[a-z0-9_.-]+@[a-z0-9.-]+.[a-z]{2,}$/;
        if(regex_email.test(email) == 0){
            alert("Adresa de e-mail este invalidă, încearcă din nou!");
        }
        else{
            if(localStorage.getItem(email) != null){
                alert("Adresa de e-mail este deja folosită, încearcă din nou!");
            }
            else{
                localStorage.setItem(email, JSON.stringify({password: parola, name: nume}));
                location.reload();
            }
        }
    }

    b_logout.onclick = function(){
        sessionStorage.clear();
        location.reload();
    }

    if(sessionStorage.length != 0){
        login.style.display = "none";
        document.querySelector(".meniu_prim .submeniu").style.display = "none";
        logout.style.display = "block";
        let mesaj = document.querySelector("#logout h4");
        mesaj.textContent += sessionStorage.getItem(sessionStorage.key(0)) + "!";
    }
}