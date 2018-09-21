const INT_COMPARATOR = function(a, b) { return a - b;};

function assertArrayEquals(actual, expected, testName) {
        if (expected.equals(actual)) {
            console.log(testName +" passed.");
        } else {
            console.error(testName + " FAILED!", actual, expected);
        }
}

function sortsEmptyArray(sorterConstructor, sorterName) {
    let arr = [];
    let sorter = sorterConstructor(arr, INT_COMPARATOR);
    let arrayUpdated  = true;
    while(arrayUpdated) {
        arrayUpdated = sorter.oneTick();
    }
    assertArrayEquals(arr, [], "[" + sorterName + "]: empty array test");
}


function sortsArrayOfTonsEqualElems(sorterConstructor, sorterName) {
    let arrayToSort = [];
    let expected = [];
    for (let i = 0; i < 4; i++) {
        arrayToSort.push(42);
        expected.push(42);
    }
    let sorter = sorterConstructor(arrayToSort, INT_COMPARATOR);
    let arrayUpdated  = true;
    while(arrayUpdated) {
        arrayUpdated = sorter.oneTick();
    }
    assertArrayEquals(arrayToSort, expected, "[" + sorterName + "]: array of tons equal elems test");
}

function sortsArrayOfTonsRandomElems(sorterConstructor, sorterName, numberOfElems) {
    numberOfElems.forEach(arrLength => {
        let arrayToSort = [];
        let expected = [];
        for (let i = 0; i < arrLength; i++) {
            let number = Math.floor(Math.random() * 100000);
//            let number = 42;
            arrayToSort.push(number);
            expected.push(number);
        }
        expected = expected.sort((a, b) => a - b);
        let sorter = sorterConstructor(arrayToSort, INT_COMPARATOR);
        let arrayUpdated  = true;
        while(arrayUpdated) {
            arrayUpdated = sorter.oneTick();
        }
        assertArrayEquals(arrayToSort,expected, "[" + sorterName + "]: array of {"+arrLength+"} random elems test");
    });
}



const sortersToTest = [
    {
        constructor: function(arr, comp) {return new BubbleSorter(new AsIsArrayWrapper(arr), comp);},
        name: "BubbleSorter"
    },

    {
        constructor: function(arr, comp) {return new HeapSorter(new AsIsArrayWrapper(arr), comp);},
        name: "HeapSorter"
    },

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
    },  
];

sortersToTest.forEach( sorter => {
    sortsEmptyArray(sorter.constructor, sorter.name);
    sortsArrayOfTonsEqualElems(sorter.constructor, sorter.name);
    sortsArrayOfTonsRandomElems(sorter.constructor, sorter.name, [1, 2, 3, 4, 5, 100]);
})
