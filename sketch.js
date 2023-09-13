var joinedText;
var alphabet;
var drawLetters = [];

var posX;
var posY;

var drawText = true;

let bgImg ;

function preload() {
  joinedText = loadStrings('assets/haiku.txt');
  bgImg = loadImage('assets/haiku-bg.svg');
}

function setup() {
  createCanvas(800, windowHeight-100);

  
  textFont('monospace', 16);
  fill("#0030fa");
  
  joinedText = joinedText.join(' ');
  alphabet = getUniqCharacters();
  for (var i = 0; i < alphabet.length; i++) {
    drawLetters[i] = true;
  }
}

function draw() {
  background("#E8E8E8");
  image(bgImg, 0, 0, width, height);

  posX = 50;
  posY = height-190;
  var oldX = 0;
  var oldY = 0;

  // go through all characters in the text to draw them
  for (var i = 0; i < joinedText.length; i++) {
    // again, find the index of the current letter in the character set
    var upperCaseChar = joinedText.charAt(i).toUpperCase();
    var index = alphabet.indexOf(upperCaseChar);
    if (index < 0) continue;

    var sortY = index * 10 + 90;
    var m = map(mouseY, 0, height, 1, 0);
    m = constrain(m, 0, 1);
    var interY = lerp(posY, sortY, m);

    if (drawLetters[index]) {

      if (drawText) {
        noStroke();
        text(joinedText.charAt(i), posX, interY);
      }
    } else {
      oldX = 0;
      oldY = 0;
    }

    posX += textWidth(joinedText.charAt(i));
    if (posX >= width - 50 && upperCaseChar == ' ') {
      posY += 30;
      posX = 20;
    }
  }
}

function getUniqCharacters() {
  var charsArray = joinedText.toUpperCase().split('');
  var uniqCharsArray = charsArray.filter(function(char, index) {
    return charsArray.indexOf(char) == index;
  }).sort();
  return uniqCharsArray.join('');
}

function keyReleased() {
  if (key == '3') {
    for (var i = 0; i < alphabet.length; i++) {
      drawLetters[i] = false;
    }
  }
  if (key == '4') {
    drawText = true;
    for (var i = 0; i < alphabet.length; i++) {
      drawLetters[i] = true;
    }
  }

  var index = alphabet.indexOf(key.toUpperCase());
  if (index >= 0) {
    drawLetters[index] = !drawLetters[index];
  }
}