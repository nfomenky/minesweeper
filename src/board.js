export class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

// get the playerBoard array
  get playerBoard() {
    return this._playerBoard;
  }

  flipTile (rowIndex, columnIndex) {
    // if player board's given index does not have its default value
    // then the tile has been flipped
    if (this._playerBoard[rowIndex][columnIndex] !== ' '){
      console.log('This tile has already been flipped!');
      return;
    }
    // if there is a bomb at this position in the bombBoard,
    // make this position B on playerBoard as well
    else if (this._bombBoard[rowIndex][columnIndex] === 'B'){
      this._playerBoard[rowIndex][columnIndex] = 'B';
    }
    // else show the number of neighboring bombs
    else{
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborbombs(
        rowIndex, columnIndex);
    }
    this._numberOfTiles--;
  }


  getNumberOfNeighborbombs(rowIndex, columnIndex) {
    /*
      assuming starting position is at origin [0,0], this array
      stores the positions of the neighboring cells in each direction
      and will be used to determine how many bombs meighbor a chosem cell
    */
    let neighborOffsets = [ [-1,-1],[-1,0],[-1,1],
                            [0,-1],[0,1],
                            [1,-1],[1,0],[1,1]
                          ];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;

    neighborOffsets.forEach(offset => {
      const neighborRowIndex = offset[0] + rowIndex;
      const neighborColumnIndex = offset[1] + columnIndex;
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows &&
          neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns){
            if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B'){
              numberOfBombs++;
            }
          }
    });
    return numberOfBombs;
  };

  // if there are tiles remaining on the board that are not bombs, then there
  // are safe tiles remaining (true), otherwise all the remaining tiles are
  // bombs (false)
  hasSafeTiles(){
    return this._numberOfTiles !== this.numberOfBombs;
  }

  print() {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }

  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    let board = [];
    for (let rows = 0; rows < numberOfRows; rows++){
      let row = [];
      for(let cols = 0; cols < numberOfColumns; cols++){
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  }

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    let board = [];
    for (let rows = 0; rows < numberOfRows; rows++){
      let row = [];
      for(let cols = 0; cols < numberOfColumns; cols++){
        row.push(null);
      }
      board.push(row);
    }

    let numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced <= numberOfBombs) {
      let randomRowIndex = Math.floor(Math.random() * numberOfRows);
      let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
      if (board[randomRowIndex][randomColumnIndex] != 'B'){
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      }
    };
    return board;
  }
}
