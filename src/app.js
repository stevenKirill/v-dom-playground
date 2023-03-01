import { createVNode, createDOMNode } from './vdom.js';

const container = createVNode('div', { class: 'container' }, [
  createVNode('h1', {}, 'Hello world'),
  createVNode('img', { src: 'https://i.ibb.co/M6LdN5m/2.png', width: 200 }),
]);

createDOMNode(container);
