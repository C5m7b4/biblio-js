var version = "0.0.1";

function withoutNulls(arr) {
  return arr.filter((item) => item != null);
}

const DOM_TYPES = {
  TEXT: "text",
  ELEMENT: "element",
  FRAGMENT: "fragment",
};
function h(tag, props = {}, children = []) {
  return {
    tag,
    props,
    children: mapTextNodes(withoutNulls(children)),
    type: DOM_TYPES.ELEMENT,
  };
}
function hString(str) {
  return {
    type: DOM_TYPES.TEXT,
    value: str,
  };
}
function hFragment(vNodes) {
  return {
    type: DOM_TYPES.FRAGMENT,
    children: mapTextNodes(withoutNulls(vNodes)),
  };
}
function mapTextNodes(children) {
  return children.map((child) =>
    typeof child === "string" || typeof child === "number"
      ? hString(child)
      : child
  );
}

function setAttributes(el, attrs) {
  const { class: className, style, ...otherAttrs } = attrs;
  if (className) {
    setClass(el, className);
  }
  if (style) {
    Object.entries(style).forEach(([prop, value]) => {
      setStyle(el, prop, value);
    });
  }
  for (const [name, value] of Object.entries(otherAttrs)) {
    setAttributes(el, name);
  }
}
function setClass(el, className) {
  el.className = "";
  if (typeof className === "string") {
    el.className = className;
  }
  if (Array.isArray(className)) {
    el.classList.add(...className);
  }
}
function setStyle(el, name, value) {
  el.style[name] = value;
}

function addEventListener(eventName, handler, el) {
  el.addEventListener(eventName, handler);
  return handler;
}
function addEventListeners(listeners = {}, el) {
  const addedListeners = {};
  Object.entries(listeners).forEach(([eventName, handler]) => {
    const listener = addEventListener(eventName, handler, el);
    addedListeners[eventName] = listener;
  });
  return addedListeners;
}

function mountDom(vdom, parentEl) {
  switch (vdom.type) {
    case DOM_TYPES.TEXT: {
      createTextNode(vdom, parentEl);
      break;
    }
    case DOM_TYPES.ELEMENT: {
      createElementNode(vdom, parentEl);
      break;
    }
    case DOM_TYPES.FRAGMENT: {
      createFragmentNodes(vdom, parentEl);
      break;
    }
    default: {
      throw new Error(`Can't mound DOM of type ${vdom.type}`);
    }
  }
}
function createTextNode(vdom, parentEl) {
  const { value } = vdom;
  const textNode = document.createTextNode(value);
  vdom.el = textNode;
  parentEl.append(textNode);
}
function createElementNode(vdom, parentEl) {
  const { tag, props, children } = vdom;
  const element = document.createElement(tag);
  addProps(element, props, vdom);
  vdom.el = element;
  children.forEach((child) => mountDom(child, element));
  parentEl.append(element);
}
function createFragmentNodes(vdom, parentEl) {
  const { children } = vdom;
  vdom.el = parentEl;
  children.forEach((child) => mountDom(child, parentEl));
}
function addProps(el, props, vdom) {
  const { on: events, ...attrs } = props;
  vdom.listeners = addEventListeners(events, el);
  setAttributes(el, attrs);
}

function lipsum(n) {
  const text = `Lorem ipsum dolor sit
    amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
    laboris nisi ut aliquip ex ea commodo consequat.".`;
  return hFragment(Array(n).fill(h("p", {}, [text])));
}

/* istanbul ignore if -- @preserve */
console.log(`Version: ${version}`);

export { DOM_TYPES, h, hFragment, hString, lipsum, mountDom, withoutNulls };

const vdom = h("section", {}, [
  h("h1", {}, ["My blog"]),
  h("p", {}, ["Welcome to my blog post"]),
]);

mountDom(vdom, document.getElementById("app"));
