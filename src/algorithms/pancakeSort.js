// Pancake Sort algorithm logic

function flip(arr, k) {
  let left = 0;
  while (left < k) {
    [arr[left], arr[k]] = [arr[k], arr[left]];
    left++;
    k--;
  }
}

function findMaxIndex(arr, n) {
  let maxIndex = 0;
  for (let i = 0; i < n; i++) {
    if (arr[i] > arr[maxIndex]) {
      maxIndex = i;
    }
  }
  return maxIndex;
}

export function* pancakeSort(array) {
  let n = array.length;
  while (n > 1) {
    const maxIndex = findMaxIndex(array, n);

    if (maxIndex !== n - 1) {
      // Flip to bring the max element to the front
      if (maxIndex !== 0) {
        flip(array, maxIndex);
        yield { array: [...array], highlights: [maxIndex] };
      }

      // Flip to move the max element to its correct position
      flip(array, n - 1);
      yield { array: [...array], highlights: [n - 1] };
    }
    n--;
  }
  return array;
}