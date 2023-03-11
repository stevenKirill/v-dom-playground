/* eslint-disable no-use-before-define */
import { createVNode, patch } from './vdom.js';

const createButton = ({ text, onclick }) => createVNode('button', { onclick }, [text]);

function createApp(state) {
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
    createVNode('div', {}, [
      createButton({
        text: '+1',
        onclick: () => increment(),
      }),
      createButton({
        text: '-1',
        onclick: () => decrement(),
      }),
    ]),
  ]);
}

const appState = {
  state: {
    counter: 0,
  },
  getState() {
    return this.state;
  },
  setState(nextState) {
    this.state = nextState;
    this.onStateChangeCallback();
  },
  onStateChangeCallback() {},
};

function increment() {
  return appState.setState({ counter: appState.getState().counter + 1 });
}

function decrement() {
  return appState.setState({ counter: appState.getState().counter - 1 });
}

let root = patch(createApp(appState.getState()), document.getElementById('root'));

appState.onStateChangeCallback = () => {
  console.log('state was changed');
  root = patch(createApp(appState.getState()), root);
};
