window.onload = function(){
    if(sessionStorage.length == 0)
        document.querySelector(".meniu_ultim .submeniu").style.display = "none";
    else{
        let joc = document.getElementById("joc");
        joc.style.display = "block";
        let b1 = document.getElementById("niv1");
        let b2 = document.getElementById("niv2");
        
        let opere = [];
        let url = "http://localhost:8000/opere.json";
        fetch(url).then(function(response){
            if(response.status == 200){
                return response.json();
            }
            else{
                throw new Error("Statusul este " + response.status);
            }
        }).then(function(date){
            let n = date.length;
            for(let i = 0; i < n; i++){
                opere[i] = ([date[i].sursa, date[i].nume]);
            }

            let afScor1 = document.getElementById("scor1");
            let afScor2 = document.getElementById("scor2");
            let cheie = sessionStorage.key(0);
            let scor1 = localStorage.getItem(`${cheie} scor1`);
            let scor2 = localStorage.getItem(`${cheie} scor2`);
            if(scor1 != null){
                afScor1.style.display = "block";
                afScor1.innerHTML = `Scorul maxim pentru nivelul Ușor: ${scor1}`;
            }
            if(scor2 != null){
                afScor2.innerHTML = `Scorul maxim pentru nivelul Dificil: ${scor2}`;
                afScor2.style.display = "block";
            }

            var tot;
            let timp;

            b1.onclick = function(){
                tot = 5;
                clearInterval(timp);
                miniJoc();
            }

            b2.onclick = function(){
                tot = 8;
                clearInterval(timp);
                miniJoc();
            }

            function miniJoc(){
                let cerinta = joc.getElementsByTagName("h4")[0];
                cerinta.style.display = "block";
                let ant = document.querySelectorAll(".cont");
                if(ant){
                    for(x of ant)
                        x.remove();
                    if(document.querySelector(".cronometru") != null)
                        document.querySelector(".cronometru").remove();
                }        
                let opere_aux = [...opere];
                let imagini = [];
                let cont_card = document.createElement("div");
                let cont_img = document.createElement("div");
                joc.appendChild(cont_card);
                joc.appendChild(cont_img);
                cont_card.classList.add("cont");
                cont_img.classList.add("cont");
                cont_card.style.padding = "0px"
                for(let i = 1; i <= tot; i++){
                    let card = document.createElement("div");
                    cont_card.appendChild(card);
                    card.classList.add("card");
                    card.style.width = `${90 / tot}` + "%";
                    let text = document.createElement("p");
                    card.appendChild(text);
                    text.style.textIndent = 0 + "px";

                    let x = Math.floor(Math.random()*opere_aux.length);
                    text.innerHTML = opere_aux[x][1];
                    card.index = i;
                    imagini.push([i, opere_aux[x][0]]);
                    opere_aux.splice(x, 1);
                }
                for(let i = 1; i <= tot; i++){
                    let img = document.createElement("img");
                    cont_img.appendChild(img);
                    img.classList.add("imagine");
                    img.style.width = `${90 / tot}` + "%";

                    let y = Math.floor(Math.random()*imagini.length);
                    img.src = imagini[y][1];
                    img.index = imagini[y][0];
                    imagini.splice(y, 1);
                }

                var cronometru;
                if(tot == 5)
                    cronometru = 30;
                else
                    cronometru = 15;
                let cron = document.createElement("div");
                cron.classList.add("cronometru");
                cron.style.fontSize = "30px";
                cron.style.fontFamily = "Lobster";
                cron.style.textIndent = "4%";
                cron.textContent = `Timp rămas: ${cronometru} secunde`;
                joc.insertBefore(cron, cont_card);

                timp = setInterval(function(){
                    cronometru--;
                    cron.textContent = `Timp rămas: ${cronometru} secunde`;
                    if(cronometru == 0){
                        clearInterval(timp);
                        alert("Timpul a expirat!");
                        cont_card.remove();
                        cont_img.remove();
                        cron.remove();
                        cerinta.style.display = "none";
                    }
                }, 1000);

                let indiceCart = null;
                let indiceImg = null;
                let n = 0;
                Array.from(cont_card.children).forEach(function(cartonas){
                    cartonas.addEventListener("click", function(){
                        if(indiceCart == null){
                            indiceCart = cartonas.index;
                            cartonas.style.opacity = "60%";
                        }
                    });
                });
                Array.from(cont_img.children).forEach(function(imagine){
                    imagine.addEventListener("click", function(){
                        if(indiceImg == null){
                            indiceImg = imagine.index;
                            imagine.style.opacity = "60%";
                        }
                        if(indiceCart == indiceImg && indiceCart != null){
                            n++;
                        }
                        else{
                            clearInterval(timp);
                            alert(`Încearcă din nou! Răspunsuri corecte: ${n}/${tot}.`);
                            n = 0;
                            cont_card.remove();
                            cont_img.remove();
                            cron.remove();
                            cerinta.style.display = "none";
                        }
                        if(n == tot){
                            clearInterval(timp);
                            alert("Felicitări, ai potrivit corect toate perechile!");
                            if(tot == 5){
                                if(30 - cronometru < localStorage.getItem(`${cheie} scor1`) || localStorage.getItem(`${cheie} scor1`) == null)
                                    localStorage.setItem(`${cheie} scor1`, 30 - cronometru);
                                afScor1.style.display = "block";
                                afScor1.innerHTML = `Scorul maxim pentru nivelul Ușor: ${localStorage.getItem(`${cheie} scor1`)}`;
                            }
                            else{
                                if(15 - cronometru < localStorage.getItem(`${cheie} scor2`) || localStorage.getItem(`${cheie} scor2`) == null)
                                    localStorage.setItem(`${cheie} scor2`, 15 - cronometru);
                                afScor2.style.display = "block";
                                afScor2.innerHTML = `Scorul maxim pentru nivelul Dificil: ${localStorage.getItem(`${cheie} scor2`)}`;
                            }
                            cont_card.remove();
                            cont_img.remove();
                            cron.remove();
                            cerinta.style.display = "none";
                        }
                        indiceCart = null;
                        indiceImg = null;
                    });
                });
            }
        }).catch(function(err){
            console.error("A aparut o eroare: " + err.message);
        })
    }
}