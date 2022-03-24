//look up fractals - infinitely complex patterns that are self-similar across different scales. They are created by repeating a simple process over and over in an ongoing feedback loop //

//declaring code in a procedural way - declaring variables and functions line by line as we create our project.// 

//object oriented programming to write the code//
//constructor - contains a blueprint and when we call the class using the 'new' keyword constructor will create one new blank JavaScript object and it will assign it values and properties based on the blueprint inside
//principles of OOP 
//1.encapsulation - bundling data and methods that operate on that data in objects //
//2.abstraction
//3. inheritance
//4. polymorphism

window.addEventListener('load', function(){
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 600;
    //canvas settings 
    console.log(ctx);
    ctx.lineWidth = 30;
    ctx.lineCap = 'round';
    ctx.fillStyle = 'goldenrod';
    ctx.shadowColor = 'black';
    ctx.shadowOffsetY = 10;
    ctx.shadowOffsetX = 5;
    ctx.shadowBlur = 10;
   


    class Fractal {
        constructor(canvasWidth, canvasHeight){
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.size = this.canvasWidth * 0.27;
            //how many symmetrical sides our final fractal shape will get //
            this.sides = 6;
            this.maxLevel = 4;
            this.scale = 0.5;
            this.spread = Math.random() * 2.8 + 0.1;
            this.branches = 2;
            this.color = 'hsl(' + Math.random()* 360 + ',100%, 50%)';
        }
        draw(context){
          
            context.strokeStyle = this.color;
            context.save();
            //when we want to do something and then reset it to how it was before//

            //save() will create a snapshot of the current canvas state //
            context.translate(this.canvasWidth/2 ,this.canvasHeight/2 );
            //translate moved the coordinates from its default 0,0 position//
            //rotate will always happen around the coordinates 0,0//
            // context.rotate(0.8),
            context.scale(1,1);
            context.rotate(0)
           
            for (let i = 0; i < this.sides; i++){
                this.#drawLine(context, 0);
                context.rotate((Math.PI * 2)/this.sides);
            }
            //rotate by exactly 180deg its the value of pi.when its Math.PI * 2 it rotates 360deg//
            //repeating the following code will draw lines rotated around the canvas. //
            // this.#drawLine(context);
            // context.rotate(0.5)
            // context.translate(50,50);
            // this.#drawLine(context);
            // context.rotate(0.5)
            // context.translate(50,50);
            // this.#drawLine(context);
            // context.rotate(0.5)
            // context.translate(50,50);
            // this.#drawLine(context);
            // context.rotate(0.5)
            // this.#drawLine(context);
            //create a for()loop


            context.restore();
            
            //anything that is after this will not be part of the code before //
        }
        #drawLine(context, level){
             //to prevent recursion we need to create an if statement//
            if(level > this.maxLevel) return;
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(this.size, 0);
            context.stroke();

            
            for(let i = 0; i < this.branches; i++){
                context.save();
                context.translate(this.size - (this.size/this.branches) * i, 0);
                context.scale(this.scale, this.scale);
            //we moved the translate and scale outside of (before) the save call//
            //save pushes the current state on top of the stake ontop of the stack //restore pops the last state off the stop of the stack//

                context.save();
                context.rotate(this.spread);
                this.#drawLine(context, level + 1);
                context.restore();

                context.save();
                context.rotate(-this.spread);
                this.#drawLine(context, level + 1);
                context.restore();
                context.restore();
            }

           
            //we moved the translate and scale outside of (before) the save call//
            //save pushes the current state on top of the stake ontop of the stack //restore pops the last state off the stop of the stack//

            
            // context.save();
            // context.rotate(0.9);
            // this.#drawLine(context, level + 1);
            // context.restore();



        }
    }

    const fractal1 = new Fractal(canvas.width, canvas.height);
    fractal1.draw(ctx);

    class Particle {

    }

    class Rain {

    }
});