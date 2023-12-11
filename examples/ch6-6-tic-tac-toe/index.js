import { h, hFragment, createApp } from "https://unpkg.com/biblio-js@0.0.7";

const state = {
  board: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  winner: "No winners yet, keep playing!!!",
  currentPlayer: 0,
  playerTags: ["X", "O"],
};

const reducers = {
  "take-square": (state, { rowId, colId, emit }) => {
    const board = [...state.board];
    board[rowId][colId] = state.playerTags[state.currentPlayer];
    let winner = state.winner;
    let player = decideWinner(board, state.playerTags[state.currentPlayer]);
    if (player) {
      winner = `The winner is ${player}`;
    }
    const newState = {
      ...state,
      currentPlayer: state.currentPlayer === 0 ? 1 : 0,
      board,
      winner,
    };
    console.log(newState);

    return newState;
  },
};

function App(state, emit) {
  return hFragment([
    h("h1", {}, ["Tic Tac Toe"]),
    Board(state, emit),
    Info(state, emit),
  ]);
}

function Board(state, emit) {
  return hFragment([
    Row({ rowId: 0, state }, emit),
    Row({ rowId: 1, state }, emit),
    Row({ rowId: 2, state }, emit),
  ]);
}

function Row({ rowId, state }, emit) {
  return h(
    "div",
    {
      class: "row",
    },
    Array.from({ length: 3 })
      .fill(0)
      .map((_, colId) =>
        h("input", {
          class: "square",
          value: state.board[rowId][colId],
          on: {
            mousedown: () => {
              emit("take-square", { rowId, colId, emit });
            },
          },
        })
      )
  );
}

function Info(state, emit) {
  return hFragment([
    h("div", {}, [`Current Player: ${state.playerTags[state.currentPlayer]}`]),
    h("div", {}, [`Winner: ${state.winner}`]),
  ]);
}

function decideWinner(board, player) {
  for (let i = 0; i < 3; i++) {
    if (checkRow(board, i, player)) {
      return player;
    }
    if (checkColumn(board, i, player)) {
      return player;
    }
  }

  if (checkMainDiagonal(board, player)) {
    return player;
  }

  if (checkSecondaryDiagonal(board, player)) {
    return player;
  }

  return null;
}

function checkRow(board, idx, player) {
  const row = board[idx];
  return row.every((cell) => cell === player);
}

function checkColumn(board, idx, player) {
  const column = [board[0][idx], board[1][idx], board[2][idx]];
  return column.every((cell) => cell === player);
}

function checkMainDiagonal(board, player) {
  const diagonal = [board[0][0], board[1][1], board[2][2]];
  return diagonal.every((cell) => cell === player);
}

function checkSecondaryDiagonal(board, player) {
  const diagonal = [board[0][2], board[1][1], board[2][0]];
  return diagonal.every((cell) => cell === player);
}

createApp({ state, reducers, view: App }).mount(document.getElementById("app"));
