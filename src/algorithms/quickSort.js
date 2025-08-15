export function quickSort(arr) {
    const animations = [];
    function partition(low, high) {
        let pivot = arr[high];
        let i = low - 1;
        for (let j = low; j < high; j++) {
            animations.push({type: 'compare', indices: [j, high]});
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                animations.push({type: 'swap', indices: [i, j], values: [arr[i], arr[j]]});
            }
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        animations.push({type: 'swap', indices: [i + 1, high], values: [arr[i + 1], arr[high]]});
        return i + 1;
    }

    function quickSortHelper(low, high) {
        if (low < high) {
            let pi = partition(low, high);
            quickSortHelper(low, pi - 1);
            quickSortHelper(pi + 1, high);
        }
    }

    quickSortHelper(0, arr.length - 1);
    return animations;
}