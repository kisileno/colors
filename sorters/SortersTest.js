const INT_COMPARATOR = function(a, b) { return a - b;};

function sortsEmptyArray(sorterConstructor, sorterName) {
    let arr = [];
    let sorter = sorterConstructor(arr, INT_COMPARATOR);
    let arrayUpdated  = true;
    while(arrayUpdated) {
        arrayUpdated = sorter.oneTick();
    }
    if (arr.equals([])) {
        console.log("[" + sorterName + "]: empty array test passed.");
    } else {
        console.error("[" + sorterName + "] empty array test FAILED!");
    }
}


function sortsArrayOfOneElem(sorterConstructor, sorterName) {
    let arr = [9000];
    let sorter = sorterConstructor(arr, INT_COMPARATOR);
    let arrayUpdated  = true;
    while(arrayUpdated) {
        arrayUpdated = sorter.oneTick();
    }
    if (arr.equals([9000])) {
        console.log("[" + sorterName + "]: array of one elem test passed.");
    } else {
        console.error("[" + sorterName + "] array of one elem test FAILED!");
    }
}

function sortsArrayOfTonsEqualElems(sorterConstructor, sorterName) {
    let arrayToSort = [];
    let expected = [];
    for (let i = 0; i < 100; i++) {
        arrayToSort.push(42);
        expected.push(42);
    }
    let sorter = sorterConstructor(arrayToSort, INT_COMPARATOR);
    let arrayUpdated  = true;
    while(arrayUpdated) {
        arrayUpdated = sorter.oneTick();
    }
    if (arrayToSort.equals(expected)) {
        console.log("[" + sorterName + "]: array of tons equal elems test passed.");
    } else {
        console.error("[" + sorterName + "]: array of tons equal elems test FAILED!");
    }
}

function sortsArrayOfTonsRandomElems(sorterConstructor, sorterName) {
    let arrayToSort = [];
    let expected = [];
    for (let i = 0; i < 100; i++) {
        let number = Math.floor(Math.random() * 100000);
        arrayToSort.push(number);
        expected.push(number);
    }
    expected = expected.sort((a, b) => a - b);
    let sorter = sorterConstructor(arrayToSort, INT_COMPARATOR);
    let arrayUpdated  = true;
    while(arrayUpdated) {
        arrayUpdated = sorter.oneTick();
    }
    if (arrayToSort.equals(expected)) {
        console.log("[" + sorterName + "]: array of tons random elems test passed.");
    } else {
        console.error("[" + sorterName + "]: array of tons random elems test FAILED!", arrayToSort, expected);
    }
}



const sortersToTest = [
    {
        constructor: function(arr, comp) {return new BubbleSorter(new AsIsArrayWrapper(arr), comp);},
        name: "BubbleSorter"
    },

    {
        constructor: function(arr, comp) {return new HeapSorter(new AsIsArrayWrapper(arr), comp);},
        name: "HeapSorter"
    },,
       /*
    {
        constructor: function(arr, comp) {return new InsertionSorter(new AsIsArrayWrapper(arr), comp);},
        name: "InsertionSorter"
    },,

    {
        constructor: function(arr, comp) {return new MergeSorter(new AsIsArrayWrapper(arr), comp);},
        name: "MergeSorter"
    },,

    {
        constructor: function(arr, comp) {return new QuickSorter(new AsIsArrayWrapper(arr), comp);},
        name: "QuickSorter"
    },   */
];


sortersToTest.forEach( sorter => {
    sortsEmptyArray(sorter.constructor, sorter.name);
    sortsArrayOfOneElem(sorter.constructor, sorter.name);
    sortsArrayOfTonsEqualElems(sorter.constructor, sorter.name);
    sortsArrayOfTonsRandomElems(sorter.constructor, sorter.name);
})
