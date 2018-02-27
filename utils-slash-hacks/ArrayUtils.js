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