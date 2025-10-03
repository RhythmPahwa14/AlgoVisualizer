export const algorithmInfo = {
  bubbleSort: {
    name: 'Bubble Sort',
    description: 'Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    complexity: {
      time: {
        best: 'O(n)',
        average: 'O(n^2)',
        worst: 'O(n^2)',
      },
      space: {
        best: 'O(1)',
        average: 'O(1)',
        worst: 'O(1)',
      },
    },
  },
  insertionSort: {
    name: 'Insertion Sort',
    description: 'Insertion sort is a simple sorting algorithm that builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.',
    complexity: {
      time: {
        best: 'O(n)',
        average: 'O(n^2)',
        worst: 'O(n^2)',
      },
      space: {
        best: 'O(1)',
        average: 'O(1)',
        worst: 'O(1)',
      },
    },
  },
  selectionSort: {
    name: 'Selection Sort',
    description: 'Selection sort is an in-place comparison sorting algorithm. It has an O(n^2) time complexity, which makes it inefficient on large lists, and generally performs worse than the similar insertion sort.',
    complexity: {
      time: {
        best: 'O(n^2)',
        average: 'O(n^2)',
        worst: 'O(n^2)',
      },
      space: {
        best: 'O(1)',
        average: 'O(1)',
        worst: 'O(1)',
      },
    },
  },
  mergeSort: {
    name: 'Merge Sort',
    description: 'Merge sort is an efficient, stable, comparison-based sorting algorithm. Most implementations produce a stable sort, which means that the order of equal elements is the same in the input and output.',
    complexity: {
      time: {
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n log n)',
      },
      space: {
        best: 'O(n)',
        average: 'O(n)',
        worst: 'O(n)',
      },
    },
  },
  quickSort: {
    name: 'Quick Sort',
    description: 'Quicksort is an efficient sorting algorithm. Developed by British computer scientist Tony Hoare in 1959 and published in 1961, it is still a commonly used algorithm for sorting.',
    complexity: {
      time: {
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n^2)',
      },
      space: {
        best: 'O(log n)',
        average: 'O(log n)',
        worst: 'O(n)',
      },
    },
  },
  heapSort: {
    name: 'Heap Sort',
    description: 'Heapsort is a comparison-based sorting algorithm. Heapsort can be thought of as an improved selection sort: like selection sort, it divides its input into a sorted and an unsorted region, and it iteratively shrinks the unsorted region by extracting the largest element and moving that to the sorted region.',
    complexity: {
      time: {
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n log n)',
      },
      space: {
        best: 'O(1)',
        average: 'O(1)',
        worst: 'O(1)',
      },
    },
  },
  radixSort: {
    name: 'Radix Sort',
    description: 'Radix sort is a non-comparative sorting algorithm. It avoids comparison by creating and distributing elements into buckets according to their radix.',
    complexity: {
      time: {
        best: 'O(nk)',
        average: 'O(nk)',
        worst: 'O(nk)',
      },
      space: {
        best: 'O(n+k)',
        average: 'O(n+k)',
        worst: 'O(n+k)',
      },
    },
  },
  bucketSort: {
    name: 'Bucket Sort',
    description: 'Bucket sort, or bin sort, is a sorting algorithm that works by distributing the elements of an array into a number of buckets.',
    complexity: {
      time: {
        best: 'O(n+k)',
        average: 'O(n+k)',
        worst: 'O(n^2)',
      },
      space: {
        best: 'O(n+k)',
        average: 'O(n+k)',
        worst: 'O(n)',
      },
    },
  },
  shellSort: {
    name: 'Shell Sort',
    description: 'Shell sort is a generalization of insertion sort that allows the exchange of items that are far apart.',
    complexity: {
      time: {
        best: 'O(n log n)',
        average: 'O(n (log n)^2)',
        worst: 'O(n (log n)^2)',
      },
      space: {
        best: 'O(1)',
        average: 'O(1)',
        worst: 'O(1)',
      },
    },
  },
  cycleSort: {
    name: 'Cycle Sort',
    description: 'Cycle sort is an in-place, unstable sorting algorithm, a comparison sort that is theoretically optimal in terms of the total number of writes to original array.',
    complexity: {
      time: {
        best: 'O(n^2)',
        average: 'O(n^2)',
        worst: 'O(n^2)',
      },
      space: {
        best: 'O(1)',
        average: 'O(1)',
        worst: 'O(1)',
      },
    },
  },
  timSort: {
    name: 'Tim Sort',
    description: 'Timsort is a hybrid stable sorting algorithm, derived from merge sort and insertion sort, designed to perform well on many kinds of real-world data.',
    complexity: {
      time: {
        best: 'O(n)',
        average: 'O(n log n)',
        worst: 'O(n log n)',
      },
      space: {
        best: 'O(n)',
        average: 'O(n)',
        worst: 'O(n)',
      },
    },
  },
  introSort: {
    name: 'Intro Sort',
    description: 'Introsort or introspective sort is a hybrid sorting algorithm that provides both fast average performance and (asymptotically) optimal worst-case performance.',
    complexity: {
      time: {
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n log n)',
      },
      space: {
        best: 'O(log n)',
        average: 'O(log n)',
        worst: 'O(log n)',
      },
    },
  },
  pancakeSort: {
    name: 'Pancake Sort',
    description: 'Pancake sort is a sorting algorithm that works by repeatedly flipping prefixes of the array to sort the elements. It is not very efficient but provides an interesting visualization.',
    complexity: {
      time: {
        best: 'O(n)',
        average: 'O(n^2)',
        worst: 'O(n^2)',
      },
      space: {
        best: 'O(1)',
        average: 'O(1)',
        worst: 'O(1)',
      },
    },
  },
  linearSearch: {
    name: 'Linear Search',
    description: 'Linear search is a simple search algorithm that finds the position of a target value within a list by checking every one of its elements, one at a time and in sequence, until the desired one is found.',
    complexity: {
      time: {
        best: 'O(1)',
        average: 'O(n)',
        worst: 'O(n)',
      },
      space: {
        best: 'O(1)',
        average: 'O(1)',
        worst: 'O(1)',
      },
    },
  },
  binarySearch: {
    name: 'Binary Search',
    description: 'Binary search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you\'ve narrowed down the possible locations to just one.',
    complexity: {
      time: {
        best: 'O(1)',
        average: 'O(log n)',
        worst: 'O(log n)',
      },
      space: {
        best: 'O(1)',
        average: 'O(1)',
        worst: 'O(1)',
      },
    },
  },
  jumpSearch: {
    name: 'Jump Search',
    description: 'Jump search is a searching algorithm for sorted arrays. The basic idea is to check fewer elements (than linear search) by jumping ahead by fixed steps or skipping some elements in place of searching all elements.',
    complexity: {
      time: {
        best: 'O(1)',
        average: 'O(√n)',
        worst: 'O(√n)',
      },
      space: {
        best: 'O(1)',
        average: 'O(1)',
        worst: 'O(1)',
      },
    },
  },
  exponentialSearch: {
    name: 'Exponential Search',
    description: 'Exponential search (also called doubling search or galloping search) is an algorithm for finding a value in a sorted array. It works by first finding a range where the value might be and then doing a binary search in that range.',
    complexity: {
      time: {
        best: 'O(1)',
        average: 'O(log i)',
        worst: 'O(log i)',
      },
      space: {
        best: 'O(1)',
        average: 'O(1)',
        worst: 'O(1)',
      },
    },
  },
  ternarySearch: {
    name: 'Ternary Search',
    description: 'Ternary search is a search algorithm for finding the minimum or maximum of a unimodal function. It determines either that the minimum or maximum cannot be in the first third of the domain or that it cannot be in the last third of the domain, then repeats on the remaining two thirds.',
    complexity: {
      time: {
        best: 'O(1)',
        average: 'O(log3 n)',
        worst: 'O(log3 n)',
      },
      space: {
        best: 'O(1)',
        average: 'O(1)',
        worst: 'O(1)',
      },
    },
  },
};