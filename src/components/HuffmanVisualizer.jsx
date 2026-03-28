import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';
import '../styles/global-theme.css';

const HuffmanVisualizer = () => {
  const [inputText, setInputText] = useState('vtezrucdgang');
  const [frequency, setFrequency] = useState({});
  const [huffmanTree, setHuffmanTree] = useState(null);
  const [encodingTable, setEncodingTable] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [mode, setMode] = useState('build'); // 'build', 'encode', 'decode'
  const [decodeInput, setDecodeInput] = useState('');
  const [decodedText, setDecodedText] = useState('');
  const [steps, setSteps] = useState([]);

  const [asciiTree, setAsciiTree] = useState('');



  // Calculate frequency from input text
  useEffect(() => {
    const freq = {};
    for (let char of inputText) {
      freq[char] = (freq[char] || 0) + 1;
    }
    setFrequency(freq);
  }, [inputText]);

  // Build Huffman Tree with proper validation
  const buildHuffmanTree = (freq) => {
    console.log('Building Huffman tree with frequencies:', freq);

    const nodes = Object.entries(freq).map(([char, f]) => ({
      char,
      freq: f,
      left: null,
      right: null
    }));

    console.log('Initial nodes:', nodes);

    const stepsArr = [];
    const priorityQueue = [...nodes];

    let stepCount = 0;
    while (priorityQueue.length > 1) {
      // Sort by frequency (ascending)
      priorityQueue.sort((a, b) => a.freq - b.freq);

      console.log(`Step ${stepCount + 1} - Queue before merge:`, priorityQueue.map(n => ({ char: n.char, freq: n.freq })));

      const left = priorityQueue.shift();
      const right = priorityQueue.shift();

      console.log(`Merging: ${left.char || 'node'}(${left.freq}) + ${right.char || 'node'}(${right.freq}) = ${left.freq + right.freq}`);

      const merged = {
        char: null,
        freq: left.freq + right.freq,
        left,
        right
      };

      priorityQueue.push(merged);
      stepsArr.push({
        type: 'merge',
        merged: {
          left: left.char || 'node',
          right: right.char || 'node'
        }
      });

      stepCount++;
      console.log(`Step ${stepCount} - Queue after merge:`, priorityQueue.map(n => ({ char: n.char, freq: n.freq })));
    }

    const finalTree = priorityQueue[0];
    console.log('Final Huffman tree:', finalTree);

    // Validate tree structure
    const validateTree = (node, path = '') => {
      if (!node) return;

      if (node.char) {
        console.log(`Leaf node: '${node.char}' with frequency ${node.freq} at path ${path}`);
      } else {
        console.log(`Internal node: frequency ${node.freq} at path ${path}`);
      }

      if (node.left) validateTree(node.left, path + '0');
      if (node.right) validateTree(node.right, path + '1');
    };

    console.log('Tree validation:');
    validateTree(finalTree);

    setSteps(stepsArr);
    setHuffmanTree(finalTree);
    return finalTree;
  };

  // Print tree in ASCII
  const printTree = (node, prefix = '', isLeft = true) => {
    if (!node) return '';

    let result = '';

    if (node.right) {
      result += printTree(node.right, prefix + (isLeft ? '│   ' : '    '), false);
    }

    result += prefix + (isLeft ? '└── ' : '┌── ') + (node.char ? `'${node.char}'(${node.freq})` : `(${node.freq})`) + '\n';

    if (node.left) {
      result += printTree(node.left, prefix + (isLeft ? '    ' : '│   '), true);
    }

    return result;
  };

  // Generate encoding table
  const generateEncodingTable = (node, code = '', table = {}) => {
    if (!node) return table;

    if (node.char !== null && node.char !== undefined) {
      table[node.char] = code || '0'; // Root node with single character
      return table;
    }

    if (node.left) generateEncodingTable(node.left, code + '0', table);
    if (node.right) generateEncodingTable(node.right, code + '1', table);
    return table;
  };

  // Encode text
  const encodeText = (text, table) => {
    const encoded = text.split('').map(char => {
      if (table[char] === undefined) {
        console.warn(`Character '${char}' not found in encoding table`);
        return '?'; // Placeholder for unknown characters
      }
      return table[char];
    }).join('');
    return encoded;
  };

  // Decode text
  const decodeText = (encoded, tree) => {
    let result = '';
    let current = tree;

    for (let bit of encoded) {
      if (bit !== '0' && bit !== '1') {
        console.warn(`Invalid bit '${bit}' in encoded string`);
        continue;
      }

      if (bit === '0') {
        current = current.left;
      } else {
        current = current.right;
      }

      if (!current) {
        console.warn('Invalid path in Huffman tree');
        return result; // Return what we have so far
      }

      if (current.char) {
        result += current.char;
        current = tree; // Reset to root
      }
    }

    // Check if we ended at a leaf node
    if (current && current.char) {
      result += current.char;
    }

    return result;
  };

  // Start building tree
  const startBuild = () => {
    if (Object.keys(frequency).length === 0) return;
    console.log('Building tree for frequency:', frequency);
    setMode('build');
    setCurrentStep(0);
    setIsPlaying(true);

    const tree = buildHuffmanTree(frequency);
    setAsciiTree(printTree(tree));
  };

  // Start encoding
  const startEncode = () => {
    if (!huffmanTree) {
      console.log('No tree to encode with');
      return;
    }
    console.log('Starting encoding with tree:', huffmanTree);
    setMode('encode');
    const table = generateEncodingTable(huffmanTree);
    console.log('Encoding table:', table);
    setEncodingTable(table);
    const encoded = encodeText(inputText, table);
    console.log('Encoded text:', encoded);
    setSteps([{ type: 'encode', encoded, table }]);
    setCurrentStep(0);
  };

  // Start decoding
  const startDecode = () => {
    if (!huffmanTree) {
      console.log('No tree to decode with');
      return;
    }
    if (!decodeInput) {
      console.log('No input to decode');
      return;
    }
    console.log('Starting decoding:', decodeInput);
    setMode('decode');
    const decoded = decodeText(decodeInput, huffmanTree);
    console.log('Decoded text:', decoded);
    setDecodedText(decoded);
  };

  // Animation loop
  useEffect(() => {
    if (isPlaying && steps.length > 0) {
      const timer = setTimeout(() => {
        if (currentStep < steps.length - 1) {
          setCurrentStep(prev => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, currentStep, steps, speed]);



  return (
    <div className="huffman-visualizer" style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Huffman Coding Visualizer</h2>

      {/* Input Section */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px' }}>Input Text:</label>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid var(--theme-border)',
            background: 'var(--surface-bg)',
            color: 'var(--text-primary)'
          }}
        />
      </div>

      {/* Frequency Table */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Frequency Table</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {Object.entries(frequency).map(([char, freq]) => (
            <div key={char} style={{
              padding: '8px 12px',
              background: 'var(--surface-bg)',
              borderRadius: '4px',
              border: '1px solid var(--theme-border)'
            }}>
              '{char}': {freq}
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
        <button
          onClick={startBuild}
          className="btn btn-primary"
          disabled={isPlaying}
        >
          Build Tree
        </button>
        <button
          onClick={startEncode}
          className="btn btn-secondary"
          disabled={!huffmanTree}
        >
          Encode
        </button>
        <button
          onClick={() => setMode('decode')}
          className="btn btn-secondary"
        >
          Decode Mode
        </button>

        {mode === 'build' && steps.length > 0 && (
          <>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="btn btn-secondary"
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            </button>
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              className="btn btn-secondary"
              disabled={currentStep === 0}
            >
              <SkipBack size={14} />
            </button>
            <button
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              className="btn btn-secondary"
              disabled={currentStep === steps.length - 1}
            >
              <SkipForward size={14} />
            </button>
          </>
        )}

        <select
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid var(--theme-border)',
            background: 'var(--surface-bg)',
            color: 'var(--text-primary)'
          }}
        >
          <option value={2000}>Slow</option>
          <option value={1000}>Medium</option>
          <option value={500}>Fast</option>
        </select>

        <button
          onClick={() => {
            setSteps([]);
            setCurrentStep(0);
            setIsPlaying(false);
            setHuffmanTree(null);
            setEncodingTable({});
            setDecodedText('');
            setAsciiTree('');
          }}
          className="btn btn-secondary"
        >
          <RotateCcw size={14} /> Reset
        </button>
      </div>



      {/* ASCII Tree */}
      {asciiTree && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Tree Structure (ASCII)</h3>
          <pre style={{
            padding: '12px',
            background: 'var(--surface-bg)',
            borderRadius: '4px',
            border: '1px solid var(--theme-border)',
            fontFamily: 'monospace',
            whiteSpace: 'pre-wrap',
            overflowX: 'auto'
          }}>
            {asciiTree}
          </pre>
        </div>
      )}

      {/* Encoding Table */}
      {Object.keys(encodingTable).length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Encoding Table</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {Object.entries(encodingTable).map(([char, code]) => (
              <div key={char} style={{
                padding: '8px 12px',
                background: 'var(--surface-bg)',
                borderRadius: '4px',
                border: '1px solid var(--theme-border)'
              }}>
                '{char}' → {code}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Encoded Text */}
      {mode === 'encode' && steps.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Encoded Text</h3>
          <div style={{
            padding: '12px',
            background: 'var(--surface-bg)',
            borderRadius: '4px',
            border: '1px solid var(--theme-border)',
            fontFamily: 'monospace',
            wordBreak: 'break-all'
          }}>
            {steps[0].encoded}
          </div>
        </div>
      )}

      {/* Decode Mode */}
      {mode === 'decode' && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Decode Mode</h3>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Enter encoded bitstring"
              value={decodeInput}
              onChange={(e) => setDecodeInput(e.target.value)}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid var(--theme-border)',
                background: 'var(--surface-bg)',
                color: 'var(--text-primary)',
                fontFamily: 'monospace'
              }}
            />
            <button
              onClick={startDecode}
              className="btn btn-primary"
            >
              Decode
            </button>
          </div>
          {decodedText && (
            <div style={{
              padding: '12px',
              background: 'var(--surface-bg)',
              borderRadius: '4px',
              border: '1px solid var(--theme-border)'
            }}>
              <strong>Decoded Text:</strong> {decodedText}
            </div>
          )}
        </div>
      )}

      {/* Step Information */}
      {steps.length > 0 && mode === 'build' && (
        <div style={{
          padding: '12px',
          background: 'var(--accent-warning-bg)',
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          Step {currentStep + 1} of {steps.length}: {
            steps[currentStep]?.merged ?
              `Merged ${steps[currentStep].merged.left} and ${steps[currentStep].merged.right}` :
              'Tree construction complete'
          }
        </div>
      )}
    </div>
  );
};

export default HuffmanVisualizer;
