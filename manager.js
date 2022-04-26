if(window.localStorage.getItem('elo') === null) {
  window.localStorage.setItem('elo', "1000");
  window.localStorage.setItem('deck', "000000001001002003");
  window.localStorage.setItem('collection', "000001002003");
  accountState = "(Created new user)";
} else {
  elo = window.localStorage.getItem('elo');
  for(i = 0; i < window.localStorage.getItem('deck').length; i += 3) {
    deck.push(window.localStorage.getItem('deck').substr(i, 3));
  }
  for(i = 0; i < window.localStorage.getItem('collection').length; i += 3) {
    collection.push(window.localStorage.getItem('collection').substr(i, 3));
  }
  accountState = "User data loaded!";
}

function update() {
  bd++;
  
  if(inGame) {
    drawBoard();
    manageAdvantage();
    for(i = 0; i < white.towers.length; i++) {
      white.towers[i].update();
    }
    for(i = 0; i < black.towers.length; i++) {
      black.towers[i].update();
    }
    for(i = 0; i < white.deck.length; i++) {
      white.deck[i].update(i);
    }
    placementUpdate();
  } else {
    updateMenu();
  }
}
timer.start(14.5);