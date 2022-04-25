//TODO :. css touch-ups
const CHESS_BOARD_ID = "Noice";

const BOARD_SIZE = 8;
const WHITE_PLAYER = "white";
const BLACK_PLAYER = "black";
const POSIBLE_MOVE = "possible-move";

const ROOK = "rook";
const KNIGHT = "knight";
const QUEEN = "queen";
const BISHOP = "bishop";
const PAWN = "pawn";
const KING = "king";

let selectedPiece;

let table;
let boardData;

class Piece {
  constructor(row, col, type, player) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.player = player;
  }

  getPossibleMoves(boardData) {
    let Moves;
    if (this.type === PAWN) {
      Moves = this.getPawnMoves(boardData);
    } else if (this.type === ROOK) {
      Moves = this.getRookMoves(boardData);
    } else if (this.type === KNIGHT) {
      Moves = this.getKnightMoves(boardData);
    } else if (this.type === BISHOP) {
      Moves = this.getBishopMoves(boardData);
    } else if (this.type === KING) {
      Moves = this.getKingMoves(boardData);
    } else if (this.type === QUEEN) {
      Moves = this.getQueenMoves(boardData);
    } else {
      console.log("Unknown type", type);
    }

    let filteredMoves = [];
    for (let absoluteMove of Moves) {
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

  getPawnMoves(boardData) {
    let result = [];
    let direction = 1;
    if (this.player === BLACK_PLAYER) {
      direction = -1;
    }

    let position = [this.row + direction, this.col];
    if (boardData.isEmpty(position[0], position[1])) {
      result.push(position);
    }

    position = [this.row + direction, this.col + direction];
    if (boardData.isPlayer(position[0], position[1], this.getOpponent())) {
      result.push(position);
    }

    position = [this.row + direction, this.col - direction];
    if (boardData.isPlayer(position[0], position[1], this.getOpponent())) {
      result.push(position);
    }

    return result;
  }

  getRookMoves(boardData) {
    let result = [];
    result = result.concat(this.getMovesInDirection(-1, 0, boardData));
    result = result.concat(this.getMovesInDirection(1, 0, boardData));
    result = result.concat(this.getMovesInDirection(0, -1, boardData));
    result = result.concat(this.getMovesInDirection(0, 1, boardData));
    return result;
  }

  getMovesInDirection(directionRow, directionCol, boardData) {
    let result = [];

    for (let i = 1; i < BOARD_SIZE; i++) {
      let row = this.row + directionRow * i;
      let col = this.col + directionCol * i;
      if (boardData.isEmpty(row, col)) {
        result.push([row, col]);
      } else if (boardData.isPlayer(row, col, this.getOpponent())) {
        result.push([row, col]);
        console.log("opponent");
        return result;
      } else if (boardData.isPlayer(row, col, this.player)) {
        console.log("player");
        return result;
      }
    }
    console.log("all empty");
    return result;
  }

  getBishopMoves(boardData) {
    let result = [];
    result = result.concat(this.getMovesInDirection(-1, -1, boardData));
    result = result.concat(this.getMovesInDirection(-1, 1, boardData));
    result = result.concat(this.getMovesInDirection(1, -1, boardData));
    result = result.concat(this.getMovesInDirection(1, 1, boardData));
    return result;
  }

  getKingMoves(boardData) {
    let result = [];
    const relativeMoves = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    for (let relativeMove of relativeMoves) {
      let row = this.row + relativeMove[0];
      let col = this.col + relativeMove[1];
      if (!boardData.isPlayer(row, col, this.player)) {
        result.push([row, col]);
      }
    }
    return result;
  }

  getQueenMoves(boardData) {
    let result = this.getBishopMoves(boardData);
    result = result.concat(this.getRookMoves(boardData));
    return result;
  }

  getKnightMoves(boardData) {
    let result = [];
    const relativeMoves = [
      [2, 1],
      [2, -1],
      [-2, 1],
      [-2, -1],
      [-1, 2],
      [1, 2],
      [-1, -2],
      [1, -2],
    ];
    for (let relativeMove of relativeMoves) {
      let row = this.row + relativeMove[0];
      let col = this.col + relativeMove[1];
      if (!boardData.isPlayer(row, col, this.player)) {
        result.push([row, col]);
      }
    }
    return result;
  }

  getOpponent() {
    if (this.player === WHITE_PLAYER) {
      return BLACK_PLAYER;
    } else {
      return WHITE_PLAYER;
    }
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
  result.push(new Piece(2, 4, PAWN, BLACK_PLAYER));
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

function showCellMoves(event, row, col) {
  console.log('showMovesForPiece');
    // Clear all previous possible moves
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        table.rows[i].cells[j].classList.remove('possible-move');
        table.rows[i].cells[j].classList.remove('selected');
      }
    }

    // Show possible moves
    const piece = boardData.getPiece(row, col);
    if (piece !== undefined) {
      let possibleMoves = piece.getPossibleMoves(boardData);
      for (let possibleMove of possibleMoves) {
        const cell = table.rows[possibleMove[0]].cells[possibleMove[1]];
        cell.classList.add('possible-move');
      }
    }

    table.rows[row].cells[col].classList.add('selected');
    selectedPiece = piece;
}

function onCellClick(event, row, col) {
  console.log("row", row);
  console.log("col", col);
  
  if (selectedPiece === undefined) {
    showCellMoves(event, row, col);
  } else {
    if (tryMove(selectedPiece, row, col, event)) {
      selectedPiece = undefined;
      // Recreate whole board - this is not efficient, but doesn't affect user experience
      createChessBoard(boardData);
    } else {
      showCellMoves(event,row, col);
    }
  }
}

function tryMove(piece, row, col , event) {
  const possibleMoves = piece.getPossibleMoves(boardData);
  
  for (const possibleMove of possibleMoves) {
    
    if (possibleMove[0] === row && possibleMove[1] === col) {
      
      boardData.removePiece(row, col);
      piece.row = row;
      piece.col = col;
      return true;
    }
  }
  return false;
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

  isEmpty(row, col) {
    return this.getPiece(row, col) === undefined;
  }

  isPlayer(row, col, player) {
    const piece = this.getPiece(row, col);
    return piece !== undefined && piece.player === player;
  }

  removePiece(row, col) {
    for (let i = 0; i < this.pieces.length; i++) {
      const piece = this.pieces[i];
      if (piece.row === row && piece.col === col) {
        this.pieces.splice(i, 1);
      }
    }
  }
}

function initGame() {
  //start of a new game/onload of page.
  boardData = new BoardData(getInitialPieces());
  createChessBoard(boardData);
}

function createChessBoard(boardData) {
  table = document.getElementById(CHESS_BOARD_ID);
  if (table !== null) {
    table.remove();
  }
  table = document.createElement("table");
  table.id = CHESS_BOARD_ID;
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
  //boardData = new BoardData(getInitialPieces());

  for (let piece of boardData.pieces) {
    const cell = table.rows[piece.row].cells[piece.col];
    addImage(cell, piece.player, piece.type);
  }
}
//start of the program.
window.addEventListener("load", initGame(boardData));
