if(sessionStorage.length != 0){
    let desen = document.getElementById("desen");
    desen.style.display = "block";
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let culori = ["#E4080A", "#FE9900", "#FFD83E", "#7CF24E", "#4B45E3", "#C42EFF", "#FF77E2", "#000000"];

    let b_cerc = document.getElementById("cerc");
    let b_patrat = document.getElementById("patrat");
    let b_inima = document.getElementById("inima");
    let b_linie = document.getElementById("linie");
    let s_culoare = document.querySelector("#desen select");

    let forma;
    let linie = null;
    let culoare = culori[0];

    function drawCircle(x, y){
        let r = 30 + Math.floor(Math.random() * 21);
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fillStyle = culoare;
        ctx.fill();
        ctx.closePath();
    }
    function drawSquare(x, y){
        let a = 30 + Math.floor(Math.random() * 21);
        x -= a / 2;
        y -= a / 2;
        ctx.fillStyle = culoare;
        ctx.fillRect(x, y, a, a);
    }
    function drawHeart(x, y) {
        let r = 30 + Math.floor(Math.random() * 21);
        ctx.beginPath();

        ctx.moveTo(x, y);
        ctx.bezierCurveTo(x - r, y - r, x - 2 * r, y + r - 10, x, y + 2 * r);
        ctx.bezierCurveTo(x + 2 * r, y + r - 10, x + r, y - r, x, y);

        ctx.closePath();
        ctx.fillStyle = culoare;
        ctx.fill();
    }
    function drawLine(x, y){
        if(linie == null)
            linie = [x, y];
        else{
            ctx.beginPath();

            ctx.moveTo(linie[0], linie[1]);
            ctx.lineTo(x, y);
            ctx.lineCap = "round";
            ctx.lineWidth = 5;
            ctx.strokeStyle = culoare;
            ctx.stroke();

            ctx.closePath();

            linie = null;
        }
    }

    b_cerc.onclick = function(){forma = "cerc";}
    b_patrat.onclick = function(){forma = "patrat";}
    b_inima.onclick = function(){forma = "inima";}
    b_linie.onclick = function(){forma = "linie";}

    s_culoare.onchange = function(){
        switch(s_culoare.value){
            case "rosu":
                culoare = culori[0];
                break;
            case "portocaliu":
                culoare = culori[1];
                break;
            case "galben":
                culoare = culori[2];
                break;
            case "verde":
                culoare = culori[3];
                break;
            case "albastru":
                culoare = culori[4];
                break;
            case "mov":
                culoare = culori[5];
                break;
            case "roz":
                culoare = culori[6];
                break;
            case "negru":
                culoare = culori[7];
                break;
        }
    };

    canvas.addEventListener("click", function(event){
        let x = event.offsetX;
        let y = event.offsetY;
        switch(forma){
            case "cerc":
                drawCircle(x, y);
                break;
            case "patrat":
                drawSquare(x, y);
                break;
            case "inima":
                drawHeart(x, y);
                break;
            case "linie":
                drawLine(x, y);
                break;
        }
    });
}