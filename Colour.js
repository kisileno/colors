class Colour {
    constructor(red, green, blue) {
        this.red = Colour.to255Range(red);
        this.green = Colour.to255Range(green);
        this.blue = Colour.to255Range(blue);
        this.hue = Colour.getWikiHue(this);
    }
    static to255Range(n) {
        return Math.ceil(Math.max(Math.min(n, 255), 0));
    }
    static getWikiHue(colour) {
        const R = colour.red;
        const G = colour.green;
        const B = colour.blue;
        if (R >= G && G >= B) {
            //return 60 * (G - B) / (R - B);
            return 60 * G / R;
        }
        if (G > R && R >= B) {
            return 60 * (2 - (R - B) / (G - B));
        }
        if (G >= B && B > R) {
            return 60 * (2 + (B - R) / (G - R));
        }
        if (B > G && G > R) {
            return 60 * (4 - (G - R) / (B - R));
        }
        if (B > R && R >= G) {
            return 60 * (4 + (R - G) / (B - G));
        }
        if (R >= B && B > G) {
            return 60 * (6 - (B - G) / (R - G));
        }
    }
    equals(other) {
        return this.red === other.red && this.green === other.green && this.blue === other.blue;
    }
    compare(other) {
        return this.hue - other.hue;
    }
}

const DEFAULT_COLOUR_COMP = function (c1, c2) {
    return c1.compare(c2);
};
