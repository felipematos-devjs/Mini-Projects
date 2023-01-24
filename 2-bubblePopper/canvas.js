/* ---------------------- CANVAS DEFINITION ----------------------------- */
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

/* ---------------------- EVENT LISTENERS ----------------------------- */
window.addEventListener('mousedown',mouseDown)
window.addEventListener('mouseup',mouseUp)
window.addEventListener('mousemove',mouseMove)

window.addEventListener('resize', function()
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

/* ---------------------- VARIABLES ----------------------------- */
let maxBubbleLimit = 100;
let circleArray = [];
let numCircles = 15;

let spawn = false;
let timer = undefined;

let mouse = {
    x: undefined,
    y: undefined,
    left : false,
    right : false,
}

/* ---------------------- CLASS DEFINITION ----------------------------- */
class Circle{
    #x = 0;
    #y = 0;
    constructor(x,y, dx,dy,radius){
        this.#x = x;
        this.#y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
    }

    draw()
    {
        c.beginPath();
        c.arc(this.#x,this.#y,this.radius*1,0,2*Math.PI,false);
        c.strokeStyle = "rgb(0,0,0, 0.2)";
        c.stroke();
        var grd = c.createRadialGradient(
            this.#x-2, 
            this.#y+2, 
            this.radius*0.9,
            this.#x-2, 
            this.#y+2,
            this.radius*1);
        grd.addColorStop(0, "rgb(200,200,255, 0.2)");
        grd.addColorStop(1, "rgb(255,255,255, 0.7)");

        c.fillStyle = grd;
        c.fill();
    }

    update()
    {
        if (this.#x + this.radius> innerWidth)
        {
            this.dx = -Math.abs(this.dx);
        }
        else if (this.#x - this.radius<0)
        {
            this.dx = Math.abs(this.dx);;
        }

        if (this.#y + this.radius > innerHeight)
        {
            this.dy = -Math.abs(this.dy);
        }
        else if (this.#y-this.radius <0)
        {
            this.dy = Math.abs(this.dy);
        }  
        this.#x += this.dx;
        this.#y += this.dy; 

        //interactivity
        if (Math.abs(mouse.x - this.#x) < this.radius 
        && Math.abs(mouse.y - this.#y) < this.radius && mouse.left)
        {  
            popBubble(this);
        }

        this.draw();
    }

}

/* ---------------------- SPAWN AND DELETE PARTICLE FUNCTIONS ----------------------------- */

function spawnParticle()
{
    if (spawn && circleArray.length < maxBubbleLimit)
    {
        let radius = 15 + 40*Math.random();
        let x = mouse.x;
        let y = mouse.y;
            
        let dx = (Math.random() - 0.5)*2*2;
        let dy = (Math.random() - 0.5)*2*2;

        circleArray.push(new Circle(x,y, dx,dy,radius));
        timer = setTimeout(spawnParticle,20);
            
    }
}

function popBubble(bubbleObject)
{
    setTimeout( function() {
        circleArray.splice(circleArray.indexOf(bubbleObject),1);
      }, 0);
}

function initializeBubbles()
{
    for (let i = 0; i < numCircles; i++) {
        let radius = 15 + 40*Math.random();
        let x = (innerWidth-radius*2) * Math.random() + radius;
        let y = (innerHeight-radius*2) * Math.random() + radius;
        
        let dx = (Math.random() - 0.5)*2*2;
        let dy = (Math.random() - 0.5)*2*2;
    
        circleArray.push(new Circle(x,y, dx,dy,radius));
    }
}

/* ---------------------- RECURSIVE UPDATE ----------------------------- */

function animate()
{
    //loop an animation
    //recursion!
    c.clearRect(0,0, innerWidth, innerHeight);
    
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();  
    }

    requestAnimationFrame(animate);
}

/* ---------------------- INITIALIZE AND UPDATE ----------------------------- */

initializeBubbles();
animate();

/* --------------------- MOUSE EVENTS*/

function mouseUp(event)
{
    if (event.button == 0)
    {
        console.log("stop")
        mouse.left = false;
        mouse.right = false;
    }

    else if (event.button == 1)
    {
        
        spawn = false;
        clearTimeout(timer);
    }
}

function mouseDown(event)
{
    mouse.x = event.x;
    mouse.y = event.y;

    if (event.button == 0)
    {
        mouse.left = true;
        mouse.right = false;
    }

    else if (event.button == 1)
    {
        console.log("start")
        mouse.right = true;
        mouse.left = false;
        event.preventDefault();
        spawn = true;
        spawnParticle();
    }
}

function mouseMove(event)
{
    mouse.x = event.x;
    mouse.y = event.y;
}