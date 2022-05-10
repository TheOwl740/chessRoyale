if(window.localStorage.getItem('elo') === null) {
  window.localStorage.setItem('elo', "1000");
  window.localStorage.setItem('deck', "000000001001002003");
  window.localStorage.setItem('collection', "000001002003");
  accountState = "(Created new user)";
} else {
  elo = window.localStorage.getItem('elo');
  for(f = 0; f < window.localStorage.getItem('deck').length; f += 3) {
    deck.push(window.localStorage.getItem('deck').substr(f, 3));
  }
  for(f = 0; f < window.localStorage.getItem('collection').length; f += 3) {
    collection.push(window.localStorage.getItem('collection').substr(f, 3));
  }
  accountState = "User data loaded!";
}

function update() {
  bd++;
  
  if(inGame) {
    drawBoard();
    manageAdvantage();
    for(g = 0; g < white.towers.length; g++) {
      white.towers[g].update();
    }
    for(g = 0; g < black.towers.length; g++) {
      black.towers[g].update();
    }
		for(g = 0; g < white.pieces.length; g++) {
      white.pieces[g].update();
    }
		for(g = 0; g < black.pieces.length; g++) {
      black.pieces[g].update();
    }
    for(g = 0; g < white.deck.length; g++) {
      white.deck[g].update(g);
    }
    placementUpdate();
		controlUpdate();
  } else {
    updateMenu();
  }
}
timer.start(14.5);