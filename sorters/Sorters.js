class SorterSummary {

    constructor(name, constructorMethod, description, enabled) {
        this.name = name;
        this.constructorMethod = constructorMethod;
        this.description = description;
        this.enabled = enabled;
    }
}

const allSorters = [

    new SorterSummary(
        "Quick Sort",
        function (array, comparator) {
            return new QuickSorter(array, comparator);
        },
        "This is an implementation of the quick sort algorithm. ",
        true
    ),

    new SorterSummary(
        "Heap Sort",
        function (array, comparator) {
            return new HeapSorter(array, comparator);
        },
        "This is an implementation of the heap sort algorithm.",
        true
    ),

    new SorterSummary(
        "Merge Sort",
        function (array, comparator) {
            return new MergeSorter(array, comparator);
        },
        "This is a modified version of the merge sort which commits every merge result back to the source array.",
        false
    ),

    new SorterSummary(
        "Insertion Sort",
        function (array, comparator) {
            return new InsertionSorter(array, comparator);
        },
        "This is an implementation of the insertion sort.",
        false
    ),

    new SorterSummary(
        "Bubble Sort",
        function (array, comparator) {
            return new BubbleSorter(array, comparator);
        },
        "This is an implementation of the bubble sort. For the sake of a more entertaining visualization doesn't show intermediate swaps.",
        false,
    ),



];
