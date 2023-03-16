/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */

const TEXT_NODE_TYPE = 3;

export const createVNode = (tagName, props = {}, ...children) => {
  if (typeof tagName === 'function') {
    return tagName(props, children);
  }
  return {
    tagName,
    props,
    children: children.flat(),
  };
};

function listener(event) {
  return this[event.type](event);
}

export const patchProp = (node, key, prevProp, nextProp) => {
  if (key.startsWith('on')) {
    const eventName = key.slice(2);
    node[eventName] = nextProp;
    if (!nextProp) {
      node.removeEventListener(eventName, listener);
    } else if (!prevProp) {
      node.addEventListener(eventName, listener);
    }
  }
  if (nextProp === undefined || nextProp === false) {
    node.removeAttribute(key);
  } else {
    node.setAttribute(key, nextProp);
  }
};

export const patchProps = (node, prevProps, nextProps) => {
  const mergedProps = {
    ...prevProps,
    ...nextProps,
  };
  Object.keys(mergedProps).forEach((key) => {
    if (prevProps[key] !== nextProps[key]) {
      patchProp(node, key, prevProps[key], nextProps[key]);
    }
  });
};

export const createDOMNode = (vNode) => {
  if (typeof vNode === 'string') {
    return document.createTextNode(vNode);
  }
  const { tagName, children, props } = vNode;
  const element = document.createElement(tagName);

  patchProps(element, {}, props);

  children.forEach((child) => {
    element.appendChild(createDOMNode(child));
  });
  return element;
};

export const patchChildren = (parent, children, nextChildren) => {
  parent.childNodes.forEach((childNode, i) => {
    // eslint-disable-next-line no-use-before-define
    patchNode(childNode, children[i], nextChildren[i]);
  });

  nextChildren.slice(children.length).forEach((vChild) => {
    parent.appendChild(createDOMNode(vChild));
  });
};

export const patchNode = (node, vNode, nextVNode) => {
  if (nextVNode === undefined) {
    node.remove();
    return;
  }
  if (typeof vNode === 'string' || typeof nextVNode === 'string') {
    if (vNode !== nextVNode) {
      const nextNode = createDOMNode(nextVNode);
      node.replaceWith(nextNode);
      return nextNode;
    }
    return node;
  }
  if (vNode.tagName !== nextVNode.tagName) {
    const nextNode = createDOMNode(nextVNode);
    node.replaceWith(nextNode);
    return nextNode;
  }
  patchProps(node, vNode.props, nextVNode.props);
  patchChildren(node, vNode.children, nextVNode.children);

  return node;
};

export const recycleNode = (node) => {
  if (node.nodeType === TEXT_NODE_TYPE) {
    return node.nodeValue;
  }
  const tagName = node.nodeName.toLowerCase();
  const children = [].map.call(node.childNodes, recycleNode);
  return createVNode(tagName, {}, children);
};

export const patch = (nextVNode, node) => {
  const currentVTree = node.v || recycleNode(node);
  node = patchNode(node, currentVTree, nextVNode);
  node.v = nextVNode;
  return node;
};

// export const patchNode = (_node, _vNode, _nextVNode) => {
//   // первую ноду добавляем в стек
//   const stack = [{ node: _node, vNode: _vNode, nextVNode: _nextVNode }]

//   // пока стек не пустой
//   while(stack.length > 0) {
//     { node, vNode, nextVNode } = stack.pop()
//     // тут весь код по преобразованию ноды

//     // Вместо вызова patchChildren нужно заполнить стек детьми
//     // patchChildren(node, vNode.children, nextVNode.children);

//     node.childNodes.forEach((childNode, i) => {
//       stack.push({ childNode, vChildren[i], nextVChildren[i] });
//     });

//   }
//   return _node;
// };
