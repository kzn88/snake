let field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');


function stopAnimation() {
    document.querySelector('.score').style.animationPlayState='paused';
}
let score=0;
let h=1;
for (let i =1;i<401; i++)
{
let cell=document.createElement('div')
field.appendChild(cell);
cell.classList.add('cell')
}

let cell = document.querySelectorAll('.cell')
let x=1;
let y=20;
for (let i=0;i<400;i++) {
    if (x>20) {x=1;y--}
    
cell[i].setAttribute('posX',x)
cell[i].setAttribute('posY',y)
x++
}

function snakeCreate () {
    let a = Math.round(Math.random()*(20-3)+3)
    let b = Math.round(Math.random()*(20-1)+1)
    return [a,b]
}
cords = snakeCreate()
let snake = [document.querySelector('[posX="'+cords[0]+'"][posY="'+cords[1]+'"]'),document.querySelector('[posX="'+(cords[0]-1)+'"][posY="'+cords[1]+'"]'),document.querySelector('[posX="'+(cords[0]-2)+'"][posY="'+cords[1]+'"]')]


snake[0].classList.add('snakehead')
for (i=1;i<snake.length;i++) {
    snake[i].classList.add('snakebody')
}


let mousebody;
function generateMouse () {

function mouseCreate () {
    let x = Math.floor(Math.random()*(20)+1)
    let y = Math.floor(Math.random()*(20)+1)
    return [x,y]
}
let mouse = mouseCreate()
mousebody = document.querySelector('[posX="'+mouse[0]+'"][posY="'+mouse[1]+'"]')
while (mousebody.classList.contains('snake')){
    let mouse = mouseCreate()
    mousebody = document.querySelector('[posX="'+mouse[0]+'"][posY="'+mouse[1]+'"]')
}
mousebody.classList.add('mouse')

}
generateMouse()

let position='right';
function move() {
    let posSnakeHead = [snake[0].getAttribute('posX'),snake[0].getAttribute('posY'),]
    if (h===1) {snake[0].classList.remove('headright');}
    else if (h===2) {snake[0].classList.remove('headleft');}
    else if (h===3) {snake[0].classList.remove('headup');}
    else if (h===4) {snake[0].classList.remove('headdown');}
    snake[snake.length-1].classList.remove('snakebody');
    snake.pop();

    if(position==='right') {
    if (posSnakeHead[0]<20) {
        snake.unshift(document.querySelector('[posX="'+(+posSnakeHead[0]+1)+'"][posY="'+posSnakeHead[1]+'"]'))}
    else {snake.unshift(document.querySelector('[posX="1"][posY="'+posSnakeHead[1]+'"]'))}}

    else if(position==='left') {
        if (posSnakeHead[0]>1) {
            snake.unshift(document.querySelector('[posX="'+(+posSnakeHead[0]-1)+'"][posY="'+posSnakeHead[1]+'"]'))}
        else {snake.unshift(document.querySelector('[posX="20"][posY="'+posSnakeHead[1]+'"]'))}}
    
    else if(position==='up') {
        if (posSnakeHead[1]<20) {
                snake.unshift(document.querySelector('[posX="'+ posSnakeHead[0]+'"][posY="'+(+posSnakeHead[1]+1)+'"]'))}
        else {snake.unshift(document.querySelector('[posX="'+ posSnakeHead[0]+'"][posY="1"]'))}}
    
        else if(position==='down') {
        if (posSnakeHead[1]>1) {
                    snake.unshift(document.querySelector('[posX="'+ posSnakeHead[0]+'"][posY="'+(+posSnakeHead[1]-1)+'"]'))}
        else {snake.unshift(document.querySelector('[posX="'+ posSnakeHead[0]+'"][posY="20"]'))}}

    if (snake[0].getAttribute('posX')===mousebody.getAttribute('posX') && 
    snake[1].getAttribute('posY')===mousebody.getAttribute('posY')
    ) {
        score++;
        document.querySelector('.score').innerHTML=score;
        document.querySelector('.score').style.animationPlayState='running';
        mousebody.classList.remove('mouse');
        let a =snake[snake.length-1].getAttribute('posX');
        let b =snake[snake.length-1].getAttribute('posY');
        snake.push(document.querySelector('[posX="'+a+'"][posY="'+b+'"]'));
        generateMouse()
    }
    
    if (snake[0].classList.contains('snakebody')) {
        stopAnimation();
        clearInterval(interval);
        function buttonCreate () {
        let button = document.createElement('button');
        document.querySelector('.score').appendChild(button);
        button.innerHTML="Try Again!"
        button.classList.add('button');
        button.addEventListener('click', function(){
        location.reload()

        })}
        setTimeout(buttonCreate,2000);
        for (i=1;i<snake.length;i++) {
            snake[i].remove()}
        mousebody.classList.remove('mouse');
        document.querySelector('.main').style.animationName='main';
            

        
    };
    if (position==='right') {snake[0].classList.add('headright'); h = 1}
    if (position==='left') {snake[0].classList.add('headleft');h = 2}
    if (position==='up') {snake[0].classList.add('headup'); h = 3}
    if (position==='down') {snake[0].classList.add('headdown'); h = 4}
    for (i=1;i<snake.length;i++) {
        snake[i].classList.add('snakebody')}
}

let interval = setInterval(move,100)

window.addEventListener('keydown',function(event) {
if (event.which===39 && position!='left') {
    position='right'
}
if (event.which===37 && position!='right') {
    position='left'
}
if (event.which===38 && position!='down') {
    position='up'
}
if (event.which===40 && position!='up') {
    position='down'
}
})
