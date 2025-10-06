// src/algorithms/queue.js

// 🏗️ Queue Node Structure
export class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

// 📊 Queue Data Structure Implementation
export class Queue {
    constructor() {
        this.front = null;
        this.back = null;
        this.size = 0;
        this.maxSize = 1000; // 🎯 Added maximum size constraint
    }

    // ➕ Add element to the back of queue
    enqueue(data) {
        // 🚫 Check queue capacity
        if (this.size >= this.maxSize) {
            console.warn('⚠️ Queue capacity reached');
            return false;
        }

        const newNode = new Node(data);
        if (!this.back) {
            // 🎯 First element in empty queue
            this.front = newNode;
            this.back = newNode;
        } else {
            // 🔗 Add to existing queue
            this.back.next = newNode;
            this.back = newNode;
        }
        this.size++;
        return true;
    }

    // ➖ Remove element from front of queue
    dequeue() {
        if (!this.front) {
            console.log('ℹ️ Queue is empty, nothing to dequeue');
            return null;
        }
        const dequeuedNode = this.front;
        this.front = this.front.next;
        
        // 🎯 Update back pointer if queue becomes empty
        if (!this.front) {
            this.back = null;
        }
        this.size--;
        return dequeuedNode.data;
    }

    // 👀 Peek at front element without removal
    peek() {
        return this.front ? this.front.data : null;
    }

    // 🔍 Check if queue is empty
    isEmpty() {
        return this.size === 0;
    }

    // 🔎 Search for element in queue
    search(data) {
        let currentNode = this.front;
        let position = 0;
        
        while (currentNode) {
            if (currentNode.data === data) {
                return { found: true, position };
            }
            currentNode = currentNode.next;
            position++;
        }
        return { found: false, position: -1 };
    }

    // 📋 Convert queue to array representation
    getArray() {
        const arrayRepresentation = [];
        let currentNode = this.front;
        
        while (currentNode) {
            arrayRepresentation.push(currentNode.data);
            currentNode = currentNode.next;
        }
        return arrayRepresentation;
    }

    // 🧹 Clear all elements from queue
    clear() {
        this.front = null;
        this.back = null;
        this.size = 0;
    }

    // 📊 Get queue statistics
    getStats() {
        return {
            size: this.size,
            isEmpty: this.isEmpty(),
            frontElement: this.peek(),
            maxSize: this.maxSize
        };
    }

    // 🔄 Create queue from array
    static fromArray(elements) {
        const newQueue = new Queue();
        elements.forEach(element => newQueue.enqueue(element));
        return newQueue;
    }
}

// 📝 Queue Algorithm Pseudocode Documentation
export const QUEUE_PSEUDOCODE = {
    enqueue: [
        { code: 'function enqueue(data)', explain: 'Create new node with provided data value.' },
        { code: '  if queue is empty', explain: 'Initialize both front and back pointers to new node.' },
        { code: '  else', explain: 'Append new node to the end of existing queue.' },
        { code: '    queue.back.next = newNode', explain: 'Link current back node to new node.' },
        { code: '    queue.back = newNode', explain: 'Update back pointer to new node.' },
        { code: '  increment queue size', explain: 'Maintain accurate size counter.' }
    ],
    dequeue: [
        { code: 'function dequeue()', explain: 'Remove and return front element from queue.' },
        { code: '  if queue is not empty', explain: 'Verify queue contains elements.' },
        { code: '    temp = queue.front', explain: 'Store reference to front node.' },
        { code: '    queue.front = queue.front.next', explain: 'Advance front pointer to next node.' },
        { code: '    if queue.front is null', explain: 'Handle case when queue becomes empty.' },
        { code: '      queue.back = null', explain: 'Reset back pointer for empty queue.' },
        { code: '    decrement queue size', explain: 'Update size counter accordingly.' }
    ],
    search: [
        { code: 'function search(data)', explain: 'Linear search through queue elements.' },
        { code: '  current = queue.front', explain: 'Start traversal from front node.' },
        { code: '  position = 0', explain: 'Initialize position counter.' },
        { code: '  while (current !== null)', explain: 'Iterate until end of queue.' },
        { code: '    if (current.data === data)', explain: 'Compare current node data with target.' },
        { code: '      return {found: true, position}', explain: 'Return success with position.' },
        { code: '    current = current.next', explain: 'Move to next node in queue.' },
        { code: '    position++', explain: 'Increment position counter.' },
        { code: '  return {found: false, position: -1}', explain: 'Return failure indicator.' }
    ],
    peek: [
        { code: 'function peek()', explain: 'Examine front element without removal.' },
        { code: '  if queue.front exists', explain: 'Check if queue is non-empty.' },
        { code: '    return queue.front.data', explain: 'Return data from front node.' },
        { code: '  else', explain: 'Handle empty queue case.' },
        { code: '    return null', explain: 'Return null for empty queue.' }
    ]
};

// 🎬 Queue Visualization Step Generator
export const getQueueSteps = (operation, queueInstance, params) => {
    const visualizationSteps = [];
    const temporaryQueue = new Queue();
    
    // 🎯 Create temporary copy for visualization
    temporaryQueue.front = queueInstance.front;
    temporaryQueue.back = queueInstance.back;
    temporaryQueue.size = queueInstance.size;

    switch (operation) {
        case 'enqueue':
            visualizationSteps.push({
                type: 'highlight',
                queue: [...temporaryQueue.getArray()],
                pseudoLine: 0,
                description: `Preparing to enqueue element ${params.data} to queue back.`,
                operation: 'enqueue'
            });
            
            temporaryQueue.enqueue(params.data);
            
            visualizationSteps.push({
                type: 'insert',
                queue: [...temporaryQueue.getArray()],
                pseudoLine: 4,
                description: `Element ${params.data} successfully added to queue back.`,
                operation: 'enqueue'
            });
            break;

        case 'dequeue':
            visualizationSteps.push({
                type: 'highlight',
                queue: [...temporaryQueue.getArray()],
                pseudoLine: 0,
                description: `Preparing to dequeue element from queue front.`,
                operation: 'dequeue'
            });
            
            const dequeuedValue = temporaryQueue.dequeue();
            
            visualizationSteps.push({
                type: 'delete',
                queue: [...temporaryQueue.getArray()],
                pseudoLine: 2,
                description: `Element ${dequeuedValue} removed from queue front.`,
                operation: 'dequeue'
            });
            break;

        case 'search':
            let currentNode = temporaryQueue.front;
            let currentIndex = 0;
            let searchFound = false;

            visualizationSteps.push({
                type: 'startSearch',
                queue: [...temporaryQueue.getArray()],
                pseudoLine: 0,
                description: `Initiating search for value ${params.data} in queue.`,
                operation: 'search'
            });

            while(currentNode) {
                visualizationSteps.push({
                    type: 'traverse',
                    queue: [...temporaryQueue.getArray()],
                    highlightIndex: currentIndex,
                    pseudoLine: 2,
                    description: `Checking element at position ${currentIndex}: ${currentNode.data}`,
                    operation: 'search'
                });
                
                if (currentNode.data === params.data) {
                    visualizationSteps.push({
                        type: 'found',
                        queue: [...temporaryQueue.getArray()],
                        highlightIndex: currentIndex,
                        pseudoLine: 4,
                        description: `Target value ${params.data} found at position ${currentIndex}.`,
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
                    queue: [...temporaryQueue.getArray()],
                    highlightIndex: -1,
                    pseudoLine: 6,
                    description: `Value ${params.data} not found in queue.`,
                    operation: 'search'
                });
            }
            break;

        case 'peek':
            visualizationSteps.push({
                type: 'highlight',
                queue: [...temporaryQueue.getArray()],
                pseudoLine: 0,
                description: `Examining front element without removal.`,
                operation: 'peek'
            });
            
            const frontValue = temporaryQueue.peek();
            
            visualizationSteps.push({
                type: 'peek',
                queue: [...temporaryQueue.getArray()],
                highlightIndex: 0,
                pseudoLine: 2,
                description: `Front element is: ${frontValue}`,
                operation: 'peek'
            });
            break;

        default:
            visualizationSteps.push({
                type: 'initial',
                queue: [...temporaryQueue.getArray()],
                pseudoLine: 0,
                description: `Queue initial state loaded.`,
                operation: 'default'
            });
    }

    return visualizationSteps;
};

// 🧪 Queue Utility Functions
export const QueueUtils = {
    // 🔄 Reverse queue elements
    reverse: (queue) => {
        const stack = [];
        while (!queue.isEmpty()) {
            stack.push(queue.dequeue());
        }
        while (stack.length > 0) {
            queue.enqueue(stack.pop());
        }
        return queue;
    },

    // 📊 Compare two queues for equality
    areEqual: (queue1, queue2) => {
        if (queue1.size !== queue2.size) return false;
        
        let current1 = queue1.front;
        let current2 = queue2.front;
        
        while (current1 && current2) {
            if (current1.data !== current2.data) return false;
            current1 = current1.next;
            current2 = current2.next;
        }
        
        return true;
    },

    // 🎯 Find maximum element in queue
    findMax: (queue) => {
        if (queue.isEmpty()) return null;
        
        let max = queue.front.data;
        let current = queue.front.next;
        
        while (current) {
            if (current.data > max) max = current.data;
            current = current.next;
        }
        
        return max;
    }
};
