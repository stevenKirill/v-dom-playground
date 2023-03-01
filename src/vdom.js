export const createVNode = (tagName, props = {}, children = []) => ({
  tagName,
  props,
  children,
});

// TODO как сделать спомощью стека ?
export const createDOMNode = (vNode) => {
  console.log(vNode, '=> vNode');
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
