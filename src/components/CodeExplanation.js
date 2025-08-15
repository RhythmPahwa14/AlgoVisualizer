import React, { useState, useEffect, useCallback } from 'react';
import '../styles/codeExplanation.css';

const CodeExplanation = ({ algorithm, isVisible, onClose }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1000);

    // Algorithm code explanations with step-by-step details
    const algorithmExplanations = {
        bubbleSort: {
            title: "Bubble Sort Algorithm",
            description: "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
            code: `function bubbleSort(arr) {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}`,
            steps: [
                {
                    line: 1,
                    explanation: "Define the bubbleSort function that takes an array as input",
                    code: "function bubbleSort(arr) {",
                    highlight: "function bubbleSort(arr) {"
                },
                {
                    line: 2,
                    explanation: "Get the length of the array and store it in variable 'n'",
                    code: "const n = arr.length;",
                    highlight: "const n = arr.length;"
                },
                {
                    line: 4,
                    explanation: "Outer loop: iterate from 0 to n-2 (we don't need to check the last element after first pass)",
                    code: "for (let i = 0; i < n - 1; i++) {",
                    highlight: "for (let i = 0; i < n - 1; i++) {"
                },
                {
                    line: 5,
                    explanation: "Inner loop: compare adjacent elements from start to n-i-1 (elements after this are already sorted)",
                    code: "for (let j = 0; j < n - i - 1; j++) {",
                    highlight: "for (let j = 0; j < n - i - 1; j++) {"
                },
                {
                    line: 6,
                    explanation: "Compare current element with next element. If current is greater, swap them",
                    code: "if (arr[j] > arr[j + 1]) {",
                    highlight: "if (arr[j] > arr[j + 1]) {"
                },
                {
                    line: 7,
                    explanation: "Use destructuring assignment to swap the two elements",
                    code: "[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];",
                    highlight: "[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];"
                },
                {
                    line: 8,
                    explanation: "Close the if statement block",
                    code: "}",
                    highlight: "}"
                },
                {
                    line: 9,
                    explanation: "Close the inner for loop",
                    code: "}",
                    highlight: "}"
                },
                {
                    line: 10,
                    explanation: "Close the outer for loop",
                    code: "}",
                    highlight: "}"
                },
                {
                    line: 11,
                    explanation: "Return the sorted array",
                    code: "return arr;",
                    highlight: "return arr;"
                },
                {
                    line: 12,
                    explanation: "Close the function",
                    code: "}",
                    highlight: "}"
                }
            ]
        },
        selectionSort: {
            title: "Selection Sort Algorithm",
            description: "An in-place comparison sorting algorithm that divides the input list into two parts: a sorted sublist and an unsorted sublist.",
            code: `function selectionSort(arr) {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        }
    }
    return arr;
}`,
            steps: [
                {
                    line: 1,
                    explanation: "Define the selectionSort function that takes an array as input",
                    code: "function selectionSort(arr) {",
                    highlight: "function selectionSort(arr) {"
                },
                {
                    line: 2,
                    explanation: "Get the length of the array and store it in variable 'n'",
                    code: "const n = arr.length;",
                    highlight: "const n = arr.length;"
                },
                {
                    line: 4,
                    explanation: "Outer loop: iterate through each position in the array",
                    code: "for (let i = 0; i < n - 1; i++) {",
                    highlight: "for (let i = 0; i < n - 1; i++) {"
                },
                {
                    line: 5,
                    explanation: "Assume the current position 'i' contains the minimum element",
                    code: "let minIdx = i;",
                    highlight: "let minIdx = i;"
                },
                {
                    line: 7,
                    explanation: "Inner loop: search for a smaller element in the unsorted portion",
                    code: "for (let j = i + 1; j < n; j++) {",
                    highlight: "for (let j = i + 1; j < n; j++) {"
                },
                {
                    line: 8,
                    explanation: "If we find a smaller element, update the minimum index",
                    code: "if (arr[j] < arr[minIdx]) {",
                    highlight: "if (arr[j] < arr[minIdx]) {"
                },
                {
                    line: 9,
                    explanation: "Update minIdx to point to the new minimum element",
                    code: "minIdx = j;",
                    highlight: "minIdx = j;"
                },
                {
                    line: 10,
                    explanation: "Close the if statement",
                    code: "}",
                    highlight: "}"
                },
                {
                    line: 11,
                    explanation: "Close the inner for loop",
                    code: "}",
                    highlight: "}"
                },
                {
                    line: 13,
                    explanation: "If we found a smaller element, swap it with the current position",
                    code: "if (minIdx !== i) {",
                    highlight: "if (minIdx !== i) {"
                },
                {
                    line: 14,
                    explanation: "Swap the minimum element with the element at position 'i'",
                    code: "[arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];",
                    highlight: "[arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];"
                },
                {
                    line: 15,
                    explanation: "Close the if statement",
                    code: "}",
                    highlight: "}"
                },
                {
                    line: 16,
                    explanation: "Close the outer for loop",
                    code: "}",
                    highlight: "}"
                },
                {
                    line: 17,
                    explanation: "Return the sorted array",
                    code: "return arr;",
                    highlight: "return arr;"
                },
                {
                    line: 18,
                    explanation: "Close the function",
                    code: "}",
                    highlight: "}"
                }
            ]
        },
        insertionSort: {
            title: "Insertion Sort Algorithm",
            description: "A simple sorting algorithm that builds the final sorted array one item at a time by repeatedly inserting a new element into the sorted portion of the array.",
            code: `function insertionSort(arr) {
    const n = arr.length;
    
    for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;
        
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        arr[j + 1] = key;
    }
    return arr;
}`,
            steps: [
                {
                    line: 1,
                    explanation: "Define the insertionSort function that takes an array as input",
                    code: "function insertionSort(arr) {",
                    highlight: "function insertionSort(arr) {"
                },
                {
                    line: 2,
                    explanation: "Get the length of the array and store it in variable 'n'",
                    code: "const n = arr.length;",
                    highlight: "const n = arr.length;"
                },
                {
                    line: 4,
                    explanation: "Start from the second element (index 1) since the first element is already sorted",
                    code: "for (let i = 1; i < n; i++) {",
                    highlight: "for (let i = 1; i < n; i++) {"
                },
                {
                    line: 5,
                    explanation: "Store the current element as 'key' - this is the element we want to insert",
                    code: "const key = arr[i];",
                    highlight: "const key = arr[i];"
                },
                {
                    line: 6,
                    explanation: "Start comparing from the element before the current position",
                    code: "let j = i - 1;",
                    highlight: "let j = i - 1;"
                },
                {
                    line: 8,
                    explanation: "While we haven't reached the beginning and the current element is greater than our key",
                    code: "while (j >= 0 && arr[j] > key) {",
                    highlight: "while (j >= 0 && arr[j] > key) {"
                },
                {
                    line: 9,
                    explanation: "Move the larger element one position to the right",
                    code: "arr[j + 1] = arr[j];",
                    highlight: "arr[j + 1] = arr[j];"
                },
                {
                    line: 10,
                    explanation: "Move left to check the previous element",
                    code: "j--;",
                    highlight: "j--;"
                },
                {
                    line: 11,
                    explanation: "Close the while loop",
                    code: "}",
                    highlight: "}"
                },
                {
                    line: 13,
                    explanation: "Insert the key element at the correct position",
                    code: "arr[j + 1] = key;",
                    highlight: "arr[j + 1] = key;"
                },
                {
                    line: 14,
                    explanation: "Close the for loop",
                    code: "}",
                    highlight: "}"
                },
                {
                    line: 15,
                    explanation: "Return the sorted array",
                    code: "return arr;",
                    highlight: "return arr;"
                },
                {
                    line: 16,
                    explanation: "Close the function",
                    code: "}",
                    highlight: "}"
                }
            ]
        },
        mergeSort: {
            title: "Merge Sort Algorithm",
            description: "A divide-and-conquer algorithm that recursively breaks down a problem into two or more sub-problems until they become simple enough to solve directly.",
            code: `function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }
    
    return result.concat(left.slice(i)).concat(right.slice(j));
}`,
            steps: [
                {
                    line: 1,
                    explanation: "Define the mergeSort function that takes an array as input",
                    code: "function mergeSort(arr) {",
                    highlight: "function mergeSort(arr) {"
                },
                {
                    line: 2,
                    explanation: "Base case: if array has 1 or fewer elements, it's already sorted",
                    code: "if (arr.length <= 1) return arr;",
                    highlight: "if (arr.length <= 1) return arr;"
                },
                {
                    line: 4,
                    explanation: "Find the middle point to divide the array into two halves",
                    code: "const mid = Math.floor(arr.length / 2);",
                    highlight: "const mid = Math.floor(arr.length / 2);"
                },
                {
                    line: 5,
                    explanation: "Create the left half of the array from start to middle",
                    code: "const left = arr.slice(0, mid);",
                    highlight: "const left = arr.slice(0, mid);"
                },
                {
                    line: 6,
                    explanation: "Create the right half of the array from middle to end",
                    code: "const right = arr.slice(mid);",
                    highlight: "const right = arr.slice(mid);"
                },
                {
                    line: 8,
                    explanation: "Recursively sort both halves and merge them together",
                    code: "return merge(mergeSort(left), mergeSort(right));",
                    highlight: "return merge(mergeSort(left), mergeSort(right));"
                },
                {
                    line: 9,
                    explanation: "Close the mergeSort function",
                    code: "}",
                    highlight: "}"
                },
                {
                    line: 11,
                    explanation: "Define the merge function that combines two sorted arrays",
                    code: "function merge(left, right) {",
                    highlight: "function merge(left, right) {"
                },
                {
                    line: 12,
                    explanation: "Create an empty array to store the merged result",
                    code: "const result = [];",
                    highlight: "const result = [];"
                },
                {
                    line: 13,
                    explanation: "Initialize pointers for both left and right arrays",
                    code: "let i = 0, j = 0;",
                    highlight: "let i = 0, j = 0;"
                },
                {
                    line: 15,
                    explanation: "While both arrays have elements to compare",
                    code: "while (i < left.length && j < right.length) {",
                    highlight: "while (i < left.length && j < right.length) {"
                },
                {
                    line: 16,
                    explanation: "If left element is smaller or equal, add it to result",
                    code: "if (left[i] <= right[j]) {",
                    highlight: "if (left[i] <= right[j]) {"
                },
                {
                    line: 17,
                    explanation: "Add the left element to the result array",
                    code: "result.push(left[i]);",
                    highlight: "result.push(left[i]);"
                },
                {
                    line: 18,
                    explanation: "Move to the next element in the left array",
                    code: "i++;",
                    highlight: "i++;"
                },
                {
                    line: 19,
                    explanation: "Close the if statement",
                    code: "} else {",
                    highlight: "} else {"
                },
                {
                    line: 20,
                    explanation: "Add the right element to the result array",
                    code: "result.push(right[j]);",
                    highlight: "result.push(right[j]);"
                },
                {
                    line: 21,
                    explanation: "Move to the next element in the right array",
                    code: "j++;",
                    highlight: "j++;"
                },
                {
                    line: 22,
                    explanation: "Close the else statement",
                    code: "}",
                    highlight: "}"
                },
                {
                    line: 23,
                    explanation: "Close the while loop",
                    code: "}",
                    highlight: "}"
                },
                {
                    line: 25,
                    explanation: "Add any remaining elements from both arrays and return the merged result",
                    code: "return result.concat(left.slice(i)).concat(right.slice(j));",
                    highlight: "return result.concat(left.slice(i)).concat(right.slice(j));"
                },
                {
                    line: 26,
                    explanation: "Close the merge function",
                    code: "}",
                    highlight: "}"
                }
            ]
        },
        binarySearch: {
            title: "Binary Search Algorithm",
            description: "An efficient algorithm for finding a target element in a sorted array by repeatedly dividing the search interval in half.",
            code: `function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}`,
            steps: [
                {
                    line: 1,
                    explanation: "Define the binarySearch function that takes an array and target value as input",
                    code: "function binarySearch(arr, target) {",
                    highlight: "function binarySearch(arr, target) {"
                },
                {
                    line: 2,
                    explanation: "Initialize the left boundary of the search range to the first element",
                    code: "let left = 0;",
                    highlight: "let left = 0;"
                },
                {
                    line: 3,
                    explanation: "Initialize the right boundary of the search range to the last element",
                    code: "let right = arr.length - 1;",
                    highlight: "let right = arr.length - 1;"
                },
                {
                    line: 5,
                    explanation: "Continue searching while the left boundary is less than or equal to the right boundary",
                    code: "while (left <= right) {",
                    highlight: "while (left <= right) {"
                },
                {
                    line: 6,
                    explanation: "Calculate the middle index by averaging left and right boundaries",
                    code: "const mid = Math.floor((left + right) / 2);",
                    highlight: "const mid = Math.floor((left + right) / 2);"
                },
                {
                    line: 8,
                    explanation: "Check if the middle element equals our target value",
                    code: "if (arr[mid] === target) {",
                    highlight: "if (arr[mid] === target) {"
                },
                {
                    line: 9,
                    explanation: "If found, return the index of the target element",
                    code: "return mid;",
                    highlight: "return mid;"
                },
                {
                    line: 10,
                    explanation: "Close the if statement",
                    code: "} else if (arr[mid] < target) {",
                    highlight: "} else if (arr[mid] < target) {"
                },
                {
                    line: 11,
                    explanation: "If middle element is less than target, search the right half",
                    code: "left = mid + 1;",
                    highlight: "left = mid + 1;"
                },
                {
                    line: 12,
                    explanation: "Close the else if statement",
                    code: "} else {",
                    highlight: "} else {"
                },
                {
                    line: 13,
                    explanation: "If middle element is greater than target, search the left half",
                    code: "right = mid - 1;",
                    highlight: "right = mid - 1;"
                },
                {
                    line: 14,
                    explanation: "Close the else statement",
                    code: "}",
                    highlight: "}"
                },
                {
                    line: 15,
                    explanation: "Close the while loop",
                    code: "}",
                    highlight: "}"
                },
                {
                    line: 17,
                    explanation: "If target not found, return -1",
                    code: "return -1;",
                    highlight: "return -1;"
                },
                {
                    line: 18,
                    explanation: "Close the function",
                    code: "}",
                    highlight: "}"
                }
            ]
        },
        linearSearch: {
            title: "Linear Search Algorithm",
            description: "A simple search algorithm that checks every element in the array sequentially until the target element is found or the end is reached.",
            code: `function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}`,
            steps: [
                {
                    line: 1,
                    explanation: "Define the linearSearch function that takes an array and target value as input",
                    code: "function linearSearch(arr, target) {",
                    highlight: "function linearSearch(arr, target) {"
                },
                {
                    line: 2,
                    explanation: "Loop through each element in the array starting from index 0",
                    code: "for (let i = 0; i < arr.length; i++) {",
                    highlight: "for (let i = 0; i < arr.length; i++) {"
                },
                {
                    line: 3,
                    explanation: "Check if the current element equals our target value",
                    code: "if (arr[i] === target) {",
                    highlight: "if (arr[i] === target) {"
                },
                {
                    line: 4,
                    explanation: "If found, return the index of the target element",
                    code: "return i;",
                    highlight: "return i;"
                },
                {
                    line: 5,
                    explanation: "Close the if statement",
                    code: "}",
                    highlight: "}"
                },
                {
                    line: 6,
                    explanation: "Close the for loop",
                    code: "}",
                    highlight: "}"
                },
                {
                    line: 7,
                    explanation: "If target not found after checking all elements, return -1",
                    code: "return -1;",
                    highlight: "return -1;"
                },
                {
                    line: 8,
                    explanation: "Close the function",
                    code: "}",
                    highlight: "}"
                }
            ]
        },
        jumpSearch: {
            title: "Jump Search Algorithm",
            description: "A search algorithm for sorted arrays that works by jumping ahead by fixed steps and then performing a linear search in the identified block.",
            code: `function jumpSearch(arr, target) {
    const n = arr.length;
    const step = Math.floor(Math.sqrt(n));
    
    let prev = 0;
    while (arr[Math.min(step, n) - 1] < target) {
        prev = step;
        step += Math.floor(Math.sqrt(n));
        if (prev >= n) return -1;
    }
    
    while (prev < Math.min(step, n)) {
        if (arr[prev] === target) return prev;
        prev++;
    }
    return -1;
}`,
            steps: [
                {
                    line: 1,
                    explanation: "Define the jumpSearch function that takes an array and target value as input",
                    code: "function jumpSearch(arr, target) {",
                    highlight: "function jumpSearch(arr, target) {"
                },
                {
                    line: 2,
                    explanation: "Get the length of the array and calculate the optimal jump step size",
                    code: "const n = arr.length;",
                    highlight: "const n = arr.length;"
                },
                {
                    line: 3,
                    explanation: "Calculate the optimal jump size as square root of array length",
                    code: "const step = Math.floor(Math.sqrt(n));",
                    highlight: "const step = Math.floor(Math.sqrt(n));"
                },
                {
                    line: 5,
                    explanation: "Initialize the previous position to start of the array",
                    code: "let prev = 0;",
                    highlight: "let prev = 0;"
                },
                {
                    line: 6,
                    explanation: "Jump ahead in steps until we find a value greater than or equal to target",
                    code: "while (arr[Math.min(step, n) - 1] < target) {",
                    highlight: "while (arr[Math.min(step, n) - 1] < target) {"
                },
                {
                    line: 7,
                    explanation: "Update the previous position to current step position",
                    code: "prev = step;",
                    highlight: "prev = step;"
                },
                {
                    line: 8,
                    explanation: "Increase the step size by the square root of array length",
                    code: "step += Math.floor(Math.sqrt(n));",
                    highlight: "step += Math.floor(Math.sqrt(n));"
                },
                {
                    line: 9,
                    explanation: "If we've jumped past the array end, target doesn't exist",
                    code: "if (prev >= n) return -1;",
                    highlight: "if (prev >= n) return -1;"
                },
                {
                    line: 10,
                    explanation: "Close the while loop",
                    code: "}",
                    highlight: "}"
                },
                {
                    line: 12,
                    explanation: "Perform linear search in the identified block",
                    code: "while (prev < Math.min(step, n)) {",
                    highlight: "while (prev < Math.min(step, n)) {"
                },
                {
                    line: 13,
                    explanation: "If target found, return its index",
                    code: "if (arr[prev] === target) return prev;",
                    highlight: "if (arr[prev] === target) return prev;"
                },
                {
                    line: 14,
                    explanation: "Move to next element in the block",
                    code: "prev++;",
                    highlight: "prev++;"
                },
                {
                    line: 15,
                    explanation: "Close the while loop",
                    code: "}",
                    highlight: "}"
                },
                {
                    line: 16,
                    explanation: "If target not found in the block, return -1",
                    code: "return -1;",
                    highlight: "return -1;"
                },
                {
                    line: 17,
                    explanation: "Close the function",
                    code: "}",
                    highlight: "}"
                }
            ]
        },
        exponentialSearch: {
            title: "Exponential Search Algorithm",
            description: "A search algorithm that works by finding the range where the target element is present, then performing a binary search within that range.",
            code: `function exponentialSearch(arr, target) {
    if (arr[0] === target) return 0;
    
    let i = 1;
    while (i < arr.length && arr[i] <= target) {
        i = i * 2;
    }
    
    return binarySearch(arr, target, Math.floor(i / 2), Math.min(i, arr.length));
}`,
            steps: [
                {
                    line: 1,
                    explanation: "Define the exponentialSearch function that takes an array and target value as input",
                    code: "function exponentialSearch(arr, target) {",
                    highlight: "function exponentialSearch(arr, target) {"
                },
                {
                    line: 2,
                    explanation: "Check if the first element is the target (edge case)",
                    code: "if (arr[0] === target) return 0;",
                    highlight: "if (arr[0] === target) return 0;"
                },
                {
                    line: 4,
                    explanation: "Initialize the exponential jump starting from index 1",
                    code: "let i = 1;",
                    highlight: "let i = 1;"
                },
                {
                    line: 5,
                    explanation: "Exponentially increase the index until we find a value greater than target",
                    code: "while (i < arr.length && arr[i] <= target) {",
                    highlight: "while (i < arr.length && arr[i] <= target) {"
                },
                {
                    line: 6,
                    explanation: "Double the index value for exponential growth",
                    code: "i = i * 2;",
                    highlight: "i = i * 2;"
                },
                {
                    line: 7,
                    explanation: "Close the while loop",
                    code: "}",
                    highlight: "}"
                },
                {
                    line: 9,
                    explanation: "Perform binary search in the identified range and return the result",
                    code: "return binarySearch(arr, target, Math.floor(i / 2), Math.min(i, arr.length));",
                    highlight: "return binarySearch(arr, target, Math.floor(i / 2), Math.min(i, arr.length));"
                },
                {
                    line: 10,
                    explanation: "Close the function",
                    code: "}",
                    highlight: "}"
                }
            ]
        }
    };

    const currentAlgorithm = algorithmExplanations[algorithm];
    const totalSteps = currentAlgorithm?.steps?.length || 0;

    const nextStep = useCallback(() => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(currentStep + 1);
        }
    }, [currentStep, totalSteps]);

    const prevStep = useCallback(() => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    }, [currentStep]);

    const resetSteps = () => {
        setCurrentStep(0);
        setIsPlaying(false);
    };

    const togglePlayback = useCallback(() => {
        if (isPlaying) {
            setIsPlaying(false);
        } else {
            setIsPlaying(false);
            let step = currentStep;
            const interval = setInterval(() => {
                if (step < totalSteps - 1) {
                    step++;
                    setCurrentStep(step);
                } else {
                    setIsPlaying(false);
                    clearInterval(interval);
                }
            }, playbackSpeed);
        }
    }, [isPlaying, currentStep, totalSteps, playbackSpeed]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (!isVisible) return;
            
            switch(e.key) {
                case 'Escape':
                    onClose();
                    break;
                case 'ArrowLeft':
                    prevStep();
                    break;
                case 'ArrowRight':
                    nextStep();
                    break;
                case ' ':
                    e.preventDefault();
                    togglePlayback();
                    break;
                case 'r':
                case 'R':
                    resetSteps();
                    break;
                default:
                    break;
            }
        };

        if (isVisible) {
            document.addEventListener('keydown', handleKeyPress);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [isVisible, currentStep, onClose, nextStep, prevStep, togglePlayback]);

    if (!isVisible || !currentAlgorithm) return null;

    return (
        <div className="code-explanation-overlay">
            <div className="code-explanation-modal">
                <div className="code-explanation-header">
                    <h2>{currentAlgorithm.title}</h2>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
                
                <div className="code-explanation-content">
                    <div className="algorithm-description">
                        <p>{currentAlgorithm.description}</p>
                    </div>
                    
                    <div className="code-section">
                        <h3>Algorithm Code</h3>
                        <div className="code-block">
                            <pre><code>{currentAlgorithm.code.split('\n').map((line, index) => {
                                const lineNumber = index + 1;
                                const isCurrentLine = currentAlgorithm.steps && 
                                    currentAlgorithm.steps[currentStep] && 
                                    currentAlgorithm.steps[currentStep].line === lineNumber;
                                
                                return (
                                    <div 
                                        key={index} 
                                        className={isCurrentLine ? 'current-line' : ''}
                                        style={{
                                            backgroundColor: isCurrentLine ? 'rgba(102, 204, 255, 0.2)' : 'transparent',
                                            padding: '2px 0',
                                            borderRadius: '4px',
                                            borderLeft: isCurrentLine ? '3px solid #66ccff' : 'none',
                                            paddingLeft: isCurrentLine ? '10px' : '0',
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            minHeight: '20px'
                                        }}
                                    >
                                        <span style={{ 
                                            color: '#66ccff', 
                                            marginRight: '15px', 
                                            fontSize: '12px',
                                            opacity: 0.7,
                                            minWidth: '30px',
                                            textAlign: 'right',
                                            userSelect: 'none'
                                        }}>
                                            {lineNumber}
                                        </span>
                                        <span style={{
                                            flex: 1,
                                            whiteSpace: 'pre',
                                            fontFamily: 'Courier New, monospace',
                                            textAlign: 'left'
                                        }}>
                                            {line}
                                        </span>
                                    </div>
                                );
                            })}</code></pre>
                        </div>
                    </div>
                    
                    <div className="step-explanation-section">
                        <h3>Step-by-Step Explanation</h3>
                        
                        <div className="step-controls">
                            <button onClick={prevStep} disabled={currentStep === 0}>
                                ⏮️ Previous
                            </button>
                            <button onClick={togglePlayback}>
                                {isPlaying ? '⏸️ Pause' : '▶️ Play'}
                            </button>
                            <button onClick={nextStep} disabled={currentStep === totalSteps - 1}>
                                ⏭️ Next
                            </button>
                            <button onClick={resetSteps}>
                                🔄 Reset
                            </button>
                        </div>
                        
                        <div className="playback-speed">
                            <label>Speed: </label>
                            <input
                                type="range"
                                min="500"
                                max="3000"
                                value={playbackSpeed}
                                onChange={(e) => setPlaybackSpeed(parseInt(e.target.value))}
                            />
                            <span>{playbackSpeed}ms</span>
                        </div>
                        
                        <div className="step-progress">
                            <span>Step {currentStep + 1} of {totalSteps}</span>
                            <div className="progress-bar">
                                <div 
                                    className="progress-fill" 
                                    style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                        
                        <div className="keyboard-shortcuts">
                            <span style={{ color: '#66ccff', fontSize: '12px', fontWeight: '600' }}>
                                ⌨️ Keyboard Shortcuts: 
                                <span style={{ color: '#e0e6ed', marginLeft: '10px' }}>
                                    ← → Navigate | Space Play/Pause | R Reset | Esc Close
                                </span>
                            </span>
                        </div>
                        
                        {currentAlgorithm.steps && currentAlgorithm.steps[currentStep] && (
                            <div className="current-step">
                                <div className="step-header">
                                    <span className="step-number">Line {currentAlgorithm.steps[currentStep].line}</span>
                                    <span className="step-explanation">{currentAlgorithm.steps[currentStep].explanation}</span>
                                </div>
                                <div className="step-code">
                                    <pre><code>{currentAlgorithm.steps[currentStep].highlight}</code></pre>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodeExplanation; 