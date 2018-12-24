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
        "This is an implementation of a quick sort algorithm. The fastest algorithm here.",
        true
    ),

    new SorterSummary(
        "Heap Sort",
        function (array, comparator) {
            return new HeapSorter(array, comparator);
        },
        "This is an implementation of a heap sort algorithm.",
        true
    ),

    new SorterSummary(
        "Merge Sort",
        function (array, comparator) {
            return new MergeSorter(array, comparator);
        },
        "This is a modified version of a merge sort which commits every merge result back to the source array.",
        false
    ),

    new SorterSummary(
        "Insertion Sort",
        function (array, comparator) {
            return new InsertionSorter(array, comparator);
        },
        "This is an implementation of insertion sort. One of the slowest algorithms here.",
        false
    ),

    new SorterSummary(
        "Bubble Sort",
        function (array, comparator) {
            return new BubbleSorter(array, comparator);
        },
        "This is an implementation of the bubble sort. The slowest algorithm here.",
        false,
    ),



];
