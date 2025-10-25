// Performance-ready algorithm implementations for complexity analysis
// These are simplified versions without visualization steps for accurate performance measurement

export const bubbleSortPerformance = (arr) => {
  const array = [...arr];
  const n = array.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        // Swap elements
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  
  return array;
};

export const insertionSortPerformance = (arr) => {
  const array = [...arr];
  
  for (let i = 1; i < array.length; i++) {
    let current = array[i];
    let j = i - 1;
    
    while (j >= 0 && array[j] > current) {
      array[j + 1] = array[j];
      j--;
    }
    
    array[j + 1] = current;
  }
  
  return array;
};

export const selectionSortPerformance = (arr) => {
  const array = [...arr];
  const n = array.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    
    for (let j = i + 1; j < n; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    
    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }
  }
  
  return array;
};

export const quickSortPerformance = (arr) => {
  if (arr.length <= 1) {
    return arr;
  }
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = [];
  const right = [];
  const equal = [];
  
  for (let element of arr) {
    if (element < pivot) {
      left.push(element);
    } else if (element > pivot) {
      right.push(element);
    } else {
      equal.push(element);
    }
  }
  
  return [
    ...quickSortPerformance(left),
    ...equal,
    ...quickSortPerformance(right)
  ];
};

export const mergeSortPerformance = (arr) => {
  if (arr.length <= 1) {
    return arr;
  }
  
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);
  
  return merge(
    mergeSortPerformance(left),
    mergeSortPerformance(right)
  );
};

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;
  
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  
  return result
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
};

// ✅ Added Cocktail Shaker Sort performance implementation
export const cocktailShakerSortPerformance = (arr) => {
  const array = [...arr];
  const n = array.length;
  let swapped = true;
  let start = 0;
  let end = n - 1;
  
  while (swapped) {
    swapped = false;
    
    // Forward pass
    for (let i = start; i < end; i++) {
      if (array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        swapped = true;
      }
    }
    
    if (!swapped) break;
    
    end--;
    swapped = false;
    
    // Backward pass
    for (let i = end; i > start; i--) {
      if (array[i] < array[i - 1]) {
        [array[i], array[i - 1]] = [array[i - 1], array[i]];
        swapped = true;
      }
    }
    
    start++;
  }
  
  return array;
};

// ✅ Added Counting Sort performance implementation
export const countingSortPerformance = (arr) => {
  if (arr.length === 0) return arr;
  
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const range = max - min + 1;
  const count = new Array(range).fill(0);
  const output = [];
  
  // Count occurrences
  for (let i = 0; i < arr.length; i++) {
    count[arr[i] - min]++;
  }
  
  // Build output array
  for (let i = 0; i < range; i++) {
    while (count[i] > 0) {
      output.push(i + min);
      count[i]--;
    }
  }
  
  return output;
};

// ✅ Added Heap Sort performance implementation
export const heapSortPerformance = (arr) => {
  const array = [...arr];
  const n = array.length;
  
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, n, i);
  }
  
  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    [array[0], array[i]] = [array[i], array[0]];
    heapify(array, i, 0);
  }
  
  return array;
};

function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
  
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}

export const linearSearchPerformance = (arr, target) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
};

export const binarySearchPerformance = (arr, target) => {
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
};

// Algorithm map for easy access
export const performanceAlgorithms = {
  "Bubble Sort": bubbleSortPerformance,
  "Insertion Sort": insertionSortPerformance,
  "Selection Sort": selectionSortPerformance,
  "Quick Sort": quickSortPerformance,
  "Merge Sort": mergeSortPerformance,
  "Cocktail Shaker Sort": cocktailShakerSortPerformance, // ✅ Added
  "Counting Sort": countingSortPerformance,             // ✅ Added
  "Heap Sort": heapSortPerformance,                     // ✅ Added
  "Linear Search": linearSearchPerformance,
  "Binary Search": binarySearchPerformance
};