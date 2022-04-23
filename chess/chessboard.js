//TODO : pawn moves. css touch-ups

const BOARD_SIZE = 8;
const WHITE_PLAYER = "white";
const BLACK_PLAYER = "black";

const ROOK = "rook";
const KNIGHT = "knight";
const QUEEN = "queen";
const BISHOP = "bishop";
const PAWN = "pawn";
const KING = "king";

let selectedCell;

let table;
let boardData;

class Piece {
  constructor(row, col, type, player) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.player = player;
  }

  getPossibleMoves() {
    
    let relativeMoves;
    if (this.type === PAWN) {
      relativeMoves = this.getPawnRelativeMoves();
    } else if (this.type === ROOK) {
      relativeMoves = this.getRookRelativeMoves();
    } else if (this.type === KNIGHT) {
      relativeMoves = this.getKnightRelativeMoves();
    } else if (this.type === BISHOP) {
      relativeMoves = this.getBishopRelativeMoves();
    } else if (this.type === KING) {
      relativeMoves = this.getKingRelativeMoves();
    } else if (this.type === QUEEN) {
      relativeMoves = this.getQueenRelativeMoves();
    } else {
      console.log("Unknown type", type);
    }
    //console.log("relativeMoves", relativeMoves);
    //the comment above is for quick access to part of the relativeMoves function for bug fixes.
    let absoluteMoves = [];
    for (let relativeMove of relativeMoves) {
      const absoluteRow = this.row + relativeMove[0];
      const absoluteCol = this.col + relativeMove[1];
      absoluteMoves.push([absoluteRow, absoluteCol]);
    }
    //console.log('absoluteMoves', absoluteMoves); 
    //the comment above is for quick access to part of the relativeMoves function for bug fixes.
    
    let filteredMoves = [];
    for (let absoluteMove of absoluteMoves) {
      const absoluteRow = absoluteMove[0];
      const absoluteCol = absoluteMove[1];
      if (
        absoluteRow >= 0 &&
        absoluteRow <= 7 &&
        absoluteCol >= 0 &&
        absoluteCol <= 7
      ) {
        filteredMoves.push(absoluteMove);
      }
    }
    console.log("filteredMoves", filteredMoves);
    return filteredMoves;
  }

  getPawnRelativeMoves() {
     let result = [];

    if (this.player === WHITE_PLAYER) {
      result.push([1, 0]);
    } else if (this.player === BLACK_PLAYER) {
      result.push([-1, 0]);
    }
    return result;
  }

  getRookRelativeMoves() {
    let result = [];
    for (let i = 1; i < BOARD_SIZE; i++) {
      result.push([i, 0]);
      result.push([-i, 0]);
      result.push([0, i]);
      result.push([0, -i]);
    }
    return result;
  }

  getKingRelativeMoves() {
    let result = [];

    for(let i = -1; i < 1; i++){
      if(i !== 0){
      result.push([i, 0]);
      result.push([-i, 0]);
      result.push([0, i]);
      result.push([0, -i]);
      result.push([i, i]);
      result.push([-i, -i]);
      result.push([-i, i]);
      result.push([i, -i]);
    }
  }
    // result.push([(-1), (-1)]);
    // result.push([1, 0]);
    // result.push([0, 1]);
    // result.push([-1, 0]);
    // result.push([0, -1]);
    // result.push([1, 1]);
    

    return result;
  }

  getBishopRelativeMoves() {
    let result = [];
    for (let i = 1; i < 8; i++) {
      result.push([i, i]);
      result.push([-i, -i]);
      result.push([-i, i]);
      result.push([i, -i]);
    }
    return result;
  }

  getQueenRelativeMoves() {
    let result = [];
    for (let i = 1; i < 8; i++) {
      result.push([i, 0]);
      result.push([-i, 0]);
      result.push([0, i]);
      result.push([0, -i]);
      result.push([i, i]);
      result.push([-i, -i]);
      result.push([-i, i]);
      result.push([i, -i]);
    }
    return result;
  }

  getKnightRelativeMoves() {
    let result = [];
    result.push([2, 1]);
    result.push([2, -1]);
    result.push([-2, 1]);
    result.push([-2, -1]);
    result.push([1, 2]);
    result.push([-1, 2]);
    result.push([1, -2]);
    result.push([-1, -2]);

    return result;
  }
}
//places of pieces when the board starts
function getInitialPieces() {
  let result = [];

  addFirstRowPieces(result, 0, WHITE_PLAYER);
  addFirstRowPieces(result, 7, BLACK_PLAYER);

  for (let i = 0; i < BOARD_SIZE; i++) {
    result.push(new Piece(1, i, PAWN, WHITE_PLAYER));
    result.push(new Piece(6, i, PAWN, BLACK_PLAYER));
  }
  return result;
}

function addFirstRowPieces(result, row, player) {
  result.push(new Piece(row, 0, ROOK, player));
  result.push(new Piece(row, 1, KNIGHT, player));
  result.push(new Piece(row, 2, BISHOP, player));
  result.push(new Piece(row, 4, KING, player));
  result.push(new Piece(row, 3, QUEEN, player));
  result.push(new Piece(row, 5, BISHOP, player));
  result.push(new Piece(row, 6, KNIGHT, player));
  result.push(new Piece(row, 7, ROOK, player));
}

function addImage(cell, player, name) {
  const image = document.createElement("img");
  image.src = "images/" + player + "/" + name + ".png";
  cell.appendChild(image);
}

function onCellClick(event, row, col, player) {
  console.log("row", row);
  console.log("col", col);
  console.log("player", player);
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      table.rows[i].cells[j].classList.remove("possible-move");
    }
  }
  const piece = boardData.getPiece(row, col);
  if (piece !== undefined) {
    let possibleMoves = piece.getPossibleMoves();
    for (let possibleMove of possibleMoves) {
      const cell = table.rows[possibleMove[0]].cells[possibleMove[1]];
      cell.classList.add("possible-move");
    }
  }

  if (selectedCell !== undefined) {
    selectedCell.classList.remove("selected");
  }

  
  selectedCell = event.currentTarget;
  selectedCell.classList.add("selected");
}

class BoardData {
  constructor(pieces) {
    this.pieces = pieces;
  }

  getPiece(row, col) {
    for (const piece of this.pieces) {
      if (piece.row === row && piece.col === col) {
        return piece;
      }
    }
  }
}

function createChessBoard() {
  table = document.createElement("table");

  document.body.appendChild(table);
  for (let row = 0; row < BOARD_SIZE; row++) {
    const rowElement = table.insertRow();

    for (let col = 0; col < BOARD_SIZE; col++) {
      const cell = rowElement.insertCell();

      if ((row + col) % 2 === 0) {
        cell.className = "light-box";
      } else {
        cell.className = "dark-box";
      }
      cell.addEventListener("click", (event) => onCellClick(event, row, col));
    }
  }
  boardData = new BoardData(getInitialPieces());

  for (let piece of boardData.pieces) {
    const cell = table.rows[piece.row].cells[piece.col];
    addImage(cell, piece.player, piece.type);
  }
}
//start of the program.
window.addEventListener("load", createChessBoard);
