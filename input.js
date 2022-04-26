//jshint maxerr: 10000
//Input reference object
var input = {};

//Mouse Object
input.mouse = {
  x: null,
  y: null,
  clicking: false
};

//Array of pressed keys
input.pressedKeys = [
];

//Key functions
input.newKey = (e) => {
  if(!input.pressedKeys.includes(e.key)) {
    input.pressedKeys.push(e.key);
  }
};
input.removeKey = (e) => {
  input.pressedKeys.splice(input.pressedKeys.indexOf(e.key), 1);
};
input.getKey = (key) => {
  return input.pressedKeys.includes(key);
};

//Key listeners
document.addEventListener("keydown", input.newKey);
document.addEventListener("keyup", input.removeKey);

//Mouse functions
function locateMouse(e) {
  input.mouse.x = e.clientX;
  input.mouse.y = e.clientY;
}
function mDown() {
  input.mouse.clicking = true;
}
function mUp() {
  input.mouse.clicking = false;
}

//Mouse listeners
document.addEventListener("mousemove", locateMouse);
document.addEventListener("mousedown", mDown);
document.addEventListener("mouseup", mUp);

//Activation Message
console.log("Input Module Active");