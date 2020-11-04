let header = window.document.getElementById("headline");
header.addEventListener("mouseenter", e =>  { 
    let target = header.getBoundingClientRect();
    let x = e.clientX - target.left;
    if (x < 210){
        header.style.transform = 'translateX(120%) rotate(360deg) ';
    setTimeout("header.style.transform += 'translate(-120%, 0)'", 250);
    header.style.width = "420px";
    }
    else {
        header.style.transform = 'translateX(-120%) rotate(-360deg)';
    setTimeout("header.style.transform += 'translate(+120%, 0)'", 250);
    header.style.width = "420px";
    }
});

function draw(parameter){ //drawing grid and figure
    let canvas = document.getElementById('image');
    if (canvas.getContext){
        let ctx = canvas.getContext('2d');

        ctx.fillStyle = "rgba(256, 256, 256, 0.8)"; // background fill
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'rgb(35, 184, 253)'; //area
        ctx.fillRect(200-parameter*40, 200, parameter*40, parameter * 20); //left rectangle
        ctx.fill();
        ctx.moveTo(200,200 + parameter * 20); // triangle
        ctx.lineTo(200 + parameter * 20,200);
        ctx.lineTo(200,200);
        ctx.fill();
        ctx.lineTo(200, 200 - parameter * 40); // quarter of circle
        ctx.arc(200,200, parameter * 40, -Math.PI/2, 0, false);
        ctx.lineTo(200,200);
        ctx.fill();

        for (let x = 40; x < 361; x += 40) { // gird
            ctx.moveTo(x, 0);
            ctx.lineTo(x, 400);
        }
        for (let y = 40; y < 361; y += 40) {
            ctx.moveTo(0, y);
            ctx.lineTo(400, y);
        }
        ctx.strokeStyle = "#333";
        ctx.stroke();

        ctx.fillStyle = 'black'; //axis
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0,200);
        ctx.lineTo(400,200);
        ctx.moveTo(200,0);
        ctx.lineTo(200,400);
        ctx.stroke();
    }
}

let plot = window.document.getElementById("image");
plot.addEventListener("click", () => {
    let elem = plot.getBoundingClientRect();
    let x = (Math.round(event.clientX - elem.left - 6) - 200) / 40;
    let y = (Math.round(event.clientY - elem.top - 6) - 200) / -40;
    let r;
    var radios = document.getElementsByName('R');
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            r = radios[i].value;
            break;
        }
    }
    if (confirm("Do you wanna check\n" + x + " " + y + " " + r)){ // send post request
        let xhr = new XMLHttpRequest();
        let body = 'X=' + encodeURIComponent(x) + "&Y=" + encodeURIComponent(y) + "&R=" + encodeURIComponent(r);
        xhr.open("POST", '/web_lab2_Web_exploded/control');
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(body);
        if (xhr.status !== 200 && xhr.readyState === XMLHttpRequest.DONE) alert("shit happened, you request is failed");
        else window.location.replace("/web_lab2_Web_exploded/result.jsp");
    }
});
/*
    Технические работы в ИСУ
    Доступ к ИСУ временно ограничен.
    Мы работаем над исправлением ошибок.
    Приносим извинения за доставленные неудобства
 */
let notification = document.getElementById("answer");
let btn = document.getElementById('Button');
btn.disabled = true;

function check(){
    var foo = true;
    var textY = document.getElementById("inputY").value;

    if (textY.length == 0){
        foo = false;
        notification.innerHTML = "Заполним форму Y";
        btn.disabled = true;
    }
    else if (!/^-?\d+[.,]?\d*$/i.test(textY)){
        foo = false;
        notification.innerHTML = "В поле Y допустим ввод цифр и точки или запятой";
        btn.disabled = true;
    }
    else if ((textY <= -3 || textY >= 5)){
        foo = false;
        notification.innerHTML = "Значение Y должно входить в (-3;5)";
        btn.disabled = true;
    }
    if (foo) {
        notification.innerHTML = ""; 
        btn.disabled = false;
    }
}
setInterval(check,100);