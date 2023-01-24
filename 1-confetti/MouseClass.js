//Mouse class for getting mouse position and spawning confetti

export class Mouse{
    x = 0;
    y = 0;
    
    constructor()
    {
        this.mouseInit();
    }

    setMousePos(newX,newY)
    {
        x = newX;
        y = newY;
    }

    mouseInit()
    {
        addEventListener('mousemove', (ev)=>{
            this.x = ev.clientX;
            this.y = ev.clientY;
        })
    }
}