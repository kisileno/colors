const INT_COMPARATOR = function (a, b) {
    return a - b;
};

function assertArrayEquals(actual, expected, testName) {
    if (expected.equals(actual)) {
        console.log(testName + " passed.");
    } else {
        console.error(testName + " FAILED!", actual, expected);
    }
}

function sortsArrayOfParticularSize(sorterConstructor, sorterName, numberOfElems, generator, generatorDesc) {
    numberOfElems.forEach(arrLength => {
        let arrayToSort = [];
        let expected = [];
        for (let i = 0; i < arrLength; i++) {
            let number = generator();
            arrayToSort.push(number);
            expected.push(number);
        }
        expected.sort((a, b) => a - b);
        let sorter = sorterConstructor(arrayToSort, INT_COMPARATOR);
        let arrayUpdated = true;
        while (arrayUpdated) {
            arrayUpdated = sorter.oneTick();
        }
        assertArrayEquals(arrayToSort, expected, "[" + sorterName + "]: array of {" + arrLength + "} " + generatorDesc + " elems test");
    });
}


const sortersToTest = [
    {
        constructor: function (arr, comp) {
            return new BubbleSorter(new AsIsArrayWrapper(arr), comp);
        },
        name: "BubbleSorter"
    },
    {
        constructor: function (arr, comp) {
            return new HeapSorter(new AsIsArrayWrapper(arr), comp);
        },
        name: "HeapSorter"
    },
    {
        constructor: function (arr, comp) {
            return new InsertionSorter(new AsIsArrayWrapper(arr), comp);
        },
        name: "InsertionSorter"
    },
    {
        constructor: function (arr, comp) {
            return new MergeSorter(new AsIsArrayWrapper(arr), comp);
        },
        name: "MergeSorter"
    },
    {
        constructor: function (arr, comp) {
            return new QuickSorter(new AsIsArrayWrapper(arr), comp);
        },
        name: "QuickSorter"
    },
];

sortersToTest.forEach(sorter => {
    sortsArrayOfParticularSize(
        sorter.constructor,
        sorter.name,
        [0, 1, 2, 3, 4, 5, 100, 101],
        () => 42,
        "equal"
    );
    sortsArrayOfParticularSize(
        sorter.constructor,
        sorter.name,
        [0, 1, 2, 3, 4, 5, 100, 101],
        () => Math.floor(Math.random() * 100000),
        "random"
    );
});
