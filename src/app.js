import {
  createVNode,
  createDOMNode,
  mount,
  patchNode,
} from './vdom.js';

const appState = {
  counter: 0,
};
const app = document.getElementById('root');

const createApp = (state) => {
  const { counter } = state;
  return createVNode('div', { class: 'container' }, [
    createVNode(
      'h1',
      {},
      ['Test vdom app'],
    ),
    createVNode(
      'div',
      { 'data-count': `${counter}` },
      [`Current: ${counter}`],
    ),
    createVNode(
      'img',
      { src: 'https://i.ibb.co/M6LdN5m/2.png', width: 200 },
    ),
  ]);
};

let virtualApp = createApp(appState);
let root = mount(createDOMNode(createApp(appState)), app);

setInterval(() => {
  appState.counter += 1;
  const nextApp = createApp(appState);
  root = patchNode(root, virtualApp, nextApp);
  virtualApp = nextApp;
  mount(createDOMNode(createApp(appState)), app);
}, 1000);
