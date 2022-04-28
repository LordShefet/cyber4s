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
let removedPiece;
let table;
let boardData;



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

function tryMove(piece, row, col) {
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
 

  for (let piece of boardData.pieces) {
    const cell = table.rows[piece.row].cells[piece.col];
    addImage(cell, piece.player, piece.type);
  }
  
}
//start of the program.
window.addEventListener("load", initGame(boardData));
