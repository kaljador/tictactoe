import "./styles.css";

var N_SIZE = 5,
  EMPTY = "&nbsp;",
  boxes = [],
  turn = "X",
  score,
  moves;

/*
 * Initializes the Tic Tac Toe board and starts the game.
 */
function init() {
  var board = document.createElement("table");
  board.setAttribute("border", 1);
  board.setAttribute("cellspacing", 0);

  var identifier = 1;
  for (var i = 0; i < N_SIZE; i++) {
    var row = document.createElement("tr");
    board.appendChild(row);
    for (var j = 0; j < N_SIZE; j++) {
      var cell = document.createElement("td");

      cell.classList.add("col" + j, "row" + i);
      if (i === j) {
        cell.classList.add("diagonal0");
      }
      if (j === N_SIZE - i - 1) {
        cell.classList.add("diagonal1");
      }
      cell.identifier = identifier;
      cell.addEventListener("click", set);
      row.appendChild(cell);
      boxes.push(cell);
      identifier += identifier;
    }
  }

  document.getElementById("board").appendChild(board);
  startNewGame();
}

/*
 * New game
 */
function startNewGame() {
  score = {
    X: 0,
    O: 0
  };
  moves = 0;
  turn = "X";
  boxes.forEach(function(square) {
    square.innerHTML = EMPTY;
  });
}

/*
 * Check if a win or not
 */
function win(clicked) {
  // Get all cell classes
  var memberOf = clicked.className.split(/\s+/);
  for (var i = 0; i < memberOf.length; i++) {
    var testClass = "." + memberOf[i];
    var items = contains("#board " + testClass, turn);
    // winning condition: turn == N_SIZE
    if (items.length === N_SIZE) {
      return true;
    }
  }
  return false;
}

function contains(selector, text) {
  var elements = document.querySelectorAll(selector);
  return [].filter.call(elements, function(element) {
    return RegExp(text).test(element.textContent);
  });
}

/*
 * Sets clicked square and also updates the turn.
 */
function set() {
  var elem = document.getElementById("myBar");
  var width = 0;

  var turntesti = turn;

  function frame() {
    if (width >= 100) {
      turn = turn === "X" ? "O" : "X";
      clearInterval(id);
    } else if (turn === turntesti) {
      clearInterval(id);
    } else {
      width++;
      elem.style.width = width + "%";
    }
  }

  if (this.innerHTML !== EMPTY) {
    return;
  }
  this.innerHTML = "<span class=" + turn + ">" + turn+"</span>";
  moves += 1;
  score[turn] += this.identifier;
  if (win(this)) {
    if (turn === "X") {
      alert("Player 1 won");
    } else {
      alert("Player 2 won");
    }
  } else if (moves === N_SIZE * N_SIZE) {
    alert("Draw");
  } else {
    turn = turn === "X" ? "O" : "X";
    var id = setInterval(frame, 100);
    if (turn === "X") {
      document.getElementById("turn").textContent = "Player 1";
    } else {
      document.getElementById("turn").textContent = "Player 2";
    }
  }
}

init();
