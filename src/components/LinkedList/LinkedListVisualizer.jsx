import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Plus, Search, Trash2, Download, Camera, StepForward, StepBack } from 'lucide-react';
import LinkedListNode from './LinkedListNode';
import { LinkedListNode as ListNode, linkedListOperations } from '../../algorithms/linkedListAlgorithms';
import { linkedListAlgorithms } from '../../data/allCodes';
import '../../styles/LinkedList.css';

const LinkedListVisualizer = () => {
  // State management
  const [linkedList, setLinkedList] = useState({ head: null, size: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentOperation, setCurrentOperation] = useState('none');
  const [highlightedNodeId, setHighlightedNodeId] = useState(null);
  const [targetNodeId, setTargetNodeId] = useState(null);
  const [visitedNodeIds, setVisitedNodeIds] = useState(new Set());
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [position, setPosition] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(800);
  const [animationSteps, setAnimationSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stats, setStats] = useState({ operations: 0, comparisons: 0 });
  const [selectedLanguage, setSelectedLanguage] = useState("java");
  const [selectedOperation, setSelectedOperation] = useState("insertAtBeginning");
  
  const visualizationRef = useRef(null);
  const animationTimeoutRef = useRef(null);
  const shouldContinueAnimation = useRef(true);

  // Initialize with sample data
  useEffect(() => {
    const initialList = { head: null, size: 0 };
    linkedListOperations.insertAtEnd(initialList, 10);
    linkedListOperations.insertAtEnd(initialList, 20);
    linkedListOperations.insertAtEnd(initialList, 30);
    setLinkedList(initialList);
  }, []);

  // Cleanup animation on component unmount
  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  // Convert linked list to array for rendering
  const getVisualizationArray = () => {
    const nodes = [];
    let current = linkedList.head;
    while (current) {
      nodes.push(current);
      current = current.next;
    }
    return nodes;
  };

  // Enhanced animation steps generation
  const generateAnimationSteps = (operation, targetValue, targetPosition) => {
    const steps = [];
    let current = linkedList.head;
    let index = 0;

    switch (operation) {
      case 'search':
        steps.push({
          type: 'start',
          description: `Starting search for value ${targetValue}...`
        });
        
        while (current) {
          steps.push({
            type: 'highlight',
            nodeId: current.id,
            description: `Checking node at position ${index}: ${current.data}`,
            comparing: true
          });
          
          if (current.data === targetValue) {
            steps.push({
              type: 'found',
              nodeId: current.id,
              description: `🎉 Found ${targetValue} at position ${index}!`,
              success: true
            });
            break;
          } else {
            steps.push({
              type: 'continue',
              nodeId: current.id,
              description: `${current.data} ≠ ${targetValue}, moving to next node...`,
              visited: true
            });
          }
          
          current = current.next;
          index++;
        }
        
        if (!steps.some(step => step.type === 'found')) {
          steps.push({
            type: 'notfound',
            description: `❌ Value ${targetValue} not found in the list`,
            failure: true
          });
        }
        break;

      case 'traverse':
        steps.push({
          type: 'start',
          description: 'Starting complete traversal of the linked list...'
        });
        
        while (current) {
          steps.push({
            type: 'highlight',
            nodeId: current.id,
            description: `Visiting node ${index}: ${current.data}`,
            visiting: true
          });
          
          steps.push({
            type: 'visit',
            nodeId: current.id,
            description: `Processed node ${index} with value ${current.data}`,
            visited: true
          });
          
          current = current.next;
          index++;
        }
        
        steps.push({
          type: 'complete',
          description: `✅ Traversal complete! Visited ${index} nodes.`,
          success: true
        });
        break;

      case 'insertEnd':
        steps.push({
          type: 'start',
          description: `Inserting ${targetValue} at the end of the list...`
        });
        
        if (!linkedList.head) {
          steps.push({
            type: 'insert',
            description: `List is empty, ${targetValue} will be the first node.`,
            success: true
          });
        } else {
          let stepCount = 0;
          while (current && current.next) {
            steps.push({
              type: 'highlight',
              nodeId: current.id,
              description: `Traversing... Current node: ${current.data}`,
              traversing: true
            });
            current = current.next;
            stepCount++;
          }
          
          if (current) {
            steps.push({
              type: 'highlight',
              nodeId: current.id,
              description: `Found last node: ${current.data}`,
              target: true
            });
            
            steps.push({
              type: 'insert',
              nodeId: current.id,
              description: `Linking new node (${targetValue}) after ${current.data}`,
              success: true
            });
          }
        }
        break;

      case 'insertBeginning':
        steps.push({
          type: 'start',
          description: `Inserting ${targetValue} at the beginning of the list...`
        });
        
        if (linkedList.head) {
          steps.push({
            type: 'highlight',
            nodeId: linkedList.head.id,
            description: `Current head: ${linkedList.head.data}`,
            target: true
          });
        }
        
        steps.push({
          type: 'insert',
          description: `New node (${targetValue}) will become the new head`,
          success: true
        });
        break;

      case 'reverse':
        steps.push({
          type: 'start',
          description: 'Starting to reverse the linked list...'
        });
        
        let nodeCount = 0;
        current = linkedList.head;
        while (current) {
          steps.push({
            type: 'highlight',
            nodeId: current.id,
            description: `Reversing pointers for node: ${current.data}`,
            reversing: true
          });
          current = current.next;
          nodeCount++;
        }
        
        steps.push({
          type: 'complete',
          description: `✅ Reversed ${nodeCount} nodes successfully!`,
          success: true
        });
        break;

      default:
        steps.push({
          type: 'info',
          description: `Performing ${operation}...`
        });
    }

    return steps;
  };

  // Enhanced animation execution
  const executeAnimationSteps = async () => {
    if (animationSteps.length === 0) return;

    setIsAnimating(true);
    setIsPaused(false);
    shouldContinueAnimation.current = true;
    setVisitedNodeIds(new Set());
    
    for (let i = 0; i < animationSteps.length; i++) {
      // Check if animation should continue
      if (!shouldContinueAnimation.current) break;
      
      // Handle pause
      while (isPaused && shouldContinueAnimation.current) {
        await new Promise(resolve => {
          animationTimeoutRef.current = setTimeout(resolve, 100);
        });
      }
      
      if (!shouldContinueAnimation.current) break;
      
      const step = animationSteps[i];
      setCurrentStepIndex(i);

      // Reset previous states
      setHighlightedNodeId(null);
      setTargetNodeId(null);

      // Apply step-specific effects
      if (step.nodeId) {
        if (step.comparing || step.visiting || step.traversing || step.reversing) {
          setHighlightedNodeId(step.nodeId);
        }
        
        if (step.target) {
          setTargetNodeId(step.nodeId);
        }
        
        if (step.visited) {
          setVisitedNodeIds(prev => new Set([...prev, step.nodeId]));
        }
      }

      // Wait for animation duration
      await new Promise(resolve => {
        animationTimeoutRef.current = setTimeout(resolve, animationSpeed);
      });
    }

    // Animation complete
    setIsAnimating(false);
    setIsPaused(false);
    setHighlightedNodeId(null);
    setTargetNodeId(null);
    setCurrentStepIndex(0);
    
    // Keep visited nodes highlighted for a moment
    setTimeout(() => {
      setVisitedNodeIds(new Set());
      setAnimationSteps([]);
    }, 1000);
  };

  // Control handlers
  const handlePlay = () => {
    if (isPaused) {
      setIsPaused(false);
      return;
    }
    
    if (animationSteps.length > 0) {
      executeAnimationSteps();
    } else {
      // Generate default traverse animation
      const steps = generateAnimationSteps('traverse');
      setAnimationSteps(steps);
      setTimeout(() => executeAnimationSteps(), 100);
    }
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleStop = () => {
    shouldContinueAnimation.current = false;
    setIsAnimating(false);
    setIsPaused(false);
    setHighlightedNodeId(null);
    setTargetNodeId(null);
    setVisitedNodeIds(new Set());
    setAnimationSteps([]);
    setCurrentStepIndex(0);
    
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
  };

  const handleStepForward = () => {
    if (!isAnimating && animationSteps.length > 0 && currentStepIndex < animationSteps.length - 1) {
      const nextIndex = currentStepIndex + 1;
      const step = animationSteps[nextIndex];
      setCurrentStepIndex(nextIndex);
      
      if (step.nodeId) {
        setHighlightedNodeId(step.nodeId);
      }
    }
  };

  const handleStepBack = () => {
    if (!isAnimating && currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      const step = animationSteps[prevIndex];
      setCurrentStepIndex(prevIndex);
      
      if (step.nodeId) {
        setHighlightedNodeId(step.nodeId);
      }
    }
  };

  // Operations with enhanced animation
  const handleInsertAtBeginning = async () => {
    if (!inputValue || isAnimating) return;
    
    const steps = generateAnimationSteps('insertBeginning', parseInt(inputValue));
    setAnimationSteps(steps);
    
    const newList = { ...linkedList };
    linkedListOperations.insertAtBeginning(newList, parseInt(inputValue));
    setLinkedList(newList);
    setInputValue('');
    setCurrentOperation('insertBeginning');
    setStats(prev => ({ ...prev, operations: prev.operations + 1 }));
    
    // Auto-play animation
    setTimeout(() => executeAnimationSteps(), 100);
  };

  const handleInsertAtEnd = async () => {
    if (!inputValue || isAnimating) return;
    
    const steps = generateAnimationSteps('insertEnd', parseInt(inputValue));
    setAnimationSteps(steps);
    
    const newList = { ...linkedList };
    linkedListOperations.insertAtEnd(newList, parseInt(inputValue));
    setLinkedList(newList);
    setInputValue('');
    setCurrentOperation('insertEnd');
    setStats(prev => ({ ...prev, operations: prev.operations + 1 }));
    
    // Auto-play animation
    setTimeout(() => executeAnimationSteps(), 100);
  };

  const handleSearch = async () => {
    if (!searchValue || isAnimating) return;
    
    const steps = generateAnimationSteps('search', parseInt(searchValue));
    setAnimationSteps(steps);
    setCurrentOperation('search');
    setSearchValue('');
    setStats(prev => ({ ...prev, comparisons: prev.comparisons + steps.filter(s => s.comparing).length }));
    
    // Auto-play animation
    setTimeout(() => executeAnimationSteps(), 100);
  };

  const handleTraverse = () => {
    if (isAnimating) return;
    
    const steps = generateAnimationSteps('traverse');
    setAnimationSteps(steps);
    setCurrentOperation('traverse');
    
    // Auto-play animation
    setTimeout(() => executeAnimationSteps(), 100);
  };

  const handleReverse = async () => {
    if (isAnimating) return;
    
    const steps = generateAnimationSteps('reverse');
    setAnimationSteps(steps);
    
    const newList = { ...linkedList };
    linkedListOperations.reverse(newList);
    setLinkedList(newList);
    setCurrentOperation('reverse');
    setStats(prev => ({ ...prev, operations: prev.operations + 1 }));
    
    // Auto-play animation
    setTimeout(() => executeAnimationSteps(), 100);
  };

  const handleReset = () => {
    handleStop();
    setLinkedList({ head: null, size: 0 });
    setCurrentOperation('none');
    setStats({ operations: 0, comparisons: 0 });
  };

  const nodes = getVisualizationArray();
  // Helper function to get explanation of operation
function getOperationExplanation(operation) {
  const explanations = {
    insertAtBeginning: 'The new node is created and its next pointer is set to the current head. Then the head pointer is updated to this new node.',
    insertAtEnd: 'Traverse the list until the last node, then set its next pointer to the new node. If the list is empty, the new node becomes the head.',
    insertAtPosition: 'Traverse to the desired position, link the new node with the next node, and update the previous node to point to the new node.',
    deleteNode: 'Find the first node with the target value, update the previous node to skip it, and free memory.',
    deleteAtPosition: 'Traverse to the position, update the previous node to skip the target node, and remove it.',
    traverse: 'Start from head and visit each node sequentially until the end of the list.',
    reverse: 'Iteratively change the next pointers of each node to point to the previous node, then update head to the last node.',
    search: 'Start from head and compare each node\'s value with the target value until found or end is reached.',
    getSize: 'Count all nodes starting from head until null is reached.',
    clear: 'Set head to null, effectively removing all nodes.'
  };
  return explanations[operation] || 'Explanation not available.';
}


  return (
    <div className="algorithm-container">
      {/* Header Section */}
      <div className="algorithm-header">
        <div className="header-content">
          <h1>Linked List Visualization</h1>
          <p className="algorithm-description">
            Interactive visualization of linked list operations including insertion, search, and traversal.
          </p>
        </div>
        
        <div className="header-stats">
          <div className="stat-card">
            <span className="stat-value">{linkedList.size}</span>
            <span className="stat-label">Nodes</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.operations}</span>
            <span className="stat-label">Operations</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.comparisons}</span>
            <span className="stat-label">Comparisons</span>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="control-panel">
        <div className="control-section">
          <h3>Insert Operations</h3>
          <div className="control-group">
            <div className="input-wrapper">
              <input
                type="number"
                placeholder="Enter value"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isAnimating}
                className="control-input"
              />
            </div>
            <button onClick={handleInsertAtBeginning} disabled={isAnimating} className="control-btn primary">
              <Plus size={16} />
              Insert Beginning
            </button>
            <button onClick={handleInsertAtEnd} disabled={isAnimating} className="control-btn primary">
              <Plus size={16} />
              Insert End
            </button>
          </div>
        </div>

        <div className="control-section">
          <h3>Search & Operations</h3>
          <div className="control-group">
            <div className="input-wrapper">
              <input
                type="number"
                placeholder="Search value"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                disabled={isAnimating}
                className="control-input"
              />
            </div>
            <button onClick={handleSearch} disabled={isAnimating} className="control-btn secondary">
              <Search size={16} />
              Search
            </button>
            <button onClick={handleTraverse} disabled={isAnimating} className="control-btn accent">
              Traverse
            </button>
            <button onClick={handleReverse} disabled={isAnimating} className="control-btn warning">
              <RotateCcw size={16} />
              Reverse
            </button>
          </div>
        </div>

        <div className="control-section">
          <h3>Animation Controls</h3>
          <div className="control-group">
            <button 
              onClick={isPaused ? handlePlay : isAnimating ? handlePause : handlePlay} 
              className={`control-btn ${isAnimating && !isPaused ? 'warning' : 'play'}`}
            >
              {isAnimating && !isPaused ? <Pause size={16} /> : <Play size={16} />}
              {isAnimating && !isPaused ? 'Pause' : isPaused ? 'Resume' : 'Play'}
            </button>
            <button onClick={handleStop} className="control-btn danger">
              Stop
            </button>
            <button onClick={handleStepBack} disabled={isAnimating || currentStepIndex === 0} className="control-btn secondary">
              <StepBack size={16} />
            </button>
            <button onClick={handleStepForward} disabled={isAnimating || currentStepIndex >= animationSteps.length - 1} className="control-btn secondary">
              <StepForward size={16} />
            </button>
          </div>
          
          <div className="speed-control">
            <label>Speed:</label>
            <input
              type="range"
              min="200"
              max="2000"
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(parseInt(e.target.value))}
              className="speed-slider"
            />
            <span>{animationSpeed}ms</span>
          </div>
        </div>

        <div className="control-section">
          <h3>Utilities</h3>
          <div className="control-group">
            <button onClick={handleReset} className="control-btn danger">
              <Trash2 size={16} />
              Reset All
            </button>
          </div>
        </div>
      </div>

      {/* Visualization Area */}
      <div className="visualization-container" ref={visualizationRef}>
        <div className="visualization-header">
          <h3>Current List Structure</h3>
          <div className="operation-status">
            {isAnimating && (
              <div className={`status-indicator ${isPaused ? 'paused' : 'animating'}`}>
                <div className="pulse-dot"></div>
                {isPaused ? 'Paused' : 'Animating...'}
              </div>
            )}
            {animationSteps.length > 0 && (
              <div className="step-info">
                Step {currentStepIndex + 1} of {animationSteps.length}
              </div>
            )}
          </div>
        </div>

        <div className="linked-list-display">
          <AnimatePresence>
            {nodes.length === 0 ? (
              <motion.div 
                className="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="empty-icon">🔗</div>
                <h4>Empty Linked List</h4>
                <p>Add some nodes to get started!</p>
              </motion.div>
            ) : (
              <div className="nodes-container">
                {nodes.map((node, index) => (
                  <LinkedListNode
                    key={node.id}
                    node={node}
                    position={index}
                    isHighlighted={highlightedNodeId === node.id}
                    isTarget={targetNodeId === node.id}
                    isVisited={visitedNodeIds.has(node.id)}
                    isAnimating={isAnimating}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Operation Info */}
        {animationSteps.length > 0 && currentStepIndex < animationSteps.length && (
          <div className="operation-info">
            <div className="step-description">
              {animationSteps[currentStepIndex]?.description}
            </div>
            <div className="step-progress">
              <div 
                className="progress-bar"
                style={{ width: `${((currentStepIndex + 1) / animationSteps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Code Implementation Section */}
      <div className="theme-card" style={{ marginTop: '2rem' }}>
        <div className="theme-card-header">
          <h3>Linked List Operations - Code Implementation</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                className={`btn ${selectedLanguage === 'java' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSelectedLanguage('java')}
                style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
              >
                Java
              </button>
              <button
                className={`btn ${selectedLanguage === 'python' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSelectedLanguage('python')}
                style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
              >
                Python
              </button>
              <button
                className={`btn ${selectedLanguage === 'cpp' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSelectedLanguage('cpp')}
                style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
              >
                C++
              </button>
            </div>
            <select
              value={selectedOperation}
              onChange={(e) => setSelectedOperation(e.target.value)}
              style={{
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid var(--accent-primary)',
                backgroundColor: 'var(--surface-bg)',
                color: 'var(--text-primary)'
              }}
            >
              <option value="insertAtBeginning">Insert at Beginning</option>
              <option value="insertAtEnd">Insert at End</option>
              <option value="insertAtPosition">Insert at Position</option>
              <option value="deleteNode">Delete Node</option>
              <option value="deleteAtPosition">Delete at Position</option>
              <option value="traverse">Traverse</option>
              <option value="reverse">Reverse</option>
              <option value="search">Search</option>
              <option value="getSize">Get Size</option>
              <option value="clear">Clear List</option>
            </select>
          </div>
        </div>
        
        <div style={{
          background: 'var(--surface-bg)',
          borderRadius: '8px',
          padding: '1.5rem',
        }}>
          <pre style={{
            margin: 0,
            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
            fontSize: '0.9rem',
            lineHeight: '1.5',
            color: 'var(--text-primary)',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}>
            <code>
              {linkedListAlgorithms[selectedOperation] && linkedListAlgorithms[selectedOperation][selectedLanguage] 
                ? linkedListAlgorithms[selectedOperation][selectedLanguage]
                : `// ${selectedOperation} implementation in ${selectedLanguage.toUpperCase()} coming soon!`
              }
            </code>
          </pre>
        </div>
        
        <div style={{ 
          marginTop: '1rem', 
          padding: '0.75rem', 
          background: 'var(--accent-warning-bg)', 
          borderRadius: '6px',
          fontSize: '0.9rem',
          color: 'var(--text-secondary)'
        }}>
          <strong>Note:</strong> This is the actual implementation code for {selectedOperation} in {selectedLanguage.toUpperCase()}. 
          You can copy and use this code in your projects.
        </div>

        {/* Operation Details */}
        <div style={{ marginTop: '1.5rem' }}>
          <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>
            {selectedOperation.charAt(0).toUpperCase() + selectedOperation.slice(1)} Details
          </h4>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginTop: '1rem'
          }}>
            <div style={{
              padding: '1rem',
              background: 'var(--theme-bg)',
              borderRadius: '6px',
              border: '1px solid var(--accent-primary)'
            }}>
              <strong style={{ color: 'var(--accent-primary)' }}>Time Complexity:</strong>
              <div style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                {getOperationComplexity(selectedOperation).time}
              </div>
            </div>
            <div style={{
              padding: '1rem',
              background: 'var(--theme-bg)',
              borderRadius: '6px',
              border: '1px solid var(--accent-primary)'
            }}>
              <strong style={{ color: 'var(--accent-primary)' }}>Space Complexity:</strong>
              <div style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                {getOperationComplexity(selectedOperation).space}
              </div>
            </div>
            <div style={{
              padding: '1rem',
              background: 'var(--theme-bg)',
              borderRadius: '6px',
              border: '1px solid var(--accent-primary)'
            }}>
              <strong style={{ color: 'var(--accent-primary)' }}>Description:</strong>
              <div style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                {getOperationDescription(selectedOperation)}
              </div>
            </div>
            {/* Explanation Section */}
<div style={{ marginTop: '1.5rem' }}>
  <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>
    Explanation
  </h4>
  <div style={{
    padding: '1rem',
    background: 'var(--theme-bg)',
    borderRadius: '6px',
    border: '1px solid var(--accent-primary)',
    color: 'var(--text-secondary)',
    lineHeight: '1.6'
  }}>
    {getOperationExplanation(selectedOperation)}
  </div>
</div>

          </div>
        </div>
      </div>
    </div>
  );

  // Helper function to get operation complexity
  function getOperationComplexity(operation) {
    const complexities = {
      insertAtBeginning: { time: 'O(1)', space: 'O(1)' },
      insertAtEnd: { time: 'O(n)', space: 'O(1)' },
      insertAtPosition: { time: 'O(n)', space: 'O(1)' },
      deleteNode: { time: 'O(n)', space: 'O(1)' },
      deleteAtPosition: { time: 'O(n)', space: 'O(1)' },
      traverse: { time: 'O(n)', space: 'O(1)' },
      reverse: { time: 'O(n)', space: 'O(1)' },
      search: { time: 'O(n)', space: 'O(1)' },
      getSize: { time: 'O(1) or O(n)', space: 'O(1)' },
      clear: { time: 'O(1) or O(n)', space: 'O(1)' }
    };
    return complexities[operation] || { time: 'N/A', space: 'N/A' };
  }

  // Helper function to get operation description
  function getOperationDescription(operation) {
    const descriptions = {
      insertAtBeginning: 'Adds a new node at the start of the list, updating the head pointer.',
      insertAtEnd: 'Traverses to the end of the list and adds a new node there.',
      insertAtPosition: 'Inserts a new node at a specific position in the list.',
      deleteNode: 'Finds and removes the first occurrence of a value from the list.',
      deleteAtPosition: 'Removes the node at a specific position in the list.',
      traverse: 'Visits every node in the list from head to tail.',
      reverse: 'Reverses the direction of all pointers in the list.',
      search: 'Looks for a specific value in the list and returns its position.',
      getSize: 'Returns the number of nodes in the list.',
      clear: 'Removes all nodes from the list and resets it to empty state.'
    };
    return descriptions[operation] || 'Operation description not available.';
  }
  
};

export default LinkedListVisualizer;