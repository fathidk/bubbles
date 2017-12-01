const canvas=document.getElementById("canvas");
const context=canvas.getContext("2d");

//console.log(canvas.offsetTop);

canvas.width=window.innerWidth-10;
canvas.height=window.innerHeight-10;


const mouse={
  X:null,
  Y:null
}

class Circle{
  constructor(x,y,dx,dy,color){
    this.x=x;
    this.y=y;
    this.minRadius=5;
    this.maxRadius=50;
    this.radius=this.minRadius;
    this.dx=dx;
    this.dy=dy;
    this.color=color;
  }
  



  draw(){
    context.beginPath();
    if(Math.abs(this.x - mouse.X) <=50 && Math.abs(this.y - mouse.Y) <=50  && this.radius < this.maxRadius){
      this.radius+=2;
    }else if( this.radius > this.minRadius )
    this.radius-=2;
    context.arc(this.x, this.y,this.radius,0, Math.PI * 2, true);
    context.stroke();
    context.fillStyle=this.color;
    context.fill();
  }

 update(){
    if(this.y + this.minRadius >= canvas.height) this.dy=-this.dy;
    if(this.y - this.minRadius <= 0) this.dy=-this.dy;
    if(this.x + this.minRadius >= canvas.width) this.dx=-this.dx;
    if(this.x -this.minRadius <= 0) this.dx=-this.dx;
    
    this.draw();
    this.y+=this.dy;
    this.x+=this.dx;

 }

}


//let circle1=new Circle(20,50,3,3,"red");

const circleArray=[];

for(let i=0;i<800;i++){

    let radius=10;   //between 10 and 50
    
    let x=Math.random()*canvas.width;   //between radius and canvas.width-radius
    if(x <radius)  x=radius;
    if(x >= canvas.width-radius) x=canvas.width-radius;

    let y=Math.random()*canvas.height;   //between 10 and canvas.height-10
    if(y<=radius)  y=radius;
    if(y >= canvas.height-radius) y=canvas.height-radius;


    let dx=Math.random()*7 - 3;   //between -3 and 4   
    let dy=Math.random()*7 - 3;   //between -3 and 4
    let colorArray=['#27274f','#7e7eff','#6dcc50','#66b24f','#aaaaaa'];
    let color=colorArray[Math.floor(Math.random()*5)];
    circleArray.push(new Circle(x,y,dx,dy,color));
}



function animate(){
  context.clearRect(0, 0, canvas.width, canvas.height);
  for(let j=0;j<circleArray.length;++j){
      circleArray[j].update();
  }
 requestAnimationFrame(animate);
}

animate();

window.addEventListener('mousemove',function(event){
    mouse.X=event.x;
    mouse.Y=event.y;
});

