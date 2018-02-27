class DebugInfo {
    constructor(sorterName) {
        this.sorterName = sorterName;
        this.reset();
    }
    reset() {
        this.startTime = null;
        this.totalTime = 0;
        this.numberOfDrawCalls = 0;
        this.numberOfTicks = 0;
        this.lastDrawCallStart = null;
        this.lastTickStart = null;
        this.avgDrawCallDuration = 0;
        this.avgTickDuration = 0;
        this.drawStartsList = [];
    }
    currentTotalTime() {
        if (this.startTime) {
            return this.totalTime + (new Date() - this.startTime);
        } else {
            return this.totalTime;
        }
    }
    start() {
        this.startTime = new Date();
    }
    stop() {
        this.totalTime += (new Date() - this.startTime);
        this.startTime = null;
        this.drawStartsList = [];
    }
    beginDraw() {
        this.lastDrawCallStart = new Date().getTime();
        this.drawStartsList.push(this.lastDrawCallStart);
        if (this.drawStartsList.length > 1200) this.drawStartsList.shift();
    }
    endDraw() {
        let now = new Date();
        let callDuration = now - this.lastDrawCallStart;
        this.avgDrawCallDuration = (this.avgDrawCallDuration * this.numberOfDrawCalls + callDuration) / ++this.numberOfDrawCalls;
    }
    currentFps() {
        let now = new Date().getTime();
        let lastFrameInCurrentSecondI = 0;
        for (; lastFrameInCurrentSecondI < this.drawStartsList.length; lastFrameInCurrentSecondI++) {
            if (now - this.drawStartsList[lastFrameInCurrentSecondI] <= 1000) {
                break;
            }
        }
        this.drawStartsList.splice(0, lastFrameInCurrentSecondI);
        return this.drawStartsList.length;
    }
    beginTick() {
        this.lastTickStart = new Date();
    }
    endTick() {
        let now = new Date();
        let tickDuration = now - this.lastTickStart;
        this.avgTickDuration = (this.avgTickDuration * this.numberOfTicks + tickDuration) / ++this.numberOfTicks;
    }
}