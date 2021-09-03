const canvas = document.getElementById('canvas'); //https://github.com/bradtraversy (VANILLAJS)
const increaseBtn = document.getElementById('increase'); //boton aumentar
const decreaseBtn = document.getElementById('decrease'); //boton disminuir
const sizeEl = document.getElementById('size'); //numero de tamaño actual del pincel
const colorEl = document.getElementById('color');
const clearEl = document.getElementById("clear");//limpiar
const ctx = canvas.getContext('2d'); 


let size = 20; //tamaño de brocha
let isPressed = false //que se mantenga sin apretar el mouse
let color = 'black'; //para cambiar el color
let x = undefined; //para dibujar una linea sobre los circulos sueltos
let y = undefined; //lo mismo que con x


canvas.addEventListener('mousedown', (e) => {
    isPressed = true; //al hacer click el mouse está presionado

    x = e.offsetX; //agregado para continuidad de linea
    y = e.offsetY;
});

canvas.addEventListener('mouseup', (e) => {
    isPressed = false; //al soltar

    x = undefined; //agregado para continuidad de linea
    y = undefined;
});

canvas.addEventListener('mousemove', (e) => {
    if (isPressed) { //al presionar 
        const x2 = e.offsetX; //ubicacion del mouse
        const y2 = e.offsetY;

        drawCircle(x2, y2);
        drawLine(x, y, x2, y2); //dibujar linea
        x = x2; //x debe convertirse en x2
        y = y2; //y debe convertirse en y2
    }
});

function drawCircle(x, y) { //funcion del circulo
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}


function drawLine(x1, y1, x2, y2){ //funcion linea
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size*2
    ctx.stroke();

}


//botones
increaseBtn.addEventListener('click', () =>{
    size +=5;

    if(size > 50){
        size = 50;
    }
    updateSizeOnScreen(); // saber tamaño de brocha
});
decreaseBtn.addEventListener('click', () =>{
    size -=5;

    if(size < 5){
        size = 5;
    }
    updateSizeOnScreen(); // saber tamaño de brocha
});

//ver tamaño de brocha en la pantalla 

function updateSizeOnScreen(){
    sizeEl.innerText = size;

}

// Cambios de color del pincel

colorEl.addEventListener( 'change', (e) =>{
    color = e.target.value;
})

//boton limpiar elemento 
clearEl.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});