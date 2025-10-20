// ✅ Utility functions for sorting/searching runners
const noopSetArray = () => {};
const noopUpdateStats = () => ({});
const makeStopRef = () => ({ current: false });

// 🟡 Sorting algorithm wrappers

import { bubbleSortWithStop } from "./bubbleSort.js";
export async function bubbleSort(arr, setColorArray, delay) {
  return await bubbleSortWithStop(
    arr, noopSetArray, setColorArray, delay, makeStopRef(), noopUpdateStats
  );
}

import { insertionSortWithStop } from "./insertionSort.js";
export async function insertionSort(arr, setColorArray, delay) {
  return await insertionSortWithStop(
    arr, noopSetArray, setColorArray, delay, makeStopRef(), noopUpdateStats
  );
}

import { selectionSortWithStop } from "./selectionSort.js";
export async function selectionSort(arr, setColorArray, delay) {
  return await selectionSortWithStop(
    arr, noopSetArray, setColorArray, delay, makeStopRef(), noopUpdateStats
  );
}

import { mergeSortWithStop } from "./mergeSort.js";
export async function mergeSort(arr, setColorArray, delay) {
  return await mergeSortWithStop(
    arr, noopSetArray, setColorArray, delay, makeStopRef(), noopUpdateStats
  );
}

import { quickSortWithStop } from "./quickSort.js";
export async function quickSort(arr, setColorArray, delay) {
  return await quickSortWithStop(
    arr, noopSetArray, setColorArray, delay, makeStopRef(), noopUpdateStats
  );
}
import { sleepSortWithStop } from "./sleepSort.js";
export async function sleepSort(arr, setColorArray, delay) {
  return await sleepSortWithStop(arr, noopSetArray, setColorArray, delay, makeStopRef(), noopUpdateStats);
}
import { timSortWithStop } from "./timSort.js";
export async function timSort(arr, setColorArray, delay) {
  return await timSortWithStop(
    arr, noopSetArray, setColorArray, delay, makeStopRef(), noopUpdateStats
  );
}

import { introSortWithStop } from "./introSort.js";
export async function introSort(arr, setColorArray, delay) {
  return await introSortWithStop(
    arr, noopSetArray, setColorArray, delay, makeStopRef(), noopUpdateStats
  );
}

import { shellSortWithStop } from "./shellSort.js";
export async function shellSort(arr, setColorArray, delay) {
  return await shellSortWithStop(
    arr, noopSetArray, setColorArray, delay, makeStopRef(), noopUpdateStats
  );
}

import { heapSortWithStop } from "./heapSort.js";
export async function heapSort(arr, setColorArray, delay) {
  return await heapSortWithStop(
    arr, noopSetArray, setColorArray, delay, makeStopRef(), noopUpdateStats
  );
}

import { radixSortWithStop } from "./radixSort.js";
export async function radixSort(arr, setColorArray, delay) {
  return await radixSortWithStop(
    arr, noopSetArray, setColorArray, delay, makeStopRef(), noopUpdateStats
  );
}

import { bucketSortWithStop } from "./bucketSort.js";
export async function bucketSort(arr, setColorArray, delay) {
  return await bucketSortWithStop(
    arr, noopSetArray, setColorArray, delay, makeStopRef(), noopUpdateStats
  );
}

import { cocktailShakerSortWithStop } from "./cocktailShakerSort.js";
export async function cocktailShakerSort(arr, setColorArray, delay) {
  return await cocktailShakerSortWithStop(
    arr, noopSetArray, setColorArray, delay, makeStopRef(), noopUpdateStats
  );
}

// ✅ NEW Counting Sort wrapper
import { countingSortWithStop } from "./countingSort.js";
export async function countingSort(arr, setColorArray, delay) {
  return await countingSortWithStop(
    arr, noopSetArray, setColorArray, delay, makeStopRef(), noopUpdateStats
  );
}

// 🔍 Searching algorithm wrappers

import { linearSearchWithStop } from "./linearSearch.js";
export async function linearSearchWrapper(arr, setColorArray, delay) {
  return await linearSearchWithStop(
    arr,
    noopSetArray,
    setColorArray,
    delay,
    makeStopRef(),
    noopUpdateStats
  );
}

import { binarySearchWithStop } from "./binarySearch.js";
export async function binarySearchWrapper(arr, setColorArray, delay) {
  return await binarySearchWithStop(
    arr,
    noopSetArray,
    setColorArray,
    delay,
    makeStopRef(),
    noopUpdateStats
  );
}

// ✅ NEW Fibonacci Search Wrapper
import { fibonacciSearchWithStop } from "./fibonacciSearch.js";
export function fibonacciSearchWrapper(target) {
  return async (arr, setColorArray, delay) =>
    await fibonacciSearchWithStop(
      arr, target, setColorArray, delay, makeStopRef(), noopUpdateStats
    );
}


// Direct re-exports of non-visual algorithms

import { linearSearch } from "./linearSearch.js";
export { linearSearch };

import { binarySearch } from "./binarySearch.js";
export { binarySearch };

import { jumpSearch } from "./jumpSearch.js";
export { jumpSearch };

// ✅ NEW Fibonacci Search non-visual export
import { fibonacciSearch } from "./fibonacciSearch.js";
export { fibonacciSearch };