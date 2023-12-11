import { destroyDom, mountDom } from "./dom/index";
import { Dispatcher } from "./dispatcher";

export function createApp({ state, view, reducers = {} }) {
  let parentEl = null;
  let vdom = null;

  const dispatcher = new Dispatcher();
  const subscriptions = [dispatcher.afterEveryCommand(renderApp)];

  function emit(eventName, payload) {
    dispatcher.dispatch(eventName, payload);
  }

  for (const actionName in reducers) {
    const reducer = reducers[actionName];

    const subs = dispatcher.subscribe(actionName, (payload) => {
      state = reducer(state, payload);
    });
    subscriptions.push(subs);
  }

  function renderApp() {
    if (vdom) {
      destroyDom(vdom);
    }

    vdom = view(state, emit);

    mountDom(vdom, parentEl);
  }

  return {
    mount(_parentEl) {
      parentEl = _parentEl;
      renderApp();
    },
    unmount() {
      destroyDom();
      vdom = null;
      subscriptions.forEach((unsubscribe) => unsubscribe());
    },
  };
}
