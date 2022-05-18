const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;






//this is how large the squares are, I know theres probably something easier but this is pretty good for me
scale = 20;
mapSize = 20;

//sets speed at which frames are drawn

class Player {
   constructor() {
      this.position = {
         row: 10,
         column: 10
      }
      this.xVelocity = 1;
      this.yVelocity = 0;
      this.trailx = [10];
      this.traily = [10];
      this.tail = 5;
      this.move = "d";
   }
   draw() {
      for (let i = 0; i < this.tail; i++) {
         c.fillStyle = "green";
         c.fillRect(this.trailx[i] * scale, this.traily[i] * scale, scale -1, scale -1);
      }
      //c.fillRect(this.position.x, this.position.y, this.width, this.height);
   }
   update(apple) {
      if (this.move === "w") {
         snek.xVelocity = 0;
         snek.yVelocity = -1;
      }
      else if (this.move === "a") {
         snek.xVelocity = -1;
         snek.yVelocity = 0;
      }
      else if (this.move === "s") {
         snek.xVelocity = 0;
         snek.yVelocity = 1;
      }
      else if (this.move === "d") {
         snek.xVelocity = 1;
         snek.yVelocity = 0;
      }
      

      this.position["row"] += this.xVelocity;
      this.position["column"] += this.yVelocity;


      if (this.position["row"] === mapSize + 1) {
         this.position["row"] = 0;
      }
      if (this.position["row"] === -1) {
         this.position["row"] = mapSize;
      }
      
      if (this.position["column"] === mapSize + 1) {
         this.position["column"] = 0;
      }
      if (this.position["column"] === -1) {
         this.position["column"] = mapSize;
      }

      if (this.position["row"] !== apple.xpos || this.position["column"] !== apple.ypos) {
         this.trailx.pop();
         this.traily.pop();
      }

      for (let x = 0; x < this.trailx.length; x++) {
         if (this.trailx[x] === this.position["row"] && this.traily[x] === this.position["column"]) {
            this.reset()
         }
      }


      this.trailx.unshift(this.position["row"]);
      this.traily.unshift(this.position["column"]);

   

      console.log(this.xVelocity,
         this.yVelocity)
      console.log(this.trailx , "hi",
         this.traily, 'other',this.tail,
         this.move)
         
         
   }

   reset() {
         this.position = {
            row: 10,
            column: 10
         }
         this.xVelocity = 1;
         this.yVelocity = 0;
         this.trailx = [10];
         this.traily = [10];
         this.tail = 5;
         this.move = "d";
   }
}

class Apple {
   constructor() {
      this.xpos = 15;
      this.ypos = 10;
   }
   update(snake) {
      if (snake.position["row"] === this.xpos && snake.position["column"] === this.ypos) {
         snake.tail++;

         for (let x = 0; x < snake.trailx.length; x++) {
            if (snake.trailx[x] === this.xpos && snake.traily[x] === this.ypos) {
               x = 0;
               this.xpos = Math.floor(Math.random() * mapSize + 1)
               this.ypos = Math.floor(Math.random() * mapSize + 1)
            }
            
            
         }
            
         
      }
   }
   draw() {
      c.fillStyle = "red";
      c.fillRect(this.xpos * scale, this.ypos * scale, scale -1, scale -1);
   }
   reset() {
      this.xpos = 15;
      this.ypos = 10;
   }
}

snek = new Player();
apple = new Apple();










function game() {
   c.clearRect(0, 0, canvas.width, canvas.height);
   snek.position.x += snek.xVelocity;
   snek.position.y += snek.yVelocity;
   snek.update(apple);   
   snek.draw(); 

   apple.update(snek);
   apple.draw();
}


setInterval(game, 300);

window.addEventListener("keydown", function (event) {
   if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
   }
 
   switch (event.key) {
      case "w":
         if (snek.yVelocity === 0) {
            snek.move = "w";
         }
         break;
      
      case "s":
         if (snek.yVelocity === 0) {
            snek.move = "s";
         }
         break;

      case "a":
         if (snek.xVelocity === 0) {
            snek.move = "a";
         }
         break;

      case "d":
         if (snek.xVelocity === 0) {
            snek.move = "d";
         }
         break;
         

      default:
         return; // Quit when this doesn't handle the key event.
   }
})
