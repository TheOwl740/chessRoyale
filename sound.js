//jshint maxerr: 10000
//Sound reference object
var sound = {};

//CREATE SOUND ASSET
sound.create = (source) => {
  return new Audio(source);
};

//PLAY SOUND FROM ASSET
sound.play = (soundObject) => {
  soundObject.play();
};

//PAUSE SOUND FROM ASSET
sound.pause = (soundObject) => {
  soundObject.pause();
};

//SET TIME OF SOUND
sound.resetTime = (soundObject, time) => {
  soundObject.currentTime = time;
};

//SET VOLUME
sound.setVolume = (soundObject, volume) => {
  soundObject.volume = volume / 100;
};

//Module
console.log("Sound Module Active");