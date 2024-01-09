const lienzo = document.querySelector('#lienzo');
const ctx = lienzo.getContext('2d');
//(x,y,ancho,alto)
ctx.fillStyle = 'red'; //colorear = Style
// ctx.fillRect(0,0,20,20); //dibujar = Rect

const snake = {
    x: 0,
    y: 0,
    pinta: function(){
        ctx.fillRect(this.x, this.y, 20, 20);
    }
}

const comida = {
    x:0,
    y:0,
    aparece: function(){
        this.x= Math.floor(Math.random() * 30) ;
        this.y= Math.floor(Math.random() * 30);
    },
    pinta:function(){
        ctx.font = '25px Serif';
        ctx.fillText('😎', this.x * 20, this.y * 20);
    }
}
 setInterval(() => {
    ctx.fillRect(0,0, 600, 400);
    comida.aparece();
    comida.pinta();
 },500);
snake.pinta();