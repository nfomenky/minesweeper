'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  // get the playerBoard array


  _createClass(Board, [{
    key: 'flipTile',
    value: function flipTile(rowIndex, columnIndex) {
      // if player board's given index does not have its default value
      // then the tile has been flipped
      if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
        console.log('This tile has already been flipped!');
        return;
      }
      // if there is a bomb at this position in the bombBoard,
      // make this position B on playerBoard as well
      else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
          this._playerBoard[rowIndex][columnIndex] = 'B';
        }
        // else show the number of neighboring bombs
        else {
            this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborbombs(rowIndex, columnIndex);
          }
      this._numberOfTiles--;
    }
  }, {
    key: 'getNumberOfNeighborbombs',
    value: function getNumberOfNeighborbombs(rowIndex, columnIndex) {
      var _this = this;

      /*
        assuming starting position is at origin [0,0], this array
        stores the positions of the neighboring cells in each direction
        and will be used to determine how many bombs meighbor a chosem cell
      */
      var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
      var numberOfRows = this._bombBoard.length;
      var numberOfColumns = this._bombBoard[0].length;
      var numberOfBombs = 0;

      neighborOffsets.forEach(function (offset) {
        var neighborRowIndex = offset[0] + rowIndex;
        var neighborColumnIndex = offset[1] + columnIndex;
        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
          if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
            numberOfBombs++;
          }
        }
      });
      return numberOfBombs;
    }
  }, {
    key: 'hasSafeTiles',


    // if there are tiles remaining on the board that are not bombs, then there
    // are safe tiles remaining (true), otherwise all the remaining tiles are
    // bombs (false)
    value: function hasSafeTiles() {
      return this._numberOfTiles !== this.numberOfBombs;
    }
  }, {
    key: 'print',
    value: function print() {
      console.log(this._playerBoard.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
    }
  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
      var board = [];
      for (var rows = 0; rows < numberOfRows; rows++) {
        var row = [];
        for (var cols = 0; cols < numberOfColumns; cols++) {
          row.push(' ');
        }
        board.push(row);
      }
      return board;
    }
  }, {
    key: 'generateBombBoard',
    value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      var board = [];
      for (var rows = 0; rows < numberOfRows; rows++) {
        var row = [];
        for (var cols = 0; cols < numberOfColumns; cols++) {
          row.push(null);
        }
        board.push(row);
      }

      var numberOfBombsPlaced = 0;
      while (numberOfBombsPlaced <= numberOfBombs) {
        var randomRowIndex = Math.floor(Math.random() * numberOfRows);
        var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        if (board[randomRowIndex][randomColumnIndex] != 'B') {
          board[randomRowIndex][randomColumnIndex] = 'B';
          numberOfBombsPlaced++;
        }
      };
      return board;
    }
  }]);

  return Board;
}();