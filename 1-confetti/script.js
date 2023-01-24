/* ---------------------- Importing data from other files! ----------------------------- */

import { Mouse } from "./MouseClass.js";
import { Confetti } from "./confettiClass.js";

/* ---------------------- CANVAS DEFINITION ----------------------------- */

export var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight+100;

export var ctx = canvas.getContext('2d');

/* ---------------------- EVENT LISTENERS ----------------------------- */

window.addEventListener('resize', function()
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight+100;
})

//spawns confetti on mouse click
let mouse = new Mouse();

addEventListener('click', ()=>{
    spawnConfetti(mouse.x+32,mouse.y-64)
})

/* ---------------------- VARIABLES ----------------------------- */

let deltaTime = 1/60;
let ConfettiArray = [];
let numConfettis = 60;
let initialVelocity = 6;
let initialRotationVel = 0.1;

export let confettiSettings = {
    maxSize: 15,
    minSize : 6,
    maxYVelocity : 3,
    initialRotationVel : 0.1,
    paperWeightVariation : 1,
    confettiColors : ["#a864fd", "#29cdff", "#78ff44","#ff718d", "#fdff6a"],
    grv : 6*deltaTime
    }

/* ---------------------- SPAWN AND DELETE PARTICLE FUNCTIONS ----------------------------- */

export function despawnConfetti(confetti)
{ 
    console.log("a")

    setTimeout( function() {
        //console.log(ConfettiArray.length)
        ConfettiArray.splice(ConfettiArray.indexOf(confetti),1);
      }, 0);  

    console.log(ConfettiArray.length)
}

export function spawnConfetti(x,y)
{
    for (let i = 0; i < numConfettis; i++) {
        let radius = 10 + 15*Math.random();
        
        //position
        let dx = (Math.random() +0.1)*2*initialVelocity;
        let dy = (Math.random() - 1)*2*initialVelocity;

        //rotation
        let r = (Math.random() - 0.5)*2*10;
        let dr = (Math.random() - 0.5)*2*initialRotationVel;

        //size
        let w = Math.random() * (confettiSettings.maxSize-confettiSettings.minSize) + confettiSettings.minSize;
        let h = Math.random() * (confettiSettings.maxSize-confettiSettings.minSize) + confettiSettings.minSize;

        //the particles spawn at a random Y around the given point
        let randY = y + (Math.random()-0.5)*2*20;

        ConfettiArray.push(new Confetti(x,randY,dx,dy,w,h,r,dr));
    }
}

/* ---------------------- RECURSIVE UPDATE ----------------------------- */

let lastCalledTime = -1;
function animate()
{
    //framerate independent
    if (lastCalledTime == -1)
    {
        lastCalledTime = performance.now();
        animate();
        return;
    }

    deltaTime = (performance.now() - lastCalledTime)/1000;
    lastCalledTime = performance.now();

    //loop an animation
    //recursion!
    ctx.setTransform(1,0,0,1,0,0); // reset transform
    ctx.clearRect(0,0, window.innerWidth, window.innerHeight+110);
    
    for (let i = 0; i < ConfettiArray.length; i++) {
        ConfettiArray[i].update(deltaTime);  
    }
    requestAnimationFrame(animate);  
}

/* ---------------------- INITIALIZE AND UPDATE ----------------------------- */

animate();

