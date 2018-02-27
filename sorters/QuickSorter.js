class Slice {
    constructor(low, high) {
        this.low = low;
        this.high = high;
        this.i = null;
        this.j = null;
        this.midElem = null;
    }
}
class QuickSorter {
    constructor(wrappedArrayToSort, comparator) {
        this.arr = wrappedArrayToSort;
        this.comparator = comparator;
        this.reset();
    }
    reset() {
        this.slicesToSort = [new Slice(0, this.arr.size() - 1)];
    }
    oneTick() {
        while (this.slicesToSort.length > 0) {
            let slice = this.slicesToSort.pop();
            if (slice.low < slice.high) {
                let midElem = slice.midElem || this.arr.get(Math.floor(slice.low + (slice.high - slice.low) / 2));
                slice.midElem = midElem;
                let i = slice.i || slice.low;
                let j = slice.j || slice.high;
                while (i <= j) {
                    while (this.comparator(this.arr.get(i), midElem) < 0) {
                        i++;
                    }
                    while (this.comparator(this.arr.get(j), midElem) > 0) {
                        j--;
                    }
                    if (i <= j) {
                        let tmp = this.arr.get(i);
                        this.arr.set(this.arr.get(j), i);
                        this.arr.set(tmp, j);
                        slice.i = i + 1;
                        slice.j = j - 1;
                        this.slicesToSort.push(slice);
                        return true;
                    }
                }
                if (slice.low < j) {
                    this.slicesToSort.push(new Slice(slice.low, j));
                }
                if (slice.high > i) {
                    this.slicesToSort.push(new Slice(i, slice.high));
                }
                //shuffle(this.slicesToSort)
            }
        }
        return false;
    }
}