var inGame = false;
const ssc = canvas.h / 11;
var elo = 1000;
var playerLevel = "";
var accountState = "";
var difficulty = 1000;
var selectedCard = 0;
var bd = 0;
var placing = null;
var selected = null;

var a;
var b;
var c;
var d;
var e;
var f;
var g;
var h;
var i;
var j;

var deck = [
];
var collection = [
];

const assets = {
  sprites: {
    pieceSheet: canvas.createSprite("assets/chessPieces.png", 6, 2, 1200, 400)
  },
  images: {
		background: canvas.createImage("assets/background.jpg"),
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

class tower {
  constructor(elo, x, y, color, type) {
		if(this.type === "king") {
		  this.health = 400 + Math.floor(elo / 10);
		} else {
    	this.health = 200 + Math.floor(elo / 20);
		}
    this.x = (x * ssc) + (ssc / 2);
    this.y = (y * ssc) + (ssc / 2);
    this.color = color;
		this.type = type;
  }
  update() {
		if(this.type === "king") {
			canvas.drawSprite(assets.sprites.pieceSheet, 1, 0, this.color, this.x, this.y, ssc, ssc, 0, 0, 0);
    	canvas.text("black", "courier", this.health, 1, this.x + (ssc / 6), this.y + (ssc / 2), 12, 0, 0, 0);
		} else {
			canvas.drawSprite(assets.sprites.pieceSheet, 1, 4, this.color, this.x, this.y, ssc, ssc, 0, 0, 0);
    	canvas.text("black", "courier", this.health, 1, this.x + (ssc / 6), this.y + (ssc / 2), 12, 0, 0, 0);
		}
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
				if(backOpen()) {
					if(placing === null) {
						placing = new piece(this.pieceType, "white", 8, 10, false);
					}
					if(placing.type === this.pieceType) {
						placing.update();
					} else {	
						placing = new piece(this.pieceType, "white", 8, 10, false);
					}
					if(input.getKey("Enter") && bd > 15) {
						if(white.advantage > this.cost) {
							bd = 0;
							white.advantage -= this.cost;
							placing.assigned = true;
							white.pieces.push(placing);
							placing = null;
							this.available = false;
						}
					}
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
  constructor(type, color, x, y, assigned) {
		this.x = (x * ssc) + (ssc / 2);
    this.y = (y * ssc) + (ssc / 2);
    this.color = color;
		this.type = type;
		this.assigned = assigned;
		this.moveTimer = 0;
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
  
  update() {
    if(this.assigned) {
      canvas.drawSprite(assets.sprites.pieceSheet, 1, this.col, this.row, this.x, this.y, ssc, ssc, 0, 0, 0);
    	if(this.moveTimer > 0) {
				this.moveTimer -= elo / 1000;
				canvas.arc("#6495ED", 0.69, this.x, this.y, (ssc / 2) - 10, -25, this.moveTimer - 25, 10, false);
			} else {
				this.moveTimer = 0;
			}
		} else {
      if(this.color === "white") {
        if(input.getKey("ArrowLeft") && bd > 15) {
          bd = 0;
					for(b = convert(this.x); b > 0; b--) {
						if(getSpace(b - 1, 10) === "OP") {
							this.x = (b * ssc) - (ssc / 2);
							break;
						}
					}						
        }
        if(input.getKey("ArrowRight") && bd > 15) {
          bd = 0;
          for(h = convert(this.x); h < 8; h++) {
						if(getSpace(h + 1, 10) === "OP") {
							this.x = ((h + 1) * ssc) + (ssc / 2);
							break;
						}
					}			
        }
      }
      canvas.drawSprite(assets.sprites.pieceSheet, 0.69, this.col, this.row, this.x, this.y, ssc, ssc, 0, 0, 0);
    }
  }
}