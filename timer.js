//jshint maxerr: 10000
//Timer reference object
var timer = {};

//Update function called each cycle
var update;

//Timer object to hold interval
var timerObject;

//Start function
timer.start = (speed) => {
  timerObject = setInterval(update, speed);
};

//Stop function
timer.stop = () => {
  clearInterval(timerObject);
};

//Module activation message
console.log("Timer Module Active");