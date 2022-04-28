var inGame = false;
const ssc = canvas.h / 11;
var elo = 1000;
var playerLevel = "";
var accountState = "";
var difficulty = 1000;
var selectedCard = 0;
var bd = 0;
var placing = null;

var deck = [
];
var collection = [
];

const assets = {
  sprites: {
    pieceSheet: canvas.createSprite("assets/chessPieces.png", 6, 2, 1200, 400)
  },
  images: {
    logo: canvas.createImage("assets/chessRoyaleLogo.png"),
    button: canvas.createImage("assets/button.png"),
    board: canvas.createImage("assets/chessBoard.png"),
    advantage: canvas.createImage("assets/advantage.png"),
    cards: [
      canvas.createImage("assets/cards/000.png"),
      canvas.createImage("assets/cards/001.png"),
      canvas.createImage("assets/cards/002.png"),
      canvas.createImage("assets/cards/003.png")
    ]
  },
  sounds: {
    
  }
};

class king {
  constructor(elo, x, y, color) {
    this.health = 400 + Math.floor(elo / 10);
    this.x = (x * ssc) + (ssc / 2);
    this.y = (y * ssc) + (ssc / 2);
    this.color = color;
  }
  update() {
    canvas.drawSprite(assets.sprites.pieceSheet, 1, 0, this.color, this.x, this.y, ssc, ssc, 0, 0, 0);
    canvas.text("black", "courier", this.health, 1, this.x + (ssc / 6), this.y + (ssc / 2), 12, 0, 0, 0);
  }
}

class rook {
  constructor(elo, x, y, color) {
    this.health = 200 + Math.floor(elo / 20);
    this.x = (x * ssc) + (ssc / 2);
    this.y = (y * ssc) + (ssc / 2);
    this.color = color;
  }
  update() {
    canvas.drawSprite(assets.sprites.pieceSheet, 1, 4, this.color, this.x, this.y, ssc, ssc, 0, 0, 0);
    canvas.text("black", "courier", this.health, 1, this.x + (ssc / 6), this.y + (ssc / 2), 12, 0, 0, 0);
  }
}

class card {
  constructor(pieceType) {
    this.pieceType = pieceType;
    this.available = true;
    this.queue = null;
    this.selected = false;
    switch(pieceType) {
      case "003":
        this.cost = 9;
        break;
      case "001":
        this.cost = 3;
        break;
      case "002":
        this.cost = 5;
        break;
      case "000":
        this.cost = 1;
        break;
    }
  }
  
  update(position) {
    if(this.available) {
      if(this.selected) {
        canvas.image(assets.images.cards[parseInt(this.pieceType)], 1, ssc * 10.5, ((canvas.h / 6) * position) + (canvas.h / 12), canvas.h / 8, canvas.h / 6, 0, 0, 0, false, false);
				if(placing === null) {
					placing = new piece(this.pieceType, "white");
				}
				if(placing.type === this.pieceType) {
					placing.update();
				} else {	
					placing = new piece(this.pieceType, "white");
				}
      } else {
        canvas.image(assets.images.cards[parseInt(this.pieceType)], 1, ssc * 11, ((canvas.h / 6) * position) + (canvas.h / 12), canvas.h / 8, canvas.h / 6, 0, 0, 0, false, false);
      }
    } else {
      if(this.selected) {
        canvas.image(assets.images.cards[parseInt(this.pieceType)], 0.5, ssc * 11.5, ((canvas.h / 6) * position) + (canvas.h / 12), canvas.h / 8, canvas.h / 6, 0, 0, 0, false, false);
      } else {
        canvas.image(assets.images.cards[parseInt(this.pieceType)], 0.5, ssc * 12, ((canvas.h / 6) * position) + (canvas.h / 12), canvas.h / 8, canvas.h / 6, 0, 0, 0, false, false);
      }
    }
  }
}

class piece {
  constructor(type, color) {
		this.y = (ssc * 10) + (ssc / 2);
    this.x = (ssc * 8) + (ssc / 2);
    this.type = type;
    this.color = color;
		if(color === "white") {
			this.row = 0;
		} else {
			this.row = 1;
		}
    switch(type) {
			case "000":
				this.col = 5;
				break;
			case "001":
				this.col = 2;
				break;
			case "002":
				this.col = 3;
				break;
			case "003":
				this.col = 1;
				break;
    }
  }
  
  update(assigned) {
    if(assigned) {
      
    } else {
      if(this.color === "white") {
        if(input.getKey("ArrowLeft") && bd > 15) {
          bd = 0;
          if(this.x > ssc / 2) {
            this.x -= ssc;
          } else {
            this.x = (ssc * 7) + (ssc / 2);
          }
        }
        if(input.getKey("ArrowRight") && bd > 15) {
          bd = 0;
          if(this.x < (ssc * 8) + (ssc / 2)) {
            this.x += ssc;
          } else {
            this.x = ssc / 2;
          }
        }
      }
      canvas.drawSprite(assets.sprites.pieceSheet, 0.69, this.col, this.row, this.x, this.y, ssc, ssc, 0, 0, 0);
    }
  }
}