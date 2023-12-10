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

function mountDom(vdom, parentEl) {
  switch (vdom.type) {
    case DOM_TYPES.TEXT: {
      createTextNode(vdom, parentEl);
      break;
    }
    case DOM_TYPES.ELEMENT: {
      break;
    }
    case DOM_TYPES.FRAGMENT: {
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

const node = hString("OMG, this is pretty sweet");
mountDom(node, document.getElementById("app"));
