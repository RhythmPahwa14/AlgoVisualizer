// src/algorithms/binaryTree.js

// 🏗️ Binary Tree Node Structure
export class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// 🌳 Binary Search Tree Implementation
export class BinaryTree {
    constructor() {
        this.root = null;
        this.nodeCount = 0;
    }

    // ➕ Insert new data into tree
    insert(data) {
        const newNode = new Node(data);
        if (!this.root) {
            this.root = newNode;
            this.nodeCount++;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    // 🔍 Recursive node insertion helper
    insertNode(node, newNode) {
        if (newNode.data < node.data) {
            if (!node.left) {
                node.left = newNode;
                this.nodeCount++;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else if (!node.right) {
            node.right = newNode;
            this.nodeCount++;
        } else {
            this.insertNode(node.right, newNode);
        }
    }

    // 🔎 Search for data in tree
    search(data) {
        return this.searchNode(this.root, data);
    }

    // 🔍 Recursive search implementation
    searchNode(node, data) {
        if (!node || node.data === data) {
            return node;
        }

        if (data < node.data) {
            return this.searchNode(node.left, data);
        } else {
            return this.searchNode(node.right, data);
        }
    }

    // 📊 Get all nodes for visualization
    getNodes() {
        const nodes = [];
        const queue = [this.root];
        while (queue.length > 0) {
            const currentNode = queue.shift();
            if (currentNode) {
                nodes.push(currentNode);
                queue.push(currentNode.left);
                queue.push(currentNode.right);
            }
        }
        return nodes;
    }

    // 🗑️ Delete node from BST
    delete(data) {
        this.root = this._deleteNode(this.root, data);
    }

    // 🔧 Internal delete node implementation
    _deleteNode(node, data) {
        if (!node) return null;
        if (data < node.data) {
            node.left = this._deleteNode(node.left, data);
            return node;
        } else if (data > node.data) {
            node.right = this._deleteNode(node.right, data);
            return node;
        }
        // 🎯 Node found - handle deletion cases
        if (!node.left && !node.right) return null; // 🍃 Leaf node
        if (!node.left) return node.right; // 👶 Single child (right)
        if (!node.right) return node.left; // 👶 Single child (left)
        // 👨‍👩‍👧‍👦 Two children: replace with inorder successor
        const successor = this._minNode(node.right);
        node.data = successor.data;
        node.right = this._deleteNode(node.right, successor.data);
        return node;
    }

    // 📉 Find minimum node in subtree
    _minNode(node) {
        let current = node;
        while (current?.left) {
            current = current.left;
        }
        return current;
    }

    // 🔄 Inorder traversal (LNR)
    inorder() {
        const result = [];
        const traverse = (node) => { 
            if (!node) return; 
            traverse(node.left); 
            result.push(node.data); 
            traverse(node.right); 
        };
        traverse(this.root);
        return result;
    }

    // 🔄 Preorder traversal (NLR)
    preorder() {
        const result = [];
        const traverse = (node) => { 
            if (!node) return; 
            result.push(node.data); 
            traverse(node.left); 
            traverse(node.right); 
        };
        traverse(this.root);
        return result;
    }

    // 🔄 Postorder traversal (LRN)
    postorder() {
        const result = [];
        const traverse = (node) => { 
            if (!node) return; 
            traverse(node.left); 
            traverse(node.right); 
            result.push(node.data); 
        };
        traverse(this.root);
        return result;
    }

    // 📈 Get tree statistics
    getStats() {
        return {
            nodeCount: this.nodeCount,
            height: this._calculateHeight(this.root),
            isBalanced: this._isBalanced(this.root)
        };
    }

    // 📏 Calculate tree height
    _calculateHeight(node) {
        if (!node) return 0;
        return 1 + Math.max(
            this._calculateHeight(node.left), 
            this._calculateHeight(node.right)
        );
    }

    // ⚖️ Check if tree is balanced
    _isBalanced(node) {
        if (!node) return true;
        const leftHeight = this._calculateHeight(node.left);
        const rightHeight = this._calculateHeight(node.right);
        return Math.abs(leftHeight - rightHeight) <= 1 && 
               this._isBalanced(node.left) && 
               this._isBalanced(node.right);
    }
}

// 📝 Algorithm pseudocode documentation
export const BINARY_TREE_PSEUDOCODE = {
    insert: [
        { code: 'function insert(node, data)', explain: 'Locate appropriate position for new node insertion.' },
        { code: '  if data < node.data', explain: 'Navigate to left subtree for smaller values.' },
        { code: '    insert(node.left, data)', explain: 'Recursive insertion in left subtree.' },
        { code: '  else', explain: 'Navigate to right subtree for larger values.' },
        { code: '    insert(node.right, data)', explain: 'Recursive insertion in right subtree.' }
    ],
    search: [
        { code: 'function search(node, data)', explain: 'Initiate search from root node.' },
        { code: '  if node === null or node.data === data', explain: 'Base case: node found or reached leaf.' },
        { code: '  if data < node.data', explain: 'Target data smaller than current node.' },
        { code: '    return search(node.left, data)', explain: 'Recursively search left subtree.' },
        { code: '  else', explain: 'Target data larger than current node.' },
        { code: '    return search(node.right, data)', explain: 'Recursively search right subtree.' }
    ],
    delete: [
        { code: 'function delete(node, key)', explain: 'Locate target node for deletion.' },
        { code: '  if key < node.data: node.left = delete(node.left, key)', explain: 'Search in left subtree.' },
        { code: '  else if key > node.data: node.right = delete(node.right, key)', explain: 'Search in right subtree.' },
        { code: '  else // node found', explain: 'Handle three deletion scenarios.' },
        { code: '    if no children: return null', explain: 'Simple leaf node removal.' },
        { code: '    if one child: return that child', explain: 'Bypass node with single child.' },
        { code: '    two children: node.data = min(node.right)', explain: 'Replace with inorder successor.' },
        { code: '    node.right = delete(node.right, node.data)', explain: 'Remove duplicate successor.' }
    ],
    inorder: [
        { code: 'inorder(node):', explain: 'Left-Node-Right traversal pattern.' },
        { code: '  inorder(node.left)', explain: 'Process left subtree first.' },
        { code: '  visit(node)', explain: 'Process current node.' },
        { code: '  inorder(node.right)', explain: 'Process right subtree last.' }
    ],
    preorder: [
        { code: 'preorder(node):', explain: 'Node-Left-Right traversal pattern.' },
        { code: '  visit(node)', explain: 'Process current node first.' },
        { code: '  preorder(node.left)', explain: 'Process left subtree second.' },
        { code: '  preorder(node.right)', explain: 'Process right subtree third.' }
    ],
    postorder: [
        { code: 'postorder(node):', explain: 'Left-Right-Node traversal pattern.' },
        { code: '  postorder(node.left)', explain: 'Process left subtree first.' },
        { code: '  postorder(node.right)', explain: 'Process right subtree second.' },
        { code: '  visit(node)', explain: 'Process current node last.' }
    ]
};

// 🎬 Visualization step generators

// ➕ Insert operation step builder
function buildInsertSteps(treeInstance, data) {
    const steps = [];
    let currentNode = treeInstance.root;
    
    if (!currentNode) {
        steps.push({ 
            type: 'insert', 
            node: new Node(data), 
            pseudoLine: 0, 
            description: `Creating new node ${data} as root element.`, 
            operation: 'insert' 
        });
        return steps;
    }
    
    steps.push({ 
        type: 'traverse', 
        node: currentNode, 
        pseudoLine: 0, 
        description: `Beginning insertion from root node ${currentNode.data}.`, 
        operation: 'insert' 
    });
    
    while (currentNode) {
        if (data < currentNode.data) {
            if (!currentNode.left) {
                steps.push({ 
                    type: 'insert', 
                    node: currentNode, 
                    value: data, 
                    pseudoLine: 2, 
                    description: `Placing ${data} as left child of ${currentNode.data}.`, 
                    operation: 'insert' 
                });
                break;
            }
            steps.push({ 
                type: 'traverse', 
                node: currentNode.left, 
                pseudoLine: 2, 
                description: `Navigating to left child ${currentNode.left.data} (${data} < ${currentNode.data}).`, 
                operation: 'insert' 
            });
            currentNode = currentNode.left;
        } else {
            if (!currentNode.right) {
                steps.push({ 
                    type: 'insert', 
                    node: currentNode, 
                    value: data, 
                    pseudoLine: 4, 
                    description: `Placing ${data} as right child of ${currentNode.data}.`, 
                    operation: 'insert' 
                });
                break;
            }
            steps.push({ 
                type: 'traverse', 
                node: currentNode.right, 
                pseudoLine: 4, 
                description: `Navigating to right child ${currentNode.right.data} (${data} >= ${currentNode.data}).`, 
                operation: 'insert' 
            });
            currentNode = currentNode.right;
        }
    }
    return steps;
}

// 🔍 Search operation step builder
function buildSearchSteps(treeInstance, data) {
    const steps = [];
    let currentNode = treeInstance.root;
    
    if (!currentNode) {
        steps.push({ 
            type: 'notFound', 
            node: null, 
            pseudoLine: 1, 
            description: `Empty tree structure - value ${data} not present.`, 
            operation: 'search' 
        });
        return steps;
    }
    
    steps.push({ 
        type: 'traverse', 
        node: currentNode, 
        pseudoLine: 0, 
        description: `Initiating search for ${data} from root ${currentNode.data}.`, 
        operation: 'search' 
    });
    
    while (currentNode) {
        if (currentNode.data === data) {
            steps.push({ 
                type: 'found', 
                node: currentNode, 
                pseudoLine: 1, 
                description: `Target value ${data} located successfully.`, 
                operation: 'search' 
            });
            return steps;
        }
        steps.push({ 
            type: 'compare', 
            node: currentNode, 
            pseudoLine: 2, 
            description: `Comparing target ${data} with current ${currentNode.data}.`, 
            operation: 'search' 
        });
        if (data < currentNode.data) {
            if (!currentNode.left) {
                steps.push({ 
                    type: 'notFound', 
                    node: currentNode, 
                    pseudoLine: 3, 
                    description: `Left subtree empty - value ${data} not found.`, 
                    operation: 'search' 
                });
                return steps;
            }
            steps.push({ 
                type: 'traverse', 
                node: currentNode.left, 
                pseudoLine: 3, 
                description: `Moving to left child ${currentNode.left.data}.`, 
                operation: 'search' 
            });
            currentNode = currentNode.left;
        } else {
            if (!currentNode.right) {
                steps.push({ 
                    type: 'notFound', 
                    node: currentNode, 
                    pseudoLine: 5, 
                    description: `Right subtree empty - value ${data} not found.`, 
                    operation: 'search' 
                });
                return steps;
            }
            steps.push({ 
                type: 'traverse', 
                node: currentNode.right, 
                pseudoLine: 5, 
                description: `Moving to right child ${currentNode.right.data}.`, 
                operation: 'search' 
            });
            currentNode = currentNode.right;
        }
    }
    steps.push({ 
        type: 'notFound', 
        node: null, 
        pseudoLine: 5, 
        description: `Value ${data} not present in tree structure.`, 
        operation: 'search' 
    });
    return steps;
}

// 🗑️ Delete operation step builder
function buildDeleteSteps(treeInstance, data) {
    const steps = [];
    let currentNode = treeInstance.root;
    
    if (!currentNode) {
        steps.push({ 
            type: 'notFound', 
            node: null, 
            pseudoLine: 0, 
            description: `Empty tree - deletion of ${data} not possible.`, 
            operation: 'delete' 
        });
        return steps;
    }
    
    let targetNode = treeInstance.root;
    let parentNode = null;
    
    steps.push({ 
        type: 'traverse', 
        node: targetNode, 
        pseudoLine: 0, 
        description: `Starting deletion process for ${data} from root ${targetNode.data}.`, 
        operation: 'delete' 
    });
    
    while (targetNode && targetNode.data !== data) {
        steps.push({ 
            type: 'compare', 
            node: targetNode, 
            pseudoLine: 0, 
            description: `Comparing deletion target ${data} with ${targetNode.data}.`, 
            operation: 'delete' 
        });
        parentNode = targetNode;
        targetNode = data < targetNode.data ? targetNode.left : targetNode.right;
        if (targetNode) steps.push({ 
            type: 'traverse', 
            node: targetNode, 
            pseudoLine: 0, 
            description: `Progressing to ${targetNode.data}.`, 
            operation: 'delete' 
        });
    }
    
    if (!targetNode) {
        steps.push({ 
            type: 'notFound', 
            node: parentNode, 
            pseudoLine: 0, 
            description: `Target value ${data} not found for deletion.`, 
            operation: 'delete' 
        });
        return steps;
    }
    
    // 🎯 Determine deletion case type
    let deletionType;
    if (!targetNode.left && !targetNode.right) deletionType = 'deleteLeaf';
    else if (!targetNode.left || !targetNode.right) deletionType = 'deleteOneChild';
    else deletionType = 'deleteTwoChildren';
    
    steps.push({ 
        type: deletionType, 
        node: targetNode, 
        pseudoLine: 0, 
        description: `Executing deletion of ${data} (${deletionType.replace(/delete/, '').trim() || 'leaf node'} scenario).`, 
        operation: 'delete' 
    });
    return steps;
}

// 🔄 Traversal operation step builder
function buildTraversalSteps(treeInstance, order) {
    const steps = [];
    const sequence = [];
    
    const depthFirstSearch = (node) => {
        if (!node) return;
        if (order === 'preorder') sequence.push(node);
        depthFirstSearch(node.left);
        if (order === 'inorder') sequence.push(node);
        depthFirstSearch(node.right);
        if (order === 'postorder') sequence.push(node);
    };
    
    depthFirstSearch(treeInstance.root);
    
    if (sequence.length === 0) {
        steps.push({ 
            type: 'notFound', 
            node: null, 
            description: 'Tree structure is empty.', 
            operation: order 
        });
        return steps;
    }
    
    sequence.forEach((node, index) => steps.push({ 
        type: 'visit', 
        node: node, 
        pseudoLine: index === 0 ? 1 : 2, 
        description: `Visiting node ${node.data} (${order} traversal)`, 
        operation: order 
    }));
    
    return steps;
}

// 🎯 Main visualization step coordinator
export const getTreeSteps = (operation, treeInstance, params) => {
    const dataValue = parseInt(params.data, 10);
    switch (operation) {
        case 'insert':
            return buildInsertSteps(treeInstance, dataValue);
        case 'search':
            return buildSearchSteps(treeInstance, dataValue);
        case 'delete':
            return buildDeleteSteps(treeInstance, dataValue);
        case 'inorder':
        case 'preorder':
        case 'postorder':
            return buildTraversalSteps(treeInstance, operation);
        default:
            return [{ 
                type: 'initial', 
                node: null, 
                pseudoLine: 0, 
                description: 'Initial tree state loaded.' 
            }];
    }
};
