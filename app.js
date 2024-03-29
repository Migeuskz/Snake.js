const lienzo = document.querySelector('#lienzo');
const ctx = lienzo.getContext('2d');
// let img = new Image();
// img.src = "/img/snake.png";
//(x,y,ancho,alto)
// ctx.fillStyle = 'red'; //colorear = Style
// ctx.fillRect(0,0,20,20); //dibujar = Rect

let posX = 2;
let posY = 1;
let direccion = 1; // derecha

const eating = new Audio('./music/bite.mp3');
const death = new Audio('./music/gameOver.mp3');
const startGame = new Audio('./music/gameStart.mp3');

function start(){
    posX = 2;
    posY = 1;
    direccion = 1;

    const snake = [];
    snake.push({
        x:2,
        y:1,
        xNext:0,
        yNext:1,
        pinta: function(){
            ctx.font = '25px Serif';
            ctx.fillText('🐺', this.x * 20, this.y *20);
            // ctx.drawImage(img, this.x, this.y);
        }
    });
    
    snake.push({
        x : 1,
        y : 1,
        xNext:2,
        yNext:1,
        pinta: function(){
            ctx.font = '25px Serif';
            ctx.fillText('⚪', this.x * 20, this.y *20);
        }
    });
    
    snake.push({
        x : 0,
        y : 1,
        xNext:1,
        yNext:1,
        pinta: function(){
            ctx.font = '25px Serif';
            ctx.fillText('⚫', this.x * 20, this.y *20);
        }
    })
    return snake;
}
let snake = start();

function nextMove(){
    snake.forEach((bolita, index) => {
        if (index === 0){
            bolita.x = posX;
            bolita.y = posY;
            } else{
                bolita.x = bolita.xNext;
                bolita.y = bolita.yNext;
                bolita.xNext = snake[index - 1].x;
                bolita.yNext = snake[index - 1].y;
        }
    })
}

function checkEat(){
    if(snake[0].x === comida.x && snake[0].y === comida.y){
        eating.play();
        snake.push({...snake[1] });
        comida.aparece();
    }
}

function gameOver(){
    for(let i = 1; i < snake.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
}




const comida = {
    x:0,
    y:0,
    aparece: function(){
        this.x= Math.floor(Math.random() * 25) ;
        this.y= Math.ceil(Math.random() * 15);
    },
    pinta:function(){
        ctx.font = '25px Serif';
        ctx.fillText('🦴', this.x * 20, this.y * 20);
    }
}

//evento del teclado
document.querySelector('body').addEventListener('keydown', function(e){
    switch(e.key){
        case "ArrowUp":
            direccion = 4;
            break;
        case 'ArrowRight':
            direccion = 1;
            break;
        case 'ArrowLeft':
            direccion = 3;
            break;
        case 'ArrowDown':
            direccion = 2
            break;
    }
})

document.querySelector('.container').addEventListener('click', (e) => {
    if(e.target.classList.contains('btn')){
        const bText = e.target.innerText;
        if(bText === 'Up') direccion = 4;
        else if(bText === 'Right') direccion =1;
        else if(bText === 'Down') direccion =2;
        else direccion = 3;
    }
})


comida.aparece();

 setInterval(() => {
    ctx.fillRect(0,0, 600, 400);
    // comida.aparece();
    comida.pinta();

    checkEat();
    if(gameOver()){
        death.play();
        alert('hijole mano');
        snake = start();
    }

    snake.forEach(bolita => bolita.pinta())
    if(direccion === 1) posX++;
    else if(direccion === 2 ) posY ++; // izquierda
    else if (direccion === 3) posX --; //arriba
    else posY --; //abajo

    if(posX > 24) posX = 0;
    else if(posX < 0) posX = 24;
    if(posY > 20) posY = 0;
    else if(posY < 1) posY = 15;
    nextMove();
},200);
