const canvas = document.getElementById("drawing");
canvas.width = 1000;
canvas.height= 700;
const ctx = canvas.getContext("2d");
ctx.font = "30px Arial";

//var dec
const shadConst = 0.2;
const netHeight = 25;
let objects = new Map();
let dynos = new Map();
//classes
function dynObject(x,y){
  this.x = x;
  this.y = y;
  this.xvel = 0;
  this.yvel = 0;
  this.xaccel = 0;
  this.yaccel = 0;
}
function object(height,thicc){
  this.thicc=thicc;
  this.height=height;
}
function drawBall(x,y){
  ctx.shadowColor = "1a0000";
  let shadowHeight=objects.get("ball").height;
  if(calcShadowY(shadowHeight-125,objects.get("ball").thicc)+dynos.get("ball").y>=225){
    shadowHeight-=125;            //shadow lands on table
  }
  ctx.shadowOffsetY=calcShadowY(shadowHeight, objects.get("ball").thicc);
  ctx.shadowBlue=calcShadowBlur(objects.get("ball").height, objects.get("ball").thicc);
  ctx.fillStyle = "#f2f2f2";
  ctx.beginPath();
  ctx.arc(x,y,(5+0.03*(objects.get("ball").height-100)),0,2*Math.PI,false);
  ctx.fill();
  ctx.restore();
}
function drawRect(x1,y1,x2,y2,color,shadow){
  ctx.shadowColor = "#1a0000";
  if(shadow!=null && shadow!=""){
    ctx.shadowOffsetY=calcShadowY(objects.get(shadow).height, objects.get(shadow).thicc); 
    ctx.shadowBlur=calcShadowBlur(objects.get(shadow).height, objects.get(shadow).thicc);
  }else{
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY=0;
  }
  
  ctx.fillStyle = color;
  ctx.fillRect(x1,y1,x2-x1,y2-y1);
  ctx.restore();
} function calcShadowY(height,thicc){
  return (thicc+height)*shadConst;
}
function calcShadowBlur(height,thicc){
  return (2.3*thicc+height)*shadConst;
}
function init(){          //objects are (height,thickness)
  objects.set("table",new object(125,3));      //calculated height 125px ITTF proportion
  objects.set("net",new object(0,25));         //calculated height 25px ITTF proportion
  objects.set("ball",new object(300,5));
  dynos.set("ball",new dynObject(350,400));
  window.requestAnimationFrame(mainLoop);
}
function mainLoop(){
  ctx.clearRect(0,0,1000,700);                //clear frame
  drawRect(0,0,1000,700,"#ffb3b3",null);                     //red background
  //draw table
  drawRect(275,225,725,475,"#4da6ff","table");        //table base, 5x the ft dimension of ITTF regulation
  drawRect(275,225,725,230,"#ffffff",null);        //tapes
  drawRect(275,470,725,475,"#ffffff",null);
  drawRect(275,225,280,475,"#ffffff",null);
  drawRect(720,225,725,475,"#ffffff",null);
  drawRect(275,347.5,725,352.5,"#ffffff",null);    //center line
  drawRect(496,199,504,235,"#0d0d0d",null);        //topside clamp
  drawRect(496,465,504,501,"#0d0d0d",null);        //botside clamp
  drawRect(497.5,200,502.5,500,"#f2f2f2","net");         //net
  //draw ball
  drawBall(dynos.get("ball").x,dynos.get("ball").y);

  //compute physics
  
  window.requestAnimationFrame(mainLoop);
}
init();
