// src/algorithms/stack.js

// 🏗️ Stack Node Structure
export class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
    
    // 🔢 Get node value
    value() { 
        return this.data; 
    }
    
    // 🔍 Check if node has next pointer
    hasNext() {
        return this.next !== null;
    }
}

// 📚 Stack Data Structure Implementation (LIFO)
export class Stack {
    constructor() {
        this.top = null;
        this.size = 0;
        this.maxSize = 1000; // 🎯 Added maximum capacity constraint
    }

    // ➕ Push element onto stack
    push(data) {
        // 🚫 Check stack capacity
        if (this.size >= this.maxSize) {
            console.warn('⚠️ Stack capacity reached');
            return false;
        }
        
        const newNode = new Node(data, this.top);
        this.top = newNode;
        this.size++;
        return true;
    }

    // ➖ Pop element from stack
    pop() {
        if (!this.top) {
            console.log('ℹ️ Stack is empty, nothing to pop');
            return null;
        }
        const poppedNode = this.top;
        this.top = this.top.next;
        this.size--;
        return poppedNode.data;
    }

    // 👀 Peek at top element without removal
    peek() {
        return this.top ? this.top.data : null;
    }

    // 🔍 Check if stack is empty
    isEmpty() {
        return this.size === 0;
    }

    // 📋 Convert stack to array representation (top to bottom)
    getArray() {
        const arrayRepresentation = [];
        let currentNode = this.top;
        
        while (currentNode) {
            arrayRepresentation.push(currentNode.data);
            currentNode = currentNode.next;
        }
        return arrayRepresentation;
    }

    // 🔎 Search for element in stack
    search(targetData) {
        let currentNode = this.top;
        let position = 0;
        
        while (currentNode) {
            if (currentNode.data === targetData) {
                return { 
                    found: true, 
                    position: position,
                    depth: position // 🎯 Position from top (0-based)
                };
            }
            currentNode = currentNode.next;
            position++;
        }
        return { 
            found: false, 
            position: -1,
            depth: -1 
        };
    }

    // 🧹 Clear all elements from stack
    clear() {
        this.top = null;
        this.size = 0;
    }

    // 📊 Get stack statistics
    getStats() {
        return {
            size: this.size,
            isEmpty: this.isEmpty(),
            topElement: this.peek(),
            maxSize: this.maxSize,
            utilization: (this.size / this.maxSize * 100).toFixed(1) + '%'
        };
    }

    // 🔄 Create stack from array
    static fromArray(elements) {
        const newStack = new Stack();
        // 🎯 Push elements in reverse to maintain order
        for (let i = elements.length - 1; i >= 0; i--) {
            newStack.push(elements[i]);
        }
        return newStack;
    }

    // 🔁 Reverse stack elements
    reverse() {
        const temporaryStack = new Stack();
        let currentNode = this.top;
        
        while (currentNode) {
            temporaryStack.push(currentNode.data);
            currentNode = currentNode.next;
        }
        
        this.top = temporaryStack.top;
        return this;
    }
}

// 📝 Stack Algorithm Pseudocode Documentation
export const STACK_PSEUDOCODE = {
    push: [
        { code: 'function push(data)', explain: 'Create new node with provided data value.' },
        { code: '  newNode.next = stack.top', explain: 'Set new node to reference current top node.' },
        { code: '  stack.top = newNode', explain: 'Update stack top pointer to new node.' },
        { code: '  increment stack size', explain: 'Maintain accurate size counter.' }
    ],
    pop: [
        { code: 'function pop()', explain: 'Remove and return top element from stack.' },
        { code: '  if stack is not empty', explain: 'Verify stack contains elements.' },
        { code: '    temp = stack.top', explain: 'Store reference to top node.' },
        { code: '    stack.top = stack.top.next', explain: 'Advance top pointer to next node.' },
        { code: '    decrement stack size', explain: 'Update size counter accordingly.' },
        { code: '    return temp.data', explain: 'Return data from removed node.' }
    ],
    peek: [
        { code: 'function peek()', explain: 'Examine top element without removal.' },
        { code: '  if stack.top exists', explain: 'Check if stack is non-empty.' },
        { code: '    return stack.top.data', explain: 'Return data from top node.' },
        { code: '  else', explain: 'Handle empty stack case.' },
        { code: '    return null', explain: 'Return null for empty stack.' }
    ],
    search: [
        { code: 'function search(target)', explain: 'Linear search through stack elements.' },
        { code: '  current = stack.top', explain: 'Start traversal from top node.' },
        { code: '  position = 0', explain: 'Initialize position counter (from top).' },
        { code: '  while (current !== null)', explain: 'Iterate until bottom of stack.' },
        { code: '    if (current.data === target)', explain: 'Compare current node data with target.' },
        { code: '      return {found: true, position}', explain: 'Return success with position.' },
        { code: '    current = current.next', explain: 'Move to next node in stack.' },
        { code: '    position++', explain: 'Increment position counter.' },
        { code: '  return {found: false, position: -1}', explain: 'Return failure indicator.' }
    ]
};

// 🎬 Stack Visualization Step Generator
export const getStackSteps = (operation, stackInstance, params) => {
    const visualizationSteps = [];
    const temporaryStack = new Stack();
    
    // 🎯 Create temporary copy for visualization
    temporaryStack.top = stackInstance.top;
    temporaryStack.size = stackInstance.size;

    switch (operation) {
        case 'push':
            visualizationSteps.push({
                type: 'highlight',
                stack: [...temporaryStack.getArray()],
                pseudoLine: 0,
                description: `Preparing to push element ${params.data} onto stack.`,
                operation: 'push'
            });
            
            temporaryStack.push(params.data);
            
            visualizationSteps.push({
                type: 'insert',
                stack: [...temporaryStack.getArray()],
                pseudoLine: 1,
                description: `Element ${params.data} successfully pushed onto stack top.`,
                operation: 'push'
            });
            break;

        case 'pop':
            visualizationSteps.push({
                type: 'highlight',
                stack: [...temporaryStack.getArray()],
                pseudoLine: 0,
                description: `Preparing to pop element from stack top.`,
                operation: 'pop'
            });
            
            const poppedValue = temporaryStack.pop();
            
            visualizationSteps.push({
                type: 'delete',
                stack: [...temporaryStack.getArray()],
                pseudoLine: 2,
                description: `Element ${poppedValue} popped from stack top.`,
                operation: 'pop'
            });
            break;

        case 'peek':
            visualizationSteps.push({
                type: 'highlight',
                stack: [...temporaryStack.getArray()],
                pseudoLine: 0,
                description: `Examining top element without removal.`,
                operation: 'peek'
            });
            
            const topValue = temporaryStack.peek();
            
            visualizationSteps.push({
                type: 'peek',
                stack: [...temporaryStack.getArray()],
                highlightIndex: 0,
                pseudoLine: 2,
                description: `Top element is: ${topValue}`,
                operation: 'peek'
            });
            break;

        case 'search': {
            const target = params?.data;
            let currentNode = temporaryStack.top;
            let currentIndex = 0;
            let searchFound = false;

            visualizationSteps.push({
                type: 'startSearch',
                stack: [...temporaryStack.getArray()],
                pseudoLine: 0,
                description: `Initiating search for value ${target} in stack.`,
                operation: 'search'
            });

            while (currentNode) {
                visualizationSteps.push({
                    type: 'traverse',
                    stack: [...temporaryStack.getArray()],
                    highlightIndex: currentIndex,
                    pseudoLine: 0,
                    description: `Checking element at position ${currentIndex}: ${currentNode.data}`,
                    operation: 'search'
                });
                
                if (currentNode.data === target) {
                    visualizationSteps.push({
                        type: 'found',
                        stack: [...temporaryStack.getArray()],
                        highlightIndex: currentIndex,
                        pseudoLine: 0,
                        description: `Target value ${target} found at position ${currentIndex} from top.`,
                        operation: 'search'
                    });
                    searchFound = true;
                    break;
                }
                
                currentNode = currentNode.next;
                currentIndex++;
            }
            
            if (!searchFound) {
                visualizationSteps.push({
                    type: 'notFound',
                    stack: [...temporaryStack.getArray()],
                    highlightIndex: -1,
                    pseudoLine: 0,
                    description: `Value ${target} not found in stack.`,
                    operation: 'search'
                });
            }
            break;
        }

        default:
            visualizationSteps.push({
                type: 'initial',
                stack: [...temporaryStack.getArray()],
                pseudoLine: 0,
                description: `Stack initial state loaded.`,
                operation: 'default'
            });
    }

    return visualizationSteps;
};

// 🛠️ Stack Utility Functions
export const StackUtils = {
    // 🔄 Reverse stack using temporary storage
    reverse: (stack) => {
        const temporaryArray = [];
        while (!stack.isEmpty()) {
            temporaryArray.push(stack.pop());
        }
        temporaryArray.forEach(element => stack.push(element));
        return stack;
    },

    // 📊 Compare two stacks for equality
    areEqual: (stack1, stack2) => {
        if (stack1.size !== stack2.size) return false;
        
        let current1 = stack1.top;
        let current2 = stack2.top;
        
        while (current1 && current2) {
            if (current1.data !== current2.data) return false;
            current1 = current1.next;
            current2 = current2.next;
        }
        
        return true;
    },

    // 🎯 Find maximum element in stack
    findMax: (stack) => {
        if (stack.isEmpty()) return null;
        
        let maxValue = stack.top.data;
        let currentNode = stack.top.next;
        
        while (currentNode) {
            if (currentNode.data > maxValue) maxValue = currentNode.data;
            currentNode = currentNode.next;
        }
        
        return maxValue;
    },

    // 🔢 Convert stack to array (bottom to top)
    toArrayBottomFirst: (stack) => {
        const array = [];
        let currentNode = stack.top;
        
        while (currentNode) {
            array.unshift(currentNode.data); // 🎯 Add to beginning for bottom-first
            currentNode = currentNode.next;
        }
        
        return array;
    }
};
