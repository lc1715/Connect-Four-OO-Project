
const startGameBtn = document.querySelector('button')
const input = document.querySelector('#player1Color')
const input2 = document.querySelector('#player2Color')


class Player {
  constructor(color) {
    this.player = color
  }
}


startGameBtn.addEventListener('click', startGame)


function startGame(e) {
  if (e.target === startGameBtn) {
    const table = document.querySelector('#board')
    table.innerHTML = '';
    let p1 = new Player(input.value)
    let p2 = new Player(input2.value)
    new Game(p1, p2)
    console.log(p1)
    console.log(p2)
  }
}


class Game {
  constructor(color1, color2) {
    this.p1 = color1;
    this.p2 = color2;
    this.HEIGHT = 6;
    this.WIDTH = 7;
    this.board = [];
    this.currPlayer = this.p1.player;
    this.makeBoard();
    this.makeHtmlBoard();
  }



  makeBoard() {
    for (let y = 0; y < this.HEIGHT; y++) {
      this.board.push(Array.from({ length: this.WIDTH }));
      console.log(this.board)
    }
  }


  makeHtmlBoard() {

    const top = document.createElement('tr');

    top.setAttribute('id', 'column-top');


    this.handleClickEvent = this.handleClick.bind(this)
    top.addEventListener('click', this.handleClickEvent);


    // make column tops inside of board array
    for (let x = 0; x < this.WIDTH; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }


    board.append(top);


    // make main part with 6 arrays inside of board array
    for (let y = 0; y < this.HEIGHT; y++) {
      const row = document.createElement('tr');


      for (let x = 0; x < this.WIDTH; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }


      board.append(row);
    }
  }




  /** handleClick: handle click of column top to play piece */
  handleClick(evt) {

    // get x from ID of clicked cell
    const x = +evt.target.id;
    console.log(x)


    // get next spot in column (if none, ignore click)
    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }


    // place piece in board and add to HTML table
    this.board[y][x] = this.currPlayer;
    this.placeInTable(y, x);


    // check for win
    if (this.checkForWin()) {
      return this.endGame(`Player ${this.currPlayer} won!`);
    }


    // check for tie
    if (this.board.every(row => row.every(cell => cell))) {
      return endGame('Tie!');
    }


    // switch players
    this.currPlayer = this.currPlayer === this.p1.player ? this.p2.player : this.p1.player;
    console.log(this.currPlayer)
  }




  /** findSpotForColumn: given column x, return top empty y (null if filled) */
  findSpotForCol(x) {


    for (let y = this.HEIGHT - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }


  /** placeInTable: update DOM to place piece into HTML table of board */
  placeInTable(y, x) {


    const piece = document.createElement('div');


    piece.classList.add('piece');
    piece.style.background = this.currPlayer
    piece.style.top = -50 * (y + 2);


    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }



  checkForWin() {
    let _win = (cells) => {
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer

      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.HEIGHT &&
          x >= 0 &&
          x < this.WIDTH &&
          this.board[y][x] === this.currPlayer
      );
    }

    for (let y = 0; y < this.HEIGHT; y++) {
      for (let x = 0; x < this.WIDTH; x++) {


        // get "check list" of 4 cells (starting here) for each of the different ways to win
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];



        // find winner (only checking each win-possibility as needed)
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  }

  /** endGame: announce game end */

  endGame(msg) {
    alert(msg);
    const top = document.querySelector('#column-top')
    top.removeEventListener('click', this.handleClickEvent)
  }
}



