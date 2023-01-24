//the confetti class. This will draw and update each one of the confetti particles

import { confettiSettings } from "./script.js";
import { getRandomElementFromArray } from "./utils.js";
import { lerp } from "./utils.js";
import { despawnConfetti } from "./script.js";

import { canvas } from "./script.js";
import { ctx } from "./script.js";

export class Confetti{
    #x = 0;
    #y = 0;
    #w = 0;
    #h = 0;

    randomMaxYVelocity = confettiSettings.maxYVelocity;

    color = getRandomElementFromArray(confettiSettings.confettiColors)

    initialScroll = document.body.scrollTop;

    constructor(x,y,dx,dy,w,h,r,dr){
        this.#x = x;
        this.#y = y;
        this.dx = dx;
        this.dy = dy;
        this.#w = w;
        this.#h = h;
        this.r = r;
        this.dr = dr;
    }

    draw()
    {
        ctx.fillStyle = this.color;
        let yScroll = this.initialScroll - document.body.scrollTop;
        this.drawRect(this.#x,this.#y + yScroll,this.#w,this.#h,1,this.r);
    }

    //updates at every frame. It also takes into account the FPS for frame independency
    update(deltaTime)
    {
        this.randomMaxYVelocity = (confettiSettings.maxYVelocity + (Math.random()-0.5)*2*confettiSettings.paperWeightVariation)*60*deltaTime;
        let yScroll = canvas.offsetTop - document.body.scrollTop;

        this.dx = lerp(this.dx,0,1.2*deltaTime)
        this.dy = lerp(this.dy+confettiSettings.grv*deltaTime,this.randomMaxYVelocity,3*deltaTime);

        this.#x += this.dx*60*deltaTime;
        this.#y += this.dy*60*deltaTime; 

        this.r += this.dr*60*deltaTime;
        this.draw();

        console.log(document.body.scrollTop)
        if (this.#y +yScroll> canvas.height+100)
        {
            despawnConfetti(this);
        }
    }  

    drawRect(x,y,w,h,scale,rotation){
        ctx.setTransform(scale,0,0,scale,x,y);
        ctx.rotate(rotation);
        ctx.strokeStyle = "#7a7a7a";
        ctx.strokeRect(-w/2,-h/2,w,h);
        ctx.fillRect(-w/2,-h/2,w,h);
    }
}