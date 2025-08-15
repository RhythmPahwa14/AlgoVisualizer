import React, { useState, useEffect, useRef } from 'react';
import CodeExplanation from '../components/CodeExplanation';
import SimpleExportControls from '../components/SimpleExportControls';
import '../styles/pages.css';

const Sorting = () => {
    const [array, setArray] = useState([]);
    const [colorArray, setColorArray] = useState([]);
    const [message, setMessage] = useState('Ready to sort!');
    const [delay, setDelay] = useState(100);
    const [algorithm, setAlgorithm] = useState('bubbleSort');
    const [isSorting, setIsSorting] = useState(false);
    const [arraySize, setArraySize] = useState(20);
    const [statistics, setStatistics] = useState({ comparisons: 0, swaps: 0, time: 0 });
    const [startTime, setStartTime] = useState(null);
    const stopSortingRef = useRef(false);
    const [showCodeExplanation, setShowCodeExplanation] = useState(false);

    useEffect(() => {
        const generateNewArray = () => {
            const randomArray = Array.from({ length: arraySize }, () =>
                Math.floor(Math.random() * 300) + 10
            );
            setArray(randomArray);
            setColorArray(new Array(arraySize).fill('#66ccff'));
            setMessage('New array generated. Ready to sort!');
            setIsSorting(false);
        };
        generateNewArray();
    }, [arraySize]);

    const generateArray = () => {
        const randomArray = Array.from({ length: arraySize }, () =>
            Math.floor(Math.random() * 300) + 10
        );
        setArray(randomArray);
        setColorArray(new Array(arraySize).fill('#66ccff'));
        setMessage('New array generated. Ready to sort!');
        setIsSorting(false);
    };

    const handleSort = async () => {
        setIsSorting(true);
        stopSortingRef.current = false;
        setStatistics({ comparisons: 0, swaps: 0, time: 0 });
        setStartTime(Date.now());
        setMessage(`Sorting with ${getAlgorithmName()} algorithm...`);

        let result = -1;
        try {
            switch (algorithm) {
                case 'selectionSort':
                    result = await selectionSortWithStop(array, setArray, setColorArray, delay, stopSortingRef, setStatistics);
                    break;
                case 'mergeSort':
                    result = await mergeSortWithStop(array, setArray, setColorArray, delay, stopSortingRef, setStatistics);
                    break;
                case 'insertionSort':
                    result = await insertionSortWithStop(array, setArray, setColorArray, delay, stopSortingRef, setStatistics);
                    break;
                case 'quickSort':
                    result = await quickSortWithStop(array, setArray, setColorArray, delay, stopSortingRef, setStatistics);
                    break;
                default:
                    result = await bubbleSortWithStop(array, setArray, setColorArray, delay, stopSortingRef, setStatistics);
                    break;
            }

            const endTime = Date.now();
            const timeTaken = endTime - startTime;
            setStatistics(prev => ({ ...prev, time: timeTaken }));

            if (stopSortingRef.current) {
                setMessage('❌ Sorting was stopped');
                setColorArray(new Array(arraySize).fill('#66ccff'));
            } else if (result === -1) {
                setMessage('Sorting failed or was interrupted');
            } else {
                setMessage(`🎉 Sorting completed in ${timeTaken}ms!`);
                setColorArray(new Array(arraySize).fill('#4ade80'));
            }
        } catch (error) {
            setMessage('❌ Sorting was stopped');
            setColorArray(new Array(arraySize).fill('#66ccff'));
        }
        setIsSorting(false);
    };

    const handleStop = () => {
        stopSortingRef.current = true;
        setIsSorting(false);
        setMessage('🛑 Stopping sorting...');
        setColorArray(new Array(arraySize).fill('#66ccff'));
    };

    const getAlgorithmName = () => {
        const names = {
            'bubbleSort': 'Bubble Sort',
            'selectionSort': 'Selection Sort',
            'mergeSort': 'Merge Sort',
            'insertionSort': 'Insertion Sort',
            'quickSort': 'Quick Sort'
        };
        return names[algorithm];
    };

    const getAlgorithmInfo = () => {
        const info = {
            'bubbleSort': {
                description: 'Compares adjacent elements and swaps them if they are in wrong order.',
                timeComplexity: 'O(n²)',
                spaceComplexity: 'O(1)',
                bestCase: 'O(n)',
                stable: 'Yes'
            },
            'selectionSort': {
                description: 'Finds the minimum element and places it at the beginning.',
                timeComplexity: 'O(n²)',
                spaceComplexity: 'O(1)',
                bestCase: 'O(n²)',
                stable: 'No'
            },
            'mergeSort': {
                description: 'Divides array into halves, sorts them and merges back.',
                timeComplexity: 'O(n log n)',
                spaceComplexity: 'O(n)',
                bestCase: 'O(n log n)',
                stable: 'Yes'
            },
            'insertionSort': {
                description: 'Builds sorted array one element at a time.',
                timeComplexity: 'O(n²)',
                spaceComplexity: 'O(1)',
                bestCase: 'O(n)',
                stable: 'Yes'
            },
            'quickSort': {
                description: 'Selects a pivot and partitions the array into two halves, then sorts them.',
                timeComplexity: 'O(n log n)',
                spaceComplexity: 'O(log n)',
                bestCase: 'O(n log n)',
                stable: 'No'
            }
        };
        return info[algorithm];
    };

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const bubbleSortWithStop = async (arr, setArray, setColorArray, delay, stopRef, setStats) => {
        const newArray = [...arr];
        const n = newArray.length;
        let comparisons = 0, swaps = 0;

        for (let i = 0; i < n - 1; i++) {
            if (stopRef.current) throw new Error('Stopped');

            for (let j = 0; j < n - i - 1; j++) {
                if (stopRef.current) throw new Error('Stopped');

                comparisons++;

                const colors = new Array(n).fill('#66ccff');
                colors[j] = '#ff6b6b';
                colors[j + 1] = '#ff6b6b';
                setColorArray([...colors]);

                await sleep(delay);

                if (newArray[j] > newArray[j + 1]) {
                    [newArray[j], newArray[j + 1]] = [newArray[j + 1], newArray[j]];
                    swaps++;
                    setArray([...newArray]);

                    colors[j] = '#ffd93d';
                    colors[j + 1] = '#ffd93d';
                    setColorArray([...colors]);

                    await sleep(delay);
                }

                setStats({ comparisons, swaps, time: 0 });
            }

            const colors = new Array(n).fill('#66ccff');
            for (let k = n - i - 1; k < n; k++) {
                colors[k] = '#4ade80';
            }
            setColorArray([...colors]);
        }

        setColorArray(new Array(n).fill('#4ade80'));
        return 0;
    };

    const selectionSortWithStop = async (arr, setArray, setColorArray, delay, stopRef, setStats) => {
        const newArray = [...arr];
        const n = newArray.length;
        let comparisons = 0, swaps = 0;

        for (let i = 0; i < n - 1; i++) {
            if (stopRef.current) throw new Error('Stopped');

            let minIdx = i;

            const colors = new Array(n).fill('#66ccff');
            colors[i] = '#ffd93d';
            setColorArray([...colors]);

            for (let j = i + 1; j < n; j++) {
                if (stopRef.current) throw new Error('Stopped');

                comparisons++;

                colors[j] = '#ff6b6b';
                setColorArray([...colors]);

                await sleep(delay);

                if (newArray[j] < newArray[minIdx]) {
                    if (minIdx !== i) colors[minIdx] = '#66ccff';
                    minIdx = j;
                    colors[minIdx] = '#4da6ff';
                } else {
                    colors[j] = '#66ccff';
                }
                setColorArray([...colors]);
                setStats({ comparisons, swaps, time: 0 });
            }

            if (minIdx !== i) {
                [newArray[i], newArray[minIdx]] = [newArray[minIdx], newArray[i]];
                swaps++;
                setArray([...newArray]);
                await sleep(delay);
            }

            for (let k = 0; k <= i; k++) {
                colors[k] = '#4ade80';
            }
            setColorArray([...colors]);
            setStats({ comparisons, swaps, time: 0 });
        }

        setColorArray(new Array(n).fill('#4ade80'));
        return 0;
    };

    const insertionSortWithStop = async (arr, setArray, setColorArray, delay, stopRef, setStats) => {
        const newArray = [...arr];
        const n = newArray.length;
        let comparisons = 0, swaps = 0;

        for (let i = 1; i < n; i++) {
            if (stopRef.current) throw new Error('Stopped');

            const key = newArray[i];
            let j = i - 1;

            const colors = new Array(n).fill('#66ccff');
            colors[i] = '#ffd93d';
            setColorArray([...colors]);
            await sleep(delay);

            while (j >= 0 && newArray[j] > key) {
                if (stopRef.current) throw new Error('Stopped');

                comparisons++;
                colors[j] = '#ff6b6b';
                colors[j + 1] = '#ff6b6b';
                setColorArray([...colors]);

                newArray[j + 1] = newArray[j];
                swaps++;
                setArray([...newArray]);
                await sleep(delay);
                setStats({ comparisons, swaps, time: 0 });

                j--;
            }

            newArray[j + 1] = key;
            setArray([...newArray]);

            for (let k = 0; k <= i; k++) {
                colors[k] = '#4ade80';
            }
            setColorArray([...colors]);
            await sleep(delay);
        }

        setColorArray(new Array(n).fill('#4ade80'));
        return 0;
    };

    const mergeSortWithStop = async (arr, setArray, setColorArray, delay, stopRef, setStats) => {
        const newArray = [...arr];
        let comparisons = 0, swaps = 0;

        const merge = async (left, mid, right) => {
            if (stopRef.current) throw new Error('Stopped');

            const leftArr = newArray.slice(left, mid + 1);
            const rightArr = newArray.slice(mid + 1, right + 1);

            let i = 0, j = 0, k = left;

            while (i < leftArr.length && j < rightArr.length) {
                if (stopRef.current) throw new Error('Stopped');

                comparisons++;
                const colors = new Array(newArray.length).fill('#66ccff');
                colors[k] = '#ffd93d';
                setColorArray([...colors]);

                if (leftArr[i] <= rightArr[j]) {
                    newArray[k] = leftArr[i];
                    i++;
                } else {
                    newArray[k] = rightArr[j];
                    j++;
                }

                swaps++;
                setArray([...newArray]);
                setStats({ comparisons, swaps, time: 0 });
                await sleep(delay);
                k++;
            }

            while (i < leftArr.length) {
                if (stopRef.current) throw new Error('Stopped');
                newArray[k] = leftArr[i];
                swaps++;
                setArray([...newArray]);
                await sleep(delay);
                i++;
                k++;
            }

            while (j < rightArr.length) {
                if (stopRef.current) throw new Error('Stopped');
                newArray[k] = rightArr[j];
                swaps++;
                setArray([...newArray]);
                await sleep(delay);
                j++;
                k++;
            }
        };

        const mergeSortHelper = async (left, right) => {
            if (left < right) {
                if (stopRef.current) throw new Error('Stopped');

                const mid = Math.floor((left + right) / 2);
                await mergeSortHelper(left, mid);
                await mergeSortHelper(mid + 1, right);
                await merge(left, mid, right);
            }
        };

        await mergeSortHelper(0, newArray.length - 1);
        setColorArray(new Array(newArray.length).fill('#4ade80'));
        return 0;
    };

    const quickSortWithStop = async (arr, setArray, setColorArray, delay, stopRef, setStats) => {
        const newArray = [...arr];
        const n = newArray.length;
        let comparisons = 0, swaps = 0;

        async function partition(low, high) {
            let pivot = newArray[high];
            let i = low - 1;
            for (let j = low; j < high; j++) {
                if (stopRef.current) throw new Error('Stopped');
                comparisons++;
                const colors = new Array(n).fill('#66ccff');
                colors[j] = '#ff6b6b';
                colors[high] = '#ffd93d';
                setColorArray([...colors]);
                await sleep(delay);

                if (newArray[j] < pivot) {
                    i++;
                    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
                    swaps++;
                    setArray([...newArray]);
                    colors[i] = '#ffd93d';
                    colors[j] = '#ffd93d';
                    setColorArray([...colors]);
                    await sleep(delay);
                }
                setStats({ comparisons, swaps, time: 0 });
            }
            [newArray[i + 1], newArray[high]] = [newArray[high], newArray[i + 1]];
            swaps++;
            setArray([...newArray]);
            const colors = new Array(n).fill('#66ccff');
            colors[i + 1] = '#4ade80';
            colors[high] = '#4ade80';
            setColorArray([...colors]);
            await sleep(delay);
            setStats({ comparisons, swaps, time: 0 });
            return i + 1;
        }

        async function quickSortHelper(low, high) {
            if (low < high) {
                if (stopRef.current) throw new Error('Stopped');
                let pi = await partition(low, high);
                await quickSortHelper(low, pi - 1);
                await quickSortHelper(pi + 1, high);
            }
        }

        await quickSortHelper(0, n - 1);
        setColorArray(new Array(n).fill('#4ade80'));
        return 0;
    };

    const ALGORITHM_PSEUDOCODE = {
        bubbleSort: [
            { code: 'for i from 0 to n-1', explain: 'Repeat for each element in the array.' },
            { code: '  for j from 0 to n-i-2', explain: 'Compare each pair of adjacent elements.' },
            { code: '    if arr[j] > arr[j+1]', explain: 'Check if the current number is greater than the next number.' },
            { code: '      swap arr[j] and arr[j+1]', explain: 'Swap them if they are in the wrong order.' }
        ],
        selectionSort: [
            { code: 'for i from 0 to n-1', explain: 'Repeat for each element in the array.' },
            { code: '  minIdx = i', explain: 'Assume the current position is the minimum.' },
            { code: '  for j from i+1 to n-1', explain: 'Check the rest of the array.' },
            { code: '    if arr[j] < arr[minIdx]', explain: 'If a smaller value is found, update minIdx.' },
            { code: '  swap arr[i] and arr[minIdx]', explain: 'Swap the smallest found with the current position.' }
        ],
        insertionSort: [
            { code: 'for i from 1 to n-1', explain: 'Start from the second element.' },
            { code: '  key = arr[i]', explain: 'Store the current value.' },
            { code: '  j = i - 1', explain: 'Start comparing with previous elements.' },
            { code: '  while j >= 0 and arr[j] > key', explain: 'Move elements greater than key one position ahead.' },
            { code: '    arr[j+1] = arr[j]', explain: 'Shift the element right.' },
            { code: '    j = j - 1', explain: 'Move to the previous element.' },
            { code: '  arr[j+1] = key', explain: 'Insert the key at the correct position.' }
        ],
        mergeSort: [
            { code: 'if left < right', explain: 'If the array has more than one element.' },
            { code: '  mid = (left + right) / 2', explain: 'Find the middle point.' },
            { code: '  mergeSort(left, mid)', explain: 'Sort the first half.' },
            { code: '  mergeSort(mid+1, right)', explain: 'Sort the second half.' },
            { code: '  merge(left, mid, right)', explain: 'Merge the sorted halves.' }
        ],
        quickSort: [
            { code: 'if low < high', explain: 'If the array has more than one element.' },
            { code: '  pivot = arr[high]', explain: 'Select the rightmost element as pivot.' },
            { code: '  partition(low, high)', explain: 'Rearrange elements around the pivot.' },
            { code: '  quickSort(low, pi - 1)', explain: 'Recursively sort the left part.' },
            { code: '  quickSort(pi + 1, high)', explain: 'Recursively sort the right part.' }
        ]
    };

    function getStepsForBubbleSort(arr) {
        const steps = [];
        const n = arr.length;
        let a = [...arr];
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                steps.push({
                    type: 'compare',
                    indices: [j, j + 1],
                    array: [...a],
                    pseudoLine: 2
                });
                if (a[j] > a[j + 1]) {
                    [a[j], a[j + 1]] = [a[j + 1], a[j]];
                    steps.push({
                        type: 'swap',
                        indices: [j, j + 1],
                        array: [...a],
                        pseudoLine: 3
                    });
                }
            }
        }
        steps.push({
            type: 'done',
            indices: [],
            array: [...a],
            pseudoLine: null
        });
        return steps;
    }

    function getStepsForSelectionSort(arr) {
        const steps = [];
        const n = arr.length;
        let a = [...arr];
        for (let i = 0; i < n - 1; i++) {
            let minIdx = i;
            steps.push({ type: 'select', indices: [i], array: [...a], pseudoLine: 1 });
            for (let j = i + 1; j < n; j++) {
                steps.push({ type: 'compare', indices: [minIdx, j], array: [...a], pseudoLine: 3 });
                if (a[j] < a[minIdx]) {
                    minIdx = j;
                    steps.push({ type: 'newMin', indices: [minIdx], array: [...a], pseudoLine: 4 });
                }
            }
            if (minIdx !== i) {
                [a[i], a[minIdx]] = [a[minIdx], a[i]];
                steps.push({ type: 'swap', indices: [i, minIdx], array: [...a], pseudoLine: 5 });
            }
        }
        steps.push({ type: 'done', indices: [], array: [...a], pseudoLine: null });
        return steps;
    }

    function getStepsForInsertionSort(arr) {
        const steps = [];
        const n = arr.length;
        let a = [...arr];
        for (let i = 1; i < n; i++) {
            let key = a[i];
            let j = i - 1;
            steps.push({ type: 'select', indices: [i], array: [...a], pseudoLine: 1 });
            while (j >= 0 && a[j] > key) {
                steps.push({ type: 'compare', indices: [j, j + 1], array: [...a], pseudoLine: 3 });
                a[j + 1] = a[j];
                steps.push({ type: 'shift', indices: [j, j + 1], array: [...a], pseudoLine: 4 });
                j--;
            }
            a[j + 1] = key;
            steps.push({ type: 'insert', indices: [j + 1], array: [...a], pseudoLine: 6 });
        }
        steps.push({ type: 'done', indices: [], array: [...a], pseudoLine: null });
        return steps;
    }

    function getStepsForMergeSort(arr) {
        const steps = [];
        let a = [...arr];
        function mergeSortHelper(left, right) {
            if (left < right) {
                steps.push({ type: 'call', indices: [left, right], array: [...a], pseudoLine: 0 });
                const mid = Math.floor((left + right) / 2);
                steps.push({ type: 'mid', indices: [mid], array: [...a], pseudoLine: 1 });
                mergeSortHelper(left, mid);
                mergeSortHelper(mid + 1, right);
                merge(left, mid, right);
            }
        }
        function merge(left, mid, right) {
            let leftArr = a.slice(left, mid + 1);
            let rightArr = a.slice(mid + 1, right + 1);
            let i = 0, j = 0, k = left;
            while (i < leftArr.length && j < rightArr.length) {
                steps.push({ type: 'compare', indices: [k], array: [...a], pseudoLine: 4 });
                if (leftArr[i] <= rightArr[j]) {
                    a[k] = leftArr[i];
                    i++;
                } else {
                    a[k] = rightArr[j];
                    j++;
                }
                steps.push({ type: 'merge', indices: [k], array: [...a], pseudoLine: 4 });
                k++;
            }
            while (i < leftArr.length) {
                a[k] = leftArr[i];
                steps.push({ type: 'merge', indices: [k], array: [...a], pseudoLine: 4 });
                i++; k++;
            }
            while (j < rightArr.length) {
                a[k] = rightArr[j];
                steps.push({ type: 'merge', indices: [k], array: [...a], pseudoLine: 4 });
                j++; k++;
            }
        }
        mergeSortHelper(0, a.length - 1);
        steps.push({ type: 'done', indices: [], array: [...a], pseudoLine: null });
        return steps;
    }

    function getStepsForQuickSort(arr) {
        const steps = [];
        let a = [...arr];
        function quickSortHelper(low, high) {
            if (low < high) {
                steps.push({ type: 'call', indices: [low, high], array: [...a], pseudoLine: 0 });
                let pivot = a[high];
                let i = low - 1;
                for (let j = low; j < high; j++) {
                    steps.push({ type: 'compare', indices: [j, high], array: [...a], pseudoLine: 2 });
                    if (a[j] < pivot) {
                        i++;
                        [a[i], a[j]] = [a[j], a[i]];
                        steps.push({ type: 'swap', indices: [i, j], array: [...a], pseudoLine: 3 });
                    }
                }
                steps.push({ type: 'pivot', indices: [i + 1, high], array: [...a], pseudoLine: 4 });
                [a[i + 1], a[high]] = [a[high], a[i + 1]];
                quickSortHelper(low, i);
                quickSortHelper(i + 2, high);
            }
        }
        quickSortHelper(0, a.length - 1);
        steps.push({ type: 'done', indices: [], array: [...a], pseudoLine: null });
        return steps;
    }

    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        let newSteps = [];
        if (algorithm === 'bubbleSort') newSteps = getStepsForBubbleSort(array);
        else if (algorithm === 'selectionSort') newSteps = getStepsForSelectionSort(array);
        else if (algorithm === 'insertionSort') newSteps = getStepsForInsertionSort(array);
        else if (algorithm === 'mergeSort') newSteps = getStepsForMergeSort(array);
        else if (algorithm === 'quickSort') newSteps = getStepsForQuickSort(array);
        setSteps(newSteps);
        setCurrentStep(0);
    }, [array, algorithm, arraySize]);

    const handleNextStep = () => {
        if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    };
    const handlePrevStep = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    const getStepColorArray = () => {
        if (!steps[currentStep]) return colorArray;
        const step = steps[currentStep];
        const n = array.length;
        let colors = new Array(n).fill('#66ccff');
        if (step.type === 'compare' || step.type === 'swap' || step.type === 'shift') {
            step.indices.forEach(idx => colors[idx] = '#ff6b6b');
        }
        if (step.type === 'select' || step.type === 'insert' || step.type === 'newMin') {
            step.indices.forEach(idx => colors[idx] = '#ffd93d');
        }
        if (step.type === 'merge') {
            step.indices.forEach(idx => colors[idx] = '#4da6ff');
        }
        if (step.type === 'done') {
            colors = new Array(n).fill('#4ade80');
        }
        return colors;
    };

const isMobile = window.innerWidth < 800;
const isTabletOrBelow = window.innerWidth < 1024;

return (
    <div className="page-container" style={{ maxWidth: '1500px', margin: '0 auto', padding: '20px' }}>
        <h1 className="page-title" style={{ textAlign: 'center', marginBottom: '30px' }}>
            Sorting Algorithms Visualizer
        </h1>

        {/* --- Step Navigation and Algorithm Panel Layout --- */}
        <div style={{
            display: 'flex',
             flexDirection: isTabletOrBelow ? 'column' : 'row',
            flexWrap: 'wrap',
            gap: '30px',
            alignItems: 'flex-start',
            marginBottom: '30px'
        }}>
            {/* Visualization + Step Controls */}
            <div style={{
                 flex: '1 1 auto',
                 minWidth: '300px',
                 maxWidth: '100%',
                 overflowX: 'hidden'
            }}>
                {/* --- Step Navigation Buttons --- */}
                <div style={{
                    display: 'flex',
                    gap: '10px',
                    marginBottom: '10px',
                    justifyContent: isMobile ? 'center' : 'flex-start'
                }}>
                    <button className="btn btn-secondary"
                        onClick={handlePrevStep}
                        disabled={currentStep === 0}
                        style={{ minWidth: '110px' }}>
                        ⬅️ Previous Step
                    </button>
                    <button className="btn btn-secondary"
                        onClick={handleNextStep}
                        disabled={currentStep >= steps.length - 1}
                        style={{ minWidth: '110px' }}>
                        Next Step ➡️
                    </button>
                    <span style={{
                        color: '#66ccff',
                        fontWeight: 600,
                        marginLeft: '15px',
                        fontSize: '14px'
                    }}>
                        Step {currentStep + 1} / {steps.length}
                    </span>
                </div>

                {/* --- Visualization Area (step-by-step) --- */}
                <div className="visualization-area" style={{
                     minHeight: '500px',
            padding: '20px',
            background: 'rgba(15, 52, 96, 0.1)',
            borderRadius: '15px',
            border: '1px solid rgba(102, 204, 255, 0.2)',
            margin: '20px 0'
                }}>
                    <div style={{
                         display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
                height: '400px',
                gap: arraySize > 40 ? (isTabletOrBelow ? '0.5px' : '1px') : arraySize > 25 ? '2px' : '3px',
                padding: '20px 10px 50px 10px',
                position: 'relative',
                flexWrap: 'nowrap'
                    }}>
                        {(steps[currentStep]?.array || array).map((num, idx) => {
                            const maxBarWidth = isTabletOrBelow ? 8 : 12; // shrink bars more on smaller screens
                            const barWidth = Math.max(4, Math.min(maxBarWidth, 350 / arraySize));
                            const showNumbers = arraySize <= 25;
                            const showIndices = arraySize <= 15;
                            const stepColors = getStepColorArray();
                            return (
                                <div
                                    key={idx}
                                    style={{
                                        height: `${Math.max(20, num)}px`,
                                       width: `${barWidth}px`,
                                        backgroundColor: getStepColorArray()[idx],
                                       border: `1px solid ${getStepColorArray()[idx]}`,
                                        borderRadius: '6px 6px 0 0',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        fontWeight: 'bold',
                                        fontSize: arraySize > 40 ? '8px' : arraySize > 30 ? '9px' : arraySize > 20 ? '10px' : '11px',
                                        padding: '4px 2px',
                                        transition: 'all 0.3s ease',
                                        boxShadow: `0 4px 12px ${stepColors[idx]}30`,
                                        position: 'relative',
                                        cursor: 'default'
                                    }}
                                    title={`Value: ${num}, Index: ${idx}`}
                                >
                                    {showNumbers && (
                                        <div style={{
                                            color: '#ffffff',
                                            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                                            fontWeight: 'bold',
                                            fontSize: 'inherit',
                                            minHeight: '14px',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            {num}
                                        </div>
                                    )}
                                    {showIndices && (
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '-30px',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            color: '#66ccff',
                                            fontSize: '12px',
                                            fontWeight: '600',
                                            background: 'rgba(26, 26, 46, 0.8)',
                                            padding: '6px 12px',
                                            borderRadius: '6px',
                                            border: '1px solid rgba(102, 204, 255, 0.3)'
                                        }}>
                                            Array Size: {arraySize} | Step Mode
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                        {/* Array info display */}
                        <div style={{
                            position: 'absolute',
                            bottom: '10px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            color: '#66ccff',
                            fontSize: '12px',
                            fontWeight: '600',
                            background: 'rgba(26, 26, 46, 0.8)',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            border: '1px solid rgba(102, 204, 255, 0.3)'
                        }}>
                            Array Size: {arraySize} | Step Mode
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Algorithm Panel --- */}
            <div style={{
                flex: '0 0 300px',
                minWidth: '280px',
                maxWidth: '100%',
                background: 'rgba(102,204,255,0.07)',
                border: '1px solid rgba(102,204,255,0.15)',
                borderRadius: '12px',
                padding: '18px',
                overflowX: 'auto'
            }}>
                <h3 style={{
                    color: '#66ccff',
                    marginBottom: '10px',
                    fontFamily: 'Poppins, sans-serif'
                }}>
                    {getAlgorithmName()} Pseudocode
                </h3>
                <pre style={{
                    background: 'rgba(26,26,46,0.95)',
                    borderRadius: '8px',
                    padding: '14px',
                    fontSize: '15px',
                    color: '#e0e6ed',
                    marginBottom: '10px',
                    overflowX: 'auto'
                }}>
                    {ALGORITHM_PSEUDOCODE[algorithm].map((line, idx) => (
                        <div key={idx} style={{
                            background: steps[currentStep]?.pseudoLine === idx
                                ? 'rgba(102,204,255,0.25)' : 'none',
                            borderRadius: '5px',
                            padding: '2px 6px',
                            fontWeight: steps[currentStep]?.pseudoLine === idx ? 700 : 400,
                            color: steps[currentStep]?.pseudoLine === idx ? '#66ccff' : '#e0e6ed'
                        }}>
                            {line.code}
                        </div>
                    ))}
                </pre>
                <div style={{
                    background: 'rgba(102,204,255,0.08)',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    fontSize: '14px',
                    color: '#b8c5d1',
                    minHeight: '40px'
                }}>
                    <strong>Explanation:</strong><br />
                    {steps[currentStep]?.pseudoLine !== null
                        ? ALGORITHM_PSEUDOCODE[algorithm][steps[currentStep]?.pseudoLine]?.explain
                        : 'Algorithm finished!'}
                </div>
            </div>
        </div>
        

            {/* Controls Section */}
            <div className="controls-section" style={{
                width: '100%',
                maxWidth: '1000px',
                textAlign: 'center'
            }}>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '20px', justifyContent: 'center' }}>
                    <button className="btn" onClick={handleSort} disabled={isSorting}>
                        {isSorting ? '⏳ Sorting...' : '▶️ Start Sort'}
                    </button>
                    <button className="btn btn-secondary" onClick={generateArray} disabled={isSorting}>
                        🔄 Generate Array
                    </button>
                    <button className="btn btn-secondary" onClick={handleStop} disabled={!isSorting}>
                        ⏹️ Stop
                    </button>
                </div>

                {/* Simple Export Controls */}
                <SimpleExportControls />

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '20px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    maxWidth: '1000px',
                    margin: '0 auto'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <label className="label">Array Size:</label>
                        <input
                            type="range"
                            min="10"
                            max="50"
                            value={arraySize}
                            onChange={(e) => setArraySize(parseInt(e.target.value))}
                            disabled={isSorting}
                            className="input"
                            style={{ width: '120px' }}
                        />
                        <span style={{
                            color: '#66ccff',
                            fontWeight: '600',
                            minWidth: '30px',
                            textAlign: 'center'
                        }}>
                            {arraySize}
                        </span>
                        <span style={{
                            fontSize: '11px',
                            color: '#b8c5d1',
                            marginLeft: '5px'
                        }}>
                            {arraySize <= 15 ? '(with indices)' : arraySize <= 25 ? '(with values)' : '(bars only)'}
                        </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <label className="label">Speed:</label>
                        <input
                            type="range"
                            min="10"
                            max="500"
                            value={delay}
                            onChange={(e) => setDelay(parseInt(e.target.value))}
                            disabled={isSorting}
                            className="input"
                            style={{ width: '120px' }}
                        />
                        <span style={{
                            color: '#66ccff',
                            fontWeight: '600',
                            minWidth: '50px',
                            textAlign: 'center'
                        }}>
                            {delay}ms
                        </span>
                        <span style={{
                            fontSize: '11px',
                            color: '#b8c5d1',
                            marginLeft: '5px'
                        }}>
                            {delay < 50 ? '(very fast)' : delay < 150 ? '(fast)' : delay < 300 ? '(normal)' : '(slow)'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Algorithm Selection */}
            <div className="controls-section">
                <h3 style={{ color: '#66ccff', marginBottom: '15px', fontFamily: 'Poppins, sans-serif' }}>
                    Select Algorithm:
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                    {['bubbleSort', 'selectionSort', 'mergeSort', 'insertionSort', 'quickSort'].map((algo) => {
                        const algorithmNames = {
                            'bubbleSort': 'Bubble Sort',
                            'selectionSort': 'Selection Sort',
                            'mergeSort': 'Merge Sort',
                            'insertionSort': 'Insertion Sort',
                            'quickSort': 'Quick Sort'
                        };

                        return (
                            <button
                                key={algo}
                                className={algorithm === algo ? 'btn' : 'btn btn-secondary'}
                                onClick={() => setAlgorithm(algo)}
                                disabled={isSorting}
                                style={{
                                    background: algorithm === algo ?
                                        'linear-gradient(45deg, #66ccff, #4da6ff)' :
                                        'rgba(255, 255, 255, 0.1)',
                                    color: algorithm === algo ? '#1a1a2e' : '#e0e6ed'
                                }}
                            >
                                {algorithmNames[algo]}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Status Message */}
            <div className="status-message" style={{
                padding: '15px',
                background: 'rgba(102, 204, 255, 0.1)',
                borderRadius: '10px',
                border: '1px solid rgba(102, 204, 255, 0.3)',
                textAlign: 'center',
                fontSize: '16px',
                fontWeight: '600',
                color: '#66ccff',
                margin: '20px 0'
            }}>
                {message}
                {isSorting && (
                    <div style={{ marginTop: '10px' }}>
                        <div style={{
                            width: '100%',
                            height: '4px',
                            background: 'rgba(102, 204, 255, 0.2)',
                            borderRadius: '2px',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                height: '100%',
                                background: 'linear-gradient(90deg, #66ccff, #4da6ff)',
                                animation: 'progress 2s ease-in-out infinite',
                                borderRadius: '2px'
                            }} />
                        </div>
                    </div>
                )}
            </div>

            {/* Statistics Section */}
            <div className="controls-section" style={{
                width: '100%',
                maxWidth: '1000px',
                textAlign: 'center'
            }}>
                <h3 style={{ color: '#66ccff', marginBottom: '15px', fontFamily: 'Poppins, sans-serif', textAlign: 'center' }}>
                    Performance Statistics
                </h3>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '15px',
                    marginBottom: '20px',
                    justifyContent: 'center'
                }}>
                    <div style={{
                        background: 'rgba(102, 204, 255, 0.1)',
                        padding: '15px',
                        borderRadius: '10px',
                        border: '1px solid rgba(102, 204, 255, 0.3)',
                        textAlign: 'center'
                    }}>
                        <div style={{ color: '#66ccff', fontSize: '14px', marginBottom: '5px' }}>Comparisons</div>
                        <div style={{ color: '#e0e6ed', fontSize: '20px', fontWeight: 'bold' }}>
                            {statistics.comparisons}
                        </div>
                    </div>
                    <div style={{
                        background: 'rgba(255, 215, 61, 0.1)',
                        padding: '15px',
                        borderRadius: '10px',
                        border: '1px solid rgba(255, 215, 61, 0.3)',
                        textAlign: 'center'
                    }}>
                        <div style={{ color: '#ffd93d', fontSize: '14px', marginBottom: '5px' }}>Swaps</div>
                        <div style={{ color: '#e0e6ed', fontSize: '20px', fontWeight: 'bold' }}>
                            {statistics.swaps}
                        </div>
                    </div>
                    <div style={{
                        background: 'rgba(74, 222, 128, 0.1)',
                        padding: '15px',
                        borderRadius: '10px',
                        border: '1px solid rgba(74, 222, 128, 0.3)',
                        textAlign: 'center'
                    }}>
                        <div style={{ color: '#4ade80', fontSize: '14px', marginBottom: '5px' }}>Time</div>
                        <div style={{ color: '#e0e6ed', fontSize: '20px', fontWeight: 'bold' }}>
                            {statistics.time}ms
                        </div>
                    </div>
                    <div style={{
                        background: 'rgba(255, 107, 107, 0.1)',
                        padding: '15px',
                        borderRadius: '10px',
                        border: '1px solid rgba(255, 107, 107, 0.3)',
                        textAlign: 'center'
                    }}>
                        <div style={{ color: '#ff6b6b', fontSize: '14px', marginBottom: '5px' }}>Array Size</div>
                        <div style={{ color: '#e0e6ed', fontSize: '20px', fontWeight: 'bold' }}>
                            {arraySize}
                        </div>
                    </div>
                </div>
            </div>

            {/* Algorithm Information */}
            <div className="algorithm-info">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
                    <h3>{getAlgorithmName()} - Algorithm Details</h3>
                    <button
                        className="btn btn-secondary"
                        onClick={() => setShowCodeExplanation(true)}
                        style={{
                            background: 'linear-gradient(45deg, #ffd93d, #ffb347)',
                            color: '#1a1a2e',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            transition: 'all 0.3s ease',
                            minWidth: '200px'
                        }}
                    >
                        📖 View Code Explanation
                    </button>
                </div>
                <p>{getAlgorithmInfo().description}</p>

                <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                    <div>
                        <h4 style={{ color: '#66ccff', marginBottom: '8px' }}>Time Complexity:</h4>
                        <span className="complexity-badge">{getAlgorithmInfo().timeComplexity}</span>
                    </div>
                    <div>
                        <h4 style={{ color: '#66ccff', marginBottom: '8px' }}>Space Complexity:</h4>
                        <span className="complexity-badge">{getAlgorithmInfo().spaceComplexity}</span>
                    </div>
                    <div>
                        <h4 style={{ color: '#66ccff', marginBottom: '8px' }}>Best Case:</h4>
                        <span className="complexity-badge">{getAlgorithmInfo().bestCase}</span>
                    </div>
                    <div>
                        <h4 style={{ color: '#66ccff', marginBottom: '8px' }}>Stable:</h4>
                        <span className="complexity-badge">{getAlgorithmInfo().stable}</span>
                    </div>
                </div>
            </div>

            {/* Code Explanation Modal */}
            <CodeExplanation
                algorithm={algorithm}
                isVisible={showCodeExplanation}
                onClose={() => setShowCodeExplanation(false)}
            />
        </div>
    );
};

export default Sorting;