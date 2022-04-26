//jshint maxerr: 10000
//Canvas Reference Object
var canvas = {};

//Appends necessary components onto document, leaving script elements after the new canvas.
document.body.innerHTML = "<canvas id=\"canvas\"></canvas>" + document.body.innerHTML;
document.head.innerHTML += "<meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width\"><style>canvas{margin:0;border:0;padding:0;}body{margin:0;overflow:hidden;}</style>";

//Gets and stores the canvas element object
canvas.element = document.getElementById("canvas");

//Gets canvas context for drawing
canvas.cx = canvas.element.getContext("2d");

//Sets initial canvas dimensions to full screen
canvas.element.width = window.innerWidth;
canvas.w = window.innerWidth;
canvas.element.height = JSON.parse(JSON.stringify(window.innerHeight));
canvas.h = window.innerHeight;

//Forces reset of canvas dimensions to less than full screen, also allowing overflow scroll. Use "full" in place of parameters to fill the document or refill in the event of a resize
canvas.setDimensions = (w, h) => {
  if(w === "full") {
    canvas.element.width = window.innerWidth;
    canvas.w = window.innerWidth;
    canvas.element.height = window.innerHeight;
    canvas.h = window.innerHeight;
  } else {
    canvas.w = w;
    canvas.h = h;
    canvas.element.width = w;
    canvas.element.height = h;
  }
};

//Draws a filled rectangle
canvas.rect = (color, alpha, x, y, w, h, angle, xOffset, yOffset) => {
  canvas.cx.globalAlpha = alpha;
  canvas.cx.save();
  canvas.cx.translate(x, y);
  canvas.cx.rotate(angle * (Math.PI/180));
  canvas.cx.fillStyle = color;
  canvas.cx.fillRect(xOffset - (w / 2), yOffset - (h / 2), w, h);
  canvas.cx.restore();
};

//CREATES AN IMAGE FOR DRAWING
canvas.createImage = (source) => {
  var rv = new Image();
  rv.src = source;
  return rv;
};

//Draws an image
canvas.image = (source, alpha, x, y, w, h, angle, xOffset, yOffset, hFlip, vFlip) => {
  canvas.cx.globalAlpha = alpha;
  var fc = {
    x: 1,
    y: 1
  };
  canvas.cx.save();
  if(hFlip) {
    canvas.cx.scale(-1, 1);
    fc.x = -1;
  } else {
    canvas.cx.scale(1, 1);
  }
  if(vFlip) {
    canvas.cx.scale(1, -1);
    fc.y = -1;
  } else {
    canvas.cx.scale(1, 1);
  }
  canvas.cx.translate(x * fc.x, y * fc.y);
  canvas.cx.rotate(angle * fc.x * fc.y * (Math.PI/180));
  canvas.cx.drawImage(source, (xOffset * fc.x) - (w / 2), (yOffset * fc.y) - (h / 2), w, h);
  canvas.cx.restore();
};

//Draws a filled circle
canvas.arc = (color, alpha, x, y, radius) => {
  canvas.cx.globalAlpha = alpha;
  canvas.cx.beginPath();
  canvas.cx.arc(x, y, radius, 0, 2 * Math.PI, false);
  canvas.cx.fillStyle = color;
  canvas.cx.fill();
  canvas.cx.lineWidth = 5;
  canvas.cx.strokeStyle = color;
  canvas.cx.stroke();
};

//Draws text
canvas.text = (color, font, text, alpha, x, y, size, angle, xOffset, yOffset) => {
  canvas.cx.save();
  canvas.cx.translate(x, y);
  canvas.cx.rotate(angle * (Math.PI/180));
  canvas.cx.globalAlpha = alpha;
  canvas.cx.font = size + "px " + font;
  canvas.cx.fillStyle = color;
  canvas.cx.fillText(text, xOffset, yOffset);
  canvas.cx.restore();
};

//Draws a line between two points
canvas.line = (color, alpha, x1, y1, x2, y2, w) => {
  canvas.cx.globalAlpha = alpha;
  canvas.cx.strokeStyle = color;
  canvas.cx.lineWidth = w;
  canvas.cx.beginPath();
  canvas.cx.moveTo(x1, y1);
  canvas.cx.lineTo(x2, y2);
  canvas.cx.stroke();
};

//Fills entire canvas with specified color
canvas.clear = (color) => {
  canvas.rect(color, 1, canvas.w / 2, canvas.h / 2, canvas.w, canvas.h, 0, 0, 0);
};

canvas.createSprite = (source, columns, rows, w, h) => {
  var img = new Image();
  img.src = source;
  return {
    source: source,
    columns: columns,
    rows: rows,
    w: w,
    h: h
  };
};

canvas.drawSprite = (sprite, alpha, column, row, x, y, w, h, r, xOffset, yOffset) => {
  canvas.cx.globalAlpha = alpha;
  var image = new Image();
  image.src = sprite.source;
  canvas.cx.save();
  canvas.cx.translate(x, y);
  canvas.cx.rotate(r * (Math.PI/180));
  canvas.cx.drawImage(image, column * (sprite.w / sprite.columns), row * (sprite.h / sprite.rows), sprite.w / sprite.columns, sprite.h / sprite.rows, xOffset - (w / 2), yOffset - (h / 2), w, h);
  canvas.cx.restore();
};

//Module Activation Message
console.log("Canvas Module Active");