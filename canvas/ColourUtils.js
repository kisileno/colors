function generateColourMatrix(width, height, step) {

    const rows = height;
    const columns = width;
    let colourMatrix = [];

    const D_UP = 0;
    const D_DOWN = 1;
    const D_TOP = 2;
    const D_BOTTOM = 3;
    const D_THE_MOST_BOTTOM = 4;
    const MAX_STEPS = maxColourValue / step;

    class ColorState {
        constructor(colorVal, direction, stepsDone) {
            this.colorVal = colorVal;
            this.direction = direction;
            this.stepsDone = stepsDone;
        }
    }

    let referenceRow = [];

    let red = new ColorState(maxColourValue, D_TOP, 0);
    let green = new ColorState(0, D_UP, 0);
    let blue = new ColorState(0, D_THE_MOST_BOTTOM, 0);
    let allTogether = [red, green, blue];
    for (let j = 0; j < columns; j++) {
        referenceRow.push(new Colour(red.colorVal, green.colorVal, blue.colorVal));
        allTogether.forEach(function (c) {
            if (c.stepsDone >= MAX_STEPS) {
                switch (c.direction) {
                    case D_BOTTOM:
                        c.direction = D_UP;
                        break;
                    case D_TOP:
                        c.direction = D_DOWN;
                        break;
                    case D_UP:
                        c.direction = D_TOP;
                        break;
                    case D_DOWN:
                        c.direction = D_BOTTOM;
                        break;
                    case D_THE_MOST_BOTTOM:
                        c.direction = D_BOTTOM;
                        break;
                }
                c.stepsDone = 0;
            }
            switch (c.direction) {
                case D_BOTTOM:
                    break;
                case D_TOP:
                    break;
                case D_UP:
                    c.colorVal += step;
                    break;
                case D_DOWN:
                    c.colorVal -= step;
                    break;
                case D_THE_MOST_BOTTOM:
                    break;
            }
            c.stepsDone++;
        });
    }
    for (let i = 0; i < rows; i++) {
        let newRow = [];
        for (let k = 0; k < referenceRow.length; k++) {
            let c = referenceRow[k];
            newRow.push(new Colour(c.red, c.green, c.blue));
        }
        colourMatrix.push(newRow);
    }
    return colourMatrix;
}

function drawColourMatrix(matrix, canvasCtx, imageData) {
    canvasCtx.putImageData(imageData, 0, 0);
}

function putMatrixToCanvasData(matrix, actualData, canvasWidth) {
    for (let i = 0; i < matrix.length; i++) {
        let row = matrix[i];
        for (let j = 0; j < row.length; j++) {
            let col = row[j];
            let offset = (i * canvasWidth) * 4 + j * 4;
            actualData[offset] = col.red;
            actualData[offset + 1] = col.green;
            actualData[offset + 2] = col.blue;
            actualData[offset + 3] = 255;
        }
    }
}

function cacheColourObjects(colours, cache) {
    for (let i = 0; i < colours.length; i++) {
        if (!cache[colours[i].red]) {
            cache[colours[i].red] = [];
        }
        if (!cache[colours[i].red][colours[i].green]) {
            cache[colours[i].red][colours[i].green] = [];
        }
        cache[colours[i].red][colours[i].green][colours[i].blue] = colours[i];
    }
}
