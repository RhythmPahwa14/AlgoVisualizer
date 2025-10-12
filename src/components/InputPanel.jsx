import React, { useState, useCallback } from 'react';
import { Upload, FileText, Check, AlertCircle, Download, Eye, Shuffle } from 'lucide-react';
import '../styles/InputPanel.css';

const InputPanel = ({ 
  onDataLoaded, 
  dataType = 'array', 
  placeholder = 'Enter data...', 
  acceptedFormats = ['json', 'csv', 'txt'],
  sampleData = null,
  validationRules = null,
  className = ''
}) => {
  const [inputMethod, setInputMethod] = useState('text'); // 'text' or 'file'
  const [textInput, setTextInput] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
// 🔹 Password Validation Function
  const passwordValidationRules = useCallback((password) => {
    if (typeof password !== 'string') throw new Error('Password must be a string');
    if (password.length < 8) throw new Error('Password must be at least 8 characters long');
    if (!/[A-Z]/.test(password)) throw new Error('Add at least one uppercase letter');
    if (!/[a-z]/.test(password)) throw new Error('Add at least one lowercase letter');
    if (!/[0-9]/.test(password)) throw new Error('Add at least one number');
    if (!/[!@#$%^&*]/.test(password)) throw new Error('Add at least one special character (!@#$%^&*)');
    return true;
  }, []);
  

  // Validation functions
  const validateArrayData = useCallback((data) => {
    if (!Array.isArray(data)) {
      throw new Error('Data must be an array');
    }
    if (data.length === 0) {
      throw new Error('Array cannot be empty');
    }
    if (data.length > 1000) {
      throw new Error('Array size cannot exceed 1000 elements');
    }
    // Check if all elements are numbers
    const invalidElements = data.filter(item => typeof item !== 'number' || isNaN(item));
    if (invalidElements.length > 0) {
      throw new Error('All array elements must be valid numbers');
    }
    return true;
  }, []);

  const validateGraphData = useCallback((data) => {
    if (!data || typeof data !== 'object') {
      throw new Error('Graph data must be an object');
    }
    if (!data.nodes || !Array.isArray(data.nodes)) {
      throw new Error('Graph must contain a "nodes" array');
    }
    if (!data.edges || !Array.isArray(data.edges)) {
      throw new Error('Graph must contain an "edges" array');
    }
    if (data.nodes.length === 0) {
      throw new Error('Graph must have at least one node');
    }
    if (data.nodes.length > 100) {
      throw new Error('Graph cannot have more than 100 nodes');
    }
    
    // Validate node structure
    data.nodes.forEach((node, index) => {
      if (!node.hasOwnProperty('id')) {
        throw new Error(`Node at index ${index} must have an "id" property`);
      }
      if (!node.hasOwnProperty('label')) {
        node.label = node.id.toString(); // Auto-assign label if missing
      }
    });

    // Validate edge structure
    const nodeIds = new Set(data.nodes.map(node => node.id));
    data.edges.forEach((edge, index) => {
      if (!edge.hasOwnProperty('from') || !edge.hasOwnProperty('to')) {
        throw new Error(`Edge at index ${index} must have "from" and "to" properties`);
      }
      if (!nodeIds.has(edge.from)) {
        throw new Error(`Edge at index ${index} references unknown node: ${edge.from}`);
      }
      if (!nodeIds.has(edge.to)) {
        throw new Error(`Edge at index ${index} references unknown node: ${edge.to}`);
      }
      if (!edge.hasOwnProperty('id')) {
        edge.id = `${edge.from}-${edge.to}`; // Auto-assign edge ID
      }
    });

    return true;
  }, []);

  const validateTreeData = useCallback((data) => {
    if (!data || typeof data !== 'object') {
      throw new Error('Tree data must be an object');
    }
    // Add specific tree validation logic here
    return true;
  }, []);

  const validateData = useCallback((data) => {
    setError('');
    
    try {
      // Apply custom validation rules if provided
      if (validationRules && typeof validationRules === 'function') {
        validationRules(data);
        return true;
      }

      // Default validation based on data type
      switch (dataType) {
        case 'array':
          return validateArrayData(data);
        case 'graph':
          return validateGraphData(data);
        case 'tree':
          return validateTreeData(data);
         case 'password': 
          return passwordValidationRules(data); // 🔹 Password case
        default:
          return true;
      }
    } catch (err) {
      setError(err.message);
      return false;
    }
  }, [dataType, validationRules, validateArrayData, validateGraphData, validateTreeData, passwordValidationRules]);

  const parseTextInput = useCallback((input) => {
    const trimmed = input.trim();
    if (!trimmed) {
      throw new Error('Input cannot be empty');
    }

    try {
      // Try parsing as JSON first
      return JSON.parse(trimmed);
    } catch {
      // If JSON parsing fails, try other formats based on data type
      if (dataType === 'array') {
        // Try parsing as comma-separated values
        const values = trimmed.split(',').map(val => {
          const num = parseFloat(val.trim());
          if (isNaN(num)) {
            throw new Error(`Invalid number: ${val.trim()}`);
          }
          return num;
        });
        return values;
      } else if (dataType === 'password') {
        return trimmed; // 🔹 Password treated as string
      } else {
        throw new Error('Invalid format. Please provide valid JSON or use the correct format for your data type.');
      }
    }
  }, [dataType]);

  const handleTextSubmit = useCallback(() => {
    try {
      const parsedData = parseTextInput(textInput);
      if (validateData(parsedData)) {
        onDataLoaded(parsedData);
        setSuccess('Data loaded successfully!');
        setTimeout(() => setSuccess(''), 3000);
        setTextInput('');
      }
    } catch (err) {
      setError(err.message);
    }
  }, [textInput, parseTextInput, validateData, onDataLoaded]);

  const handleFileUpload = useCallback((event) => {
    const uploadedFile = event.target.files[0];
    if (!uploadedFile) return;

    const fileExtension = uploadedFile.name.split('.').pop().toLowerCase();
    if (!acceptedFormats.includes(fileExtension)) {
      setError(`Unsupported file format. Accepted formats: ${acceptedFormats.join(', ')}`);
      return;
    }

    setFile(uploadedFile);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target.result;
        let parsedData;

        if (fileExtension === 'json') {
          parsedData = JSON.parse(content);
        } else if (fileExtension === 'csv') {
          // Basic CSV parsing for arrays
          const lines = content.split('\n').filter(line => line.trim());
          if (dataType === 'array') {
            parsedData = lines[0].split(',').map(val => parseFloat(val.trim()));
          } else {
            throw new Error('CSV format is only supported for array data');
          }
        } else {
          // Plain text - try to parse based on data type
          parsedData = parseTextInput(content);
        }

        if (validateData(parsedData)) {
          onDataLoaded(parsedData);
          setSuccess(`Data loaded successfully from ${uploadedFile.name}!`);
          setTimeout(() => setSuccess(''), 3000);
        }
      } catch (err) {
        setError(`Error reading file: ${err.message}`);
      }
    };

    reader.readAsText(uploadedFile);
  }, [acceptedFormats, dataType, parseTextInput, validateData, onDataLoaded]);

  const downloadSample = useCallback(() => {
    if (!sampleData) return;

    const dataStr = JSON.stringify(sampleData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sample-${dataType}-data.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [sampleData, dataType]);

  const loadSampleData = useCallback(() => {
    if (!sampleData) return;
    
    if (validateData(sampleData)) {
      onDataLoaded(sampleData);
      setSuccess('Sample data loaded successfully!');
      setTimeout(() => setSuccess(''), 3000);
    }
  }, [sampleData, validateData, onDataLoaded]);

  const generateRandomArray = useCallback((size = 20, min = 1, max = 100) => {
    const randomArray = Array.from({ length: size }, () => 
      Math.floor(Math.random() * (max - min + 1)) + min
    );
    return randomArray;
  }, []);

  const handleRandomize = useCallback(() => {
    if (dataType !== 'array') {
      setError('Randomize feature is currently only available for array data');
      return;
    }

    try {
      const randomData = generateRandomArray(20, 1, 100);
      if (validateData(randomData)) {
        onDataLoaded(randomData);
        setTextInput(randomData.join(', '));
        setSuccess('Random data generated successfully!');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      setError(err.message);
    }
  }, [dataType, generateRandomArray, validateData, onDataLoaded]);

  return (
    <div className={`input-panel ${className}`}>
      <div className="input-panel-header">
        <h3>Data Input</h3>
        <div className="input-method-toggle">
          <button 
            className={inputMethod === 'text' ? 'active' : ''}
            onClick={() => setInputMethod('text')}
          >
            <FileText size={16} />
            Text Input
          </button>
          <button 
            className={inputMethod === 'file' ? 'active' : ''}
            onClick={() => setInputMethod('file')}
          >
            <Upload size={16} />
            File Upload
          </button>
        </div>
      </div>

      <div className="input-panel-content">
        {inputMethod === 'text' ? (
          <div className="text-input-section">
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder={placeholder}
              className="data-input-textarea"
              rows={6}
            />
            <div className="input-actions">
              <button 
                onClick={handleTextSubmit}
                className="btn btn-primary"
                disabled={!textInput.trim()}
              >
                <Check size={16} />
                Load Data
              </button>
              {dataType === 'array' && (
                <button 
                  onClick={handleRandomize}
                  className="btn btn-secondary"
                  title="Generate random array data"
                >
                  <Shuffle size={16} />
                  Randomize
                </button>
              )}
              {sampleData && (
                <button 
                  onClick={() => setIsPreviewOpen(!isPreviewOpen)}
                  className="btn btn-secondary"
                >
                  <Eye size={16} />
                  Preview Sample
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="file-input-section">
            <div className="file-upload-area">
              <input
                type="file"
                id="file-input"
                accept={acceptedFormats.map(format => `.${format}`).join(',')}
                onChange={handleFileUpload}
                className="file-input-hidden"
              />
              <label htmlFor="file-input" className="file-upload-label">
                <Upload size={24} />
                <span>Choose a file or drag & drop</span>
                <small>Supported formats: {acceptedFormats.join(', ')}</small>
              </label>
              {file && (
                <div className="file-info">
                  <FileText size={16} />
                  <span>{file.name}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Sample Data Section */}
        {sampleData && (
          <div className="sample-data-section">
            <div className="sample-data-header">
              <h4>Sample Data</h4>
              <div className="sample-actions">
                <button onClick={loadSampleData} className="btn btn-outline btn-purple">
  Load Sample
</button>

                <button onClick={downloadSample} className="btn btn-outline">
                  <Download size={16} />
                  Download
                </button>
              </div>
            </div>
            {isPreviewOpen && (
              <div className="sample-preview">
                <pre>{JSON.stringify(sampleData, null, 2)}</pre>
              </div>
            )}
          </div>
        )}

        {/* Status Messages */}
        {error && (
          <div className="status-message error">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="status-message success">
            <Check size={16} />
            <span>{success}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputPanel;
