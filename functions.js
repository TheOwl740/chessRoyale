function initialiseGame(mode) {
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
      white.towers.push(new tower(elo, 4, 10, 0, "king"));
      white.towers.push(new tower(elo, 1, 10, 0, "rook"));
      white.towers.push(new tower(elo, 7, 10, 0, "rook"));
      
      black.towers.push(new tower(difficulty, 4, 0, 1, "king"));
      black.towers.push(new tower(difficulty, 1, 0, 1, "rook"));
      black.towers.push(new tower(difficulty, 7, 0, 1, "rook"));
  }
  for(c = 0; c < deck.length; c++) {
    white.deck.push(new card(deck[c]));
  }
}

function updateMenu() {
	canvas.image(assets.images.background, 1, canvas.w / 2, canvas.h / 2, canvas.w, canvas.h * 1.2, 0, 0, 0, false, false);
  
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
    initialiseGame("normal");
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
  
  for(d = 0; d < 6; d++) {
    canvas.image(assets.images.cards[parseInt(deck[d], 10)], 1, (canvas.w / 2) + 20, ((canvas.h / 6) * d) + (canvas.h / 12), canvas.h / 8, canvas.h / 6, 0, 0, 0, false, false);
  }
  
  canvas.text("black", "courier", "Collection", 1, (canvas.w * 2) / 3, 40, 50, 0, 0, 0);
  
  for(d = 0; d < collection.length; d++) {
    canvas.image(assets.images.cards[parseInt(collection[d], 10)], 1, (canvas.w / 2) + (canvas.w / 7) + ((canvas.w / 20) * (d % 6)), 100 + ((canvas.w / 18) * Math.floor(d / 6)), canvas.w / 24, canvas.w / 20, 0, 0, 0, false, false);
  }
}

function drawBoard() {
	canvas.image(assets.images.background, 1, canvas.w / 2, canvas.h / 2, canvas.w, canvas.h * 1.2, 0, 0, 0, false, false);
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
  for(e = 0; e < white.deck.length; e++) {
    white.deck[e].selected = false;
  }
  white.deck[selectedCard].selected = true;
}

function getSpace(x, y) {
	for(a = 0; a < white.pieces.length; a++) {
		if(convert(white.pieces[a].x) === x && convert(white.pieces[a].y) === y) {
			return "WP";
		}
	}
	for(a = 0; a < black.pieces.length; a++) {
		if(convert(black.pieces[a].x) === x && convert(black.pieces[a].y) === y) {
			return "BP";
		}
	}
	for(a = 0; a < white.towers.length; a++) {
		if(convert(white.towers[a].x) === x && convert(white.towers[a].y) === y) {
			return "WT";
		}
	}
	for(a = 0; a < black.towers.length; a++) {
		if(convert(black.towers[a].x) === x && convert(black.towers[a].y) === y) {
			return "BT";
		}
	}
	if(x < 0 || x > ssc * 9 || y < 0 || y > ssc * 11) {
		return "OB";
	}
	return "OP";
}

function convert(number) {
	return Math.round((number / ssc) - 0.5);
}

function backOpen() {
	for(i = 0; i < 9; i++) {
		if(getSpace(i, 10) === "WP") {
			return false;
		}
	}
	return true;
}

function controlUpdate() {
	var permissible = [
	];
	if(selected !== null) {
		switch(selected.type) {
			case "000":
				permissible.push({
					x: selected.x - ssc,
					y: selected.y - ssc,
					w: ssc,
					h: ssc
				});
				permissible.push({
					x: selected.x + ssc,
					y: selected.y - ssc,
					w: ssc,
					h: ssc
				});
				permissible.push({
					x: selected.x,
					y: selected.y - ssc,
					w: ssc,
					h: ssc
				});
				permissible.push({
					x: selected.x,
					y: selected.y - (ssc * 2),
					w: ssc,
					h: ssc
				});
				for(j = 0; j < permissible.length; j++) {
					if(getSpace(permissible[j].x, permissible[j].y) === "WP" || getSpace(permissible[j].x, permissible[j].y) === "WT" || getSpace(permissible[j].x, permissible[j].y) === "OB" || getSpace(permissible[j].x, permissible[j].y) === "WA") {
						permissible.splice(j, 1);
					}
				}
				break;
		}
	}
	for(j = 0; j < permissible.length; j++) {
		canvas.arc("black", 0.69, permissible[j].x, permissible[j].y, ssc / 8, 0, 100, 1, true);
	}
	var unassign = true;
	if(input.mouse.clicking) {
		for(j = 0; j < white.pieces.length; j++) {
			if(white.pieces[j].assigned && white.pieces[j].moveTimer === 0 && math.colliding(input.mouse.x, input.mouse.y, 1, 1, white.pieces[j].x, white.pieces[j].y, ssc, ssc)) {
				selected = white.pieces[j];
				unassign = false;
				break;
			}
		}
		if(selected !== null) {
			for(j = 0; j < permissible.length; j++) {
				if(math.colliding(input.mouse.x, input.mouse.y, 1, 1, permissible[j].x, permissible[j].y, ssc, ssc)) {
					selected.x = permissible[j].x;
					selected.y = permissible[j].y;
					selected.moveTimer = 100;
					selected = null;
					unassign = false;
				}
			}
		}
		if(unassign) {
			selected = null;
		}
	}
}