import { h, createApp } from "https://unpkg.com/biblio-js@0.0.6";

createApp({
  state: 0,

  reducers: {
    add: (state, amount) => state + amount,
  },

  view: (state, emit) => {
    return h(
      "button",
      {
        class: "btn btn-primary",
        on: {
          click: () => emit("add", 1),
        },
      },
      [state]
    );
  },
}).mount(document.getElementById("app"));
