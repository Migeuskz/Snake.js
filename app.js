const lienzo = document.querySelector('#lienzo');
const ctx = lienzo.getContext('2d');
//(x,y,ancho,alto)
// ctx.fillStyle = 'red'; //colorear = Style
// ctx.fillRect(0,0,20,20); //dibujar = Rect

let posX = 2;
let posY = 1;

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

const snake = [];
snake.push({
    x:2,
    y:1,
    xNext:0,
    yNext:1,
    pinta: function(){
        ctx.font = '25px Serif';
        ctx.fillText('🐺', this.x * 20, this.y *20);
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

const comida = {
    x:0,
    y:0,
    aparece: function(){
        this.x= Math.floor(Math.random() * 30) ;
        this.y= Math.floor(Math.random() * 20);
    },
    pinta:function(){
        ctx.font = '25px Serif';
        ctx.fillText('🦴', this.x * 20, this.y * 20);
    }
}

let direccion = 1; // derecha

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


 setInterval(() => {
    ctx.fillRect(0,0, 600, 400);
    // comida.aparece();
    // comida.pinta();
    snake.forEach(bolita => bolita.pinta())
    if(direccion === 1) posX++;
    else if(direccion === 2 ) posY ++; // izquierda
    else if (direccion === 3) posX --; //arriba
    else posY --; //abajo

    if(posX >= 30) posX = 0;
    else if(posX <= 0) posX = 29;
    if(posY >= 20) posY = 0;
    else if(posY <= 0) posY = 20;
    nextMove();
},200);
snake.pinta();