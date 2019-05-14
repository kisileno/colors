class BubbleSorter {
    constructor(arrayToSort, comparator) {
        this.arr = arrayToSort;
        this.comparator = comparator;
        this.reset();
    }

    reset() {
        this.startFromI = 0;
        this.startFromJ = 0;
    }

    oneTick() {
        for (let i = this.startFromI ;i < this.arr.size()-1; i++) {
            let swapDone = false;
            for (let j = this.startFromJ; j < this.arr.size() - i -1; j++) {
                let patient = this.arr.get(j);
                let toComp = this.arr.get(j + 1);
                //console.log("Comparing, ", patient, toComp);
                if (this.comparator(patient, toComp) > 0) {
                    this.arr.set(toComp, j);
                    this.arr.set(patient, j + 1);
                    swapDone = true;
                }
            }
            if (swapDone) {
                this.startFromI = i;
                this.startFromJ = 0;
                return true;
            } else {
                return false;
            }
        }
    }
}
