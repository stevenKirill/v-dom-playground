import { Stack } from './stack.js';

export const createVNode = (tagName, props = {}, children = []) => ({
  tagName,
  props,
  children,
});

const stack = new Stack();
console.log(stack);

export const createDOMNode = (vNode) => {
  if (typeof vNode === 'string') {
    return document.createTextNode(vNode);
  }
  const { tagName, children, props } = vNode;
  const element = document.createElement(tagName);

  Object.entries(props).forEach((property) => {
    const [key, value] = property;
    element.setAttribute(key, value);
  });

  children.forEach((child) => {
    element.appendChild(createDOMNode(child));
  });
  return element;
};

export const mount = (node, target) => {
  // eslint-disable-next-line no-param-reassign
  target.innerHTML = '';
  target.appendChild(node);
  return node;
};

export const patchNode = (node, vNode, nextVNode) => {
  if (nextVNode === undefined) {
    node.remove();
    return;
  }
};
