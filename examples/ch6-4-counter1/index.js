import { h, hFragment, createApp } from "https://unpkg.com/biblio-js@0.0.6";

createApp({
  state: 0,

  reducers: {
    add: (state, amount) => state + amount,
    dec: (state, amount) => state - amount,
  },

  view: (state, emit) => {
    return hFragment([
      h(
        "button",
        {
          class: "btn btn-primary",
          on: {
            click: () => emit("add", 1),
          },
        },
        ["+"]
      ),
      h(
        "span",
        {
          style: {
            marginLeft: "5px",
            marginRight: "5px",
          },
        },
        [state]
      ),
      h(
        "button",
        {
          class: "btn btn-primary",

          on: {
            click: () => emit("dec", 1),
          },
        },
        ["-"]
      ),
    ]);
  },
}).mount(document.getElementById("app"));
