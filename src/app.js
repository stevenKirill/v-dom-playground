/* eslint-disable no-use-before-define */
import { patch, createVNode } from './vdom.js';

function createApp(state) {
  const { counter } = state;
  return (
    <div { ...{ class: 'container' }}>
      <h1>Test vdom app</h1>
      <div>Count: {String(counter)}</div>
      <img src="https://i.ibb.co/M6LdN5m/2.png" width="200" />
      <div>
        <button onclick={() => decrement()}>-1</button>
        <button onclick={() => increment()}>+1</button>
      </div>
    </div>
  );
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
