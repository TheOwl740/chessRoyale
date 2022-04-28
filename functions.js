function initialiseGame(level, aiLevel, mode) {
  white = {
    advantage: 0,
    towers: [
    ],
    pieces: [
    ],
    deck: [
    ]
  };
  black = {
    advantage: 0,
    towers: [
    ],
    pieces: [
    ],
    deck: [
    ]
  };
  switch(mode) {
    default:
      white.towers.push(new king(elo, 4, 10, 0));
      white.towers.push(new rook(elo, 1, 9, 0));
      white.towers.push(new rook(elo, 7, 9, 0));
      
      black.towers.push(new king(difficulty, 4, 0, 1));
      black.towers.push(new rook(difficulty, 1, 1, 1));
      black.towers.push(new rook(difficulty, 7, 1, 1));
  }
  for(i = 0; i < deck.length; i++) {
    white.deck.push(new card(deck[i]));
  }
}

function updateMenu() {
  canvas.clear("#112233");
    
  switch(Math.floor(elo / 200)) {
    case 5:
      playerLevel = "noob";
      break;
    case 6:
      playerLevel = "scrub";
      break;
    case 7:
      playerLevel = "beginner";
      break;
    case 8:
      playerLevel = "intermediate";
      break;
    case 9:
      playerLevel = "gamer";
      break;
    case 10:
      playerLevel = "chad";
      break;
    case 11:
      playerLevel = "pogchamp";
      break;
    default:
      playerLevel = "grandmaster";
  }
  
  canvas.text("white", "courier", "Elo: " + elo + " (" + playerLevel + ")", 1, 10, 30, 30, 0, 0, 0);
  canvas.text("white", "courier", accountState, 1, 10, 65, 30, 0, 0, 0);

  canvas.image(assets.images.logo, 1, 300, 210, 500, 300, 0, 0, 0, false, false);
  
  canvas.image(assets.images.button, 1, 230, (canvas.h / 2) + 60, 400, 150, 0, 0, 0, false, false);
  canvas.text("black", "courier", "Play", 1, 110, (canvas.h / 2) + 80, 100, 0, 0, 0);
  if(math.colliding(input.mouse.x, input.mouse.y, 1, 1, 230, (canvas.h / 2) + 60, 400, 150) && input.mouse.clicking) {
    initialiseGame();
    inGame = true;
  }
  
  canvas.text("black", "courier", "opponent: < " + difficulty + " > elo", 1, 50, (canvas.h / 2) + 180, 50, 0, 0, 0);
  canvas.text("black", "courier", "Game Mode: Normal", 1, 50, (canvas.h / 2) + 240, 50, 0, 0, 0);
  if(input.getKey("ArrowRight")) {
    difficulty++;
  }
  if(input.getKey("ArrowLeft")) {
    difficulty--;
  }
  
  canvas.rect("#001133", 1, (canvas.w / 2) + 20, canvas.h / 2, canvas.h / 6, canvas.h, 0, 0, 0);
  for(i = 0; i < 6; i++) {
    canvas.image(assets.images.cards[parseInt(deck[i], 10)], 1, (canvas.w / 2) + 20, ((canvas.h / 6) * i) + (canvas.h / 12), canvas.h / 8, canvas.h / 6, 0, 0, 0, false, false);
  }
  
  canvas.text("black", "courier", "Collection", 1, (canvas.w * 2) / 3, 40, 50, 0, 0, 0);
  
  for(i = 0; i < collection.length; i++) {
    canvas.image(assets.images.cards[parseInt(collection[i], 10)], 1, (canvas.w / 2) + (canvas.w / 7) + ((canvas.w / 20) * (i % 6)), 100 + ((canvas.w / 18) * Math.floor(i / 6)), canvas.w / 24, canvas.w / 20, 0, 0, 0, false, false);
  }
}

function drawBoard() {
  canvas.clear("#112233");
  canvas.image(assets.images.board, 1, canvas.h / 2.444, canvas.h / 2, canvas.h / 1.222, canvas.h, 0, 0, 0, false, false);
}

function manageAdvantage() {
  canvas.line("#2051A9", 1, ssc * 9.5, ssc / 4, ssc * 9.5, canvas.h - (ssc / 4), ssc / 2);
  canvas.line("#6495ED", 1, ssc * 9.5, canvas.h - (ssc / 4), ssc * 9.5, (canvas.h - (ssc / 4)) - (white.advantage * ((canvas.h - (ssc / 2)) / 9)), ssc / 2);
  canvas.image(assets.images.advantage, 1, ssc * 9.5, canvas.h - (ssc / 2), ssc - 10, ssc - 10, 0, 0, 0, false, false);
  canvas.text("black", "courier", Math.floor(white.advantage), 1, (ssc * 9.5) - 8, canvas.h - (ssc / 2) + 15, 30, 0, 0, 0);
  if(white.advantage <= 9) {
    white.advantage += 0.01;
  }
  if(black.advantage <= 9) {
    black.advantage += 0.01;
  }
}

function placementUpdate() {
  if(input.getKey("ArrowUp") && bd > 15) {
    bd = 0;
    if(selectedCard > 0) {
      selectedCard--;
    } else {
      selectedCard = 5;
    }
  }
  if(input.getKey("ArrowDown") && bd > 15) {
    bd = 0;
    if(selectedCard < 5) {
      selectedCard++;
    } else {
      selectedCard = 0;
    }
  }
  for(i = 0; i < white.deck.length; i++) {
    white.deck[i].selected = false;
  }
  white.deck[selectedCard].selected = true;
}