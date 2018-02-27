class PartToMerge {
    constructor(low, high) {
        this.low = low;
        this.high = high;
        this.len = high - low;
    }
    hasSomething() {
        return this.low < this.high;
    }
}
class MergeSorter {
    constructor(wrappedArrayToSort, comparator) {
        this.arr = wrappedArrayToSort;
        this.comparator = comparator;
        this.reset();
    }
    reset() {
        this.partsToMerge = [];
        this.persistingInProgress = false;
        this.sortedPartReadyToBePersisted = [];
        this.mainArrayPointer = null;
        for (let i = 0; i < this.arr.size(); i++) {
            this.partsToMerge.push(new PartToMerge(i, i + 1));
        }
    }
    oneTick() {
        if (this.sortedPartReadyToBePersisted.length > 0) {
            const elem = this.sortedPartReadyToBePersisted.shift();
            this.arr.set(elem, this.mainArrayPointer++);
            return true;
        } else {
            while (this.partsToMerge.length > 1) {
                let right = this.partsToMerge.pop();
                let left = this.partsToMerge.pop();
                if (right.len < left.len) {
                    if (this.partsToMerge.length > 0) {
                        this.partsToMerge.unshift(right);
                        right = left;
                        left = this.partsToMerge.pop();
                    }
                }
                const newLow = Math.min(left.low, right.low);
                const newHigh = newLow + left.len + right.len;
                while (left.hasSomething() && right.hasSomething()) {
                    let fromTheLeft = this.arr.get(left.low);
                    let fromTheRight = this.arr.get(right.low);
                    if (this.comparator(fromTheLeft, fromTheRight) < 0) {
                        this.sortedPartReadyToBePersisted.push(fromTheLeft);
                        left.low++;
                    } else {
                        this.sortedPartReadyToBePersisted.push(fromTheRight);
                        right.low++;
                    }
                }
                while (left.hasSomething()) {
                    this.sortedPartReadyToBePersisted.push(this.arr.get(left.low++));
                }
                while (right.hasSomething()) {
                    this.sortedPartReadyToBePersisted.push(this.arr.get(right.low++));
                }
                this.mainArrayPointer = newLow;
                this.partsToMerge.unshift(new PartToMerge(newLow, newHigh));
                return true;
            }
        }
        return false;
    }
}