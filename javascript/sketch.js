
let loadbar = 0;
let failedLoads = [];
let jsonDocuments = [
  "./json/newspaper.json",
  // "./json/Short1.json"
  "./json/newspaper2.json"
];
let canvas;
let files = [];
let imgFiles = [];
let displayText = "Who's Andy Warhol ?(>>Click<<)";
//data structure
let phrases = []; // for cut up generator
let par;

let gra;

function setup() {
  canvas = createCanvas(windowWidth, 500);
  canvas.parent("sketch-container"); //move our canvas inside this HTML element
  loadFile(0);
  canvas.mousePressed(handleCanvasPressed);
  
  gra= createImage(windowWidth, windowHeight);
  gra.loadPixels();
  for (let i = 0; i < gra.width; i++) {
    for (let j = 0; j < gra.height; j++) {
      graValue=map(j % gra.height,0, gra.height,0,255);
      gra.set(i, j, color(0, 90, 102,255-graValue*2));
  }
}
  gra.updatePixels();
}

function draw() {
  background(255);
  image(gra, 0, 0);
  push();
  textSize(300);
  textStyle(BOLD);
  text('CLICK ME',200,0, windowWidth);
  pop();
  if(loadbar < jsonDocuments.length){
    let barLength = width*0.5;
    let length = map(loadbar,0,jsonDocuments.length,barLength/jsonDocuments.length,barLength);
    rect(width*0.25,height*0.5,length,20);
  }else{
    let fontSize = map(displayText.length,0,200,30,20,true);
    textFont('Times');
    textStyle(BOLD);
    textSize(fontSize);
    textWrap(WORD);
    textAlign(RIGHT);
    text(displayText,windowWidth/2, 400, windowWidth/2);
  }

  
}

function handleCanvasPressed(){
  //generate cut up phrases
  displayText = generateCutUpPhrases(20);
  let randomIndex = int(random(0,imgFiles.length))
  //show text in HTML
  showText(displayText);
  showImage(imgFiles[randomIndex],randomIndex);
}

function buildModel(){
  //phrases
  for(let i = 0; i < files.length; i++){ 
      phrases.push(files[i]);
      // console.log(files[i]);
  }
}

//Text Generator Functions ----------------------------------
function generateCutUpPhrases(numPhrases){
  let output = "";

  //implement your code to generate the output
  for(let i = 0; i < numPhrases; i++){
    let randomIndex = int(random(0,phrases.length));
    let randomPhrase = phrases[randomIndex];
    output += randomPhrase + ". ";
  }
  return output;
}

//Generic Helper functions ----------------------------------
function loadFile(index){
  if(index < jsonDocuments.length){
    let path = jsonDocuments[index]; 
    fetch(path).then(function(response) {
      return response.json();
    }).then(function(data) {
      par=data.newspaper;
      for (let i=0; i<par.length; i++){
      files.push(par[i].name);
      files.push(par[i].location);
      files.push(par[i].date);
      files.push(par[i].page);
      files.push('ANDY WARHOL');
      files.push('Andy Warhol');
      files.push('andy');
      imgFiles.push(par[i].image);
    }
      showImage(par[index].image,index);
      showText(par[index].name);
      loadbar ++;
      loadFile(index+1);
    });
  }else{
    buildModel();//change this to whatever function you want to call on successful load of all texts
  }

}

//add text as html element
function showText(text){
  let textContainer = select("#text-container");
//  textContainer.elt.innerHTML = "";//add this in if you want to replace the text each time
  let p = createP(text);
  p.parent("text-container");
}

function showImage(link,index){
  let textContainer = select("#text-container");
//  textContainer.elt.innerHTML = "";//add this in if you want to replace the text each time
  let img = createImg(link);
  img.parent("image-container");
  img.position(100*index,100*index);
}

function changeBG() {
  let val = random(255);
  background(val);
}