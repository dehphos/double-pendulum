var ang1;
var ang2;
var len1 = 200;
var len2 = 200
var m1 = 10;
var m2 = 10;
var a1v = 0;
var a2v = 0;
var a1a = 0;
var a2a = 0;
var g = 1
var angle1
var angle2
var checkbox
var button
var sliderchange = true
xvertecies = []
yvercecies = []

function setup() {
  createCanvas(1000, 1000);
  ang1 = createSlider((-1 * (PI * 8) / 10),((PI * 8) / 10),0,PI/100)
  ang2 = createSlider((-1 * (PI * 8) / 10),((PI * 8) / 10),0,PI/100) 
  checkbox = createCheckbox("start animation", false);
  button = createButton('reset trace line');
  // angle1 = PI/2
  // angle2 = PI/8
  ang1.mousePressed(sliderChanged)
  ang2.mousePressed(sliderChanged)
  button.mousePressed(verterase)
}

function updateObjects(){
  let num1 = -g * (2 * m1 + m2) * sin(angle1);
  let num2 = -m2 * g * sin(angle1 - 2 * angle2);
  let num3 = -2 * sin(angle1 - angle2) * m2;
  let num4 = a2v * a2v * len2 + a1v * a1v * len1 * cos(angle1 - angle2);
  let den = len1 * (2 * m1 + m2 - m2 * cos(2 * angle1 - 2 * angle2));
  let a1a = (num1 + num2 + num3 * num4) / den;

  num1 = 2 * sin(angle1 - angle2);
  num2 = (a1v * a1v * len1 * (m1 + m2));
  num3 = g * (m1 + m2) * cos(angle1);
  num4 = a2v * a2v * len2 * m2 * cos(angle1 - angle2);
  den = len2 * (2 * m1 + m2 - m2 * cos(2 * angle1 - 2 * angle2));
  let a2a = (num1 * (num2 + num3 + num4)) / den;
  
  a2v = (a2v + a2a) * 0.9999
  a1v = (a1v + a1a) * 0.9999
  angle2 = angle2 + a2v
  angle1 = angle1 + a1v
}
function drawObjects(){
  x1 = sin(angle1) * len1
  y1 = cos(angle1) * len1
  line(0,0,x1,y1)
  ellipse(x1,y1,m1*2,m1*2)
  x2 = sin(angle2) * len2 + x1
  y2 = cos(angle2) * len2 + y1
  line(x1,y1,x2,y2)
  ellipse(x2,y2,m2*2,m2*2)
}

function sliderChanged(){
  sliderchange = true
  checkbox.remove()
  checkbox = createCheckbox("start animation", false)
  verterase()
}

function draw() {

  background(150);
  fill(255)
  stroke(255);
  strokeWeight(4);
  translate(500, 400)

  if(checkbox.checked()){
  updateObjects()
  xvertecies.push(x2)
  yvercecies.push(y2)
  sliderchange = false

  }else{
    if(sliderchange){
    angle1 = ang1.value()
    angle2 = ang2.value()
    }
  }
  drawObjects()


  // nrg1p = m1*g*(600 - y1)
  // nrg1k = (m1 * Math.abs(a1v) * Math.abs(a1v) * len1 * len1) / 2
  // // nrg2p = m2*g*(600 - y2)
  // // nrg2k = (m2 * Math.abs(a2v) * Math.abs(a2v) * len2 * len2) / 2 // yanlış düzeltmeye üşendim 1. topun hızını hesaba katmıyor
  // nrg2k = 0
  // nrg2p = 0

  // nrg = Math.ceil(nrg1k + nrg1p + nrg2k + nrg2p)
  // document.getElementById("energy").innerHTML = ("a1: "+Math.floor(angle1*100)/100 + "a2: " + Math.floor(angle2*100)/100 + "  " + "Mechanical Energy: " + nrg + "   Potential Energy: " + Math.ceil(nrg1p+nrg2p) + "   Kinetic Energy: " + Math.ceil(nrg1k+nrg2k));
  


  for (var key in xvertecies){
    stroke(193, 193, 221)
    strokeWeight(4)
    line(xvertecies[key],yvercecies[key],xvertecies[key-1],yvercecies[key-1])
  }


}
function verterase(){
  xvertecies = []
  yvercecies = []
}
