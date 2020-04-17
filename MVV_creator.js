let pdf;
//GRID
let grid = true;
const padding = 10;
const colV = 5;
const colH = 48;
const gap = 20;
//GRID SQUARE
let h;
let w;
//UI
const draggerSize = 15;
//ELEMENTS
let elementsKey = 0;
let elements = [];
//IMGS
let logo; 
let cover;

//SAVE
let rec = false;


function preload() {
  logo = loadImage("assets/logo.svg");
}

function setup() {
  let cnv = createCanvas(826, 1170, P2D);
  cnv.parent('canvas');
  
  w = (width-padding*2)/colV;
  h = (height-padding*4)/colH;
  
  textFont('EB Garamond');
  
  noLoop();
  frameRate(10);
  
  let addTxt = createButton('aggiungi testo').parent('buttons_container');
  addTxt.mousePressed(newText);
  let addImg = createButton('aggiungi immagine').parent('buttons_container');
  addImg.mousePressed(newImage);
  
  let el = new TextElement(elementsKey, 0, colH - 1, 2, 1, 'tg', 'Museo di Val Verzasca');
  elementsKey++;
  elements.push(el);

}


function draw() {
  //REC
  if(rec){
    pixelDensity(3.0);
  }
  
  background(255);
  
  //logo
  image(logo, padding + gap/2, padding + gap/2, 250, (logo.height/logo.width)*250);
  /*BUG FIREFOX DOESN'T LOAD!*/
  
  //grid
  if(!rec){
    stroke(0);
    strokeWeight(2);
    line(0, 0, width, 0);
    line(width, 0, width, height);
    line(width, height, 0, height);
    line(0, height, 0, 0);
    stroke(0, 180, 255);
    strokeWeight(1);
     if(grid){
      for(let i = padding; i <= width; i+=(width-padding*2)/colV){
        line(i - gap/2, 0, i - gap/2, height);
        line(i + gap/2, 0, i + gap/2, height);
      }
      for(let i = padding*2; i <= height; i+=(height-padding*4)/colH){
        line(0, i, width, i);
      }
    }
  }
  
  fill(255);
  
  for(let element of elements){
    element.over();
    element.update();
    element.show();
  }
  //REC
  if(rec){
    save('flyer.jpg');
    pixelDensity(1.0);
    rec = false;
  }
}


//MOUSE EVENTS
function mousePressed() {
  loop();
  for(let element of elements){
    element.pressed();
  }
}

function mouseReleased() {
  for(let element of elements){
    element.released();
  }
  noLoop();
}

//ADD
function newText(x = 0, y = 4, w = 2, h = 1, fs = 't', t = 'Nuovo testo'){
  let el = new TextElement(elementsKey, x, y, w, h, fs, t);
  elementsKey++;
  elements.push(el);
  console.log(elements);
}

function newImage(x = 0, y = 12, w = 5, h = 20){
  let el = new ImageElement(elementsKey, x, y, w, h);
  elementsKey++;
  elements.push(el);
}
//REMOVE
function removeElement(el){
    let id = el.getAttribute("parentId");
    let node = document.getElementById('el_container' + id);
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
    let pos = elements.findIndex(b => b.name == id);
    elements.splice(pos, 1);
}

//SAVE
function createJPG(){
  rec = true;
  redraw();
}

function saveLocandinaJSON(){
  saveJSON(elements, 'locandina');
}

function loadLocandinaJSON(files){
  let data;
  let fr = new FileReader();

  fr.onload = function(e) { 
    data = JSON.parse(e.target.result);
    for(let i = 1; i < data.length; i++){
      if(data[i].type == "image"){
        newImage(data[i].colX, data[i].colY, data[i].colW, data[i].colH); 
      }else if(data[i].type == "text"){
        newText(data[i].colX, data[i].colY, data[i].colW, data[i].colH, data[i].fs, data[i].txt);
      }
    }
    redraw();
  }

  fr.readAsText(files.item(0));
}

function setElements(json){
  elements = json;
}

//GRID
function toggleGrid(){
  if(grid){
    grid = false;
  }else{
    grid = true;
  }
  redraw();
}
