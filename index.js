const tbl = document.querySelector(".conway-board");
const start = document.querySelector(".start-btn");
const stop = document.querySelector(".stop-btn");
const boardArr = [];
const randOffset = 0.3;
const row = 16;
const col = 16;

(function getRandArr() {
  for (let i = 0; i < row; i++) {
    temp = [];
    for (let j = 0; j < col; j++) {
      if (Math.random() < randOffset) {
        temp[j] = 1;
      } else {
        temp[j] = 0;
      }
    }
    boardArr.push(temp);
  }
})();

for (let i = 0; i < row; i++) {
  let trow = document.createElement("div");
  trow.classList.add("conway-row");
  for (let j = 0; j < col; j++) {
    let box = document.createElement("div");

    if (boardArr[i][j]) box.classList.add("checked");
    trow.appendChild(box);
  }
  tbl.appendChild(trow);
}

let con = new Conway(boardArr, tbl, start, stop, {
  onChange() {
    if (con.play) setTimeout(con.moves, 500);
  },
});
// con.start();
