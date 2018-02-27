class HeapSorter {
    constructor(wrappedArrayToSort, comparator) {
        this.arr = wrappedArrayToSort;
        this.comparator = comparator;
        this.reset();
    }
    reset() {
        this.heapPreparationDone = false;
        this.heapSortingSwapJustDone = false;
        this.heapSize = this.arr.size();
        this.heapSortingI = this.arr.size() - 1;
        this.heapPreparationI = Math.floor(this.arr.size() / 2);
        this.heapNextMax = this.heapPreparationI;
    }
    oneTick() {
        if (!this.heapPreparationDone) {
            if (this.heapPreparationI <= 0 && this.heapNextMax === null) {
                this.heapPreparationDone = true;
            } else {
                if (this.heapNextMax === null) {
                    this.heapNextMax = --this.heapPreparationI
                }
                this.heapNextMax = this.sortHeapFrom(this.arr, this.heapNextMax, this.heapSize);
                return true;
            }
        }
        if (this.heapSortingI > 0) {
            if (this.heapSortingSwapJustDone) {
                if (this.heapNextMax === null) {
                    this.heapNextMax = 0;
                    --this.heapSize;
                }
                this.heapNextMax = this.sortHeapFrom(this.arr, this.heapNextMax, this.heapSize);
                if (this.heapNextMax !== null) {
                    return true;
                }
                this.heapSortingI--;
                this.heapSortingSwapJustDone = false;
                return true;
            } else {
                HeapSorter.swap(this.arr, 0, this.heapSortingI);
                this.heapSortingSwapJustDone = true;
                return true;
            }
        }
        return false;
    }
    sortHeapFrom(arr, nextMax, heapLength) {
        let left = 2 * nextMax + 1;
        let right = 2 * nextMax + 2;
        let max = nextMax;
        if (left < heapLength && this.comparator(arr.get(left), arr.get(max)) > 0) {
            max = left;
        }
        if (right < heapLength && this.comparator(arr.get(right), arr.get(max)) > 0) {
            max = right;
        }
        if (max !== nextMax) {
            HeapSorter.swap(arr, nextMax, max);
            return max;
        }
        return null;
    }
    static swap(arr, i, j) {
        let tmp = arr.get(i);
        arr.set(arr.get(j), i);
        arr.set(tmp, j);
    }
}