class BubbleSorter {
    constructor(wrappedArrayToSort, comparator) {
        this.arr = wrappedArrayToSort;
        this.comparator = comparator;
        this.reset();
    }

    reset() {
        this.patientInd = 0;
    }

    oneTick() {
        for (let i = this.patientInd + 1; i < this.arr.size() - 1; i++) {
            let patient = this.arr.get(this.patientInd);
            let toComp = this.arr.get(i + 1);
            if (this.comparator(patient, toComp) > 0) {
                this.arr.set(toComp, this.patientInd);
                this.arr.set(patient, i + 1);
                return true;
            }
        }
        this.patientInd += 1;
        return this.patientInd === this.arr.size() - 1;
    }
}
