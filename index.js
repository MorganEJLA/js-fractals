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
    canvas.width = 800;
    canvas.height = 800;
    //canvas settings 
    console.log(ctx);
    ctx.lineWidth = 30;
    ctx.lineCap = 'round';
    ctx.fillStyle = 'goldenrod';
    ctx.shadowColor = 'black';
    ctx.shadowOffsetY = 10;
    ctx.shadowOffsetX = 5;
    ctx.shadowBlur = 10;
   
    const canvas2 = document.getElementById('canvas2');
    const ctx2 = canvas2.getContext('2d');
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;

    class Fractal {
        constructor(canvasWidth, canvasHeight){
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.size = this.canvasWidth * 0.27;
            //how many symmetrical sides our final fractal shape will get //
            this.sides = 6
            ;
            this.maxLevel = 4;
            this.scale = 0.5;
            this.spread = Math.random() * 2.8 + 0.1;
            this.branches = 3;
            this.color = 'hsl(' + Math.random()* 360 + ',100%, 50%)';
        }
        draw(context){
          
            context.strokeStyle = this.color;
            context.fillStyle = this.color;
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

            context.beginPath();
            context.arc(this.size, 0, 50, 0, Math.PI * 2);
            context.stroke();


            context.save();
            for(let i = 0; i < this.branches; i++){
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
            }
            context.restore();

           
            //we moved the translate and scale outside of (before) the save call//
            //save pushes the current state on top of the stake ontop of the stack //restore pops the last state off the stop of the stack//

            
            // context.save();
            // context.rotate(0.9);
            // this.#drawLine(context, level + 1);
            // context.restore();



        }
    }

    

    //converts entire content of canvas into base 64 format

    class Particle {
        //draw individual articles to define the behavior and movement //
        //to have objects to reset when they fall off screen we have to make them aware of the width and height of the canvas. 
        constructor(canvasWidth, canvasHeight, image){
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.image = image;
            this.x = Math.random() * this.canvasWidth;
            this.y = Math.random() * this.canvasHeight;
            this.sizeModifier = Math.random() * 0.2 + 0.1;
            this.width = this.image.width * this.sizeModifier;
            this.height = this.image.width * this.sizeModifier;
            this.speed = Math.random() * 3 + 0.1;
            this.angle = 0;
            this.va = 0.01;


        }
        update(){
            this.angle += this.va;
            this.x += this.speed;
            if(this.x > this.canvasWidth + this.width) this.x = -this.width;
            this.y += this.speed;
            if(this.y > this.canvasHeight + this.height) this.y = -this.height;
            //this moves pixels on horizontal and vertical axis. 
            //each particle will also have its associated draw method where
            //we defined some code that will draw this particle at 6 times per second after each position//
        }
        draw(context){
            // context.fillRect(this.x, this.y, this.width, this.height);
            context.save();
            context.translate(this.x, this.y);
            context.rotate(this.angle);
            context.drawImage(this.image, 0, 0, -this.width/2, -this.height/2);
            context.restore();
        }
    }
    
    class Rain {
        constructor(canvasWidth, canvasHeight, image){
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight; 
            this.image = image;
            this.numberOfParticles = 20;
            this.particles = [];
            this.#initialize();
        }
        //private helper method
        //fill particles array with 20 particle objects //
        //initialize can only be called from within this class //
        #initialize(){
            for(let i = 0; i < this.numberOfParticles; i++){
                this.particles.push(new Particle(this.canvasWidth, this.canvasHeight, this.image));
            }
        }
        run(context){
            this.particles.forEach(particle => {
                particle.draw(context);
                particle.update();
            });
        }

    }
    const fractal1 = new Fractal(canvas.width, canvas.height);
    fractal1.draw(ctx);
    const fractalImage = new Image();
    fractalImage.src = canvas.toDataURL();

    fractalImage.onload = function(){
        const rainEffect = new Rain(canvas2.width, canvas2.height, fractalImage);
    
        function animate(){
            ctx2.clearRect(0,0, canvas2.width, canvas2.height);
            rainEffect.run(ctx2);
            requestAnimationFrame(animate);
        }
        animate();
    }   

    });