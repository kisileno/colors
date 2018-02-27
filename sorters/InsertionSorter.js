class InsertionSorter {
    constructor(wrappedArrayToSort, comparator) {
        this.arr = wrappedArrayToSort;
        this.comparator = comparator;
    }
    reset() {
        this.patientInd = -1;
    }
    oneTick() {
        for (let i = this.patientInd + 1; i < this.arr.size() - 1; i++) {
            let patient = this.arr.get(i);
            let toComp = this.arr.get(i + 1);
            if (this.comparator(patient, toComp) > 0) {
                this.arr.set(toComp, i);
                this.arr.set(patient, i + 1);
                return true;
            }
        }
        this.patientInd += 1;
        return this.patientInd === this.arr.size() - 1;
    }
}