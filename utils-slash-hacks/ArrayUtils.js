class AsIsArrayWrapper {
    constructor(arrayToWrap) {
        this.wrappedArray = arrayToWrap;
        this.length = this.wrappedArray.length;
    }
    size() {
        return this.length;
    }
    get(index) {
        return this.wrappedArray[index];
    }
    set(value, index) {
        this.wrappedArray[index] = value;
    }
}
class CanvasArrayWrapper {
    constructor(canvasDataArray, from, to, i) {
        if (from < 0) {
            console.error("fuck you 1");
        }
        if (to > canvasDataArray.length - 4) {
            console.error("fuck you 2");
        }
        if (from > to) {
            console.error("fuck you 3");
        }
        this.length = to - from;
        if ((this.length % 4) !== 0) {
            console.error("fuck you 4");
        }
        this.canvasDataArray = canvasDataArray;
        this.from = from;
        this.to = to;
        this.length = this.length / 4 + 1;
    }
    size() {
        return this.length;
    }
    set(colourValue, index) {
        const offset = this.from + index * 4;
        this.canvasDataArray[offset] = colourValue.red;
        this.canvasDataArray[offset + 1] = colourValue.green;
        this.canvasDataArray[offset + 2] = colourValue.blue;
        //this.canvasDataArray[offset + 3] = 255;
    }
    get(index) {
        const offset = this.from + index * 4;
        const red = this.canvasDataArray[offset];
        const green = this.canvasDataArray[offset + 1];
        const blue = this.canvasDataArray[offset + 2];
        return GLOBAL_COLOUR_MAP[red][green][blue];
    }
}


function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
}


//https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript
// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});