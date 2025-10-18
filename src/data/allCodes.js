export const sortingAlgorithms = {
  bubbleSort: {
    java: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,
    python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,
    cpp: `void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}`,
  },

  selectionSort: {
    java: `public static void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        int temp = arr[minIdx];
        arr[minIdx] = arr[i];
        arr[i] = temp;
    }
}`,
    python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
    cpp: `void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        swap(arr[minIdx], arr[i]);
    }
}`,
  },

  insertionSort: {
    java: `public static void insertionSort(int[] arr) {
    int n = arr.length;
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
    python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
    cpp: `void insertionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
  },

  mergeSort: {
    java: `public static void mergeSort(int[] arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

public static void merge(int[] arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    int[] L = new int[n1];
    int[] R = new int[n2];
    
    for (int i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (int j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];
    
    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}`,
    python: `def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        left_half = arr[:mid]
        right_half = arr[mid:]
        
        merge_sort(left_half)
        merge_sort(right_half)
        
        i = j = k = 0
        
        while i < len(left_half) and j < len(right_half):
            if left_half[i] < right_half[j]:
                arr[k] = left_half[i]
                i += 1
            else:
                arr[k] = right_half[j]
                j += 1
            k += 1
        
        while i < len(left_half):
            arr[k] = left_half[i]
            i += 1
            k += 1
        
        while j < len(right_half):
            arr[k] = right_half[j]
            j += 1
            k += 1
    
    return arr`,
    cpp: `void merge(vector<int>& arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    vector<int> L(n1), R(n2);
    
    for (int i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (int j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];
    
    int i = 0, j = 0, k = left;
    
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

void mergeSort(vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}`,
  },
cocktailShakerSort: {
  java: `public static void cocktailShakerSort(int[] arr) {
    boolean swapped = true;
    int start = 0;
    int end = arr.length - 1;

    while (swapped) {
        swapped = false;

        // Forward pass
        for (int i = start; i < end; i++) {
            if (arr[i] > arr[i + 1]) {
                int temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
            }
        }

        if (!swapped) break;

        swapped = false;
        end--;

        // Backward pass
        for (int i = end - 1; i >= start; i--) {
            if (arr[i] > arr[i + 1]) {
                int temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
            }
        }
        start++;
    }
}`,

  python: `def cocktail_shaker_sort(arr):
    swapped = True
    start = 0
    end = len(arr) - 1

    while swapped:
        swapped = False

        # Forward pass
        for i in range(start, end):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                swapped = True

        if not swapped:
            break

        swapped = False
        end -= 1

        # Backward pass
        for i in range(end - 1, start - 1, -1):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                swapped = True

        start += 1`,

  cpp: `void cocktailShakerSort(vector<int>& arr) {
    bool swapped = true;
    int start = 0;
    int end = arr.size() - 1;

    while (swapped) {
        swapped = false;

        // Forward pass
        for (int i = start; i < end; i++) {
            if (arr[i] > arr[i + 1]) {
                swap(arr[i], arr[i + 1]);
                swapped = true;
            }
        }

        if (!swapped) break;

        swapped = false;
        end--;

        // Backward pass
        for (int i = end - 1; i >= start; i--) {
            if (arr[i] > arr[i + 1]) {
                swap(arr[i], arr[i + 1]);
                swapped = true;
            }
        }

        start++;
    }
}` 
},

  quickSort: {
    java: `public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

public static int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    
    return i + 1;
}`,
    python: `def quick_sort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
    cpp: `int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return (i + 1);
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
  },

  radixSort: {
    java: `public static void radixSort(int[] arr) {
    int max = getMax(arr);
    for (int exp = 1; max / exp > 0; exp *= 10)
        countSort(arr, exp);
}

public static int getMax(int[] arr) {
    int max = arr[0];
    for (int i = 1; i < arr.length; i++)
        if (arr[i] > max)
            max = arr[i];
    return max;
}

public static void countSort(int[] arr, int exp) {
    int n = arr.length;
    int[] output = new int[n];
    int[] count = new int[10];
    
    for (int i = 0; i < n; i++)
        count[(arr[i] / exp) % 10]++;
    
    for (int i = 1; i < 10; i++)
        count[i] += count[i - 1];
    
    for (int i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }
    
    for (int i = 0; i < n; i++)
        arr[i] = output[i];
}`,
    python: `def radix_sort(arr):
    max_num = max(arr)
    exp = 1
    while max_num // exp > 0:
        counting_sort(arr, exp)
        exp *= 10

def counting_sort(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10
    
    for i in range(n):
        index = arr[i] // exp
        count[index % 10] += 1
    
    for i in range(1, 10):
        count[i] += count[i - 1]
    
    i = n - 1
    while i >= 0:
        index = arr[i] // exp
        output[count[index % 10] - 1] = arr[i]
        count[index % 10] -= 1
        i -= 1
    
    for i in range(n):
        arr[i] = output[i]`,
    cpp: `int getMax(vector<int>& arr) {
    return *max_element(arr.begin(), arr.end());
}

void countSort(vector<int>& arr, int exp) {
    int n = arr.size();
    vector<int> output(n);
    vector<int> count(10, 0);
    
    for (int i = 0; i < n; i++)
        count[(arr[i] / exp) % 10]++;
    
    for (int i = 1; i < 10; i++)
        count[i] += count[i - 1];
    
    for (int i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }
    
    for (int i = 0; i < n; i++)
        arr[i] = output[i];
}

void radixSort(vector<int>& arr) {
    int max = getMax(arr);
    for (int exp = 1; max / exp > 0; exp *= 10)
        countSort(arr, exp);
}`,
  },

  bucketSort: {
    java: `public static void bucketSort(float[] arr) {
    int n = arr.length;
    if (n <= 0) return;
    
    @SuppressWarnings("unchecked")
    ArrayList<Float>[] buckets = new ArrayList[n];
    
    for (int i = 0; i < n; i++)
        buckets[i] = new ArrayList<Float>();
    
    for (int i = 0; i < n; i++) {
        int bucketIndex = (int) (n * arr[i]);
        buckets[bucketIndex].add(arr[i]);
    }
    
    for (int i = 0; i < n; i++)
        Collections.sort(buckets[i]);
    
    int index = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < buckets[i].size(); j++) {
            arr[index++] = buckets[i].get(j);
        }
    }
}`,
    python: `def bucket_sort(arr):
    if len(arr) == 0:
        return arr
    
    bucket_count = len(arr)
    buckets = [[] for _ in range(bucket_count)]
    
    for num in arr:
        bucket_index = int(bucket_count * num)
        buckets[bucket_index].append(num)
    
    for bucket in buckets:
        bucket.sort()
    
    result = []
    for bucket in buckets:
        result.extend(bucket)
    
    return result`,
    cpp: `void bucketSort(vector<float>& arr) {
    int n = arr.size();
    vector<vector<float>> buckets(n);
    
    for (int i = 0; i < n; i++) {
        int bucketIndex = n * arr[i];
        buckets[bucketIndex].push_back(arr[i]);
    }
    
    for (int i = 0; i < n; i++)
        sort(buckets[i].begin(), buckets[i].end());
    
    int index = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < buckets[i].size(); j++) {
            arr[index++] = buckets[i][j];
        }
    }
}`,
  },

  heapSort: {
    java: `public static void heapSort(int[] arr) {
    int n = arr.length;
    
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    
    for (int i = n - 1; i > 0; i--) {
        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        
        heapify(arr, i, 0);
    }
}

public static void heapify(int[] arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest])
        largest = left;
    
    if (right < n && arr[right] > arr[largest])
        largest = right;
    
    if (largest != i) {
        int swap = arr[i];
        arr[i] = arr[largest];
        arr[largest] = swap;
        
        heapify(arr, n, largest);
    }
}`,
    python: `def heap_sort(arr):
    n = len(arr)
    
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    
    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)

def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    
    if left < n and arr[i] < arr[left]:
        largest = left
    
    if right < n and arr[largest] < arr[right]:
        largest = right
    
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)`,
    cpp: `void heapify(vector<int>& arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest])
        largest = left;
    
    if (right < n && arr[right] > arr[largest])
        largest = right;
    
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(vector<int>& arr) {
    int n = arr.size();
    
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}`,
  },sleepSort: {
  javascript: `function sleepSort(arr) {
  const promises = arr.map(num => {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(num);
        resolve(num);
      }, num * 10); // delay proportional to value
    });
  });

  return Promise.all(promises);
}

// Example
sleepSort([4, 3, 1, 2, 5]);
`,
  
  java: `import java.util.*;

public class SleepSort {
    public static void sleepSort(int[] arr) {
        List<Thread> threads = new ArrayList<>();
        for (int num : arr) {
            Thread t = new Thread(() -> {
                try {
                    Thread.sleep(num * 10);
                    System.out.print(num + " ");
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            });
            threads.add(t);
            t.start();
        }

        for (Thread t : threads) {
            try {
                t.join();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }

    public static void main(String[] args) {
        int[] arr = {4, 3, 1, 2, 5};
        sleepSort(arr);
    }
}`,
  
  python: `import threading
import time

def sleep_sort(arr):
    def sleeper(x):
        time.sleep(x * 0.01)
        print(x, end=' ')
    
    threads = []
    for num in arr:
        t = threading.Thread(target=sleeper, args=(num,))
        threads.append(t)
        t.start()
    
    for t in threads:
        t.join()

# Example
sleep_sort([4, 3, 1, 2, 5])`,
  
  cpp: `#include <iostream>
#include <thread>
#include <vector>
#include <chrono>
using namespace std;

void sleeper(int x) {
    this_thread::sleep_for(chrono::milliseconds(x * 10));
    cout << x << " ";
}

void sleepSort(vector<int> arr) {
    vector<thread> threads;
    for (int num : arr) {
        threads.emplace_back(sleeper, num);
    }

    for (auto& t : threads) {
        t.join();
    }
}

int main() {
    vector<int> arr = {4, 3, 1, 2, 5};
    sleepSort(arr);
    return 0;
}`,
},


  timSort: {
    java: `// Tim Sort is built into Java's Arrays.sort()
public static void timSort(int[] arr) {
    Arrays.sort(arr);
}

// Manual implementation would be complex
// involving merge sort and insertion sort hybrid`,
    python: `# Tim Sort is built into Python's sorted() and list.sort()
def tim_sort(arr):
    return sorted(arr)

# Or in-place:
# arr.sort()`,
    cpp: `// Tim Sort is available in C++20 std::ranges::sort
// Manual implementation using stable_sort as approximation
void timSort(vector<int>& arr) {
    stable_sort(arr.begin(), arr.end());
}`,
  },

  introSort: {
    java: `// Introspective Sort implementation
public static void introSort(int[] arr) {
    int depthLimit = 2 * (int)(Math.log(arr.length) / Math.log(2));
    introSortUtil(arr, 0, arr.length - 1, depthLimit);
}

private static void introSortUtil(int[] arr, int low, int high, int depthLimit) {
    if (high - low > 16) {
        if (depthLimit == 0) {
            heapSort(arr, low, high);
            return;
        }
        
        depthLimit--;
        int pivot = partition(arr, low, high);
        introSortUtil(arr, low, pivot - 1, depthLimit);
        introSortUtil(arr, pivot + 1, high, depthLimit);
    } else {
        insertionSort(arr, low, high);
    }
}`,
    python: `import math

def intro_sort(arr):
    max_depth = 2 * int(math.log2(len(arr)))
    intro_sort_util(arr, 0, len(arr) - 1, max_depth)

def intro_sort_util(arr, low, high, depth_limit):
    if high - low > 16:
        if depth_limit == 0:
            heap_sort_range(arr, low, high)
            return
        
        depth_limit -= 1
        pivot = partition(arr, low, high)
        intro_sort_util(arr, low, pivot - 1, depth_limit)
        intro_sort_util(arr, pivot + 1, high, depth_limit)
    else:
        insertion_sort_range(arr, low, high)`,
    cpp: `#include <algorithm>

void introSort(vector<int>& arr) {
    // C++ std::sort typically uses introsort
    sort(arr.begin(), arr.end());
}

// Manual implementation
void introSortUtil(vector<int>& arr, int low, int high, int depthLimit) {
    if (high - low > 16) {
        if (depthLimit == 0) {
            make_heap(arr.begin() + low, arr.begin() + high + 1);
            sort_heap(arr.begin() + low, arr.begin() + high + 1);
            return;
        }
        
        depthLimit--;
        int pivot = partition(arr, low, high);
        introSortUtil(arr, low, pivot - 1, depthLimit);
        introSortUtil(arr, pivot + 1, high, depthLimit);
    } else {
        // Use insertion sort for small arrays
        for (int i = low + 1; i <= high; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= low && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }
}`,
  },

  cycleSort: {
    java: `
        void cycleSort(int arr[]) {
        int n = arr.length;
        for (int cycle_start = 0; cycle_start <= n - 2; cycle_start++) {
            int item = arr[cycle_start];
            int pos = cycle_start;
            for (int i = cycle_start + 1; i < n; i++)
            if (arr[i] < item) pos++;
            if (pos == cycle_start) continue;
            while (item == arr[pos]) pos++;
            int temp = arr[pos]; arr[pos] = item; item = temp;
            while (pos != cycle_start) {
            pos = cycle_start;
            for (int i = cycle_start + 1; i < n; i++)
                if (arr[i] < item) pos++;
            while (item == arr[pos]) pos++;
            temp = arr[pos]; arr[pos] = item; item = temp;
            }
        }
        }
        `,
    python: `
        def cycle_sort(arr):
            n = len(arr)
            for cycle_start in range(0, n - 1):
                item = arr[cycle_start]
                pos = cycle_start
                for i in range(cycle_start + 1, n):
                    if arr[i] < item:
                        pos += 1
                if pos == cycle_start:
                    continue
                while item == arr[pos]:
                    pos += 1
                arr[pos], item = item, arr[pos]
                while pos != cycle_start:
                    pos = cycle_start
                    for i in range(cycle_start + 1, n):
                        if arr[i] < item:
                            pos += 1
                    while item == arr[pos]:
                        pos += 1
                    arr[pos], item = item, arr[pos]
        `,
    cpp: `
        void cycleSort(int arr[], int n) {
        for (int cycle_start = 0; cycle_start <= n - 2; cycle_start++) {
            int item = arr[cycle_start];
            int pos = cycle_start;
            for (int i = cycle_start + 1; i < n; i++)
            if (arr[i] < item) pos++;
            if (pos == cycle_start) continue;
            while (item == arr[pos]) pos++;
            swap(item, arr[pos]);
            while (pos != cycle_start) {
            pos = cycle_start;
            for (int i = cycle_start + 1; i < n; i++)
                if (arr[i] < item) pos++;
            while (item == arr[pos]) pos++;
            swap(item, arr[pos]);
            }
        }
        }
        `,
  },

  shellSort: {
    java: `public static void shellSort(int[] arr) {
    int n = arr.length;
    
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j;
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                arr[j] = arr[j - gap];
            }
            arr[j] = temp;
        }
    }
}`,
    python: `def shell_sort(arr):
    n = len(arr)
    gap = n // 2
    
    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap
            arr[j] = temp
        gap //= 2
    
    return arr`,
    cpp: `void shellSort(vector<int>& arr) {
    int n = arr.size();
    
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j;
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                arr[j] = arr[j - gap];
            }
            arr[j] = temp;
        }
    }
}`,
  },

  countingSort: {
    java: `public static void countingSort(int[] arr) {
    int n = arr.length;
    int max = Arrays.stream(arr).max().getAsInt();
    int min = Arrays.stream(arr).min().getAsInt();
    int range = max - min + 1;
    
    int[] count = new int[range];
    int[] output = new int[n];
    
    for (int i = 0; i < n; i++)
        count[arr[i] - min]++;
    
    for (int i = 1; i < count.length; i++)
        count[i] += count[i - 1];
    
    for (int i = n - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
    }
    
    for (int i = 0; i < n; i++)
        arr[i] = output[i];
}`,
    python: `def counting_sort(arr):
    if not arr:
        return arr
    
    max_val = max(arr)
    min_val = min(arr)
    range_val = max_val - min_val + 1
    
    count = [0] * range_val
    output = [0] * len(arr)
    
    for num in arr:
        count[num - min_val] += 1
    
    for i in range(1, len(count)):
        count[i] += count[i - 1]
    
    for i in range(len(arr) - 1, -1, -1):
        output[count[arr[i] - min_val] - 1] = arr[i]
        count[arr[i] - min_val] -= 1
    
    return output`,
    cpp: `void countingSort(vector<int>& arr) {
    if (arr.empty()) return;
    
    int maxVal = *max_element(arr.begin(), arr.end());
    int minVal = *min_element(arr.begin(), arr.end());
    int range = maxVal - minVal + 1;
    
    vector<int> count(range, 0);
    vector<int> output(arr.size());
    
    for (int num : arr)
        count[num - minVal]++;
    
    for (int i = 1; i < range; i++)
        count[i] += count[i - 1];
    
    for (int i = arr.size() - 1; i >= 0; i--) {
        output[count[arr[i] - minVal] - 1] = arr[i];
        count[arr[i] - minVal]--;
    }
    
    arr = output;
}`,
  },
};

export const kruskalAlgorithms = {
  kruskal: {
    java: `import java.util.*;

class Edge implements Comparable<Edge> {
    int src, dest, weight;
    Edge(int s, int d, int w) {
        src = s; dest = d; weight = w;
    }
    public int compareTo(Edge o) { return this.weight - o.weight; }
}

class KruskalAlgorithm {
    static int[] parent, rank;

    static int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }

    static void union(int x, int y) {
        int px = find(x), py = find(y);
        if (px != py) {
            if (rank[px] < rank[py]) parent[px] = py;
            else if (rank[px] > rank[py]) parent[py] = px;
            else { parent[py] = px; rank[px]++; }
        }
    }

    static void kruskalMST(List<Edge> edges, int V) {
        Collections.sort(edges);
        parent = new int[V]; rank = new int[V];
        for (int i = 0; i < V; i++) parent[i] = i;

        List<Edge> mst = new ArrayList<>();
        int mstWeight = 0;

        for (Edge e : edges) {
            if (find(e.src) != find(e.dest)) {
                union(e.src, e.dest);
                mst.add(e);
                mstWeight += e.weight;
            }
        }

        System.out.println("MST Edges:");
        for (Edge e : mst) {
            System.out.println(e.src + " - " + e.dest + " : " + e.weight);
        }
        System.out.println("Total MST Weight: " + mstWeight);
    }
}`,
    python: `class UnionFind:
    def __init__(self, size):
        self.parent = list(range(size))
        self.rank = [0] * size

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px != py:
            if self.rank[px] < self.rank[py]:
                self.parent[px] = py
            elif self.rank[px] > self.rank[py]:
                self.parent[py] = px
            else:
                self.parent[py] = px
                self.rank[px] += 1

def kruskal_mst(edges, V):
    edges.sort(key=lambda x: x[2])  # sort by weight
    uf = UnionFind(V)
    mst = []
    mst_weight = 0

    for u, v, w in edges:
        if uf.find(u) != uf.find(v):
            uf.union(u, v)
            mst.append((u, v, w))
            mst_weight += w

    print("MST Edges:")
    for u, v, w in mst:
        print(f"{u} - {v} : {w}")
    print(f"Total MST Weight: {mst_weight}")
    return mst`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

struct Edge {
    int src, dest, weight;
};

bool cmp(Edge a, Edge b) { return a.weight < b.weight; }

class UnionFind {
    vector<int> parent, rank;
public:
    UnionFind(int size) {
        parent.resize(size); rank.resize(size, 0);
        for(int i=0; i<size; i++) parent[i] = i;
    }
    int find(int x) {
        if(parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    void unionSets(int x, int y) {
        int px = find(x), py = find(y);
        if(px != py) {
            if(rank[px] < rank[py]) parent[px] = py;
            else if(rank[px] > rank[py]) parent[py] = px;
            else { parent[py] = px; rank[px]++; }
        }
    }
};

void kruskalMST(vector<Edge>& edges, int V) {
    sort(edges.begin(), edges.end(), cmp);
    UnionFind uf(V);
    vector<Edge> mst;
    int mstWeight = 0;

    for(auto& e : edges) {
        if(uf.find(e.src) != uf.find(e.dest)) {
            uf.unionSets(e.src, e.dest);
            mst.push_back(e);
            mstWeight += e.weight;
        }
    }

    cout << "MST Edges:\\n";
    for(auto& e : mst) {
        cout << e.src << " - " << e.dest << " : " << e.weight << "\\n";
    }
    cout << "Total MST Weight: " << mstWeight << endl;
}`,
    javascript: `class UnionFind {
    constructor(size) {
        this.parent = Array.from({length: size}, (_, i) => i);
        this.rank = Array(size).fill(0);
    }

    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    union(x, y) {
        const px = this.find(x), py = this.find(y);
        if (px !== py) {
            if (this.rank[px] < this.rank[py]) {
                this.parent[px] = py;
            } else if (this.rank[px] > this.rank[py]) {
                this.parent[py] = px;
            } else {
                this.parent[py] = px;
                this.rank[px]++;
            }
        }
    }
}

function kruskalMST(edges, V) {
    edges.sort((a, b) => a[2] - b[2]); // sort by weight
    const uf = new UnionFind(V);
    const mst = [];
    let mstWeight = 0;

    for (const [u, v, w] of edges) {
        if (uf.find(u) !== uf.find(v)) {
            uf.union(u, v);
            mst.push([u, v, w]);
            mstWeight += w;
        }
    }

    console.log("MST Edges:");
    for (const [u, v, w] of mst) {
        console.log(\`\${u} - \${v} : \${w}\`);
    }
    console.log(\`Total MST Weight: \${mstWeight}\`);
    return mst;
}`,
  },
};

export const primsAlgorithms = {
  prims: {
    java: `import java.util.*;

public class PrimsAlgorithm {
    private static final int V = 5; // Number of vertices

    // Find the vertex with minimum key value
    int minKey(int key[], Boolean mstSet[]) {
        int min = Integer.MAX_VALUE, min_index = -1;
        for (int v = 0; v < V; v++)
            if (mstSet[v] == false && key[v] < min) {
                min = key[v];
                min_index = v;
            }
        return min_index;
    }

    // Print the constructed MST
    void printMST(int parent[], int graph[][]) {
        System.out.println("Edge \\tWeight");
        for (int i = 1; i < V; i++)
            System.out.println(parent[i] + " - " + i + "\\t" + graph[i][parent[i]]);
    }

    // Construct and print MST for a graph represented using adjacency matrix
    void primMST(int graph[][]) {
        int parent[] = new int[V]; // Array to store constructed MST
        int key[] = new int[V]; // Key values used to pick minimum weight edge
        Boolean mstSet[] = new Boolean[V]; // To represent set of vertices included in MST

        // Initialize all keys as INFINITE
        for (int i = 0; i < V; i++) {
            key[i] = Integer.MAX_VALUE;
            mstSet[i] = false;
        }

        // Always include first 0th vertex in MST
        key[0] = 0; // Make key 0 so that this vertex is picked as first vertex
        parent[0] = -1; // First node is always root of MST

        // The MST will have V vertices
        for (int count = 0; count < V - 1; count++) {
            // Pick the minimum key vertex from the set of vertices not yet included in MST
            int u = minKey(key, mstSet);

            // Add the picked vertex to the MST Set
            mstSet[u] = true;

            // Update key value and parent index of the adjacent vertices
            for (int v = 0; v < V; v++)
                // graph[u][v] is non zero only for adjacent vertices of m
                // mstSet[v] is false for vertices not yet included in MST
                // Update the key only if graph[u][v] is smaller than key[v]
                if (graph[u][v] != 0 && mstSet[v] == false && graph[u][v] < key[v]) {
                    parent[v] = u;
                    key[v] = graph[u][v];
                }
        }

        // Print the constructed MST
        printMST(parent, graph);
    }
}`,
    python: `import sys

class PrimsAlgorithm:
    def __init__(self, vertices):
        self.V = vertices
        self.graph = [[0 for column in range(vertices)] for row in range(vertices)]

    def min_key(self, key, mst_set):
        min_val = sys.maxsize
        min_index = -1
        for v in range(self.V):
            if key[v] < min_val and not mst_set[v]:
                min_val = key[v]
                min_index = v
        return min_index

    def print_mst(self, parent):
        print("Edge \\tWeight")
        for i in range(1, self.V):
            print(parent[i], "-", i, "\\t", self.graph[i][parent[i]])

    def prim_mst(self):
        key = [sys.maxsize] * self.V
        parent = [None] * self.V
        key[0] = 0
        mst_set = [False] * self.V
        parent[0] = -1

        for _ in range(self.V):
            u = self.min_key(key, mst_set)
            mst_set[u] = True

            for v in range(self.V):
                if (self.graph[u][v] > 0 and
                    not mst_set[v] and
                    key[v] > self.graph[u][v]):
                    key[v] = self.graph[u][v]
                    parent[v] = u

        self.print_mst(parent)`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

#define V 5

int minKey(int key[], bool mstSet[]) {
    int min = INT_MAX, min_index;
    for (int v = 0; v < V; v++)
        if (mstSet[v] == false && key[v] < min)
            min = key[v], min_index = v;
    return min_index;
}

void printMST(int parent[], int graph[V][V]) {
    cout << "Edge \\tWeight\\n";
    for (int i = 1; i < V; i++)
        cout << parent[i] << " - " << i << " \\t" << graph[i][parent[i]] << "\\n";
}

void primMST(int graph[V][V]) {
    int parent[V];
    int key[V];
    bool mstSet[V];

    for (int i = 0; i < V; i++)
        key[i] = INT_MAX, mstSet[i] = false;

    key[0] = 0;
    parent[0] = -1;

    for (int count = 0; count < V - 1; count++) {
        int u = minKey(key, mstSet);
        mstSet[u] = true;

        for (int v = 0; v < V; v++)
            if (graph[u][v] && mstSet[v] == false && graph[u][v] < key[v])
                parent[v] = u, key[v] = graph[u][v];
    }

    printMST(parent, graph);
}`,
    javascript: `class PrimsAlgorithm {
    constructor(vertices) {
        this.V = vertices;
        this.graph = Array.from({length: vertices}, () => Array(vertices).fill(0));
    }

    minKey(key, mstSet) {
        let min = Number.MAX_VALUE, minIndex = -1;
        for (let v = 0; v < this.V; v++) {
            if (!mstSet[v] && key[v] < min) {
                min = key[v];
                minIndex = v;
            }
        }
        return minIndex;
    }

    printMST(parent) {
        console.log("Edge \\tWeight");
        for (let i = 1; i < this.V; i++) {
            console.log(\`\${parent[i]} - \${i} \\t \${this.graph[i][parent[i]]}\`);
        }
    }

    primMST() {
        const key = Array(this.V).fill(Number.MAX_VALUE);
        const parent = Array(this.V).fill(null);
        const mstSet = Array(this.V).fill(false);

        key[0] = 0;
        parent[0] = -1;

        for (let count = 0; count < this.V - 1; count++) {
            const u = this.minKey(key, mstSet);
            mstSet[u] = true;

            for (let v = 0; v < this.V; v++) {
                if (this.graph[u][v] > 0 && !mstSet[v] && this.graph[u][v] < key[v]) {
                    parent[v] = u;
                    key[v] = this.graph[u][v];
                }
            }
        }

        this.printMST(parent);
    }
}`,
  },
};

export const searchAlgorithms = {
  linearSearch: {
    java: `public static int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`,
    python: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`,
    cpp: `int linearSearch(vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`,
  },

  binarySearch: {
    java: `public static int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target)
            return mid;
        
        if (arr[mid] < target)
            left = mid + 1;
        else
            right = mid - 1;
    }
    
    return -1;
}`,
    python: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1`,
    cpp: `int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target)
            return mid;
        
        if (arr[mid] < target)
            left = mid + 1;
        else
            right = mid - 1;
    }
    
    return -1;
}`,
  },
};

// cycle detection in directed
export const cycleDetectionDirected = {
  // using dfs
  dfs: {
    java: `public static boolean hasCycleDFS(ArrayList<ArrayList<Integer>> adj) {
    boolean[] visited = new boolean[adj.size()];
    boolean[] recStack = new boolean[adj.size()];

    for (int i = 0; i < adj.size(); i++) {
        if (!visited[i]) {
            if (dfsCycle(adj, i, visited, recStack)) return true;
        }
    }
    return false;
}

private static boolean dfsCycle(ArrayList<ArrayList<Integer>> adj, int node,
                                boolean[] visited, boolean[] recStack) {
    visited[node] = true;
    recStack[node] = true;

    for (int neighbor : adj.get(node)) {
        if (!visited[neighbor] && dfsCycle(adj, neighbor, visited, recStack))
            return true;
        else if (recStack[neighbor])
            return true;
    }
    recStack[node] = false;
    return false;
}`,
    python: `def has_cycle_dfs(graph):
    visited = set()
    rec_stack = set()

    def dfs(node):
        visited.add(node)
        rec_stack.add(node)

        for neighbor in graph[node]:
            if neighbor not in visited:
                if dfs(neighbor):
                    return True
            elif neighbor in rec_stack:
                return True

        rec_stack.remove(node)
        return False

    for v in graph:
        if v not in visited:
            if dfs(v):
                return True
    return False`,

    cpp: `bool dfsCycle(int node,
              const vector<vector<int>>& adj,
              vector<bool>& visited,
              vector<bool>& recStack) {
    visited[node] = true;
    recStack[node] = true;

    for (int neighbor : adj[node]) {
        if (!visited[neighbor] && dfsCycle(neighbor, adj, visited, recStack))
            return true;
        else if (recStack[neighbor])
            return true;
    }
    recStack[node] = false;
    return false;
}

bool hasCycleDFS(const vector<vector<int>>& adj) {
    vector<bool> visited(adj.size(), false);
    vector<bool> recStack(adj.size(), false);

    for (int i = 0; i < (int)adj.size(); i++) {
        if (!visited[i]) {
            if (dfsCycle(i, adj, visited, recStack))
                return true;
        }
    }
    return false;
}`,
    javascript: `function hasCycleDFS(adj) {
    const visited = new Array(adj.length).fill(false);
    const recStack = new Array(adj.length).fill(false);

    function dfs(node) {
        visited[node] = true;
        recStack[node] = true;

        for (const neighbor of adj[node]) {
            if (!visited[neighbor] && dfs(neighbor)) return true;
            else if (recStack[neighbor]) return true;
        }
        recStack[node] = false;
        return false;
    }

    for (let i = 0; i < adj.length; i++) {
        if (!visited[i] && dfs(i)) return true;
    }
    return false;
}`,
    go: `package main

import (
	"fmt"
)

// Graph represents a directed graph using adjacency list
type Graph struct {
	adj map[int][]int
}

// AddEdge adds a directed edge u → v
func (g *Graph) AddEdge(u, v int) {
	if g.adj == nil {
		g.adj = make(map[int][]int)
	}
	g.adj[u] = append(g.adj[u], v)
}

// dfsCycle checks for a cycle using DFS
func (g *Graph) dfsCycle(node int, visited, recStack map[int]bool) bool {
	// Mark the current node as visited and part of recursion stack
	visited[node] = true
	recStack[node] = true

	for _, neighbor := range g.adj[node] {
		// If neighbor not visited, recurse
		if !visited[neighbor] {
			if g.dfsCycle(neighbor, visited, recStack) {
				return true
			}
		} else if recStack[neighbor] {
			// If neighbor is in recursion stack -> cycle detected
			return true
		}
	}

	// Remove the node from recursion stack before returning
	recStack[node] = false
	return false
}

// ContainsCycle runs DFS for all connected components
func (g *Graph) ContainsCycle() bool {
	visited := make(map[int]bool)
	recStack := make(map[int]bool)

	for node := range g.adj {
		if !visited[node] {
			if g.dfsCycle(node, visited, recStack) {
				return true
			}
		}
	}
	return false
}

func main() {
	g := Graph{}

	// Example 1: Graph with a cycle (0 → 1 → 2 → 0)
	g.AddEdge(0, 1)
	g.AddEdge(1, 2)
	g.AddEdge(2, 0)

	if g.ContainsCycle() {
		fmt.Println("Cycle detected in the directed graph!")
	} else {
		fmt.Println("No cycle found in the directed graph.")
	}

	// Example 2: Acyclic graph (0 → 1 → 2 → 3)
	g2 := Graph{}
	g2.AddEdge(0, 1)
	g2.AddEdge(1, 2)
	g2.AddEdge(2, 3)

	if g2.ContainsCycle() {
		fmt.Println("Cycle detected in the directed graph!")
	} else {
		fmt.Println("No cycle found in the directed graph.")
	}
}
`,
  },

  //using bfs --> kaha's algo
  bfs: {
    java: `public static boolean hasCycleBFS(ArrayList<ArrayList<Integer>> adj) {
    int V = adj.size();
    int[] indegree = new int[V];
    for (int u = 0; u < V; u++) {
        for (int v : adj.get(u)) indegree[v]++;
    }

    Queue<Integer> q = new LinkedList<>();
    for (int i = 0; i < V; i++) if (indegree[i] == 0) q.offer(i);

    int count = 0;
    while (!q.isEmpty()) {
        int node = q.poll();
        count++;
        for (int v : adj.get(node)) {
            if (--indegree[v] == 0) q.offer(v);
        }
    }
    return count != V; // if not all vertices processed => cycle
}`,

    python: `from collections import deque

def has_cycle_bfs(graph):
    indegree = {u: 0 for u in graph}
    for u in graph:
        for v in graph[u]:
            indegree[v] += 1

    q = deque([u for u in graph if indegree[u] == 0])
    count = 0

    while q:
        node = q.popleft()
        count += 1
        for v in graph[node]:
            indegree[v] -= 1
            if indegree[v] == 0:
                q.append(v)

    return count != len(graph)`,

    cpp: `bool hasCycleBFS(const vector<vector<int>>& adj) {
    int V = adj.size();
    vector<int> indegree(V, 0);
    for (int u = 0; u < V; u++) {
        for (int v : adj[u]) indegree[v]++;
    }

    queue<int> q;
    for (int i = 0; i < V; i++)
        if (indegree[i] == 0) q.push(i);

    int count = 0;
    while (!q.empty()) {
        int node = q.front(); q.pop();
        count++;
        for (int v : adj[node]) {
            if (--indegree[v] == 0) q.push(v);
        }
    }
    return count != V;
}`,

    javascript: `function hasCycleBFS(adj) {
    const V = adj.length;
    const indegree = new Array(V).fill(0);

    for (let u = 0; u < V; u++) {
        for (const v of adj[u]) indegree[v]++;
    }

    const q = [];
    for (let i = 0; i < V; i++) if (indegree[i] === 0) q.push(i);

    let count = 0;
    while (q.length) {
        const node = q.shift();
        count++;
        for (const v of adj[node]) {
            if (--indegree[v] === 0) q.push(v);
        }
    }
    return count !== V;
}`,
    go: `package main

import (
	"fmt"
)

// Graph represents a directed graph using adjacency list
type Graph struct {
	adj map[int][]int
}

// AddEdge adds a directed edge u → v
func (g *Graph) AddEdge(u, v int) {
	if g.adj == nil {
		g.adj = make(map[int][]int)
	}
	g.adj[u] = append(g.adj[u], v)
}

// ContainsCycleKahn detects cycle using BFS (Kahn’s Algorithm)
func (g *Graph) ContainsCycleKahn() bool {
	inDegree := make(map[int]int)

	// Initialize in-degree for all nodes
	for u := range g.adj {
		if _, exists := inDegree[u]; !exists {
			inDegree[u] = 0
		}
		for _, v := range g.adj[u] {
			inDegree[v]++
		}
	}

	// Queue for nodes with in-degree 0
	queue := []int{}
	for node, deg := range inDegree {
		if deg == 0 {
			queue = append(queue, node)
		}
	}

	count := 0 // To count processed nodes

	for len(queue) > 0 {
		curr := queue[0]
		queue = queue[1:]
		count++

		for _, neighbor := range g.adj[curr] {
			inDegree[neighbor]--
			if inDegree[neighbor] == 0 {
				queue = append(queue, neighbor)
			}
		}
	}

	// If processed nodes != total nodes ⇒ cycle exists
	if count != len(inDegree) {
		return true // Cycle detected
	}
	return false // No cycle
}

func main() {
	g := Graph{}

	// Example 1: Graph with a cycle (0 → 1 → 2 → 0)
	g.AddEdge(0, 1)
	g.AddEdge(1, 2)
	g.AddEdge(2, 0)

	if g.ContainsCycleKahn() {
		fmt.Println("Cycle detected in the directed graph!")
	} else {
		fmt.Println("No cycle found in the directed graph.")
	}

	// Example 2: Acyclic graph (0 → 1 → 2 → 3)
	g2 := Graph{}
	g2.AddEdge(0, 1)
	g2.AddEdge(1, 2)
	g2.AddEdge(2, 3)

	if g2.ContainsCycleKahn() {
		fmt.Println("Cycle detected in the directed graph!")
	} else {
		fmt.Println("No cycle found in the directed graph.")
	}
}`,
  },
};

// cycle detection in undirected
export const cycleDetectionUndirected = {
  dfs: {
    java: `public static boolean hasCycleDFS(ArrayList<ArrayList<Integer>> adj) {
    boolean[] visited = new boolean[adj.size()];
    for (int i = 0; i < adj.size(); i++) {
        if (!visited[i]) {
            if (dfsCycle(adj, i, -1, visited)) return true;
        }
    }
    return false;
}

private static boolean dfsCycle(ArrayList<ArrayList<Integer>> adj,
                                int node, int parent,
                                boolean[] visited) {
    visited[node] = true;
    for (int neighbor : adj.get(node)) {
        if (!visited[neighbor]) {
            if (dfsCycle(adj, neighbor, node, visited)) return true;
        } else if (neighbor != parent) {
            return true;
        }
    }
    return false;
}`,

    python: `def has_cycle_dfs(graph):
    visited = set()

    def dfs(node, parent):
        visited.add(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                if dfs(neighbor, node):
                    return True
            elif neighbor != parent:
                return True
        return False

    for v in graph:
        if v not in visited:
            if dfs(v, -1):
                return True
    return False`,

    cpp: `bool dfsCycle(int node, int parent,
              const vector<vector<int>>& adj,
              vector<bool>& visited) {
    visited[node] = true;
    for (int neighbor : adj[node]) {
        if (!visited[neighbor]) {
            if (dfsCycle(neighbor, node, adj, visited))
                return true;
        } else if (neighbor != parent) {
            return true;
        }
    }
    return false;
}

bool hasCycleDFS(const vector<vector<int>>& adj) {
    vector<bool> visited(adj.size(), false);
    for (int i = 0; i < (int)adj.size(); i++) {
        if (!visited[i]) {
            if (dfsCycle(i, -1, adj, visited))
                return true;
        }
    }
    return false;
}`,

    javascript: `function hasCycleDFS(adj) {
    const visited = new Array(adj.length).fill(false);

    function dfs(node, parent) {
        visited[node] = true;
        for (const neighbor of adj[node]) {
            if (!visited[neighbor]) {
                if (dfs(neighbor, node)) return true;
            } else if (neighbor !== parent) {
                return true;
            }
        }
        return false;
    }

    for (let i = 0; i < adj.length; i++) {
        if (!visited[i] && dfs(i, -1)) return true;
    }
    return false;
}`,
    go: `package main

import (
	"fmt"
)

// Graph represents an undirected graph using adjacency list
type Graph struct {
	adj map[int][]int
}

// AddEdge adds an edge between two vertices
func (g *Graph) AddEdge(u, v int) {
	if g.adj == nil {
		g.adj = make(map[int][]int)
	}
	g.adj[u] = append(g.adj[u], v)
	g.adj[v] = append(g.adj[v], u)
}

// dfsCycle checks for a cycle using DFS
func (g *Graph) dfsCycle(node, parent int, visited map[int]bool) bool {
	visited[node] = true

	for _, neighbor := range g.adj[node] {
		if !visited[neighbor] {
			// Recur for unvisited neighbor
			if g.dfsCycle(neighbor, node, visited) {
				return true
			}
		} else if neighbor != parent {
			// Visited neighbor not equal to parent ⇒ cycle
			return true
		}
	}
	return false
}

// ContainsCycle runs DFS for all connected components
func (g *Graph) ContainsCycle() bool {
	visited := make(map[int]bool)

	for node := range g.adj {
		if !visited[node] {
			if g.dfsCycle(node, -1, visited) {
				return true
			}
		}
	}
	return false
}

func main() {
	g := Graph{}

	// Example 1: Graph with a cycle
	g.AddEdge(0, 1)
	g.AddEdge(1, 2)
	g.AddEdge(2, 0)
	g.AddEdge(2, 3)

	if g.ContainsCycle() {
		fmt.Println("Cycle detected in the graph!")
	} else {
		fmt.Println("No cycle found in the graph.")
	}
}`,
  },

  bfs: {
    java: `public static boolean hasCycleBFS(ArrayList<ArrayList<Integer>> adj) {
    boolean[] visited = new boolean[adj.size()];

    for (int start = 0; start < adj.size(); start++) {
        if (visited[start]) continue;

        Queue<int[]> q = new LinkedList<>();
        q.offer(new int[]{start, -1});
        visited[start] = true;

        while (!q.isEmpty()) {
            int[] cur = q.poll();
            int node = cur[0], parent = cur[1];

            for (int neighbor : adj.get(node)) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    q.offer(new int[]{neighbor, node});
                } else if (neighbor != parent) {
                    return true;
                }
            }
        }
    }
    return false;
}`,

    python: `from collections import deque

def has_cycle_bfs(graph):
    visited = set()

    for start in graph:
        if start in visited:
            continue
        queue = deque([(start, -1)])
        visited.add(start)

        while queue:
            node, parent = queue.popleft()
            for neighbor in graph[node]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append((neighbor, node))
                elif neighbor != parent:
                    return True
    return False`,

    cpp: `bool hasCycleBFS(const vector<vector<int>>& adj) {
    vector<bool> visited(adj.size(), false);

    for (int start = 0; start < (int)adj.size(); start++) {
        if (visited[start]) continue;

        queue<pair<int,int>> q;
        q.push({start, -1});
        visited[start] = true;

        while (!q.empty()) {
            auto [node, parent] = q.front();
            q.pop();

            for (int neighbor : adj[node]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    q.push({neighbor, node});
                } else if (neighbor != parent) {
                    return true;
                }
            }
        }
    }
    return false;
}`,

    javascript: `function hasCycleBFS(adj) {
    const visited = new Array(adj.length).fill(false);

    for (let start = 0; start < adj.length; start++) {
        if (visited[start]) continue;

        const q = [[start, -1]];
        visited[start] = true;

        while (q.length) {
            const [node, parent] = q.shift();

            for (const neighbor of adj[node]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    q.push([neighbor, node]);
                } else if (neighbor !== parent) {
                    return true;
                }
            }
        }
    }
    return false;
}`,
    go: `package main

import (
	"fmt"
)

// Graph represents an undirected graph using adjacency list
type Graph struct {
	adj map[int][]int
}

// AddEdge adds an edge to the undirected graph
func (g *Graph) AddEdge(u, v int) {
	if g.adj == nil {
		g.adj = make(map[int][]int)
	}
	g.adj[u] = append(g.adj[u], v)
	g.adj[v] = append(g.adj[v], u)
}

// hasCycleBFS checks if the graph has a cycle using BFS
func (g *Graph) hasCycleBFS(start int, visited map[int]bool) bool {
	type nodeParent struct {
		node   int
		parent int
	}

	queue := []nodeParent{{start, -1}}
	visited[start] = true

	for len(queue) > 0 {
		curr := queue[0]
		queue = queue[1:]

		for _, neighbor := range g.adj[curr.node] {
			if !visited[neighbor] {
				visited[neighbor] = true
				queue = append(queue, nodeParent{neighbor, curr.node})
			} else if neighbor != curr.parent {
				// Visited neighbor that isn't parent ⇒ cycle found
				return true
			}
		}
	}
	return false
}

// ContainsCycle runs BFS for all components
func (g *Graph) ContainsCycle() bool {
	visited := make(map[int]bool)

	for node := range g.adj {
		if !visited[node] {
			if g.hasCycleBFS(node, visited) {
				return true
			}
		}
	}
	return false
}

func main() {
	g := Graph{}

	// Example graph (with a cycle)
	g.AddEdge(0, 1)
	g.AddEdge(1, 2)
	g.AddEdge(2, 0)
	g.AddEdge(2, 3)

	if g.ContainsCycle() {
		fmt.Println("Cycle detected in the graph!")
	} else {
		fmt.Println("No cycle found in the graph.")
	}
}`,
  },
};

export const graphAlgorithms = {
  bfs: {
    java: `public static void BFS(ArrayList<ArrayList<Integer>> adj, int start) {
    boolean[] visited = new boolean[adj.size()];
    Queue<Integer> queue = new LinkedList<>();
    
    visited[start] = true;
    queue.offer(start);
    
    while (!queue.isEmpty()) {
        int node = queue.poll();
        System.out.print(node + " ");
        
        for (int neighbor : adj.get(node)) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.offer(neighbor);
            }
        }
    }
}`,
    python: `from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)
    result = []
    
    while queue:
        node = queue.popleft()
        result.append(node)
        
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    
    return result`,

    cpp: `void BFS(vector<vector<int>>& adj, int start) {
    vector<bool> visited(adj.size(), false);
    queue<int> q;
    
    visited[start] = true;
    q.push(start);
    
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        cout << node << " ";
        
        for (int neighbor : adj[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
}`,
    javascript: `function BFS(adj, start) {
    let visited = new Array(adj.length).fill(false);
    let q = [];

    visited[start] = true;
    q.push(start);

    while (q.length > 0) {
        let node = q.shift();  // dequeue
        process.stdout.write(node + " "); // similar to cout in C++

        for (let neighbor of adj[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
}
}`,
    go: `package main

import "container/list"

func BFS(adj [][]int, start int) {
    visited := make([]bool, len(adj))
    queue := list.New()
    visited[start] = true
    queue.PushBack(start)
    for queue.Len() > 0 {
        node := queue.Remove(queue.Front()).(int)
        // Process node here (e.g., print)
        for _, neighbor := range adj[node] {
            if !visited[neighbor] {
                visited[neighbor] = true
                queue.PushBack(neighbor)
            }
        }
    }
}`,
  },

  dfs: {
    java: `public static void DFS(ArrayList<ArrayList<Integer>> adj, int node, boolean[] visited) {
    visited[node] = true;
    System.out.print(node + " ");
    
    for (int neighbor : adj.get(node)) {
        if (!visited[neighbor]) {
            DFS(adj, neighbor, visited);
        }
    }
}`,
    python: `def dfs(graph, node, visited=None):
    if visited is None:
        visited = set()
    
    visited.add(node)
    result = [node]
    
    for neighbor in graph[node]:
        if neighbor not in visited:
            result.extend(dfs(graph, neighbor, visited))
    
    return result`,
    cpp: `void DFS(vector<vector<int>>& adj, int node, vector<bool>& visited) {
    visited[node] = true;
    cout << node << " ";
    
    for (int neighbor : adj[node]) {
        if (!visited[neighbor]) {
            DFS(adj, neighbor, visited);
        }
    }
}`,
    go: `package main

func DFS(adj [][]int, node int, visited []bool) {
    visited[node] = true
    // Process node here (e.g., print)
    for _, neighbor := range adj[node] {
        if !visited[neighbor] {
            DFS(adj, neighbor, visited)
        }
    }
}`,
  },

  dijkstra: {
    java: `public static int[] dijkstra(int[][] graph, int src) {
    int V = graph.length;
    int[] dist = new int[V];
    boolean[] sptSet = new boolean[V];
    
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[src] = 0;
    
    for (int count = 0; count < V - 1; count++) {
        int u = minDistance(dist, sptSet);
        sptSet[u] = true;
        
        for (int v = 0; v < V; v++) {
            if (!sptSet[v] && graph[u][v] != 0 && 
                dist[u] != Integer.MAX_VALUE && 
                dist[u] + graph[u][v] < dist[v]) {
                dist[v] = dist[u] + graph[u][v];
            }
        }
    }
    
    return dist;
}`,
    python: `import heapq

def dijkstra(graph, start):
    distances = {node: float('infinity') for node in graph}
    distances[start] = 0
    pq = [(0, start)]
    
    while pq:
        current_distance, current_node = heapq.heappop(pq)
        
        if current_distance > distances[current_node]:
            continue
        
        for neighbor, weight in graph[current_node].items():
            distance = current_distance + weight
            
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
    
    return distances`,
    cpp: `vector<int> dijkstra(vector<vector<pair<int, int>>>& graph, int src) {
    int V = graph.size();
    vector<int> dist(V, INT_MAX);
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    
    dist[src] = 0;
    pq.push({0, src});
    
    while (!pq.empty()) {
        int u = pq.top().second;
        pq.pop();
        
        for (auto& edge : graph[u]) {
            int v = edge.first;
            int weight = edge.second;
            
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }
    
    return dist;
}`,
    go: `package main

import (
    "container/heap"
    "math"
)

type Item struct {
    node, priority int
}

type PriorityQueue []*Item

func (pq PriorityQueue) Len() int { return len(pq) }
func (pq PriorityQueue) Less(i, j int) bool { return pq[i].priority < pq[j].priority }
func (pq PriorityQueue) Swap(i, j int) { pq[i], pq[j] = pq[j], pq[i] }
func (pq *PriorityQueue) Push(x interface{}) { *pq = append(*pq, x.(*Item)) }
func (pq *PriorityQueue) Pop() interface{} {
    old := *pq
    n := len(old)
    item := old[n-1]
    *pq = old[0 : n-1]
    return item
}

func Dijkstra(graph map[int]map[int]int, src int) map[int]int {
    dist := make(map[int]int)
    for node := range graph { dist[node] = math.MaxInt32 }
    dist[src] = 0
    pq := &PriorityQueue{&Item{node: src, priority: 0}}
    heap.Init(pq)
    for pq.Len() > 0 {
        u := heap.Pop(pq).(*Item).node
        for v, weight := range graph[u] {
            if dist[u]+weight < dist[v] {
                dist[v] = dist[u] + weight
                heap.Push(pq, &Item{node: v, priority: dist[v]})
            }
        }
    }
    return dist
}`,
  },

  bellmanFord: {
    java: `public static boolean bellmanFord(int[][] edges, int V, int src, int[] dist) {
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[src] = 0;
    
    for (int i = 0; i < V - 1; i++) {
        for (int[] edge : edges) {
            int u = edge[0], v = edge[1], w = edge[2];
            if (dist[u] != Integer.MAX_VALUE && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }
    
    for (int[] edge : edges) {
        int u = edge[0], v = edge[1], w = edge[2];
        if (dist[u] != Integer.MAX_VALUE && dist[u] + w < dist[v]) {
            return false; // Negative cycle detected
        }
    }
    
    return true;
}`,
    python: `def bellman_ford(graph, start):
    distances = {node: float('infinity') for node in graph}
    distances[start] = 0
    
    for _ in range(len(graph) - 1):
        for node in graph:
            for neighbor, weight in graph[node].items():
                if distances[node] + weight < distances[neighbor]:
                    distances[neighbor] = distances[node] + weight
    
    # Check for negative cycles
    for node in graph:
        for neighbor, weight in graph[node].items():
            if distances[node] + weight < distances[neighbor]:
                return None  # Negative cycle detected
    
    return distances`,
    cpp: `bool bellmanFord(vector<vector<int>>& edges, int V, int src, vector<int>& dist) {
    dist.assign(V, INT_MAX);
    dist[src] = 0;
    
    for (int i = 0; i < V - 1; i++) {
        for (auto& edge : edges) {
            int u = edge[0], v = edge[1], w = edge[2];
            if (dist[u] != INT_MAX && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }
    
    for (auto& edge : edges) {
        int u = edge[0], v = edge[1], w = edge[2];
        if (dist[u] != INT_MAX && dist[u] + w < dist[v]) {
            return false; // Negative cycle detected
        }
    }
    
    return true;
}`,
    go: `package main

import "math"

func BellmanFord(edges [][]int, V, src int) ([]int, bool) {
    dist := make([]int, V)
    for i := range dist { dist[i] = math.MaxInt32 }
    dist[src] = 0

    for i := 0; i < V-1; i++ {
        for _, edge := range edges {
            u, v, w := edge[0], edge[1], edge[2]
            if dist[u] != math.MaxInt32 && dist[u]+w < dist[v] {
                dist[v] = dist[u] + w
            }
        }
    }
    // Check for negative cycles
    for _, edge := range edges {
        u, v, w := edge[0], edge[1], edge[2]
        if dist[u] != math.MaxInt32 && dist[u]+w < dist[v] {
            return nil, false // Negative cycle
        }
    }
    return dist, true
}`,
  },

  floydWarshall: {
    java: `void floydWarshall(int[][] graph) {
    int V = graph.length;
    int[][] dist = new int[V][V];

    for (int i = 0; i < V; i++) {
        for (int j = 0; j < V; j++) {
            dist[i][j] = graph[i][j];
        }
    }

    for (int k = 0; k < V; k++) {
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
}`,
    python: `def floyd_warshall(graph):
    V = len(graph)
    dist = [[float('inf')] * V for _ in range(V)]

    for i in range(V):
        for j in range(V):
            if i == j:
                dist[i][j] = 0
            elif graph[i][j] != 0:
                dist[i][j] = graph[i][j]

    for k in range(V):
        for i in range(V):
            for j in range(V):
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])

    return dist`,
    cpp: `void floydWarshall(vector<vector<int>>& graph) {
    int V = graph.size();
    vector<vector<int>> dist = graph;

    for (int k = 0; k < V; k++) {
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
}`,
    go: `package main

import "math"

func FloydWarshall(graph [][]int) [][]int {
    V := len(graph)
    dist := make([][]int, V)
    for i := range dist {
        dist[i] = make([]int, V)
        copy(dist[i], graph[i])
    }

    for k := 0; k < V; k++ {
        for i := 0; i < V; i++ {
            for j := 0; j < V; j++ {
                if dist[i][k] != math.MaxInt32 && dist[k][j] != math.MaxInt32 && dist[i][k]+dist[k][j] < dist[i][j] {
                    dist[i][j] = dist[i][k] + dist[k][j]
                }
            }
        }
    }
    return dist
}`,
  },

  astar: {
    java: `import java.util.*;

class Node implements Comparable<Node> {
    int row, col, f, g, h;
    Node parent;

    Node(int r, int c) {
        row = r; col = c;
        f = g = h = 0;
        parent = null;
    }

    public int compareTo(Node other) {
        return Integer.compare(this.f, other.f);
    }
}

public class AStar {
    private static final int[] dr = {-1, 0, 1, 0};
    private static final int[] dc = {0, 1, 0, -1};

    public static List<Node> findPath(int[][] grid, int startRow, int startCol, int endRow, int endCol) {
        int rows = grid.length;
        int cols = grid[0].length;

        PriorityQueue<Node> openSet = new PriorityQueue<>();
        Set<String> closedSet = new HashSet<>();

        Node start = new Node(startRow, startCol);
        start.g = 0;
        start.h = manhattanDistance(startRow, startCol, endRow, endCol);
        start.f = start.g + start.h;

        openSet.add(start);

        while (!openSet.isEmpty()) {
            Node current = openSet.poll();
            String key = current.row + "," + current.col;

            if (closedSet.contains(key)) continue;
            closedSet.add(key);

            if (current.row == endRow && current.col == endCol) {
                return reconstructPath(current);
            }

            for (int i = 0; i < 4; i++) {
                int newRow = current.row + dr[i];
                int newCol = current.col + dc[i];

                if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols &&
                    grid[newRow][newCol] != 1) { // 1 represents wall

                    Node neighbor = new Node(newRow, newCol);
                    neighbor.g = current.g + 1;
                    neighbor.h = manhattanDistance(newRow, newCol, endRow, endCol);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.parent = current;

                    openSet.add(neighbor);
                }
            }
        }

        return new ArrayList<>(); // No path found
    }

    private static int manhattanDistance(int r1, int c1, int r2, int c2) {
        return Math.abs(r1 - r2) + Math.abs(c1 - c2);
    }

    private static List<Node> reconstructPath(Node end) {
        List<Node> path = new ArrayList<>();
        Node current = end;
        while (current != null) {
            path.add(0, current);
            current = current.parent;
        }
        return path;
    }
}`,
    python: `import heapq

class Node:
    def __init__(self, row, col):
        self.row = row
        self.col = col
        self.f = 0
        self.g = 0
        self.h = 0
        self.parent = None

    def __lt__(self, other):
        return self.f < other.f

def manhattan_distance(r1, c1, r2, c2):
    return abs(r1 - r2) + abs(c1 - c2)

def astar(grid, start_row, start_col, end_row, end_col):
    rows, cols = len(grid), len(grid[0])
    directions = [(-1, 0), (0, 1), (1, 0), (0, -1)]

    open_set = []
    heapq.heappush(open_set, (0, Node(start_row, start_col)))
    closed_set = set()

    start_node = Node(start_row, start_col)
    start_node.g = 0
    start_node.h = manhattan_distance(start_row, start_col, end_row, end_col)
    start_node.f = start_node.g + start_node.h

    node_map = {(start_row, start_col): start_node}

    while open_set:
        current_f, current = heapq.heappop(open_set)

        if (current.row, current.col) in closed_set:
            continue
        closed_set.add((current.row, current.col))

        if current.row == end_row and current.col == end_col:
            path = []
            while current:
                path.append((current.row, current.col))
                current = current.parent
            return path[::-1]

        for dr, dc in directions:
            new_row, new_col = current.row + dr, current.col + dc

            if (0 <= new_row < rows and 0 <= new_col < cols and
                grid[new_row][new_col] != 1):  # 1 represents wall

                neighbor = Node(new_row, new_col)
                neighbor.g = current.g + 1
                neighbor.h = manhattan_distance(new_row, new_col, end_row, end_col)
                neighbor.f = neighbor.g + neighbor.h
                neighbor.parent = current

                if (new_row, new_col) not in node_map or neighbor.g < node_map[(new_row, new_col)].g:
                    node_map[(new_row, new_col)] = neighbor
                    heapq.heappush(open_set, (neighbor.f, neighbor))

    return []  # No path found`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

struct Node {
    int row, col, f, g, h;
    Node* parent;

    Node(int r, int c) : row(r), col(c), f(0), g(0), h(0), parent(nullptr) {}

    bool operator>(const Node& other) const {
        return f > other.f;
    }
};

int manhattanDistance(int r1, int c1, int r2, int c2) {
    return abs(r1 - r2) + abs(c1 - c2);
}

vector<pair<int, int>> reconstructPath(Node* end) {
    vector<pair<int, int>> path;
    Node* current = end;
    while (current) {
        path.emplace_back(current->row, current->col);
        current = current->parent;
    }
    reverse(path.begin(), path.end());
    return path;
}

vector<pair<int, int>> aStar(const vector<vector<int>>& grid, int startRow, int startCol, int endRow, int endCol) {
    int rows = grid.size();
    int cols = grid[0].size();
    vector<pair<int, int>> directions = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};

    auto cmp = [](Node* a, Node* b) { return a->f > b->f; };
    priority_queue<Node*, vector<Node*>, decltype(cmp)> openSet(cmp);
    unordered_set<string> closedSet;

    Node* start = new Node(startRow, startCol);
    start->g = 0;
    start->h = manhattanDistance(startRow, startCol, endRow, endCol);
    start->f = start->g + start->h;

    openSet.push(start);
    unordered_map<string, Node*> nodeMap;
    nodeMap[to_string(startRow) + "," + to_string(startCol)] = start;

    while (!openSet.empty()) {
        Node* current = openSet.top();
        openSet.pop();

        string key = to_string(current->row) + "," + to_string(current->col);
        if (closedSet.find(key) != closedSet.end()) continue;
        closedSet.insert(key);

        if (current->row == endRow && current->col == endCol) {
            vector<pair<int, int>> path = reconstructPath(current);
            // Clean up memory
            for (auto& p : nodeMap) delete p.second;
            return path;
        }

        for (auto& dir : directions) {
            int newRow = current->row + dir.first;
            int newCol = current->col + dir.second;

            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols &&
                grid[newRow][newCol] != 1) {  // 1 represents wall

                string neighborKey = to_string(newRow) + "," + to_string(newCol);
                Node* neighbor;

                if (nodeMap.find(neighborKey) == nodeMap.end()) {
                    neighbor = new Node(newRow, newCol);
                    nodeMap[neighborKey] = neighbor;
                } else {
                    neighbor = nodeMap[neighborKey];
                }

                int tentativeG = current->g + 1;

                if (tentativeG < neighbor->g || neighbor->g == 0) {
                    neighbor->parent = current;
                    neighbor->g = tentativeG;
                    neighbor->h = manhattanDistance(newRow, newCol, endRow, endCol);
                    neighbor->f = neighbor->g + neighbor->h;

                    openSet.push(neighbor);
                }
            }
        }
    }

    // Clean up memory
    for (auto& p : nodeMap) delete p.second;
    return {};  // No path found
}`,
    javascript: `class Node {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.parent = null;
    }
}

function manhattanDistance(r1, c1, r2, c2) {
    return Math.abs(r1 - r2) + Math.abs(c1 - c2);
}

function aStar(grid, startRow, startCol, endRow, endCol) {
    const rows = grid.length;
    const cols = grid[0].length;
    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];

    const openSet = new PriorityQueue((a, b) => a.f - b.f);
    const closedSet = new Set();

    const start = new Node(startRow, startCol);
    start.g = 0;
    start.h = manhattanDistance(startRow, startCol, endRow, endCol);
    start.f = start.g + start.h;

    openSet.push(start);
    const nodeMap = new Map();
    nodeMap.set(\`\${startRow},\${startCol}\`, start);

    while (!openSet.isEmpty()) {
        const current = openSet.pop();

        const key = \`\${current.row},\${current.col}\`;
        if (closedSet.has(key)) continue;
        closedSet.add(key);

        if (current.row === endRow && current.col === endCol) {
            const path = [];
            let temp = current;
            while (temp) {
                path.unshift([temp.row, temp.col]);
                temp = temp.parent;
            }
            return path;
        }

        for (const [dr, dc] of directions) {
            const newRow = current.row + dr;
            const newCol = current.col + dc;

            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols &&
                grid[newRow][newCol] !== 1) {  // 1 represents wall

                const neighborKey = \`\${newRow},\${newCol}\`;
                let neighbor = nodeMap.get(neighborKey);

                if (!neighbor) {
                    neighbor = new Node(newRow, newCol);
                    nodeMap.set(neighborKey, neighbor);
                }

                const tentativeG = current.g + 1;

                if (tentativeG < neighbor.g || neighbor.g === 0) {
                    neighbor.parent = current;
                    neighbor.g = tentativeG;
                    neighbor.h = manhattanDistance(newRow, newCol, endRow, endCol);
                    neighbor.f = neighbor.g + neighbor.h;

                    openSet.push(neighbor);
                }
            }
        }
    }

    return [];  // No path found
}

// Simple Priority Queue implementation for JavaScript
class PriorityQueue {
    constructor(comparator = (a, b) => a - b) {
        this.heap = [];
        this.comparator = comparator;
    }

    push(item) {
        this.heap.push(item);
        this.heap.sort(this.comparator);
    }

    pop() {
        return this.heap.shift();
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}`,
  },
};

export const otherAlgorithms = {
  // ...existing code...
};

export const linkedListAlgorithms = {
  insertAtBeginning: {
    java: `public void insertAtBeginning(int data) {
    Node newNode = new Node(data);
    newNode.next = head;
    head = newNode;
    size++;
}

class Node {
    int data;
    Node next;
    
    Node(int data) {
        this.data = data;
        this.next = null;
    }
}`,
    python: `def insert_at_beginning(self, data):
    new_node = Node(data)
    new_node.next = self.head
    self.head = new_node
    self.size += 1

class Node:
    def __init__(self, data):
        self.data = data
        self.next = None`,
    cpp: `void insertAtBeginning(int data) {
    Node* newNode = new Node(data);
    newNode->next = head;
    head = newNode;
    size++;
}

struct Node {
    int data;
    Node* next;
    
    Node(int data) {
        this->data = data;
        this->next = nullptr;
    }
};`,
go: `package main

import "fmt"

// Define Node structure
type Node struct {
	data int
	next *Node
}

// Define LinkedList structure
type LinkedList struct {
	head *Node
}

// InsertAtBeginning inserts a new node at the start of the list
func (list *LinkedList) InsertAtBeginning(data int) {
	newNode := &Node{data: data}
	newNode.next = list.head  // Point new node to current head
	list.head = newNode       // Update head to new node
}

// Display prints the linked list elements
func (list *LinkedList) Display() {
	curr := list.head
	if curr == nil {
		fmt.Println("List is empty")
		return
	}
	for curr != nil {
		fmt.Printf("%d -> ", curr.data)
		curr = curr.next
	}
	fmt.Println("nil")
}

func main() {
	list := &LinkedList{}

	list.InsertAtBeginning(30)
	list.InsertAtBeginning(20)
	list.InsertAtBeginning(10)

	fmt.Println("Linked List after inserting at beginning:")
	list.Display()
}`,
  },

  insertAtEnd: {
    java: `public void insertAtEnd(int data) {
    Node newNode = new Node(data);
    
    if (head == null) {
        head = newNode;
        size++;
        return;
    }
    
    Node current = head;
    while (current.next != null) {
        current = current.next;
    }
    
    current.next = newNode;
    size++;
}`,
    python: `def insert_at_end(self, data):
    new_node = Node(data)
    
    if not self.head:
        self.head = new_node
        self.size += 1
        return
    
    current = self.head
    while current.next:
        current = current.next
    
    current.next = new_node
    self.size += 1`,
    cpp: `void insertAtEnd(int data) {
    Node* newNode = new Node(data);
    
    if (head == nullptr) {
        head = newNode;
        size++;
        return;
    }
    
    Node* current = head;
    while (current->next != nullptr) {
        current = current->next;
    }
    
    current->next = newNode;
    size++;
}`, 
    go: `package main

import "fmt"

// Node represents a single element in the linked list
type Node struct {
	data int
	next *Node
}

// LinkedList represents the linked list structure
type LinkedList struct {
	head *Node
}

// InsertAtEnd adds a new node at the end of the linked list
func (list *LinkedList) InsertAtEnd(data int) {
	newNode := &Node{data: data}

	// If list is empty, new node becomes the head
	if list.head == nil {
		list.head = newNode
		return
	}

	// Traverse to the last node
	curr := list.head
	for curr.next != nil {
		curr = curr.next
	}

	// Link the new node at the end
	curr.next = newNode
}

// Display prints all the elements in the linked list
func (list *LinkedList) Display() {
	curr := list.head
	if curr == nil {
		fmt.Println("List is empty")
		return
	}
	for curr != nil {
		fmt.Printf("%d -> ", curr.data)
		curr = curr.next
	}
	fmt.Println("nil")
}

func main() {
	list := &LinkedList{}

	list.InsertAtEnd(10)
	list.InsertAtEnd(20)
	list.InsertAtEnd(30)
	list.InsertAtEnd(40)

	fmt.Println("Linked List after inserting at end:")
	list.Display()
}`,
  },

  insertAtPosition: {
    java: `public void insertAtPosition(int data, int position) {
    if (position < 0 || position > size) {
        throw new IndexOutOfBoundsException("Invalid position");
    }
    
    if (position == 0) {
        insertAtBeginning(data);
        return;
    }
    
    Node newNode = new Node(data);
    Node current = head;
    
    for (int i = 0; i < position - 1; i++) {
        current = current.next;
    }
    
    newNode.next = current.next;
    current.next = newNode;
    size++;
}`,
    python: `def insert_at_position(self, data, position):
    if position < 0 or position > self.size:
        raise IndexError("Invalid position")
    
    if position == 0:
        self.insert_at_beginning(data)
        return
    
    new_node = Node(data)
    current = self.head
    
    for i in range(position - 1):
        current = current.next
    
    new_node.next = current.next
    current.next = new_node
    self.size += 1`,
    cpp: `void insertAtPosition(int data, int position) {
    if (position < 0 || position > size) {
        throw std::out_of_range("Invalid position");
    }
    
    if (position == 0) {
        insertAtBeginning(data);
        return;
    }
    
    Node* newNode = new Node(data);
    Node* current = head;
    
    for (int i = 0; i < position - 1; i++) {
        current = current->next;
    }
    
    newNode->next = current->next;
    current->next = newNode;
    size++;
}`,
    go:`package main

import "fmt"

// Node represents a node in the linked list
type Node struct {
	data int
	next *Node
}

// LinkedList represents the linked list
type LinkedList struct {
	head *Node
}

// InsertAtPosition inserts a node at the given position (1-based index)
func (list *LinkedList) InsertAtPosition(data int, position int) {
	newNode := &Node{data: data}

	// If inserting at the beginning (position 1)
	if position == 1 {
		newNode.next = list.head
		list.head = newNode
		return
	}

	// Traverse to the node before the desired position
	curr := list.head
	for i := 1; curr != nil && i < position-1; i++ {
		curr = curr.next
	}

	// If position is out of bounds
	if curr == nil {
		fmt.Println("Error: Position out of range")
		return
	}

	// Insert the new node
	newNode.next = curr.next
	curr.next = newNode
}

// Display prints all elements in the linked list
func (list *LinkedList) Display() {
	curr := list.head
	if curr == nil {
		fmt.Println("List is empty")
		return
	}
	for curr != nil {
		fmt.Printf("%d -> ", curr.data)
		curr = curr.next
	}
	fmt.Println("nil")
}

func main() {
	list := &LinkedList{}

	// Inserting some initial elements
	list.InsertAtPosition(10, 1) // 10
	list.InsertAtPosition(20, 2) // 10 -> 20
	list.InsertAtPosition(30, 3) // 10 -> 20 -> 30
	list.InsertAtPosition(25, 3) // 10 -> 20 -> 25 -> 30
	list.InsertAtPosition(5, 1)  // 5 -> 10 -> 20 -> 25 -> 30

	fmt.Println("Linked List after inserting at various positions:")
	list.Display()
}`,
  },

  deleteNode: {
    java: `public boolean delete(int data) {
    if (head == null) return false;
    
    // Delete head node
    if (head.data == data) {
        head = head.next;
        size--;
        return true;
    }
    
    Node current = head;
    while (current.next != null) {
        if (current.next.data == data) {
            current.next = current.next.next;
            size--;
            return true;
        }
        current = current.next;
    }
    
    return false; // Node not found
}`,
    python: `def delete(self, data):
    if not self.head:
        return False
    
    # Delete head node
    if self.head.data == data:
        self.head = self.head.next
        self.size -= 1
        return True
    
    current = self.head
    while current.next:
        if current.next.data == data:
            current.next = current.next.next
            self.size -= 1
            return True
        current = current.next
    
    return False  # Node not found`,
    cpp: `bool deleteNode(int data) {
    if (head == nullptr) return false;
    
    // Delete head node
    if (head->data == data) {
        Node* temp = head;
        head = head->next;
        delete temp;
        size--;
        return true;
    }
    
    Node* current = head;
    while (current->next != nullptr) {
        if (current->next->data == data) {
            Node* temp = current->next;
            current->next = current->next->next;
            delete temp;
            size--;
            return true;
        }
        current = current->next;
    }
    
    return false; // Node not found
}`,
    go:`package main

import "fmt"

// Node represents an element of the linked list
type Node struct {
	data int
	next *Node
}

// LinkedList represents the linked list
type LinkedList struct {
	head *Node
}

// InsertAtEnd adds a new node at the end (for testing purpose)
func (list *LinkedList) InsertAtEnd(data int) {
	newNode := &Node{data: data}
	if list.head == nil {
		list.head = newNode
		return
	}
	curr := list.head
	for curr.next != nil {
		curr = curr.next
	}
	curr.next = newNode
}

// DeleteNode deletes a node at a specific position (1-based index)
func (list *LinkedList) DeleteNode(position int) {
	if list.head == nil {
		fmt.Println("Error: List is empty")
		return
	}

	// If deleting the head node
	if position == 1 {
		list.head = list.head.next
		return
	}

	// Traverse to the node before the one to delete
	curr := list.head
	for i := 1; curr != nil && i < position-1; i++ {
		curr = curr.next
	}

	// If position is invalid
	if curr == nil || curr.next == nil {
		fmt.Println("Error: Position out of range")
		return
	}

	// Skip the node to delete
	curr.next = curr.next.next
}

// Display prints all elements in the linked list
func (list *LinkedList) Display() {
	curr := list.head
	if curr == nil {
		fmt.Println("List is empty")
		return
	}
	for curr != nil {
		fmt.Printf("%d -> ", curr.data)
		curr = curr.next
	}
	fmt.Println("nil")
}

func main() {
	list := &LinkedList{}

	// Insert some elements
	list.InsertAtEnd(10)
	list.InsertAtEnd(20)
	list.InsertAtEnd(30)
	list.InsertAtEnd(40)
	list.InsertAtEnd(50)

	fmt.Println("Original Linked List:")
	list.Display()

	// Delete at various positions
	list.DeleteNode(1) // Delete first node
	list.DeleteNode(3) // Delete node at position 3
	list.DeleteNode(10) // Invalid position

	fmt.Println("Linked List after deletions:")
	list.Display()
}`,
  },

  deleteAtPosition: {
    java: `public boolean deleteAtPosition(int position) {
    if (position < 0 || position >= size || head == null) {
        return false;
    }
    
    // Delete head node
    if (position == 0) {
        head = head.next;
        size--;
        return true;
    }
    
    Node current = head;
    for (int i = 0; i < position - 1; i++) {
        current = current.next;
    }
    
    current.next = current.next.next;
    size--;
    return true;
}`,
    python: `def delete_at_position(self, position):
    if position < 0 or position >= self.size or not self.head:
        return False
    
    # Delete head node
    if position == 0:
        self.head = self.head.next
        self.size -= 1
        return True
    
    current = self.head
    for i in range(position - 1):
        current = current.next
    
    current.next = current.next.next
    self.size -= 1
    return True`,
    cpp: `bool deleteAtPosition(int position) {
    if (position < 0 || position >= size || head == nullptr) {
        return false;
    }
    
    // Delete head node
    if (position == 0) {
        Node* temp = head;
        head = head->next;
        delete temp;
        size--;
        return true;
    }
    
    Node* current = head;
    for (int i = 0; i < position - 1; i++) {
        current = current->next;
    }
    
    Node* temp = current->next;
    current->next = current->next->next;
    delete temp;
    size--;
    return true;
}`,
    go:`package main

import "fmt"

// Node structure for the Linked List
type Node struct {
	data int
	next *Node
}

// LinkedList structure
type LinkedList struct {
	head *Node
	size int
}

// =================================================================
// HELPER METHODS
// =================================================================

// insertAtEnd adds a new node to the end of the list.
func (l *LinkedList) insertAtEnd(data int) {
	newNode := &Node{data: data, next: nil}
	l.size++

	if l.head == nil {
		l.head = newNode
		return
	}

	current := l.head
	for current.next != nil {
		current = current.next
	}
	current.next = newNode
}

// display prints the linked list from head to tail.
func (l *LinkedList) display() {
	current := l.head
	if current == nil {
		fmt.Println("List is empty.")
		return
	}

	for current != nil {
		fmt.Printf("%d -> ", current.data)
		current = current.next
	}
	fmt.Println("nil")
}

// =================================================================
// CORE FUNCTION: deleteAtPosition
// =================================================================

// deleteAtPosition deletes the node at the specified index (0-based).
func (l *LinkedList) deleteAtPosition(index int) {
	// 1. Handle Invalid Index
	if index < 0 || index >= l.size {
		fmt.Printf("Error: Index %d is out of bounds (Size: %d).\n", index, l.size)
		return
	}

	// 2. Handle Deleting the Head (Index 0)
	if index == 0 {
		temp := l.head
		l.head = l.head.next // Move head to the second node
		temp.next = nil      // Dereference the old head
		l.size--
		return
	}

	// 3. Handle Deleting an Intermediate Node
	current := l.head
	var previous *Node

	// Traverse to the node *before* the target node
	for i := 0; i < index; i++ {
		previous = current
		current = current.next
	}

	// 'current' is the node to delete, 'previous' is the node before it.
	if previous != nil {
		previous.next = current.next // Skip the 'current' node
		current.next = nil           // Dereference the deleted node
		l.size--
	}
}

// =================================================================
// MAIN FUNCTION & DEMO
// =================================================================

func main() {
	list := LinkedList{}
	list.insertAtEnd(10)
	list.insertAtEnd(20)
	list.insertAtEnd(30)
	list.insertAtEnd(40)
	list.insertAtEnd(50)

	fmt.Println("Original List:")
	list.display() // Output: 10 -> 20 -> 30 -> 40 -> 50 -> nil

	// --- DEMO 1: Deleting an intermediate node (Index 2: node 30) ---
	fmt.Println("\nDeleting node at Index 2 (30):")
	list.deleteAtPosition(2)
	list.display() // Output: 10 -> 20 -> 40 -> 50 -> nil

	// --- DEMO 2: Deleting the head (Index 0: node 10) ---
	fmt.Println("\nDeleting node at Index 0 (10):")
	list.deleteAtPosition(0)
	list.display() // Output: 20 -> 40 -> 50 -> nil

	// --- DEMO 3: Deleting the tail (Index 2: node 50) ---
	fmt.Println("\nDeleting node at Index 2 (50):")
	list.deleteAtPosition(2)
	list.display() // Output: 20 -> 40 -> nil

	// --- DEMO 4: Attempting to delete out of bounds ---
	fmt.Println("\nAttempting to delete node at Index 5:")
	list.deleteAtPosition(5) // Output: Error: Index 5 is out of bounds...
	list.display()

	// --- DEMO 5: Attempting to delete the last node ---
	fmt.Println("\nDeleting remaining nodes:")
	list.deleteAtPosition(0)
	list.deleteAtPosition(0)
	list.display() // Output: List is empty.
}`,
  },

  traverse: {
    java: `public void traverse() {
    Node current = head;
    System.out.print("LinkedList: ");
    
    while (current != null) {
        System.out.print(current.data + " -> ");
        current = current.next;
    }
    
    System.out.println("null");
}

public void traverseRecursive(Node node) {
    if (node == null) {
        System.out.println("null");
        return;
    }
    
    System.out.print(node.data + " -> ");
    traverseRecursive(node.next);
}`,
    python: `def traverse(self):
    current = self.head
    result = []
    
    while current:
        result.append(current.data)
        current = current.next
    
    print(" -> ".join(map(str, result)) + " -> None")
    return result

def traverse_recursive(self, node):
    if not node:
        print("None")
        return []
    
    result = [node.data]
    print(f"{node.data} -> ", end="")
    result.extend(self.traverse_recursive(node.next))
    return result`,
    cpp: `void traverse() {
    Node* current = head;
    cout << "LinkedList: ";
    
    while (current != nullptr) {
        cout << current->data << " -> ";
        current = current->next;
    }
    
    cout << "null" << endl;
}

void traverseRecursive(Node* node) {
    if (node == nullptr) {
        cout << "null" << endl;
        return;
    }
    
    cout << node->data << " -> ";
    traverseRecursive(node->next);
}`,
    go:`package main

import "fmt"

// Node structure for the Linked List
type Node struct {
	data int
	next *Node
}

// LinkedList structure
type LinkedList struct {
	head *Node
	size int
}

// =================================================================
// TRAVERSAL FUNCTION
// =================================================================

// traverse prints the data of every node in the list from start to end.
func (l *LinkedList) traverse() {
	// Start the traversal at the head of the list.
	current := l.head

	if current == nil {
		fmt.Println("List is empty. Traversal stopped.")
		return
	}

	fmt.Print("Traversal Order: ")
	// Loop as long as the current node is not nil (i.e., we haven't reached the end).
	for current != nil {
		fmt.Printf("%d -> ", current.data)
		// Move to the next node in the sequence.
		current = current.next
	}
	fmt.Println("nil (End of List)")
}

// =================================================================
// HELPER FOR DEMO
// =================================================================

// insertAtEnd adds a new node to the end of the list.
func (l *LinkedList) insertAtEnd(data int) {
	newNode := &Node{data: data, next: nil}
	l.size++

	if l.head == nil {
		l.head = newNode
		return
	}

	current := l.head
	for current.next != nil {
		current = current.next
	}
	current.next = newNode
}

// =================================================================
// MAIN FUNCTION & DEMO
// =================================================================

func main() {
	list := LinkedList{}
	
	// Demonstrate traversal on an empty list
	fmt.Println("--- Demo 1: Empty List ---")
	list.traverse() 
	
	// Populate the list
	list.insertAtEnd(100)
	list.insertAtEnd(200)
	list.insertAtEnd(300)
	list.insertAtEnd(400)
	
	// Demonstrate traversal on a populated list
	fmt.Println("\n--- Demo 2: Populated List ---")
	list.traverse() // Output: Traversal Order: 100 -> 200 -> 300 -> 400 -> nil
}`,
  },

  reverse: {
    java: `public void reverse() {
    Node prev = null;
    Node current = head;
    Node next = null;
    
    while (current != null) {
        next = current.next;  // Store next node
        current.next = prev;  // Reverse the link
        prev = current;       // Move prev forward
        current = next;       // Move current forward
    }
    
    head = prev; // Update head to the new first node
}

public Node reverseRecursive(Node node) {
    // Base case
    if (node == null || node.next == null) {
        return node;
    }
    
    // Recursively reverse the rest of the list
    Node newHead = reverseRecursive(node.next);
    
    // Reverse the current connection
    node.next.next = node;
    node.next = null;
    
    return newHead;
}`,
    python: `def reverse(self):
    prev = None
    current = self.head
    
    while current:
        next_node = current.next  # Store next node
        current.next = prev       # Reverse the link
        prev = current            # Move prev forward
        current = next_node       # Move current forward
    
    self.head = prev  # Update head to the new first node

def reverse_recursive(self, node):
    # Base case
    if not node or not node.next:
        return node
    
    # Recursively reverse the rest of the list
    new_head = self.reverse_recursive(node.next)
    
    # Reverse the current connection
    node.next.next = node
    node.next = None
    
    return new_head`,
    cpp: `void reverse() {
    Node* prev = nullptr;
    Node* current = head;
    Node* next = nullptr;
    
    while (current != nullptr) {
        next = current->next;     // Store next node
        current->next = prev;     // Reverse the link
        prev = current;           // Move prev forward
        current = next;           // Move current forward
    }
    
    head = prev; // Update head to the new first node
}

Node* reverseRecursive(Node* node) {
    // Base case
    if (node == nullptr || node->next == nullptr) {
        return node;
    }
    
    // Recursively reverse the rest of the list
    Node* newHead = reverseRecursive(node->next);
    
    // Reverse the current connection
    node->next->next = node;
    node->next = nullptr;
    
    return newHead;
}`,
    go:`package main

import "fmt"

// Node structure for the Linked List
type Node struct {
	data int
	next *Node
}

// LinkedList structure
type LinkedList struct {
	head *Node
}

// =================================================================
// CORE FUNCTION: REVERSE
// =================================================================

// reverse reverses the order of the nodes in the linked list in place.
func (l *LinkedList) reverse() {
	var previous *Node = nil
	current := l.head
	var nextNext *Node = nil

	// Iterate through the list until the end is reached (current is nil)
	for current != nil {
		// 1. Store the next node before modifying the link
		nextNext = current.next

		// 2. Reverse the current node's pointer to point to the previous node
		current.next = previous

		// 3. Move 'previous' and 'current' pointers one step forward
		previous = current
		current = nextNext
	}

	// Update the head of the list to be the former tail (which is now 'previous')
	l.head = previous
}

// =================================================================
// HELPER METHODS
// =================================================================

// insertAtEnd adds a new node to the end of the list.
func (l *LinkedList) insertAtEnd(data int) {
	newNode := &Node{data: data, next: nil}

	if l.head == nil {
		l.head = newNode
		return
	}

	current := l.head
	for current.next != nil {
		current = current.next
	}
	current.next = newNode
}

// display prints the linked list from head to tail.
func (l *LinkedList) display(label string) {
	current := l.head
	fmt.Printf("%s: ", label)
	if current == nil {
		fmt.Println("List is empty.")
		return
	}

	for current != nil {
		fmt.Printf("%d -> ", current.data)
		current = current.next
	}
	fmt.Println("nil")
}

// =================================================================
// MAIN FUNCTION & DEMO
// =================================================================

func main() {
	list := LinkedList{}

	// Populate the list
	list.insertAtEnd(10)
	list.insertAtEnd(20)
	list.insertAtEnd(30)
	list.insertAtEnd(40)
	list.insertAtEnd(50)

	// Display original list
	list.display("Original List") 
	// Output: Original List: 10 -> 20 -> 30 -> 40 -> 50 -> nil

	// Reverse the list
	list.reverse()

	// Display reversed list
	list.display("Reversed List") 
	// Output: Reversed List: 50 -> 40 -> 30 -> 20 -> 10 -> nil
}`,
  },

  search: {
    java: `public int search(int data) {
    Node current = head;
    int position = 0;
    
    while (current != null) {
        if (current.data == data) {
            return position;
        }
        current = current.next;
        position++;
    }
    
    return -1; // Not found
}

public boolean contains(int data) {
    return search(data) != -1;
}`,
    python: `def search(self, data):
    current = self.head
    position = 0
    
    while current:
        if current.data == data:
            return position
        current = current.next
        position += 1
    
    return -1  # Not found

def contains(self, data):
    return self.search(data) != -1`,
    cpp: `int search(int data) {
    Node* current = head;
    int position = 0;
    
    while (current != nullptr) {
        if (current->data == data) {
            return position;
        }
        current = current->next;
        position++;
    }
    
    return -1; // Not found
}

bool contains(int data) {
    return search(data) != -1;
}`,
    go:`package main

import "fmt"

// Node structure for the Linked List
type Node struct {
	data int
	next *Node
}

// LinkedList structure
type LinkedList struct {
	head *Node
}

// =================================================================
// CORE FUNCTION: SEARCH
// =================================================================

// search finds the first occurrence of a target value and returns its index.
// Returns -1 if the value is not found.
func (l *LinkedList) search(target int) int {
	current := l.head
	index := 0

	// Traverse the list until the end (current is nil)
	for current != nil {
		// Check if the current node's data matches the target
		if current.data == target {
			return index // Found the element, return its index
		}

		// Move to the next node and increment the index
		current = current.next
		index++
	}

	// If the loop finishes without returning, the target was not found
	return -1 
}

// =================================================================
// HELPER FOR DEMO
// =================================================================

// insertAtEnd adds a new node to the end of the list.
func (l *LinkedList) insertAtEnd(data int) {
	newNode := &Node{data: data, next: nil}

	if l.head == nil {
		l.head = newNode
		return
	}

	current := l.head
	for current.next != nil {
		current = current.next
	}
	current.next = newNode
}

// =================================================================
// MAIN FUNCTION & DEMO
// =================================================================

func main() {
	list := LinkedList{}
	
	// Populate the list
	list.insertAtEnd(10)
	list.insertAtEnd(20)
	list.insertAtEnd(30)
	list.insertAtEnd(40)
	list.insertAtEnd(50)
	
	// --- DEMO 1: Successful Search (Value 30) ---
	target1 := 30
	index1 := list.search(target1)
	fmt.Printf("Searching for %d: Found at index %d\n", target1, index1)
	// Expected Output: Searching for 30: Found at index 2

	// --- DEMO 2: Successful Search (Value 50 - The Tail) ---
	target2 := 50
	index2 := list.search(target2)
	fmt.Printf("Searching for %d: Found at index %d\n", target2, index2)
	// Expected Output: Searching for 50: Found at index 4

	// --- DEMO 3: Unsuccessful Search (Value 99) ---
	target3 := 99
	index3 := list.search(target3)
	fmt.Printf("Searching for %d: Found at index %d\n", target3, index3)
	// Expected Output: Searching for 99: Found at index -1
}`,
  },

  getSize: {
    java: `public int getSize() {
    return size;
}

public int getSizeByTraversal() {
    int count = 0;
    Node current = head;
    
    while (current != null) {
        count++;
        current = current.next;
    }
    
    return count;
}`,
    python: `def get_size(self):
    return self.size

def get_size_by_traversal(self):
    count = 0
    current = self.head
    
    while current:
        count += 1
        current = current.next
    
    return count`,
    cpp: `int getSize() {
    return size;
}

int getSizeByTraversal() {
    int count = 0;
    Node* current = head;
    
    while (current != nullptr) {
        count++;
        current = current->next;
    }
    
    return count;
}`,
    go:`package main

import "fmt"

// Node structure for the Linked List
type Node struct {
	data int
	next *Node
}

// LinkedList structure
type LinkedList struct {
	head *Node
	size int // Field to store the current size of the list
}

// =================================================================
// CORE FUNCTION: GET SIZE
// =================================================================

// getSize returns the number of nodes currently in the linked list.
// This is an O(1) operation because the size is maintained dynamically.
func (l *LinkedList) getSize() int {
	return l.size
}

// =================================================================
// HELPER METHODS (for size maintenance)
// =================================================================

// insertAtEnd adds a new node to the end of the list and updates the size.
func (l *LinkedList) insertAtEnd(data int) {
	newNode := &Node{data: data, next: nil}
	
	if l.head == nil {
		l.head = newNode
	} else {
		current := l.head
		for current.next != nil {
			current = current.next
		}
		current.next = newNode
	}
	
	l.size++ // Increment size after successful insertion
}

// =================================================================
// MAIN FUNCTION & DEMO
// =================================================================

func main() {
	list := LinkedList{}
	
	fmt.Printf("Initial size of the list: %d\n", list.getSize()) // Output: 0

	// Insert nodes and observe size updates
	list.insertAtEnd(10)
	fmt.Printf("Size after first insert (10): %d\n", list.getSize()) // Output: 1
	
	list.insertAtEnd(20)
	list.insertAtEnd(30)
	fmt.Printf("Size after three inserts (10, 20, 30): %d\n", list.getSize()) // Output: 3
	
	list.insertAtEnd(40)
	list.insertAtEnd(50)
	list.insertAtEnd(60)
	
	fmt.Printf("Final size of the list: %d\n", list.getSize()) // Output: 6
}`,
  },

  clear: {
    java: `public void clear() {
    head = null;
    size = 0;
}

public boolean isEmpty() {
    return head == null;
}`,
    python: `def clear(self):
    self.head = None
    self.size = 0

def is_empty(self):
    return self.head is None`,
    cpp: `void clear() {
    while (head != nullptr) {
        Node* temp = head;
        head = head->next;
        delete temp;
    }
    size = 0;
}

bool isEmpty() {
    return head == nullptr;
}`,
    go: `package main

import "fmt"

// Node represents an individual element in the linked list.
type Node struct {
	data int
	next *Node // Pointer to the next node in the sequence.
}

// LinkedList holds the head reference and the size of the list.
type LinkedList struct {
	head *Node
	size int
}

// =================================================================
// CORE FUNCTION: DISPLAY (Traversal)
// =================================================================

// display iterates through the list from the head and prints each node's data.
func (l *LinkedList) display() {
	current := l.head

	if current == nil {
		fmt.Println("List is empty.")
		return
	}

	fmt.Print("List Contents: ")
	// Traverse until the pointer is nil (the end of the list)
	for current != nil {
		fmt.Printf("%d -> ", current.data)
		current = current.next // Move to the next node
	}
	fmt.Println("nil")
}

// =================================================================
// HELPER FOR DEMO
// =================================================================

// insertAtEnd adds a new node to the end of the list.
func (l *LinkedList) insertAtEnd(data int) {
	newNode := &Node{data: data, next: nil}
	l.size++

	if l.head == nil {
		l.head = newNode
		return
	}

	current := l.head
	for current.next != nil {
		current = current.next
	}
	current.next = newNode
}

// =================================================================
// MAIN FUNCTION & DEMO
// =================================================================

func main() {
	list := LinkedList{}
	
	// Populate the list with sample data
	list.insertAtEnd(5)
	list.insertAtEnd(10)
	list.insertAtEnd(15)
	
	fmt.Println("Demonstrating clear list structure and traversal:")
	list.display() // Output: List Contents: 5 -> 10 -> 15 -> nil
}`,
  },
};

// src/data/allCodes.js
export const backtrackingAlgorithms = {
  nQueens: {
    java: `public class NQueens {
    public boolean solveNQueens(int n) {
        int[] board = new int[n];
        return placeQueens(board, 0, n);
    }

    private boolean placeQueens(int[] board, int row, int n) {
        if (row == n) return true;
        for (int col = 0; col < n; col++) {
            if (isSafe(board, row, col)) {
                board[row] = col;
                if (placeQueens(board, row + 1, n)) return true;
            }
        }
        return false;
    }

    private boolean isSafe(int[] board, int row, int col) {
        for (int i = 0; i < row; i++) {
            if (board[i] == col || Math.abs(board[i] - col) == row - i) return false;
        }
        return true;
    }
}`,
    python: `def solve_n_queens(n):
    board = [-1] * n
    def place_queens(row):
        if row == n:
            return True
        for col in range(n):
            if is_safe(row, col):
                board[row] = col
                if place_queens(row+1):
                    return True
        return False

    def is_safe(row, col):
        for i in range(row):
            if board[i] == col or abs(board[i]-col) == row-i:
                return False
        return True

    return place_queens(0)`,
    cpp: `bool isSafe(vector<int>& board, int row, int col) {
    for(int i=0;i<row;i++){
        if(board[i]==col || abs(board[i]-col)==row-i) return false;
    }
    return true;
}

bool solveNQueens(vector<int>& board, int row, int n){
    if(row==n) return true;
    for(int col=0; col<n; col++){
        if(isSafe(board,row,col)){
            board[row]=col;
            if(solveNQueens(board,row+1,n)) return true;
        }
    }
    return false;
}`,
    javascript: `function solveNQueens(n){
    const board = Array(n).fill(-1);
    function placeQueens(row){
        if(row===n) return true;
        for(let col=0;col<n;col++){
            if(isSafe(row,col)){
                board[row]=col;
                if(placeQueens(row+1)) return true;
            }
        }
        return false;
    }
    function isSafe(row,col){
        for(let i=0;i<row;i++){
            if(board[i]===col || Math.abs(board[i]-col)===row-i) return false;
        }
        return true;
    }
    return placeQueens(0);
}`,
    go: `package main

func solveNQueens(n int) [][]string {
    // ... (N-Queens implementation is complex)
    // This is a placeholder for the core logic.
    // A full implementation would involve a board representation,
    // a backtracking helper function, and safety checks.
    
    board := make([][]byte, n)
    for i := range board {
        board[i] = make([]byte, n)
        for j := range board[i] {
            board[i][j] = '.'
        }
    }
    
    // Backtracking logic would go here.
    return [][]string{}
}`,
  },

  sudoku: {
    java: `public boolean solveSudoku(int[][] board){
    for(int row=0; row<9; row++){
        for(int col=0; col<9; col++){
            if(board[row][col]==0){
                for(int num=1; num<=9; num++){
                    if(isSafe(board,row,col,num)){
                        board[row][col]=num;
                        if(solveSudoku(board)) return true;
                        board[row][col]=0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

private boolean isSafe(int[][] board,int row,int col,int num){
    for(int i=0;i<9;i++){
        if(board[row][i]==num || board[i][col]==num) return false;
    }
    int startRow=row-row%3, startCol=col-col%3;
    for(int i=0;i<3;i++)
        for(int j=0;j<3;j++)
            if(board[startRow+i][startCol+j]==num) return false;
    return true;
}`,
    python: `def solve_sudoku(board):
    for i in range(9):
        for j in range(9):
            if board[i][j]==0:
                for num in range(1,10):
                    if is_safe(board,i,j,num):
                        board[i][j]=num
                        if solve_sudoku(board):
                            return True
                        board[i][j]=0
                return False
    return True

def is_safe(board,row,col,num):
    if num in board[row]: return False
    if num in [board[i][col] for i in range(9)]: return False
    startRow, startCol = 3*(row//3), 3*(col//3)
    for i in range(3):
        for j in range(3):
            if board[startRow+i][startCol+j]==num:
                return False
    return True`,
    cpp: `bool isSafe(int board[9][9], int row, int col, int num){
    for(int i=0;i<9;i++){
        if(board[row][i]==num || board[i][col]==num) return false;
    }
    int startRow=row-row%3, startCol=col-row%3;
    for(int i=0;i<3;i++)
        for(int j=0;j<3;j++)
            if(board[startRow+i][startCol+j]==num) return false;
    return true;
}

bool solveSudoku(int board[9][9]){
    for(int row=0; row<9; row++){
        for(int col=0; col<9; col++){
            if(board[row][col]==0){
                for(int num=1; num<=9; num++){
                    if(isSafe(board,row,col,num)){
                        board[row][col]=num;
                        if(solveSudoku(board)) return true;
                        board[row][col]=0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}`,
    javascript: `function solveSudoku(board){
    for(let row=0; row<9; row++){
        for(let col=0; col<9; col++){
            if(board[row][col]===0){
                for(let num=1; num<=9; num++){
                    if(isSafe(board,row,col,num)){
                        board[row][col]=num;
                        if(solveSudoku(board)) return true;
                        board[row][col]=0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function isSafe(board,row,col,num){
    for(let i=0;i<9;i++){
        if(board[row][i]===num || board[i][col]===num) return false;
    }
    let startRow=row-row%3, startCol=col-row%3;
    for(let i=0;i<3;i++)
        for(let j=0;j<3;j++)
            if(board[startRow+i][startCol+j]===num) return false;
    return true;
}`,
    go: `package main

func solveSudoku(board [][]byte) {
    // ... (Sudoku solver implementation is complex)
    // This is a placeholder for the core logic.
    // A full implementation would involve a backtracking helper
    // and a function to check if a number placement is valid.
    
    solve(board)
}

func solve(board [][]byte) bool {
    // Backtracking logic would go here.
    return true
}`,
  },

  ratInMaze: {
    java: `public class RatInMaze {
    public boolean solveMaze(int[][] maze, int n){
        int[][] sol = new int[n][n];
        return solveMazeUtil(maze, 0, 0, sol, n);
    }

    private boolean solveMazeUtil(int[][] maze, int x, int y, int[][] sol, int n){
        if(x==n-1 && y==n-1 && maze[x][y]==1){
            sol[x][y] = 1;
            return true;
        }
        if(isSafe(maze, x, y, n)){
            sol[x][y] = 1;
            if(solveMazeUtil(maze, x+1, y, sol, n)) return true;
            if(solveMazeUtil(maze, x, y+1, sol, n)) return true;
            sol[x][y] = 0;
        }
        return false;
    }

    private boolean isSafe(int[][] maze, int x, int y, int n){
        return (x>=0 && x<n && y>=0 && y<n && maze[x][y]==1);
    }
}`,
    python: `def solve_maze(maze):
    n = len(maze)
    sol = [[0]*n for _ in range(n)]
    def solve(x, y):
        if x==n-1 and y==n-1 and maze[x][y]==1:
            sol[x][y] = 1
            return True
        if is_safe(x, y):
            sol[x][y] = 1
            if solve(x+1, y) or solve(x, y+1):
                return True
            sol[x][y] = 0
        return False
    def is_safe(x, y):
        return 0<=x<n and 0<=y<n and maze[x][y]==1
    solve(0,0)
    return sol`,
    cpp: `bool isSafe(vector<vector<int>>& maze, int x, int y, int n){
    return x>=0 && x<n && y>=0 && y<n && maze[x][y]==1;
}

bool solveMazeUtil(vector<vector<int>>& maze, int x, int y, vector<vector<int>>& sol, int n){
    if(x==n-1 && y==n-1 && maze[x][y]==1){
        sol[x][y]=1;
        return true;
    }
    if(isSafe(maze,x,y,n)){
        sol[x][y]=1;
        if(solveMazeUtil(maze,x+1,y,sol,n)) return true;
        if(solveMazeUtil(maze,x,y+1,sol,n)) return true;
        sol[x][y]=0;
    }
    return false;
}`,
    javascript: `function solveMaze(maze){
    const n = maze.length;
    const sol = Array.from({length:n}, ()=>Array(n).fill(0));
    function isSafe(x,y){
        return x>=0 && x<n && y>=0 && y<n && maze[x][y]===1;
    }
    function solve(x,y){
        if(x===n-1 && y===n-1 && maze[x][y]===1){
            sol[x][y]=1;
            return true;
        }
        if(isSafe(x,y)){
            sol[x][y]=1;
            if(solve(x+1,y) || solve(x,y+1)) return true;
            sol[x][y]=0;
        }
        return false;
    }
    solve(0,0);
    return sol;
}`,
    go: `package main

func solveMaze(maze [][]int) [][]int {
    n := len(maze)
    sol := make([][]int, n)
    for i := range sol {
        sol[i] = make([]int, n)
    }

    // ... (Rat in a Maze implementation is complex)
    // This is a placeholder for the core logic.
    // A full implementation would involve a backtracking helper
    // and a function to check if a move is safe.
    
    solve(maze, 0, 0, sol)
    return sol
}`,
  },

  combinationSum: {
    java: `public class CombinationSum {
    public void combinationSum(int[] nums, int target, List<List<Integer>> res){
        backtrack(res, new ArrayList<>(), nums, target, 0);
    }
    private void backtrack(List<List<Integer>> res, List<Integer> temp, int[] nums, int remain, int start){
        if(remain<0) return;
        if(remain==0) res.add(new ArrayList<>(temp));
        for(int i=start;i<nums.length;i++){
            temp.add(nums[i]);
            backtrack(res,temp,nums,remain-nums[i],i);
            temp.remove(temp.size()-1);
        }
    }
}`,
    python: `def combination_sum(nums, target):
    res=[]
    def backtrack(temp, remain, start):
        if remain<0: return
        if remain==0: res.append(list(temp))
        for i in range(start,len(nums)):
            temp.append(nums[i])
            backtrack(temp, remain-nums[i], i)
            temp.pop()
    backtrack([], target, 0)
    return res`,
    cpp: `void backtrack(vector<int>& nums, int remain, vector<int>& temp, vector<vector<int>>& res, int start){
    if(remain<0) return;
    if(remain==0) { res.push_back(temp); return; }
    for(int i=start;i<nums.size();i++){
        temp.push_back(nums[i]);
        backtrack(nums, remain-nums[i], temp, res, i);
        temp.pop_back();
    }
}

vector<vector<int>> combinationSum(vector<int>& nums, int target){
    vector<vector<int>> res;
    vector<int> temp;
    backtrack(nums,target,temp,res,0);
    return res;
}`,
    javascript: `function combinationSum(nums,target){
    const res=[];
    function backtrack(temp, remain, start){
        if(remain<0) return;
        if(remain===0) res.push([...temp]);
        for(let i=start;i<nums.length;i++){
            temp.push(nums[i]);
            backtrack(temp, remain-nums[i], i);
            temp.pop();
        }
    }
    backtrack([], target, 0);
    return res;
}`,
    go: `package main

func combinationSum(candidates []int, target int) [][]int {
    var res [][]int
    var temp []int

    var backtrack func(remain, start int)
    backtrack = func(remain, start int) {
        // ... (Backtracking logic for combination sum)
    }

    backtrack(target, 0)
    return res
}`,
  },

  wordSearch: {
    java: `public class WordSearch {
    public boolean exist(char[][] board, String word){
        int m=board.length, n=board[0].length;
        for(int i=0;i<m;i++){
            for(int j=0;j<n;j++){
                if(backtrack(board, word, i, j, 0)) return true;
            }
        }
        return false;
    }
    private boolean backtrack(char[][] board, String word, int i, int j, int index){
        if(index==word.length()) return true;
        if(i<0 || i>=board.length || j<0 || j>=board[0].length || board[i][j]!=word.charAt(index)) return false;
        char temp=board[i][j];
        board[i][j]='#';
        boolean found = backtrack(board,word,i+1,j,index+1)
                     || backtrack(board,word,i-1,j,index+1)
                     || backtrack(board,word,i,j+1,index+1)
                     || backtrack(board,word,i,j-1,index+1);
        board[i][j]=temp;
        return found;
    }
}`,
    python: `def exist(board, word):
    m,n=len(board),len(board[0])
    def backtrack(i,j,index):
        if index==len(word): return True
        if i<0 or i>=m or j<0 or j>=n or board[i][j]!=word[index]: return False
        temp=board[i][j]
        board[i][j]='#'
        found = backtrack(i+1,j,index+1) or backtrack(i-1,j,index+1) or backtrack(i,j+1,index+1) or backtrack(i,j-1,index+1)
        board[i][j]=temp
        return found
    for i in range(m):
        for j in range(n):
            if backtrack(i,j,0): return True
    return False`,
    cpp: `bool backtrack(vector<vector<char>>& board, string& word, int i, int j, int index){
    if(index==word.size()) return true;
    if(i<0 || i>=board.size() || j<0 || j>=board[0].size() || board[i][j]!=word[index]) return false;
    char temp = board[i][j];
    board[i][j]='#';
    bool found = backtrack(board, word, i+1, j, index+1)
              || backtrack(board, word, i-1, j, index+1)
              || backtrack(board, word, i, j+1, index+1)
              || backtrack(board, word, i, j-1, index+1);
    board[i][j]=temp;
    return found;
}

bool exist(vector<vector<char>>& board, string word){
    for(int i=0;i<board.size();i++)
        for(int j=0;j<board[0].size();j++)
            if(backtrack(board, word, i,j,0)) return true;
    return false;
}`,
    javascript: `function exist(board, word){
    const m=board.length,n=board[0].length;
    function backtrack(i,j,index){
        if(index===word.length) return true;
        if(i<0 || i>=m || j<0 || j>=n || board[i][j]!==word[index]) return false;
        const temp=board[i][j];
        board[i][j]='#';
        const found = backtrack(i+1,j,index+1) || backtrack(i-1,j,index+1) || backtrack(i,j+1,index+1) || backtrack(i,j-1,index+1);
        board[i][j]=temp;
        return found;
    }
    for(let i=0;i<m;i++)
        for(let j=0;j<n;j++)
            if(backtrack(i,j,0)) return true;
    return false;
}`,
    go: `package main

func exist(board [][]byte, word string) bool {
    // ... (Word Search implementation is complex)
    // This is a placeholder for the core logic.
    // A full implementation would involve a backtracking helper
    // that explores the grid from each cell.
    
    for r := range board {
        for c := range board[r] {
            // if backtrack(r, c, 0) { return true }
        }
    }
    return false
}`,
    go: `package main

func isSubsetSum(arr []int, sum int) bool {
    n := len(arr)
    dp := make([][]bool, n+1)
    for i := range dp { dp[i] = make([]bool, sum+1) }
    for i := 0; i <= n; i++ { dp[i][0] = true }
    for i := 1; i <= n; i++ {
        for j := 1; j <= sum; j++ {
            if arr[i-1] <= j {
                dp[i][j] = dp[i-1][j] || dp[i-1][j-arr[i-1]]
            } else {
                dp[i][j] = dp[i-1][j]
            }
        }
    }
    return dp[n][sum]
}`,
  },
};

// src/data/allCodes.js
export const dpAlgorithms = {
  fibonacci: {
    java: `public class Fibonacci {
    public int fib(int n){
        if(n<=1) return n;
        int[] dp = new int[n+1];
        dp[0]=0; dp[1]=1;
        for(int i=2;i<=n;i++){
            dp[i]=dp[i-1]+dp[i-2];
        }
        return dp[n];
    }
}`,
    python: `def fib(n):
    if n<=1: return n
    dp = [0]*(n+1)
    dp[1] = 1
    for i in range(2,n+1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]`,
    cpp: `int fib(int n){
    if(n<=1) return n;
    vector<int> dp(n+1,0);
    dp[1]=1;
    for(int i=2;i<=n;i++)
        dp[i]=dp[i-1]+dp[i-2];
    return dp[n];
}`,
    javascript: `function fib(n){
    if(n<=1) return n;
    const dp = Array(n+1).fill(0);
    dp[1]=1;
    for(let i=2;i<=n;i++)
        dp[i]=dp[i-1]+dp[i-2];
    return dp[n];
}`,
    go: `package main

func fib(n int) int {
    if n <= 1 { return n }
    dp := make([]int, n+1)
    dp[1] = 1
    for i := 2; i <= n; i++ {
        dp[i] = dp[i-1] + dp[i-2]
    }
    return dp[n]
}`,
  },

  zeroOneKnapsack: {
    java: `public class Knapsack {
    public int knapsack(int[] wt, int[] val, int W){
        int n=wt.length;
        int[][] dp = new int[n+1][W+1];
        for(int i=1;i<=n;i++){
            for(int w=0;w<=W;w++){
                if(wt[i-1]<=w)
                    dp[i][w]=Math.max(val[i-1]+dp[i-1][w-wt[i-1]], dp[i-1][w]);
                else
                    dp[i][w]=dp[i-1][w];
            }
        }
        return dp[n][W];
    }
}`,
    python: `def knapsack(wt,val,W):
    n=len(wt)
    dp = [[0]*(W+1) for _ in range(n+1)]
    for i in range(1,n+1):
        for w in range(W+1):
            if wt[i-1]<=w:
                dp[i][w] = max(val[i-1]+dp[i-1][w-wt[i-1]], dp[i-1][w])
            else:
                dp[i][w]=dp[i-1][w]
    return dp[n][W]`,
    cpp: `int knapsack(vector<int>& wt, vector<int>& val, int W){
    int n=wt.size();
    vector<vector<int>> dp(n+1, vector<int>(W+1,0));
    for(int i=1;i<=n;i++){
        for(int w=0;w<=W;w++){
            if(wt[i-1]<=w)
                dp[i][w]=max(val[i-1]+dp[i-1][w-wt[i-1]], dp[i-1][w]);
            else
                dp[i][w]=dp[i-1][w];
        }
    }
    return dp[n][W];
}`,
    javascript: `function knapsack(wt,val,W){
    const n=wt.length;
    const dp = Array.from({length:n+1}, ()=>Array(W+1).fill(0));
    for(let i=1;i<=n;i++){
        for(let w=0;w<=W;w++){
            if(wt[i-1]<=w)
                dp[i][w]=Math.max(val[i-1]+dp[i-1][w-wt[i-1]], dp[i-1][w]);
            else
                dp[i][w]=dp[i-1][w];
        }
    }
    return dp[n][W];
}`,
    go: `package main

func knapsack(wt, val []int, W int) int {
    n := len(wt)
    dp := make([][]int, n+1)
    for i := range dp { dp[i] = make([]int, W+1) }

    for i := 1; i <= n; i++ {
        for w := 0; w <= W; w++ {
            if wt[i-1] <= w {
                dp[i][w] = max(val[i-1]+dp[i-1][w-wt[i-1]], dp[i-1][w])
            } else {
                dp[i][w] = dp[i-1][w]
            }
        }
    }
    return dp[n][W]
}`,
  },

  coinChange: {
    java: `public class CoinChange {
    public int coinChange(int[] coins, int amount){
        int[] dp = new int[amount+1];
        Arrays.fill(dp, amount+1);
        dp[0]=0;
        for(int i=1;i<=amount;i++){
            for(int coin: coins){
                if(coin<=i) dp[i]=Math.min(dp[i], 1+dp[i-coin]);
            }
        }
        return dp[amount]>amount?-1:dp[amount];
    }
}`,
    python: `def coinChange(coins, amount):
    dp = [amount+1]*(amount+1)
    dp[0]=0
    for i in range(1, amount+1):
        for coin in coins:
            if coin<=i:
                dp[i]=min(dp[i],1+dp[i-coin])
    return -1 if dp[amount]>amount else dp[amount]`,
    cpp: `int coinChange(vector<int>& coins, int amount){
    vector<int> dp(amount+1, amount+1);
    dp[0]=0;
    for(int i=1;i<=amount;i++){
        for(int coin: coins){
            if(coin<=i) dp[i]=min(dp[i],1+dp[i-coin]);
        }
    }
    return dp[amount]>amount?-1:dp[amount];
}`,
    javascript: `function coinChange(coins, amount){
    const dp = Array(amount+1).fill(amount+1);
    dp[0]=0;
    for(let i=1;i<=amount;i++){
        for(let coin of coins){
            if(coin<=i) dp[i]=Math.min(dp[i],1+dp[i-coin]);
        }
    }
    return dp[amount]>amount?-1:dp[amount];
}`,
    go: `package main

import "math"

func coinChange(coins []int, amount int) int {
    dp := make([]int, amount+1)
    for i := range dp { dp[i] = amount + 1 }
    dp[0] = 0
    for i := 1; i <= amount; i++ {
        for _, coin := range coins {
            if coin <= i { dp[i] = min(dp[i], 1+dp[i-coin]) }
        }
    }
    if dp[amount] > amount { return -1 }
    return dp[amount]
}`,
  },

  longestCommonSubsequence: {
    java: `public class LCS {
    public int lcs(String s1, String s2){
        int m=s1.length(), n=s2.length();
        int[][] dp=new int[m+1][n+1];
        for(int i=1;i<=m;i++){
            for(int j=1;j<=n;j++){
                if(s1.charAt(i-1)==s2.charAt(j-1))
                    dp[i][j]=dp[i-1][j-1]+1;
                else
                    dp[i][j]=Math.max(dp[i-1][j], dp[i][j-1]);
            }
        }
        return dp[m][n];
    }
}`,
    python: `def lcs(s1,s2):
    m,n=len(s1),len(s2)
    dp=[[0]*(n+1) for _ in range(m+1)]
    for i in range(1,m+1):
        for j in range(1,n+1):
            if s1[i-1]==s2[j-1]:
                dp[i][j]=dp[i-1][j-1]+1
            else:
                dp[i][j]=max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]`,
    cpp: `int lcs(string s1, string s2){
    int m=s1.size(), n=s2.size();
    vector<vector<int>> dp(m+1, vector<int>(n+1,0));
    for(int i=1;i<=m;i++){
        for(int j=1;j<=n;j++){
            if(s1[i-1]==s2[j-1])
                dp[i][j]=dp[i-1][j-1]+1;
            else
                dp[i][j]=max(dp[i-1][j], dp[i][j-1]);
        }
    }
    return dp[m][n];
}`,
    javascript: `function lcs(s1,s2){
    const m=s1.length, n=s2.length;
    const dp=Array.from({length:m+1}, ()=>Array(n+1).fill(0));
    for(let i=1;i<=m;i++){
        for(let j=1;j<=n;j++){
            if(s1[i-1]===s2[j-1])
                dp[i][j]=dp[i-1][j-1]+1;
            else
                dp[i][j]=Math.max(dp[i-1][j], dp[i][j-1]);
        }
    }
    return dp[m][n];
}`,
    go: `package main

func lcs(s1, s2 string) int {
    m, n := len(s1), len(s2)
    dp := make([][]int, m+1)
    for i := range dp { dp[i] = make([]int, n+1) }

    for i := 1; i <= m; i++ {
        for j := 1; j <= n; j++ {
            if s1[i-1] == s2[j-1] {
                dp[i][j] = dp[i-1][j-1] + 1
            } else {
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
            }
        }
    }
    return dp[m][n]
}`,
  },

  matrixChainMultiplication: {
    java: `public class MatrixChain {
    public int matrixChainOrder(int[] p){
        int n=p.length;
        int[][] dp = new int[n][n];
        for(int l=2;l<n;l++){
            for(int i=1;i<n-l+1;i++){
                int j=i+l-1;
                dp[i][j]=Integer.MAX_VALUE;
                for(int k=i;k<j;k++){
                    dp[i][j]=Math.min(dp[i][j], dp[i][k]+dp[k+1][j]+p[i-1]*p[k]*p[j]);
                }
            }
        }
        return dp[1][n-1];
    }
}`,
    python: `def matrixChainOrder(p):
    n=len(p)
    dp=[[0]*n for _ in range(n)]
    for l in range(2,n):
        for i in range(1,n-l+1):
            j=i+l-1
            dp[i][j]=float('inf')
            for k in range(i,j):
                dp[i][j]=min(dp[i][j], dp[i][k]+dp[k+1][j]+p[i-1]*p[k]*p[j])
    return dp[1][n-1]`,
    cpp: `int matrixChainOrder(vector<int>& p){
    int n=p.size();
    vector<vector<int>> dp(n, vector<int>(n,0));
    for(int l=2;l<n;l++){
        for(int i=1;i<n-l+1;i++){
            int j=i+l-1;
            dp[i][j]=INT_MAX;
            for(int k=i;k<j;k++){
                dp[i][j]=min(dp[i][j], dp[i][k]+dp[k+1][j]+p[i-1]*p[k]*p[j]);
            }
        }
    }
    return dp[1][n-1];
}`,
    javascript: `function matrixChainOrder(p){
    const n=p.length;
    const dp=Array.from({length:n}, ()=>Array(n).fill(0));
    for(let l=2;l<n;l++){
        for(let i=1;i<n-l+1;i++){
            let j=i+l-1;
            dp[i][j]=Infinity;
            for(let k=i;k<j;k++){
                dp[i][j]=Math.min(dp[i][j], dp[i][k]+dp[k+1][j]+p[i-1]*p[k]*p[j]);
            }
        }
    }
    return dp[1][n-1];
}`,
  },

  minimumPathSum: {
    java: `public class MinPathSum {
    public int minPathSum(int[][] grid){
        int m=grid.length, n=grid[0].length;
        int[][] dp=new int[m][n];
        dp[0][0]=grid[0][0];
        for(int i=1;i<m;i++) dp[i][0]=dp[i-1][0]+grid[i][0];
        for(int j=1;j<n;j++) dp[0][j]=dp[0][j-1]+grid[0][j];
        for(int i=1;i<m;i++)
            for(int j=1;j<n;j++)
                dp[i][j]=Math.min(dp[i-1][j], dp[i][j-1])+grid[i][j];
        return dp[m-1][n-1];
    }
}`,
    python: `def minPathSum(grid):
    m,n=len(grid),len(grid[0])
    dp=[[0]*n for _ in range(m)]
    dp[0][0]=grid[0][0]
    for i in range(1,m): dp[i][0]=dp[i-1][0]+grid[i][0]
    for j in range(1,n): dp[0][j]=dp[0][j-1]+grid[0][j]
    for i in range(1,m):
        for j in range(1,n):
            dp[i][j]=min(dp[i-1][j], dp[i][j-1])+grid[i][j]
    return dp[m-1][n-1]`,
    cpp: `int minPathSum(vector<vector<int>>& grid){
    int m=grid.size(), n=grid[0].size();
    vector<vector<int>> dp(m, vector<int>(n,0));
    dp[0][0]=grid[0][0];
    for(int i=1;i<m;i++) dp[i][0]=dp[i-1][0]+grid[i][0];
    for(int j=1;j<n;j++) dp[0][j]=dp[0][j-1]+grid[0][j];
    for(int i=1;i<m;i++)
        for(int j=1;j<n;j++)
            dp[i][j]=min(dp[i-1][j], dp[i][j-1])+grid[i][j];
    return dp[m-1][n-1];
}`,
    javascript: `function minPathSum(grid){
    const m=grid.length, n=grid[0].length;
    const dp=Array.from({length:m}, ()=>Array(n).fill(0));
    dp[0][0]=grid[0][0];
    for(let i=1;i<m;i++) dp[i][0]=dp[i-1][0]+grid[i][0];
    for(let j=1;j<n;j++) dp[0][j]=dp[0][j-1]+grid[0][j];
    for(let i=1;i<m;i++)
        for(let j=1;j<n;j++)
            dp[i][j]=Math.min(dp[i-1][j], dp[i][j-1])+grid[i][j];
    return dp[m-1][n-1];
}`,
    go: `package main

func minPathSum(grid [][]int) int {
    m, n := len(grid), len(grid[0])
    dp := make([][]int, m)
    for i := range dp { dp[i] = make([]int, n) }
    dp[0][0] = grid[0][0]
    for i := 1; i < m; i++ { dp[i][0] = dp[i-1][0] + grid[i][0] }
    for j := 1; j < n; j++ { dp[0][j] = dp[0][j-1] + grid[0][j] }
    for i := 1; i < m; i++ {
        for j := 1; j < n; j++ {
            dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j]
        }
    }
    return dp[m-1][n-1]
}`,
  },

  subsetSum: {
    java: `public class SubsetSum {
    public boolean isSubsetSum(int[] arr, int sum){
        int n=arr.length;
        boolean[][] dp=new boolean[n+1][sum+1];
        for(int i=0;i<=n;i++) dp[i][0]=true;
        for(int i=1;i<=n;i++){
            for(int j=1;j<=sum;j++){
                if(arr[i-1]<=j)
                    dp[i][j]=dp[i-1][j]||dp[i-1][j-arr[i-1]];
                else
                    dp[i][j]=dp[i-1][j];
            }
        }
        return dp[n][sum];
    }
}`,
    python: `def isSubsetSum(arr,sum_):
    n=len(arr)
    dp=[[False]*(sum_+1) for _ in range(n+1)]
    for i in range(n+1): dp[i][0]=True
    for i in range(1,n+1):
        for j in range(1,sum_+1):
            if arr[i-1]<=j:
                dp[i][j]=dp[i-1][j] or dp[i-1][j-arr[i-1]]
            else:
                dp[i][j]=dp[i-1][j]
    return dp[n][sum_]`,
    cpp: `bool isSubsetSum(vector<int>& arr, int sum){
    int n=arr.size();
    vector<vector<bool>> dp(n+1, vector<bool>(sum+1,false));
    for(int i=0;i<=n;i++) dp[i][0]=true;
    for(int i=1;i<=n;i++){
        for(int j=1;j<=sum;j++){
            if(arr[i-1]<=j)
                dp[i][j]=dp[i-1][j]||dp[i-1][j-arr[i-1]];
            else
                dp[i][j]=dp[i-1][j];
        }
    }
    return dp[n][sum];
}`,
    javascript: `function isSubsetSum(arr,sum){
    const n=arr.length;
    const dp=Array.from({length:n+1}, ()=>Array(sum+1).fill(false));
    for(let i=0;i<=n;i++) dp[i][0]=true;
    for(let i=1;i<=n;i++){
        for(let j=1;j<=sum;j++){
            if(arr[i-1]<=j)
                dp[i][j]=dp[i-1][j]||dp[i-1][j-arr[i-1]];
            else
                dp[i][j]=dp[i-1][j];
        }
    }
    return dp[n][sum];
}`,
    go: `package main

import "container/list"

func hasCycleBFS(startNode int, adj [][]int, visited []bool) bool {
    q := list.New()
    q.PushBack([2]int{startNode, -1}) // {node, parent}
    visited[startNode] = true

    for q.Len() > 0 {
        pair := q.Remove(q.Front()).([2]int)
        node, parent := pair[0], pair[1]

        for _, neighbor := range adj[node] {
            if !visited[neighbor] {
                visited[neighbor] = true
                q.PushBack([2]int{neighbor, node})
            } else if neighbor != parent {
                return true
            }
        }
    }
    return false
}`,
  },
};

export const hashingAlgorithms = {
  hashTable: {
    java: `class HashTable {
    private int[] table;
    public HashTable(int size) { table = new int[size]; Arrays.fill(table, -1); }
    public void insert(int key) { table[key % table.length] = key; }
    public boolean search(int key) { return table[key % table.length] == key; }
    public void delete(int key) { if(table[key % table.length]==key) table[key % table.length]=-1; }
}`,
    python: `class HashTable:
    def __init__(self, size):
        self.table = [-1]*size
    def insert(self, key):
        self.table[key % len(self.table)] = key
    def search(self, key):
        return self.table[key % len(self.table)] == key
    def delete(self, key):
        if self.table[key % len(self.table)] == key:
            self.table[key % len(self.table)] = -1`,
    cpp: `class HashTable {
    vector<int> table;
    public:
    HashTable(int size) { table.assign(size, -1); }
    void insert(int key) { table[key % table.size()] = key; }
    bool search(int key) { return table[key % table.size()] == key; }
    void remove(int key) { if(table[key % table.size()]==key) table[key % table.size()]=-1; }
}`,
    javascript: `class HashTable {
    constructor(size){ this.table = Array(size).fill(-1); }
    insert(key){ this.table[key % this.table.length] = key; }
    search(key){ return this.table[key % this.table.length] === key; }
    delete(key){ if(this.table[key % this.table.length]===key) this.table[key % this.table.length]=-1; }
}`,
    go: `package main

type HashTable struct {
    table []int
}
func NewHashTable(size int) *HashTable { /* ... */ }
func (h *HashTable) Insert(key int) { h.table[key%len(h.table)] = key }
func (h *HashTable) Search(key int) bool { return h.table[key%len(h.table)] == key }
func (h *HashTable) Delete(key int) { /* ... */ }`,
  },

  chainingHash: {
    java: `import java.util.LinkedList;
class ChainingHashTable {
    private LinkedList<Integer>[] table;
    public ChainingHashTable(int size) {
        table = new LinkedList[size];
        for(int i=0;i<size;i++) table[i]=new LinkedList<>();
    }
    public void insert(int key){ table[key%table.length].add(key); }
    public boolean search(int key){ return table[key%table.length].contains(key); }
    public void delete(int key){ table[key%table.length].remove((Integer)key); }
}`,
    python: `class ChainingHashTable:
    def __init__(self, size):
        self.table = [[] for _ in range(size)]
    def insert(self,key): self.table[key%len(self.table)].append(key)
    def search(self,key): return key in self.table[key%len(self.table)]
    def delete(self,key):
        bucket = self.table[key%len(self.table)]
        if key in bucket: bucket.remove(key)`,
    cpp: `class ChainingHashTable {
    vector<list<int>> table;
    public:
    ChainingHashTable(int size){ table.resize(size); }
    void insert(int key){ table[key%table.size()].push_back(key); }
    bool search(int key){
        for(int k: table[key%table.size()]) if(k==key) return true;
        return false;
    }
    void remove(int key){ table[key%table.size()].remove(key); }
}`,
    javascript: `class ChainingHashTable {
    constructor(size){ this.table = Array.from({length:size}, ()=>[]); }
    insert(key){ this.table[key%this.table.length].push(key); }
    search(key){ return this.table[key%this.table.length].includes(key); }
    delete(key){
        const bucket = this.table[key%this.table.length];
        const idx = bucket.indexOf(key);
        if(idx>-1) bucket.splice(idx,1);
    }
}`,
    go: `package main

import "container/list"

type ChainingHashTable struct {
    table []*list.List
}
// ... (Implementation for Insert, Search, Delete)`,
  },

  openAddressing: {
    java: `class OpenAddressingHashTable {
    private int[] table;
    public OpenAddressingHashTable(int size){ table = new int[size]; Arrays.fill(table,-1); }
    private int hash(int key, int i){ return (key+i)%table.length; }
    public void insert(int key){
        for(int i=0;i<table.length;i++){
            int idx=hash(key,i);
            if(table[idx]==-1){ table[idx]=key; return; }
        }
    }
    public boolean search(int key){
        for(int i=0;i<table.length;i++){
            int idx=hash(key,i);
            if(table[idx]==key) return true;
            if(table[idx]==-1) return false;
        }
        return false;
    }
    public void delete(int key){
        for(int i=0;i<table.length;i++){
            int idx=hash(key,i);
            if(table[idx]==key){ table[idx]=-1; return; }
            if(table[idx]==-1) return;
        }
    }
}`,
    python: `class OpenAddressingHashTable:
    def __init__(self,size): self.table=[-1]*size
    def hash(self,key,i): return (key+i)%len(self.table)
    def insert(self,key):
        for i in range(len(self.table)):
            idx=self.hash(key,i)
            if self.table[idx]==-1: self.table[idx]=key; return
    def search(self,key):
        for i in range(len(self.table)):
            idx=self.hash(key,i)
            if self.table[idx]==key: return True
            if self.table[idx]==-1: return False
        return False
    def delete(self,key):
        for i in range(len(self.table)):
            idx=self.hash(key,i)
            if self.table[idx]==key: self.table[idx]=-1; return
            if self.table[idx]==-1: return`,
    cpp: `class OpenAddressingHashTable {
    vector<int> table;
    public:
    OpenAddressingHashTable(int size){ table.assign(size,-1); }
    int hashFunc(int key,int i){ return (key+i)%table.size(); }
    void insert(int key){
        for(int i=0;i<table.size();i++){
            int idx=hashFunc(key,i);
            if(table[idx]==-1){ table[idx]=key; return; }
        }
    }
    bool search(int key){
        for(int i=0;i<table.size();i++){
            int idx=hashFunc(key,i);
            if(table[idx]==key) return true;
            if(table[idx]==-1) return false;
        }
        return false;
    }
    void remove(int key){
        for(int i=0;i<table.size();i++){
            int idx=hashFunc(key,i);
            if(table[idx]==key){ table[idx]=-1; return; }
            if(table[idx]==-1) return;
        }
    }
}`,
    javascript: `class OpenAddressingHashTable {
    constructor(size){ this.table = Array(size).fill(-1); }
    hash(key,i){ return (key+i)%this.table.length; }
    insert(key){ for(let i=0;i<this.table.length;i++){ const idx=this.hash(key,i); if(this.table[idx]===-1){ this.table[idx]=key; return; } } }
    search(key){ for(let i=0;i<this.table.length;i++){ const idx=this.hash(key,i); if(this.table[idx]===key) return true; if(this.table[idx]===-1) return false; } return false; }
    delete(key){ for(let i=0;i<this.table.length;i++){ const idx=this.hash(key,i); if(this.table[idx]===key){ this.table[idx]=-1; return; } if(this.table[idx]===-1) return; } }
}`,
    go: `package main

type OpenAddressingHashTable struct {
    table []int
}
func (h *OpenAddressingHashTable) hash(key, i int) int { return (key + i) % len(h.table) }
// ... (Implementation for Insert, Search, Delete)`,
  },

  rollingHash: {
    java: `class RollingHash {
    public int computeHash(String s, int p, int m){
        int hash=0;
        for(char c:s.toCharArray())
            hash=(hash*p + c)%m;
        return hash;
    }
}`,
    python: `def rolling_hash(s, p, m):
    hash_val = 0
    for c in s:
        hash_val = (hash_val*p + ord(c)) % m
    return hash_val`,
    cpp: `int rollingHash(string s, int p, int m){
    int hash_val=0;
    for(char c:s)
        hash_val=(hash_val*p + c)%m;
    return hash_val;
}`,
    javascript: `function rollingHash(s,p,m){
    let hash=0;
    for(let c of s) hash=(hash*p + c.charCodeAt(0))%m;
    return hash;
}`,
    go: `package main

func rollingHash(s string, p, m int) int {
    hash := 0
    for _, c := range s {
        hash = (hash*p + int(c)) % m
    }
    return hash
}`,
  },

  applications: {
    twoSum: {
      java: `class TwoSum {
    public int[] twoSum(int[] nums, int target){
        Map<Integer,Integer> map=new HashMap<>();
        for(int i=0;i<nums.length;i++){
            int complement=target-nums[i];
            if(map.containsKey(complement)) return new int[]{map.get(complement),i};
            map.put(nums[i],i);
        }
        return new int[]{};
    }
}`,
      python: `def two_sum(nums,target):
    mp={}
    for i,num in enumerate(nums):
        comp=target-num
        if comp in mp: return [mp[comp],i]
        mp[num]=i
    return []`,
      cpp: `vector<int> twoSum(vector<int>& nums,int target){
    unordered_map<int,int> mp;
    for(int i=0;i<nums.size();i++){
        int comp=target-nums[i];
        if(mp.count(comp)) return {mp[comp],i};
        mp[nums[i]]=i;
    }
    return {};
}`,
      javascript: `function twoSum(nums,target){
    const map=new Map();
    for(let i=0;i<nums.length;i++){
        const comp=target-nums[i];
        if(map.has(comp)) return [map.get(comp),i];
        map.set(nums[i],i);
    }
    return [];
}`,
      go: `package main

func twoSum(nums []int, target int) []int {
    m := make(map[int]int)
    for i, num := range nums {
        complement := target - num
        if j, ok := m[complement]; ok {
            return []int{j, i}
        }
        m[num] = i
    }
    return nil
}`,
    },

    countingFrequencies: {
      java: `class FrequencyCounter {
    public Map<Integer,Integer> countFreq(int[] arr){
        Map<Integer,Integer> freq=new HashMap<>();
        for(int x:arr) freq.put(x,freq.getOrDefault(x,0)+1);
        return freq;
    }
}`,
      python: `from collections import Counter
def count_freq(arr): return dict(Counter(arr))`,
      cpp: `unordered_map<int,int> countFreq(vector<int>& arr){
    unordered_map<int,int> freq;
    for(int x:arr) freq[x]++;
    return freq;
}`,
      javascript: `function countFreq(arr){
    const freq={};
    for(const x of arr) freq[x]=(freq[x]||0)+1;
    return freq;
}`,
      go: `package main

func countFreq(arr []int) map[int]int {
    freq := make(map[int]int)
    for _, x := range arr {
        freq[x]++
    }
    return freq
}`,
    },
  },
};

// src/data/allCodes.js

export const greedyAlgorithms = {
  activitySelection: {
    java: `import java.util.*;
public class ActivitySelection {
    public int maxActivities(int[] start, int[] end){
        int n = start.length;
        int[][] activities = new int[n][2];
        for(int i=0;i<n;i++){
            activities[i][0]=start[i];
            activities[i][1]=end[i];
        }
        Arrays.sort(activities, Comparator.comparingInt(a->a[1]));
        int count = 1, lastEnd = activities[0][1];
        for(int i=1;i<n;i++){
            if(activities[i][0]>=lastEnd){
                count++;
                lastEnd=activities[i][1];
            }
        }
        return count;
    }
}`,
    python: `def max_activities(start, end):
    activities = sorted(zip(start, end), key=lambda x:x[1])
    count = 1
    last_end = activities[0][1]
    for s, e in activities[1:]:
        if s >= last_end:
            count += 1
            last_end = e
    return count`,
    cpp: `#include <bits/stdc++.h>
using namespace std;
int maxActivities(vector<int>& start, vector<int>& end){
    int n=start.size();
    vector<pair<int,int>> activities(n);
    for(int i=0;i<n;i++) activities[i]={start[i], end[i]};
    sort(activities.begin(), activities.end(), [](pair<int,int> a, pair<int,int> b){ return a.second<b.second; });
    int count=1, lastEnd=activities[0].second;
    for(int i=1;i<n;i++){
        if(activities[i].first>=lastEnd){
            count++;
            lastEnd=activities[i].second;
        }
    }
    return count;
}`,
    javascript: `function maxActivities(start, end){
    let activities = start.map((s,i)=>[s,end[i]]);
    activities.sort((a,b)=>a[1]-b[1]);
    let count=1, lastEnd=activities[0][1];
    for(let i=1;i<activities.length;i++){
        if(activities[i][0]>=lastEnd){
            count++;
            lastEnd=activities[i][1];
        }
    }
    return count;
}`,
  },

  fractionalKnapsack: {
    java: `import java.util.*;
public class FractionalKnapsack {
    class Item {
        int value, weight;
        Item(int v,int w){value=v; weight=w;}
    }
    public double knapsack(Item[] items, int W){
        Arrays.sort(items,(a,b)->Double.compare((double)b.value/a.weight, (double)a.value/b.weight));
        double total=0;
        for(Item item: items){
            if(W>=item.weight){
                W-=item.weight;
                total+=item.value;
            } else {
                total+=item.value*((double)W/item.weight);
                break;
            }
        }
        return total;
    }
}`,
    python: `def fractional_knapsack(values, weights, W):
    items = sorted(zip(values, weights), key=lambda x: x[0]/x[1], reverse=True)
    total = 0
    for v, w in items:
        if W>=w:
            W-=w
            total+=v
        else:
            total += v*(W/w)
            break
    return total`,
    cpp: `#include <bits/stdc++.h>
using namespace std;
double fractionalKnapsack(vector<int>& val, vector<int>& wt, int W){
    int n=val.size();
    vector<pair<double,int>> items(n);
    for(int i=0;i<n;i++) items[i]={(double)val[i]/wt[i], i};
    sort(items.rbegin(), items.rend());
    double total=0;
    for(auto [ratio,i]:items){
        if(W>=wt[i]){
            W-=wt[i];
            total+=val[i];
        } else {
            total += val[i]*((double)W/wt[i]);
            break;
        }
    }
    return total;
}`,
    javascript: `function fractionalKnapsack(values, weights, W){
    let items = values.map((v,i)=>({v,w:weights[i], ratio:v/weights[i]}));
    items.sort((a,b)=>b.ratio-a.ratio);
    let total=0;
    for(let item of items){
        if(W>=item.w){
            W-=item.w;
            total+=item.v;
        } else {
            total += item.v*(W/item.w);
            break;
        }
    }
    return total;
}`,
  },

  huffmanEncoding: {
    java: `import java.util.*;
public class Huffman {
    class Node implements Comparable<Node> {
        char c; int freq; Node left,right;
        Node(char c,int freq){this.c=c;this.freq=freq;}
        Node(int freq, Node l, Node r){this.freq=freq; left=l; right=r;}
        public int compareTo(Node o){ return this.freq - o.freq;}
    }
    public Node buildTree(Map<Character,Integer> freqMap){
        PriorityQueue<Node> pq = new PriorityQueue<>();
        for(char c: freqMap.keySet()) pq.add(new Node(c,freqMap.get(c)));
        while(pq.size()>1){
            Node a=pq.poll(), b=pq.poll();
            pq.add(new Node(a.freq+b.freq,a,b));
        }
        return pq.poll();
    }
}`,
    python: `import heapq
class Node:
    def __init__(self,freq,c=None,left=None,right=None):
        self.freq=freq; self.c=c; self.left=left; self.right=right
    def __lt__(self,other): return self.freq<other.freq
def huffman(freq_map):
    heap = [Node(freq,c) for c,freq in freq_map.items()]
    heapq.heapify(heap)
    while len(heap)>1:
        a=heapq.heappop(heap)
        b=heapq.heappop(heap)
        heapq.heappush(heap, Node(a.freq+b.freq, left=a, right=b))
    return heap[0]`,
    cpp: `#include <bits/stdc++.h>
using namespace std;
struct Node{
    char c; int freq; Node *left,*right;
    Node(char ch,int f){c=ch; freq=f; left=nullptr; right=nullptr;}
    Node(int f, Node* l, Node* r){freq=f; left=l; right=r;}
};
struct compare{ bool operator()(Node* a, Node* b){ return a->freq>b->freq; }};
Node* buildHuffman(map<char,int>& freqMap){
    priority_queue<Node*, vector<Node*>, compare> pq;
    for(auto [c,f]:freqMap) pq.push(new Node(c,f));
    while(pq.size()>1){
        Node *a=pq.top(); pq.pop();
        Node *b=pq.top(); pq.pop();
        pq.push(new Node(a->freq+b->freq, a,b));
    }
    return pq.top();
}`,
    javascript: `class Node{
    constructor(freq,c=null,left=null,right=null){
        this.freq=freq; this.c=c; this.left=left; this.right=right;
    }
}
function huffman(freqMap){
    let pq = Object.entries(freqMap).map(([c,f])=>new Node(f,c));
    pq.sort((a,b)=>a.freq-b.freq);
    while(pq.length>1){
        let a=pq.shift(), b=pq.shift();
        pq.push(new Node(a.freq+b.freq,a,b));
        pq.sort((a,b)=>a.freq-b.freq);
    }
    return pq[0];
}`,
  },

  jobScheduling: {
    java: `import java.util.*;
class Job {
    int id, deadline, profit;
    Job(int i,int d,int p){id=i; deadline=d; profit=p;}
}
public class JobScheduling {
    public int maxProfit(Job[] jobs){
        Arrays.sort(jobs,(a,b)->b.profit-a.profit);
        int n = jobs.length;
        boolean[] slot = new boolean[100];
        int profit=0;
        for(Job job: jobs){
            for(int j=Math.min(99,job.deadline-1); j>=0; j--){
                if(!slot[j]){
                    slot[j]=true;
                    profit+=job.profit;
                    break;
                }
            }
        }
        return profit;
    }
}`,
    python: `def job_scheduling(jobs):
    jobs.sort(key=lambda x: x[2], reverse=True)
    slot = [False]*100
    profit=0
    for id,d,p in jobs:
        for j in range(min(99,d-1), -1, -1):
            if not slot[j]:
                slot[j]=True
                profit+=p
                break
    return profit`,
    cpp: `#include <bits/stdc++.h>
using namespace std;
struct Job{ int id, deadline, profit; };
int jobScheduling(vector<Job>& jobs){
    sort(jobs.rbegin(), jobs.rend(), [](Job a, Job b){ return a.profit<b.profit; });
    vector<bool> slot(100,false);
    int profit=0;
    for(auto job: jobs){
        for(int j=min(99,job.deadline-1); j>=0; j--){
            if(!slot[j]){
                slot[j]=true;
                profit+=job.profit;
                break;
            }
        }
    }
    return profit;
}`,
    javascript: `function jobScheduling(jobs){
    jobs.sort((a,b)=>b[2]-a[2]);
    let slot=Array(100).fill(false), profit=0;
    for(let [id,d,p] of jobs){
        for(let j=Math.min(99,d-1); j>=0; j--){
            if(!slot[j]){
                slot[j]=true;
                profit+=p;
                break;
            }
        }
    }
    return profit;
}`,
  },

  primKruskalMST: {
    java: `import java.util.*;
class Edge implements Comparable<Edge>{
    int u,v,weight;
    Edge(int u,int v,int w){this.u=u;this.v=v;this.weight=w;}
    public int compareTo(Edge o){ return this.weight - o.weight;}
}
public class MST {
    int find(int u, int[] parent){
        if(parent[u]==u) return u;
        return parent[u]=find(parent[u], parent);
    }
    public int kruskalMST(int n, List<Edge> edges){
        Collections.sort(edges);
        int[] parent = new int[n];
        for(int i=0;i<n;i++) parent[i]=i;
        int mstWeight=0;
        for(Edge e: edges){
            int pu=find(e.u,parent), pv=find(e.v,parent);
            if(pu!=pv){
                parent[pu]=pv;
                mstWeight+=e.weight;
            }
        }
        return mstWeight;
    }
}`,
    python: `def kruskalMST(n, edges):
    parent = list(range(n))
    def find(u):
        if parent[u]!=u: parent[u]=find(parent[u])
        return parent[u]
    edges.sort(key=lambda x:x[2])
    mstWeight=0
    for u,v,w in edges:
        pu,pv=find(u),find(v)
        if pu!=pv:
            parent[pu]=pv
            mstWeight+=w
    return mstWeight`,
    cpp: `#include <bits/stdc++.h>
using namespace std;
struct Edge{ int u,v,weight; };
int find(int u, vector<int>& parent){ if(parent[u]==u) return u; return parent[u]=find(parent[u],parent);}
int kruskalMST(int n, vector<Edge>& edges){
    vector<int> parent(n); iota(parent.begin(), parent.end(),0);
    sort(edges.begin(), edges.end(), [](Edge a, Edge b){ return a.weight<b.weight; });
    int mstWeight=0;
    for(auto e: edges){
        int pu=find(e.u,parent), pv=find(e.v,parent);
        if(pu!=pv){
            parent[pu]=pv;
            mstWeight+=e.weight;
        }
    }
    return mstWeight;
}`,
    javascript: `function kruskalMST(n, edges){
    let parent = Array.from({length:n}, (_,i)=>i);
    function find(u){ if(parent[u]!==u) parent[u]=find(parent[u]); return parent[u]; }
    edges.sort((a,b)=>a[2]-b[2]);
    let mstWeight=0;
    for(let [u,v,w] of edges){
        let pu=find(u), pv=find(v);
        if(pu!==pv){
            parent[pu]=pv;
            mstWeight+=w;
        }
    }
    return mstWeight;
}`,
    go: `package main

import "container/list"

func hasCycleBFS(adj [][]int) bool {
    V := len(adj)
    indegree := make([]int, V)
    for u := 0; u < V; u++ {
        for _, v := range adj[u] {
            indegree[v]++
        }
    }
    q := list.New()
    for i := 0; i < V; i++ { if indegree[i] == 0 { q.PushBack(i) } }
    count := 0
    for q.Len() > 0 {
        u := q.Remove(q.Front()).(int)
        count++
        for _, v := range adj[u] {
            indegree[v]--
            if indegree[v] == 0 { q.PushBack(v) }
        }
    }
    return count != V
}`,
  },
};
// src/data/allCodes.js

export const treeAlgorithms = {
  binaryTreeTraversals: {
    preorder: {
      java: `public void preorder(TreeNode root){
    if(root==null) return;
    System.out.print(root.val + " ");
    preorder(root.left);
    preorder(root.right);
}`,
      python: `def preorder(root):
    if not root: return
    print(root.val, end=' ')
    preorder(root.left)
    preorder(root.right)`,
      cpp: `void preorder(TreeNode* root){
    if(!root) return;
    cout << root->val << " ";
    preorder(root->left);
    preorder(root->right);
}`,
      javascript: `function preorder(root){
    if(!root) return;
    console.log(root.val);
    preorder(root.left);
    preorder(root.right);
}`,
      go: `package main

func preorder(root *TreeNode) {
    if root == nil { return }
    // process root.Val
    preorder(root.Left)
    preorder(root.Right)
}`,
    },
    inorder: {
      java: `public void inorder(TreeNode root){
    if(root==null) return;
    inorder(root.left);
    System.out.print(root.val + " ");
    inorder(root.right);
}`,
      python: `def inorder(root):
    if not root: return
    inorder(root.left)
    print(root.val, end=' ')
    inorder(root.right)`,
      cpp: `void inorder(TreeNode* root){
    if(!root) return;
    inorder(root->left);
    cout << root->val << " ";
    inorder(root->right);
}`,
      javascript: `function inorder(root){
    if(!root) return;
    inorder(root.left);
    console.log(root.val);
    inorder(root.right);
}`,
      go: `package main

func inorder(root *TreeNode) {
    if root == nil { return }
    inorder(root.Left)
    // process root.Val
    inorder(root.Right)
}`,
    },
    postorder: {
      java: `public void postorder(TreeNode root){
    if(root==null) return;
    postorder(root.left);
    postorder(root.right);
    System.out.print(root.val + " ");
}`,
      python: `def postorder(root):
    if not root: return
    postorder(root.left)
    postorder(root.right)
    print(root.val, end=' ')`,
      cpp: `void postorder(TreeNode* root){
    if(!root) return;
    postorder(root->left);
    postorder(root->right);
    cout << root->val << " ";
}`,
      javascript: `function postorder(root){
    if(!root) return;
    postorder(root.left);
    postorder(root.right);
    console.log(root.val);
}`,
      go: `package main

func postorder(root *TreeNode) {
    if root == nil { return }
    postorder(root.Left)
    postorder(root.Right)
    // process root.Val
}`,
    },
    levelOrder: {
      java: `public void levelOrder(TreeNode root){
    if(root==null) return;
    Queue<TreeNode> q = new LinkedList<>();
    q.add(root);
    while(!q.isEmpty()){
        TreeNode node = q.poll();
        System.out.print(node.val + " ");
        if(node.left!=null) q.add(node.left);
        if(node.right!=null) q.add(node.right);
    }
}`,
      python: `from collections import deque
def levelOrder(root):
    if not root: return
    q = deque([root])
    while q:
        node = q.popleft()
        print(node.val, end=' ')
        if node.left: q.append(node.left)
        if node.right: q.append(node.right)`,
      cpp: `void levelOrder(TreeNode* root){
    if(!root) return;
    queue<TreeNode*> q;
    q.push(root);
    while(!q.empty()){
        TreeNode* node = q.front(); q.pop();
        cout << node->val << " ";
        if(node->left) q.push(node->left);
        if(node->right) q.push(node->right);
    }
}`,
      javascript: `function levelOrder(root){
    if(!root) return;
    const q = [root];
    while(q.length){
        const node = q.shift();
        console.log(node.val);
        if(node.left) q.push(node.left);
        if(node.right) q.push(node.right);
    }
}`,
      go: `package main

import "container/list"

func levelOrder(root *TreeNode) {
    if root == nil { return }
    q := list.New()
    q.PushBack(root)
    for q.Len() > 0 {
        node := q.Remove(q.Front()).(*TreeNode)
        // process node.Val
        if node.Left != nil { q.PushBack(node.Left) }
        if node.Right != nil { q.PushBack(node.Right) }
    }
}`,
    },
  },

  bstOperations: {
    insert: {
      java: `public TreeNode insert(TreeNode root, int val){
    if(root==null) return new TreeNode(val);
    if(val<root.val) root.left=insert(root.left,val);
    else root.right=insert(root.right,val);
    return root;
}`,
      python: `def insert(root,val):
    if not root: return TreeNode(val)
    if val<root.val: root.left=insert(root.left,val)
    else: root.right=insert(root.right,val)
    return root`,
      cpp: `TreeNode* insert(TreeNode* root,int val){
    if(!root) return new TreeNode(val);
    if(val<root->val) root->left=insert(root->left,val);
    else root->right=insert(root->right,val);
    return root;
}`,
      javascript: `function insert(root,val){
    if(!root) return {val,left:null,right:null};
    if(val<root.val) root.left=insert(root.left,val);
    else root.right=insert(root.right,val);
    return root;
}`,
      go: `package main

func insert(root *TreeNode, val int) *TreeNode {
    if root == nil { return &TreeNode{Val: val} }
    if val < root.Val { root.Left = insert(root.Left, val) }
    else { root.Right = insert(root.Right, val) }
    return root
}`,
    },
    search: {
      java: `public boolean search(TreeNode root,int val){
    if(root==null) return false;
    if(root.val==val) return true;
    if(val<root.val) return search(root.left,val);
    else return search(root.right,val);
}`,
      python: `def search(root,val):
    if not root: return False
    if root.val==val: return True
    if val<root.val: return search(root.left,val)
    return search(root.right,val)`,
      cpp: `bool search(TreeNode* root,int val){
    if(!root) return false;
    if(root->val==val) return true;
    if(val<root->val) return search(root->left,val);
    return search(root->right,val);
}`,
      javascript: `function search(root,val){
    if(!root) return false;
    if(root.val===val) return true;
    if(val<root.val) return search(root.left,val);
    return search(root.right,val);
}`,
      go: `package main

func search(root *TreeNode, val int) bool {
    if root == nil { return false }
    if root.Val == val { return true }
    if val < root.Val { return search(root.Left, val) }
    return search(root.Right, val)
}`,
    },
    deleteNode: {
      java: `public TreeNode deleteNode(TreeNode root,int key){
    if(root==null) return null;
    if(key<root.val) root.left=deleteNode(root.left,key);
    else if(key>root.val) root.right=deleteNode(root.right,key);
    else{
        if(root.left==null) return root.right;
        else if(root.right==null) return root.left;
        TreeNode minNode=root.right;
        while(minNode.left!=null) minNode=minNode.left;
        root.val=minNode.val;
        root.right=deleteNode(root.right,minNode.val);
    }
    return root;
}`,
      python: `def deleteNode(root,key):
    if not root: return None
    if key<root.val: root.left=deleteNode(root.left,key)
    elif key>root.val: root.right=deleteNode(root.right,key)
    else:
        if not root.left: return root.right
        if not root.right: return root.left
        temp=root.right
        while temp.left: temp=temp.left
        root.val=temp.val
        root.right=deleteNode(root.right,temp.val)
    return root`,
      cpp: `TreeNode* deleteNode(TreeNode* root,int key){
    if(!root) return nullptr;
    if(key<root->val) root->left=deleteNode(root->left,key);
    else if(key>root->val) root->right=deleteNode(root->right,key);
    else{
        if(!root->left) return root->right;
        if(!root->right) return root->left;
        TreeNode* temp=root->right;
        while(temp->left) temp=temp->left;
        root->val=temp->val;
        root->right=deleteNode(root->right,temp->val);
    }
    return root;
}`,
      javascript: `function deleteNode(root,key){
    if(!root) return null;
    if(key<root.val) root.left=deleteNode(root.left,key);
    else if(key>root.val) root.right=deleteNode(root.right,key);
    else{
        if(!root.left) return root.right;
        if(!root.right) return root.left;
        let temp=root.right;
        while(temp.left) temp=temp.left;
        root.val=temp.val;
        root.right=deleteNode(root.right,temp.val);
    }
    return root;
}`,
      go: `package main

func deleteNode(root *TreeNode, key int) *TreeNode {
    if root == nil { return nil }
    if key < root.Val { root.Left = deleteNode(root.Left, key) }
    else if key > root.Val { root.Right = deleteNode(root.Right, key) }
    else {
        if root.Left == nil { return root.Right }
        if root.Right == nil { return root.Left }
        temp := root.Right
        for temp.Left != nil { temp = temp.Left }
        root.Val = temp.Val
        root.Right = deleteNode(root.Right, temp.Val)
    }
    return root
}`,
    },
  },
};
export const divideConquerAlgorithms = {
  mergeSort: {
    java: `public class MergeSort {
    public void mergeSort(int[] arr, int l, int r){
        if(l<r){
            int m = l + (r-l)/2;
            mergeSort(arr,l,m);
            mergeSort(arr,m+1,r);
            merge(arr,l,m,r);
        }
    }
    private void merge(int[] arr, int l, int m, int r){
        int n1=m-l+1, n2=r-m;
        int[] L=new int[n1], R=new int[n2];
        for(int i=0;i<n1;i++) L[i]=arr[l+i];
        for(int j=0;j<n2;j++) R[j]=arr[m+1+j];
        int i=0,j=0,k=l;
        while(i<n1 && j<n2){
            arr[k++] = (L[i]<=R[j]) ? L[i++] : R[j++];
        }
        while(i<n1) arr[k++]=L[i++];
        while(j<n2) arr[k++]=R[j++];
    }
}`,
    python: `def merge_sort(arr):
    if len(arr)>1:
        mid=len(arr)//2
        L,R=arr[:mid],arr[mid:]
        merge_sort(L)
        merge_sort(R)
        i=j=k=0
        while i<len(L) and j<len(R):
            if L[i]<=R[j]: arr[k]=L[i]; i+=1
            else: arr[k]=R[j]; j+=1
            k+=1
        while i<len(L): arr[k]=L[i]; i+=1; k+=1
        while j<len(R): arr[k]=R[j]; j+=1; k+=1`,
    cpp: `void merge(vector<int>& arr, int l, int m, int r){
    int n1=m-l+1, n2=r-m;
    vector<int> L(arr.begin()+l, arr.begin()+l+n1);
    vector<int> R(arr.begin()+m+1, arr.begin()+m+1+n2);
    int i=0,j=0,k=l;
    while(i<n1 && j<n2) arr[k++] = (L[i]<=R[j]) ? L[i++] : R[j++];
    while(i<n1) arr[k++]=L[i++];
    while(j<n2) arr[k++]=R[j++];
}
void mergeSort(vector<int>& arr, int l, int r){
    if(l<r){
        int m=l+(r-l)/2;
        mergeSort(arr,l,m);
        mergeSort(arr,m+1,r);
        merge(arr,l,m,r);
    }
}`,
    javascript: `function mergeSort(arr){
    if(arr.length<=1) return arr;
    const mid=Math.floor(arr.length/2);
    const left=mergeSort(arr.slice(0,mid));
    const right=mergeSort(arr.slice(mid));
    const merged=[];
    let i=0,j=0;
    while(i<left.length && j<right.length){
        merged.push(left[i]<=right[j]?left[i++]:right[j++]);
    }
    return merged.concat(left.slice(i)).concat(right.slice(j));
}`,
    go: `package main

func mergeSort(arr []int) []int {
    if len(arr) <= 1 { return arr }
    mid := len(arr) / 2
    left := mergeSort(arr[:mid])
    right := mergeSort(arr[mid:])
    return merge(left, right)
}
func merge(left, right []int) []int {
    res := make([]int, 0, len(left)+len(right))
    for len(left) > 0 || len(right) > 0 {
        if len(left) > 0 && (len(right) == 0 || left[0] <= right[0]) {
            res = append(res, left[0]); left = left[1:]
        } else {
            res = append(res, right[0]); right = right[1:]
        }
    }
    return res
}`,
  },

  quickSort: {
    java: `public class QuickSort {
    public void quickSort(int[] arr, int low, int high){
        if(low<high){
            int pi=partition(arr,low,high);
            quickSort(arr,low,pi-1);
            quickSort(arr,pi+1,high);
        }
    }
    private int partition(int[] arr,int low,int high){
        int pivot=arr[high], i=low-1;
        for(int j=low;j<high;j++){
            if(arr[j]<=pivot){ i++; int temp=arr[i]; arr[i]=arr[j]; arr[j]=temp; }
        }
        int temp=arr[i+1]; arr[i+1]=arr[high]; arr[high]=temp;
        return i+1;
    }
}`,
    python: `def quick_sort(arr):
    if len(arr)<=1: return arr
    pivot=arr[-1]
    left=[x for x in arr[:-1] if x<=pivot]
    right=[x for x in arr[:-1] if x>pivot]
    return quick_sort(left)+[pivot]+quick_sort(right)`,
    cpp: `int partition(vector<int>& arr, int low, int high){
    int pivot=arr[high], i=low-1;
    for(int j=low;j<high;j++){
        if(arr[j]<=pivot){ i++; swap(arr[i], arr[j]); }
    }
    swap(arr[i+1], arr[high]);
    return i+1;
}
void quickSort(vector<int>& arr, int low, int high){
    if(low<high){
        int pi=partition(arr,low,high);
        quickSort(arr,low,pi-1);
        quickSort(arr,pi+1,high);
    }
}`,
    javascript: `function quickSort(arr){
    if(arr.length<=1) return arr;
    const pivot=arr[arr.length-1];
    const left=arr.slice(0,-1).filter(x=>x<=pivot);
    const right=arr.slice(0,-1).filter(x=>x>pivot);
    return [...quickSort(left),pivot,...quickSort(right)];
}`,
  },

  binarySearch: {
    java: `public class BinarySearch {
    public int binarySearch(int[] arr, int target){
        int l=0, r=arr.length-1;
        while(l<=r){
            int m=l+(r-l)/2;
            if(arr[m]==target) return m;
            else if(arr[m]<target) l=m+1;
            else r=m-1;
        }
        return -1;
    }
}`,
    python: `def binary_search(arr,target):
    l,r=0,len(arr)-1
    while l<=r:
        m=(l+r)//2
        if arr[m]==target: return m
        elif arr[m]<target: l=m+1
        else: r=m-1
    return -1`,
    cpp: `int binarySearch(vector<int>& arr,int target){
    int l=0,r=arr.size()-1;
    while(l<=r){
        int m=l+(r-l)/2;
        if(arr[m]==target) return m;
        else if(arr[m]<target) l=m+1;
        else r=m-1;
    }
    return -1;
}`,
    javascript: `function binarySearch(arr,target){
    let l=0,r=arr.length-1;
    while(l<=r){
        const m=Math.floor((l+r)/2);
        if(arr[m]===target) return m;
        else if(arr[m]<target) l=m+1;
        else r=m-1;
    }
    return -1;
}`,
    go: `package main

func binarySearch(arr []int, target int) int {
    l, r := 0, len(arr)-1
    for l <= r {
        m := l + (r-l)/2
        if arr[m] == target { return m }
        if arr[m] < target { l = m + 1 }
        else { r = m - 1 }
    }
    return -1
}`,
  },

  maximumSubarraySum: {
    java: `public class MaxSubarray {
    public int maxSubArray(int[] arr, int l, int r){
        if(l==r) return arr[l];
        int m=l+(r-l)/2;
        int leftMax=maxSubArray(arr,l,m);
        int rightMax=maxSubArray(arr,m+1,r);
        int crossMax=0,leftSum=Integer.MIN_VALUE,rightSum=Integer.MIN_VALUE,sum=0;
        for(int i=m;i>=l;i--){ sum+=arr[i]; leftSum=Math.max(leftSum,sum); }
        sum=0;
        for(int i=m+1;i<=r;i++){ sum+=arr[i]; rightSum=Math.max(rightSum,sum); }
        crossMax=leftSum+rightSum;
        return Math.max(Math.max(leftMax,rightMax),crossMax);
    }
}`,
    python: `def max_subarray(arr,l,r):
    if l==r: return arr[l]
    m=(l+r)//2
    left=max_subarray(arr,l,m)
    right=max_subarray(arr,m+1,r)
    left_sum=right_sum=sum=0
    left_sum=float('-inf')
    for i in range(m,l-1,-1): sum+=arr[i]; left_sum=max(left_sum,sum)
    sum=0; right_sum=float('-inf')
    for i in range(m+1,r+1): sum+=arr[i]; right_sum=max(right_sum,sum)
    return max(left,right,left_sum+right_sum)`,
    cpp: `int maxSubArray(vector<int>& arr,int l,int r){
    if(l==r) return arr[l];
    int m=l+(r-l)/2;
    int left=maxSubArray(arr,l,m);
    int right=maxSubArray(arr,m+1,r);
    int leftSum=INT_MIN,rightSum=INT_MIN,sum=0;
    for(int i=m;i>=l;i--){ sum+=arr[i]; leftSum=max(leftSum,sum); }
    sum=0;
    for(int i=m+1;i<=r;i++){ sum+=arr[i]; rightSum=max(rightSum,sum); }
    return max({left,right,leftSum+rightSum});
}`,
    javascript: `function maxSubArray(arr,l,r){
    if(l===r) return arr[l];
    const m=Math.floor((l+r)/2);
    const left=maxSubArray(arr,l,m);
    const right=maxSubArray(arr,m+1,r);
    let leftSum=-Infinity,rightSum=-Infinity,sum=0;
    for(let i=m;i>=l;i--){ sum+=arr[i]; leftSum=Math.max(leftSum,sum); }
    sum=0;
    for(let i=m+1;i<=r;i++){ sum+=arr[i]; rightSum=Math.max(rightSum,sum); }
    return Math.max(left,right,leftSum+rightSum);
}`,
    go: `package main

import "math"

func maxSubArray(arr []int, l, r int) int {
    if l == r { return arr[l] }
    m := l + (r-l)/2
    leftMax := maxSubArray(arr, l, m)
    rightMax := maxSubArray(arr, m+1, r)
    leftSum, rightSum := math.MinInt32, math.MinInt32
    sum := 0
    for i := m; i >= l; i-- { sum += arr[i]; leftSum = max(leftSum, sum) }
    sum = 0
    for i := m + 1; i <= r; i++ { sum += arr[i]; rightSum = max(rightSum, sum) }
    return max(leftMax, rightMax, leftSum+rightSum)
}`,
  },
};

export const branchBoundAlgorithms = {
  knapsack01: {
    java: `class Item {
    int weight, value;
    Item(int w, int v){ weight=w; value=v; }
}
int bound(int uVal, int uWt, int idx, Item[] items, int W){
    if(uWt>=W) return 0;
    int profitBound=uVal, totWt=uWt;
    for(int i=idx;i<items.length;i++){
        if(totWt+items[i].weight<=W){
            totWt+=items[i].weight;
            profitBound+=items[i].value;
        } else {
            profitBound+=(W-totWt)*items[i].value/items[i].weight;
            break;
        }
    }
    return profitBound;
}`,
    python: `class Item:
    def __init__(self, w, v):
        self.weight=w
        self.value=v

def bound(val, wt, idx, items, W):
    if wt>=W: return 0
    profit_bound=val
    totWt=wt
    for i in range(idx,len(items)):
        if totWt+items[i].weight<=W:
            totWt+=items[i].weight
            profit_bound+=items[i].value
        else:
            profit_bound+=(W-totWt)*(items[i].value/items[i].weight)
            break
    return profit_bound`,
    cpp: `struct Item{
    int weight,value;
};
int bound(int uVal,int uWt,int idx,vector<Item>& items,int W){
    if(uWt>=W) return 0;
    int profitBound=uVal, totWt=uWt;
    for(int i=idx;i<items.size();i++){
        if(totWt+items[i].weight<=W){
            totWt+=items[i].weight;
            profitBound+=items[i].value;
        } else {
            profitBound+=(W-totWt)*items[i].value/items[i].weight;
            break;
        }
    }
    return profitBound;
}`,
    javascript: `class Item{
  constructor(w,v){ this.weight=w; this.value=v; }
}
function bound(val,wt,idx,items,W){
  if(wt>=W) return 0;
  let profitBound=val, totWt=wt;
  for(let i=idx;i<items.length;i++){
    if(totWt+items[i].weight<=W){
      totWt+=items[i].weight;
      profitBound+=items[i].value;
    } else {
      profitBound+=(W-totWt)*(items[i].value/items[i].weight);
      break;
    }
  }
  return profitBound;
}`,
    go: `package main

type Item struct {
    Weight, Value int
}

func bound(uVal, uWt, idx int, items []Item, W int) float64 {
    if uWt >= W { return 0 }
    profitBound := float64(uVal)
    // ... (Full bound calculation is complex)
    return profitBound
}`,
  },

  
  tsp: {
    java: `int tspBound(int cost, int level, int[] reducedMatrix){
    // cost = path cost till now, reducedMatrix = current reduced cost matrix
    // Typically bound = cost + sum of two minimum edges from each unvisited node
    return cost + level; // placeholder for actual bound calculation
}`,
    python: `def tsp_bound(cost, level, reduced_matrix):
    # cost = path cost till now
    # reduced_matrix = current reduced cost matrix
    # bound = cost + heuristic estimate
    return cost + level  # placeholder`,
    cpp: `int tspBound(int cost, int level, vector<vector<int>>& reducedMatrix){
    // cost = path cost till now
    // reducedMatrix = current reduced cost matrix
    return cost + level; // placeholder
}`,
    javascript: `function tspBound(cost, level, reducedMatrix){
  // cost = path cost till now
  // reducedMatrix = current reduced cost matrix
  return cost + level; // placeholder
}`,
    go: `package main

func tspBound(cost, level int, reducedMatrix [][]int) int {
    // ... (TSP bound calculation is complex)
    return cost + level // Placeholder
}`,
  },
};

export const gameSearch = {
  minimax: {
    java: `public class Minimax {
    public int minimax(int[] board, boolean isMaximizing){
        if(isGameOver(board)) return evaluate(board);
        if(isMaximizing){
            int best = Integer.MIN_VALUE;
            for(int move : getAvailableMoves(board)){
                board[move] = 1;
                best = Math.max(best, minimax(board, false));
                board[move] = 0;
            }
            return best;
        } else {
            int best = Integer.MAX_VALUE;
            for(int move : getAvailableMoves(board)){
                board[move] = -1;
                best = Math.min(best, minimax(board, true));
                board[move] = 0;
            }
            return best;
        }
    }
}`,
    python: `def minimax(board, is_maximizing):
    if game_over(board): return evaluate(board)
    if is_maximizing:
        best = float('-inf')
        for move in available_moves(board):
            board[move] = 1
            best = max(best, minimax(board, False))
            board[move] = 0
        return best
    else:
        best = float('inf')
        for move in available_moves(board):
            board[move] = -1
            best = min(best, minimax(board, True))
            board[move] = 0
        return best`,
    cpp: `int minimax(vector<int>& board, bool isMaximizing){
    if(gameOver(board)) return evaluate(board);
    if(isMaximizing){
        int best = INT_MIN;
        for(int move : getAvailableMoves(board)){
            board[move] = 1;
            best = max(best, minimax(board, false));
            board[move] = 0;
        }
        return best;
    } else {
        int best = INT_MAX;
        for(int move : getAvailableMoves(board)){
            board[move] = -1;
            best = min(best, minimax(board, true));
            board[move] = 0;
        }
        return best;
    }
}`,
    go: `package main

import "math"

func minimax(board []int, isMaximizing bool) int {
    if gameOver(board) { return evaluate(board) }
    if isMaximizing {
        best := math.MinInt32
        // ... loop through moves, recurse, update best
        return best
    } else {
        best := math.MaxInt32
        // ... loop through moves, recurse, update best
        return best
    }
}`,
  },

  alphaBetaPruning: {
    java: `public class AlphaBeta {
    public int alphaBeta(int[] board, int alpha, int beta, boolean isMaximizing){
        if(isGameOver(board)) return evaluate(board);
        if(isMaximizing){
            int best = Integer.MIN_VALUE;
            for(int move : getAvailableMoves(board)){
                board[move] = 1;
                best = Math.max(best, alphaBeta(board, alpha, beta, false));
                board[move] = 0;
                alpha = Math.max(alpha, best);
                if(beta <= alpha) break;
            }
            return best;
        } else {
            int best = Integer.MAX_VALUE;
            for(int move : getAvailableMoves(board)){
                board[move] = -1;
                best = Math.min(best, alphaBeta(board, alpha, beta, true));
                board[move] = 0;
                beta = Math.min(beta, best);
                if(beta <= alpha) break;
            }
            return best;
        }
    }
}`,
    python: `def alpha_beta(board, alpha, beta, is_maximizing):
    if game_over(board): return evaluate(board)
    if is_maximizing:
        best = float('-inf')
        for move in available_moves(board):
            board[move] = 1
            best = max(best, alpha_beta(board, alpha, beta, False))
            board[move] = 0
            alpha = max(alpha, best)
            if beta <= alpha: break
        return best
    else:
        best = float('inf')
        for move in available_moves(board):
            board[move] = -1
            best = min(best, alpha_beta(board, alpha, beta, True))
            board[move] = 0
            beta = min(beta, best)
            if beta <= alpha: break
        return best`,
    cpp: `int alphaBeta(vector<int>& board, int alpha, int beta, bool isMaximizing){
    if(gameOver(board)) return evaluate(board);
    if(isMaximizing){
        int best = INT_MIN;
        for(int move : getAvailableMoves(board)){
            board[move] = 1;
            best = max(best, alphaBeta(board, alpha, beta, false));
            board[move] = 0;
            alpha = max(alpha, best);
            if(beta <= alpha) break;
        }
        return best;
    } else {
        int best = INT_MAX;
        for(int move : getAvailableMoves(board)){
            board[move] = -1;
            best = min(best, alphaBeta(board, alpha, beta, true));
            board[move] = 0;
            beta = min(beta, best);
            if(beta <= alpha) break;
        }
        return best;
    }
}`,
  },

  expectimax: {
    java: `public class Expectimax {
    public double expectimax(int[] board, boolean isMax){
        if(isGameOver(board)) return evaluate(board);
        if(isMax){
            double best = Double.NEGATIVE_INFINITY;
            for(int move : getAvailableMoves(board)){
                board[move] = 1;
                best = Math.max(best, expectimax(board, false));
                board[move] = 0;
            }
            return best;
        } else {
            double total = 0;
            int[] moves = getAvailableMoves(board);
            for(int move : moves){
                board[move] = -1;
                total += expectimax(board, true);
                board[move] = 0;
            }
            return moves.length > 0 ? total/moves.length : 0;
        }
    }
}`,
    python: `def expectimax(board, is_max):
    if game_over(board): return evaluate(board)
    if is_max:
        best = float('-inf')
        for move in available_moves(board):
            board[move] = 1
            best = max(best, expectimax(board, False))
            board[move] = 0
        return best
    else:
        total = 0
        moves = available_moves(board)
        for move in moves:
            board[move] = -1
            total += expectimax(board, True)
            board[move] = 0
        return total/len(moves) if moves else 0`,
    cpp: `double expectimax(vector<int>& board, bool isMax){
    if(gameOver(board)) return evaluate(board);
    if(isMax){
        double best = -DBL_MAX;
        for(int move : getAvailableMoves(board)){
            board[move] = 1;
            best = max(best, expectimax(board, false));
            board[move] = 0;
        }
        return best;
    } else {
        double total = 0;
        vector<int> moves = getAvailableMoves(board);
        for(int move : moves){
            board[move] = -1;
            total += expectimax(board, true);
            board[move] = 0;
        }
        return moves.size() ? total/moves.size() : 0;
    }
}`,
    go: `package main

import "math"

func expectimax(board []int, isMax bool) float64 {
    if gameOver(board) { return float64(evaluate(board)) }
    if isMax {
        best := -math.MaxFloat64
        // ... loop, recurse, update best
        return best
    } else { // Chance node
        total := 0.0
        // ... loop, recurse, add to total
        return total / float64(len(moves))
    }
}`,
  },

  mcts: {
    java: `public class MCTSNode {
    int[] state;
    int visits = 0;
    double value = 0;
    List<MCTSNode> children = new ArrayList<>();
    
    public void expand(){ for(int move : getAvailableMoves(state)) children.add(new MCTSNode(applyMove(state, move))); }
    public MCTSNode bestChild(){ return Collections.max(children, Comparator.comparingDouble(c -> c.value/c.visits)); }
}`,
    python: `class MCTSNode:
    def __init__(self, state):
        self.state = state
        self.visits = 0
        self.value = 0
        self.children = []

    def expand(self):
        for move in available_moves(self.state):
            self.children.append(MCTSNode(apply_move(self.state, move)))

    def best_child(self):
        return max(self.children, key=lambda c: c.value/c.visits if c.visits else 0)`,
    cpp: `struct MCTSNode{
    vector<int> state;
    int visits=0;
    double value=0;
    vector<MCTSNode*> children;
    void expand(){ for(int move : getAvailableMoves(state)) children.push_back(new MCTSNode(applyMove(state, move))); }
    MCTSNode* bestChild(){ return *max_element(children.begin(), children.end(), [](MCTSNode* a,MCTSNode* b){ return a->value/a->visits < b->value/b->visits; }); }
};`,
    go: `package main

type MCTSNode struct {
    state []int
    visits int
    value float64
    children []*MCTSNode
}

// ... (Full MCTS implementation is complex)
`,
  },
};
export const mathAlgorithms = {
  gcdEuclidean: {
    java: `public class GCD {
    public static int gcd(int a, int b){
        if(b == 0) return a;
        return gcd(b, a % b);
    }
}`,
    python: `def gcd(a, b):
    if b == 0:
        return a
    return gcd(b, a % b)`,
    cpp: `int gcd(int a, int b){
    if(b == 0) return a;
    return gcd(b, a % b);
}`,
    go: `package main

func gcd(a, b int) int {
    for b != 0 { a, b = b, a%b }
    return a
}`,
  },

  sieveOfEratosthenes: {
    java: `import java.util.*;
public class Sieve {
    public static boolean[] sieve(int n){
        boolean prime[] = new boolean[n+1];
        Arrays.fill(prime, true);
        prime[0] = prime[1] = false;
        for(int p=2; p*p <= n; p++){
            if(prime[p]){
                for(int i=p*p; i<=n; i+=p) prime[i] = false;
            }
        }
        return prime;
    }
}`,
    python: `def sieve(n):
    prime = [True]*(n+1)
    prime[0] = prime[1] = False
    for p in range(2, int(n**0.5)+1):
        if prime[p]:
            for i in range(p*p, n+1, p):
                prime[i] = False
    return prime`,
    cpp: `vector<bool> sieve(int n){
    vector<bool> prime(n+1, true);
    prime[0] = prime[1] = false;
    for(int p=2; p*p <= n; p++){
        if(prime[p]){
            for(int i=p*p; i<=n; i+=p) prime[i] = false;
        }
    }
    return prime;
}`,
    go: `package main

func sieve(n int) []bool {
    prime := make([]bool, n+1)
    for i := range prime { prime[i] = true }
    prime[0], prime[1] = false, false
    for p := 2; p*p <= n; p++ {
        if prime[p] {
            for i := p * p; i <= n; i += p {
                prime[i] = false
            }
        }
    }
    return prime
}`,
  },

  modularExponentiation: {
    java: `public class ModExp {
    public static long modExp(long a, long b, long mod){
        long result = 1;
        a = a % mod;
        while(b > 0){
            if((b & 1) == 1) result = (result * a) % mod;
            a = (a * a) % mod;
            b >>= 1;
        }
        return result;
    }
}`,
    python: `def mod_exp(a, b, mod):
    result = 1
    a = a % mod
    while b > 0:
        if b & 1:
            result = (result * a) % mod
        a = (a * a) % mod
        b >>= 1
    return result`,
    cpp: `long long modExp(long long a, long long b, long long mod){
    long long result = 1;
    a %= mod;
    while(b > 0){
        if(b & 1) result = (result * a) % mod;
        a = (a * a) % mod;
        b >>= 1;
    }
    return result;
}`,
  },

  fft: {
    java: `// FFT implementation in Java (simplified placeholder)
public class FFT {
    // Implementation depends on complex numbers library
}`,
    python: `import numpy as np
def fft(arr):
    return np.fft.fft(arr)`,
    cpp: `#include <complex>
#include <vector>
using namespace std;
typedef complex<double> cd;

void fft(vector<cd> &a){
    int n = a.size();
    if(n <= 1) return;
    vector<cd> a0(n/2), a1(n/2);
    for(int i=0;i<n/2;i++){
        a0[i] = a[i*2];
        a1[i] = a[i*2+1];
    }
    fft(a0); fft(a1);
    for(int i=0;i<n/2;i++){
        cd t = polar(1.0, -2 * M_PI * i / n) * a1[i];
        a[i] = a0[i] + t;
        a[i+n/2] = a0[i] - t;
    }
}`,
    go: `package main

import "math/cmplx"

func fft(a []complex128) {
    // ... (FFT implementation is complex)
    // This is a placeholder for the core logic.
    // A full implementation would involve recursion and complex number arithmetic.
}`,
  },
};

export const stringAlgorithms = {
  KMP: {
    java: `public class KMP {
    public int[] computeLPSArray(String pattern){
        int M = pattern.length();
        int[] lps = new int[M];
        int len = 0, i = 1;
        while(i < M){
            if(pattern.charAt(i) == pattern.charAt(len)){
                len++;
                lps[i] = len;
                i++;
            } else {
                if(len != 0) len = lps[len - 1];
                else { lps[i] = 0; i++; }
            }
        }
        return lps;
    }

    public void KMPSearch(String text, String pattern){
        int N = text.length();
        int M = pattern.length();
        int[] lps = computeLPSArray(pattern);
        int i = 0, j = 0;
        while(i < N){
            if(pattern.charAt(j) == text.charAt(i)){
                i++; j++;
            }
            if(j == M){
                System.out.println("Found at index " + (i - j));
                j = lps[j - 1];
            } else if(i < N && pattern.charAt(j) != text.charAt(i)){
                if(j != 0) j = lps[j - 1];
                else i++;
            }
        }
    }
}`,

    python: `def compute_lps(pattern):
    M = len(pattern)
    lps = [0]*M
    length = 0
    i = 1
    while i < M:
        if pattern[i] == pattern[length]:
            length += 1
            lps[i] = length
            i += 1
        else:
            if length != 0:
                length = lps[length-1]
            else:
                lps[i] = 0
                i += 1
    return lps

def kmp_search(text, pattern):
    N, M = len(text), len(pattern)
    lps = compute_lps(pattern)
    i = j = 0
    while i < N:
        if pattern[j] == text[i]:
            i += 1
            j += 1
        if j == M:
            print("Found at index", i-j)
            j = lps[j-1]
        elif i < N and pattern[j] != text[i]:
            if j != 0:
                j = lps[j-1]
            else:
                i += 1`,

    cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

vector<int> computeLPS(string pattern){
    int M = pattern.length();
    vector<int> lps(M, 0);
    int len = 0, i = 1;
    while(i < M){
        if(pattern[i] == pattern[len]){
            len++;
            lps[i] = len;
            i++;
        } else {
            if(len != 0) len = lps[len-1];
            else { lps[i] = 0; i++; }
        }
    }
    return lps;
}

void KMPSearch(string text, string pattern){
    int N = text.length(), M = pattern.length();
    vector<int> lps = computeLPS(pattern);
    int i = 0, j = 0;
    while(i < N){
        if(pattern[j] == text[i]){
            i++; j++;
        }
        if(j == M){
            cout << "Found at index " << i-j << endl;
            j = lps[j-1];
        } else if(i < N && pattern[j] != text[i]){
            if(j != 0) j = lps[j-1];
            else i++;
        }
    }
}`,
    go: `package main

func computeLPS(pattern string) []int {
    m := len(pattern)
    lps := make([]int, m)
    length, i := 0, 1
    for i < m {
        if pattern[i] == pattern[length] {
            length++
            lps[i] = length
            i++
        } else {
            if length != 0 { length = lps[length-1] } else { i++ }
        }
    }
    return lps
}`,
  },

  rabinKarp: {
    java: `public class RabinKarp {
    public final static int d = 256;
    static void search(String pattern, String text, int q) {
        int M = pattern.length();
        int N = text.length();
        int i, j;
        int p = 0, t = 0, h = 1;
        for(i = 0; i < M-1; i++)
            h = (h * d) % q;
        for(i = 0; i < M; i++) {
            p = (d * p + pattern.charAt(i)) % q;
            t = (d * t + text.charAt(i)) % q;
        }
        for(i = 0; i <= N-M; i++) {
            if(p == t) {
                for(j = 0; j < M; j++) {
                    if(text.charAt(i+j) != pattern.charAt(j))
                        break;
                }
                if(j == M)
                    System.out.println("Pattern found at index " + i);
            }
            if(i < N-M) {
                t = (d*(t - text.charAt(i)*h) + text.charAt(i+M)) % q;
                if(t < 0) t += q;
            }
        }
    }
}`,

    python: `def rabin_karp(pattern, text, q=101):
    d = 256
    M, N = len(pattern), len(text)
    p = t = 0
    h = 1
    for i in range(M-1):
        h = (h * d) % q
    for i in range(M):
        p = (d*p + ord(pattern[i])) % q
        t = (d*t + ord(text[i])) % q
    for i in range(N-M+1):
        if p == t:
            if text[i:i+M] == pattern:
                print("Pattern found at index", i)
        if i < N-M:
            t = (d*(t-ord(text[i])*h) + ord(text[i+M])) % q
            if t < 0:
                t += q`,

    cpp: `#include <iostream>
using namespace std;

#define d 256

void search(string pattern, string text, int q) {
    int M = pattern.length();
    int N = text.length();
    int i, j;
    int p = 0, t = 0, h = 1;
    for(i = 0; i < M-1; i++)
        h = (h*d) % q;
    for(i = 0; i < M; i++) {
        p = (d*p + pattern[i]) % q;
        t = (d*t + text[i]) % q;
    }
    for(i = 0; i <= N-M; i++) {
        if(p == t) {
            for(j = 0; j < M; j++) {
                if(text[i+j] != pattern[j]) break;
            }
            if(j == M) cout << "Pattern found at index " << i << endl;
        }
        if(i < N-M) {
            t = (d*(t - text[i]*h) + text[i+M]) % q;
            if(t < 0) t += q;
        }
    }
}`,
    go: `package main

func rabinKarp(pattern, text string, q int) {
    d := 256
    M, N := len(pattern), len(text)
    p, t, h := 0, 0, 1
    for i := 0; i < M-1; i++ { h = (h * d) % q }
    for i := 0; i < M; i++ {
        p = (d*p + int(pattern[i])) % q
        t = (d*t + int(text[i])) % q
    }
    for i := 0; i <= N-M; i++ {
        if p == t {
            // Check for collision
        }
        if i < N-M { t = (d*(t-int(text[i])*h) + int(text[i+M])) % q; if t < 0 { t += q } }
    }
}`,
  },

  zAlgorithm: {
    java: `import java.util.*;

public class ZAlgorithm {
    public static int[] computeZ(String s) {
        int n = s.length();
        int[] Z = new int[n];
        int L = 0, R = 0;
        for(int i=1; i<n; i++) {
            if(i <= R)
                Z[i] = Math.min(R-i+1, Z[i-L]);
            while(i+Z[i] < n && s.charAt(Z[i]) == s.charAt(i+Z[i]))
                Z[i]++;
            if(i+Z[i]-1 > R) {
                L = i;
                R = i+Z[i]-1;
            }
        }
        return Z;
    }
}`,

    python: `def compute_z(s):
    n = len(s)
    Z = [0]*n
    L = R = 0
    for i in range(1, n):
        if i <= R:
            Z[i] = min(R-i+1, Z[i-L])
        while i+Z[i] < n and s[Z[i]] == s[i+Z[i]]:
            Z[i] += 1
        if i+Z[i]-1 > R:
            L, R = i, i+Z[i]-1
    return Z`,

    cpp: `#include <iostream>
#include <vector>
using namespace std;

vector<int> computeZ(string s) {
    int n = s.length();
    vector<int> Z(n);
    int L=0, R=0;
    for(int i=1; i<n; i++) {
        if(i <= R)
            Z[i] = min(R-i+1, Z[i-L]);
        while(i+Z[i] < n && s[Z[i]] == s[i+Z[i]])
            Z[i]++;
        if(i+Z[i]-1 > R) {
            L = i;
            R = i+Z[i]-1;
        }
    }
    return Z;
}`,
    go: `package main

func computeZ(s string) []int {
    n := len(s)
    Z := make([]int, n)
    L, R := 0, 0
    for i := 1; i < n; i++ {
        if i <= R { Z[i] = min(R-i+1, Z[i-L]) }
        for i+Z[i] < n && s[Z[i]] == s[i+Z[i]] { Z[i]++ }
        if i+Z[i]-1 > R { L, R = i, i+Z[i]-1 }
    }
    return Z
}`,
  },

  suffixArray: {
    java: `import java.util.*;

public class SuffixArray {
    public static int[] buildSuffixArray(String s) {
        int n = s.length();
        String[] suffixes = new String[n];
        for(int i=0; i<n; i++)
            suffixes[i] = s.substring(i);
        Arrays.sort(suffixes);
        int[] sa = new int[n];
        for(int i=0; i<n; i++)
            sa[i] = n - suffixes[i].length();
        return sa;
    }
}`,

    python: `def build_suffix_array(s):
    suffixes = [(s[i:], i) for i in range(len(s))]
    suffixes.sort()
    return [idx for _, idx in suffixes]`,

    cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

vector<int> buildSuffixArray(string s) {
    int n = s.size();
    vector<pair<string,int>> suffixes;
    for(int i=0; i<n; i++)
        suffixes.push_back({s.substr(i), i});
    sort(suffixes.begin(), suffixes.end());
    vector<int> sa;
    for(auto &p : suffixes) sa.push_back(p.second);
    return sa;
}`,
    go: `package main

import "sort"

func buildSuffixArray(s string) []int {
    // ... (Suffix Array construction is complex)
    // A simple O(n^2 log n) version involves sorting all suffixes.
    // More advanced algorithms like SA-IS achieve O(n).
    return []int{}
}`,
  },
};
