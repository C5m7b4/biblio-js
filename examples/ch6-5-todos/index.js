import { h, hFragment, createApp } from "https://unpkg.com/biblio-js@0.0.7";

const state = {
  todos: ["walk the dog", "water the plants"],
  currentTodo: "",
  edit: {
    idx: null,
    original: null,
    edited: null,
  },
};
const reducers = {
  "update-current-todo": (state, currentTodo) => ({
    ...state,
    currentTodo,
  }),
  "add-todo": (state) => ({
    ...state,
    currentTodo: "",
    todos: [...state.todos, state.currentTodo],
  }),
  "start-editing-todo": (state, idx) => ({
    ...state,
    edit: {
      idx,
      original: state.todos[idx],
      edited: state.todos[idx],
    },
  }),
  "edit-todo": (state, edited) => ({
    ...state,
    edit: { ...state.edit, edited },
  }),
  "save-edited-todo": (state) => {
    const todos = [...state.todos];
    todos[state.edit.idx] = state.edit.edited;
    return {
      ...state,
      edit: { idx: null, original: null, edited: null },
      todos,
    };
  },
  "cancel-editing-todo": (state) => ({
    ...state,
    edit: { idx: null, original: null, edited: null },
  }),
  "remove-todo": (state, idx) => ({
    ...state,
    todos: state.todos.filter((_, i) => i !== idx),
  }),
};

function App(state, emit) {
  return hFragment([
    h("h1", {}, ["My Todos"]),
    CreateToDo(state, emit),
    TodoList(state, emit),
  ]);
}

function CreateToDo({ currentTodo }, emit) {
  return h(
    "div",
    {
      class: "label",
      for: "todo-input",
    },
    [
      h(
        "label",
        {
          for: "todo-input",
        },
        ["New Todo: "]
      ),
      h("input", {
        type: "text",
        id: "todo-input",
        value: currentTodo,
        on: {
          input: ({ target }) => emit("update-current-todo", target.value),
          keydown: ({ key }) => {
            if (key === "Enter" && currentTodo.length > 3) {
              emit("add-todo");
            }
          },
        },
      }),
      h(
        "button",
        {
          class: "btn btn-primary",
          disabled: currentTodo.length < 3,
          on: {
            click: () => emit("add-todo"),
          },
        },
        ["Add Todo"]
      ),
    ]
  );
}

function TodoList({ todos, edit }, emit) {
  return h(
    "ul",
    {},
    todos.map((todo, i) => TodoItem({ todo, i, edit }, emit))
  );
}

function TodoItem({ todo, i, edit }, emit) {
  const isEditing = edit.idx === i;

  return isEditing
    ? h("li", {}, [
        h("input", {
          type: "text",
          value: edit.edited,
          on: {
            input: ({ target }) => emit("edit-todo", target.value),
          },
        }),
        h(
          "button",
          {
            class: "btn",
            on: {
              click: () => emit("save-edited-todo"),
            },
          },
          ["Save"]
        ),
        h(
          "button",
          {
            class: "btn",
            on: {
              click: () => emit("cancel-editing-todo"),
            },
          },
          ["Cancel"]
        ),
      ])
    : h("li", {}, [
        h(
          "span",
          {
            on: {
              dblclick: () => emit("start-editing-todo", i),
            },
          },
          [todo]
        ),
        h(
          "button",
          {
            class: "btn",
            on: {
              click: () => emit("remove-todo", i),
            },
          },
          ["Done"]
        ),
      ]);
}

createApp({ state, reducers, view: App }).mount(document.getElementById("app"));
