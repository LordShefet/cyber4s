
let me = 'gohome';kkk
const BOARD_SIZE = 8;
const WHITE_PLAYER = 'white';
const BLACK_PLAYER = 'black';

let selectedCell;
let pieces = [];
let table;

class Piece {
  constructor(row, col, type, player) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.player = player;
  }
}


function getInitialBoard() {
  let result = [];
  result.push(new Piece(0, 0, "rook", WHITE_PLAYER));
  result.push(new Piece(0, 1, "knight", WHITE_PLAYER));
  result.push(new Piece(0, 6, "knight", WHITE_PLAYER));
  result.push(new Piece(0, 7, "rook", WHITE_PLAYER));
  result.push(new Piece(0, 3, "queen", WHITE_PLAYER));
  result.push(new Piece(0, 4, "king", WHITE_PLAYER));
  result.push(new Piece(0, 2, "bishop", WHITE_PLAYER));
  result.push(new Piece(0, 5, "bishop", WHITE_PLAYER));
  result.push(new Piece(1, 0, "pawn", WHITE_PLAYER));
  result.push(new Piece(1, 1, "pawn", WHITE_PLAYER));
  result.push(new Piece(1, 2, "pawn", WHITE_PLAYER));
  result.push(new Piece(1, 3, "pawn", WHITE_PLAYER));
  result.push(new Piece(1, 4, "pawn", WHITE_PLAYER));
  result.push(new Piece(1, 5, "pawn", WHITE_PLAYER));
  result.push(new Piece(1, 6, "pawn", WHITE_PLAYER));
  result.push(new Piece(1, 7, "pawn", WHITE_PLAYER));

  result.push(new Piece(7, 0, "rook", BLACK_PLAYER));
  result.push(new Piece(7, 1, "knight", BLACK_PLAYER));
  result.push(new Piece(7, 6, "knight", BLACK_PLAYER));
  result.push(new Piece(7, 7, "rook", BLACK_PLAYER));
  result.push(new Piece(7, 3, "queen", BLACK_PLAYER));
  result.push(new Piece(7, 4, "king", BLACK_PLAYER));
  result.push(new Piece(7, 2, "bishop", BLACK_PLAYER));
  result.push(new Piece(7, 5, "bishop", BLACK_PLAYER));
  result.push(new Piece(6, 0, "pawn", BLACK_PLAYER));
  result.push(new Piece(6, 1, "pawn", BLACK_PLAYER));
  result.push(new Piece(6, 2, "pawn", BLACK_PLAYER));
  result.push(new Piece(6, 3, "pawn", BLACK_PLAYER));
  result.push(new Piece(6, 4, "pawn", BLACK_PLAYER));
  result.push(new Piece(6, 5, "pawn", BLACK_PLAYER));
  result.push(new Piece(6, 6, "pawn", BLACK_PLAYER));
  result.push(new Piece(6, 7, "pawn", BLACK_PLAYER));

  return result;
}

function addImage(cell, player, name) {
  const image = document.createElement('img');
  image.src = 'images/' + player + '/' + name + '.png';
  cell.appendChild(image);
}

/*function addImageByIndex(cell, player, index) {
  if (index === 0 || index === 7) {
    addImage(cell, player, 'rook');
  } else if (index === 1 || index === 6) {
    addImage(cell, player, 'knight');
  } else if (index === 2 || index === 5) {
    addImage(cell, player, 'bishop');
  } else if (index === 3) {
    addImage(cell, player, 'king');
  } else if (index === 4) {
    addImage(cell, player, 'queen');
  }
}*/
const getPosibleMoves = () => {
    let result = [];
    if(this.type === "rook"){

    }else if(this.type === "pawn"){

    }else if(this.type === "king"){

    }
    else if(this.type === "queen"){

    }
    else if(this.type === "bishop"){

    }
   return result;
}

function onCellClick(event) {
  if (selectedCell !== undefined) {
    selectedCell.classList.remove('selected');
  }
  selectedCell = event.currentTarget;
  selectedCell.classList.add('selected');
  getPosibleMoves();
}

const rookPosibleMoves = () => {
  let rookRelMoves = [];
for(let i = 0; i < BOARD_SIZE; i++){
  rookRelMoves.push([i, 0], [0, i], [-i, 0], [0, -i]);

  // let rookAbsMoves = [];
  // if(i !==)
}
}




    


function createChessBoard() {
  const table = document.createElement('table');
  document.body.appendChild(table);
  for (let i = 0; i < BOARD_SIZE; i++) {
    const row = table.insertRow();
    for (let j = 0; j < BOARD_SIZE; j++) {
      const cell = row.insertCell();
  
      if ((i + j) % 2 === 0) {
        cell.className = 'light-box';
      } else {
        cell.className = 'dark-box';
      }
      cell.addEventListener('click', onCellClick);
    }
  }
  pieces = getInitialBoard();

  for (let piece of pieces) {
    addImage(table.rows[piece.row].cells[piece.col], piece.player, piece.type);
  }
}

window.addEventListener('load', createChessBoard);