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
    xNext:0,
    yNext:1,
    pinta: function(){
        ctx.font = '25px Serif';
        ctx.fillText('⚪', this.x * 20, this.y *20);
    }
});

snake.push({
    x : 0,
    y : 1,
    xNext:0,
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
 setInterval(() => {
    ctx.fillRect(0,0, 600, 400);
    nextMove();
    posX++;
    // comida.aparece();
    // comida.pinta();
    snake.forEach(bolita => bolita.pinta())
 },500);
snake.pinta();