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
        "Bubble Sort",
        function (array, comparator) {
            return new BubbleSorter(array, comparator);
        },
        "This is a basic bubble sort impl.",
        true,
    ),
    new SorterSummary(
        "Insertion Sort",
        function (array, comparator) {
            return new InsertionSorter(array, comparator);
        },
        "This is a basic insertion sort impl.",
        true
    ),

    new SorterSummary(
        "Merge Sort",
        function (array, comparator) {
            return new MergeSorter(array, comparator);
        },
        "This is a strange version of a merge sort which commits every merge result back to the source array.",
        true
    ),

    new SorterSummary(
        "Quick Sort",
        function (array, comparator) {
            return new QuickSorter(array, comparator);
        },
        "This is a basic implementation of the quick sort",
        true
    ),


    new SorterSummary(
        "Heap Sort",
        function (array, comparator) {
            return new HeapSorter(array, comparator);
        },
        "This is a heap sort implementation.",
        true
    )
];
