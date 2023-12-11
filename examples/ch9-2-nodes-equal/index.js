export const DOM_TYPES = {
  TEXT: "text",
  ELEMENT: "element",
  FRAGMENT: "fragment",
};

export function areNodesEqual(nodeOne, nodeTwo) {
  if (nodeOne.type !== nodeTwo.type) {
    return false;
  }

  if (nodeOne.type === DOM_TYPES.ELEMENT) {
    const { tag: tagOne } = nodeOne;
    const { tag: tagTwo } = nodeTwo;

    return tagOne === tagTwo;
  }

  return true;
}

debugger;
const result = areNodesEqual(
  { type: DOM_TYPES.ELEMENT, tag: "p" },
  { type: DOM_TYPES.ELEMENT, tag: "div" }
);

console.log("result", result);
