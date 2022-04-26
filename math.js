//jshint maxerr: 10000
//Math reference object
var math = {};

//Distance calculator
math.distance = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

//Random integer generator
math.random = (min, max) => {
  return Math.floor((Math.random() * (Math.abs(min - max) + 1)) + min);
};

//Calculator which finds the degree measure from point 1 to point 2.
math.angle = (x1, y1, x2, y2) => {
  return Math.atan2(y1 - y2,  x1 - x2) * 57.2958;
};

//Calculator which returns the x value needed to move in the direction inputted.
math.rotationalX = (angle) => {
  return Math.cos((angle) / 57.2958);
};

//Calculator which returns the x value needed to move in the direction inputted.
math.rotationalY = (angle) => {
  return Math.sin((angle) / 57.2958);
};

//Detects if two rectangular objects are colliding
math.colliding = (x1, y1, w1, h1, x2, y2, w2, h2) => {
  return (x1 + (w1 / 2) >= x2 - (w2 / 2) && x2 + (w2 / 2) >= x1 - (w1 / 2) && y1 + (h1 / 2) >= y2 - (h2 / 2) && y2 + (h2 / 2) >= y1 - (h1 / 2));
};

//Module activation message
console.log("Math Module Active");