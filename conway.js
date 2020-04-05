class Conway {
  constructor(board, tblBox, startBtn, stopBtn, callbacks) {
    if (callbacks) {
      this.onChange = callbacks.onChange;
    }
    this.boxRow = tblBox.querySelectorAll(".conway-row");
    this.board = board;
    this.row = board.length;
    this.col = this.board[0].length;
    this.clone = [];
    this.play = false;
    this.getRowElement = this.getRowElement.bind(this);
    this.cloneArr = this.cloneArr.bind(this);
    this.start = this.start.bind(this);
    this.moves = this.moves.bind(this);
    this.stop = this.stop.bind(this);
    this.checkNeighbours = this.checkNeighbours.bind(this);

    startBtn.addEventListener("click", this.start);
    stopBtn.addEventListener("click", this.stop);
  }

  getRowElement(rowInd, col) {
    const rowArr = this.boxRow[rowInd].querySelectorAll("div");
    return rowArr[col];
  }

  cloneArr() {
    return (this.clone = this.board.map((b) => b.slice()));
  }

  moves() {
    let changed = false;
    this.cloneArr();
    changed = false;
    for (let r = 0; r < this.row; r++) {
      for (let c = 0; c < this.col; c++) {
        let element;
        const alive = this.checkNeighbours([r, c]);
        //   checks for 3 alive neighbours from dead cell
        if (alive == 3 && this.board[r][c] === 0) {
          changed = true;
          this.clone[r][c] = 1;
          element = this.getRowElement(r, c);
          // console.log(element);
          element.classList.toggle("checked");
        }
        //   checks if alive cell has 2 or 3 alive neighbour
        else if (this.board[r][c] == 1 && (alive == 3 || alive == 2)) continue;
        else {
          //   check if cell is alive
          if (this.board[r][c]) {
            changed = true;
            this.clone[r][c] = 0;
            element = this.getRowElement(r, c);
            element.classList.remove("checked");
          }
        }
      }
    }
    this.board = this.clone;
    if (changed) {
      this.onChange();
    }
    //   console.log(this.clone);
  }

  stop() {
    this.play = false;
  }

  start() {
    if (!this.play) {
      this.play = true;
      this.onChange();
    }
  }

  checkNeighbours(position) {
    const [i, j] = position;
    let alive = 0;
    for (let m = i - 1; m <= i + 1; m++) {
      for (let n = j - 1; n <= j + 1; n++) {
        if (!this.move(m, n)) continue;
        else if (i != m || j != n) {
          if (this.board[m][n] === 1) alive++;
        }
      }
    }
    return alive;
  }

  move(row, col) {
    if (row > 0 && row < this.row && col > 0 && col < this.col) return true;
    return false;
  }
}

let bord = [
  [0, 0, 0, 0, 0],
  [0, 1, 1, 0, 0],
  [0, 1, 0, 1, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0],
];

// let con = new Conway(bord, tblBox);
// con.start();

// console.log(con.checkNeighbours([2, 1]));
