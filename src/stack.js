export class Stack {
  constructor(stack = []) {
    this.stack = stack;
  }

  push(item) {
    this.stack.push(item);
  }

  pop() {
    if (this.stack.length === 0) {
      return 'The stack is empty';
    }
    return this.stack.pop();
  }

  peek() {
    return this.stack[this.stack - 1];
  }

  isEmpty() {
    return this.stack.length === 0;
  }
}

export const stackExample = new Stack();
