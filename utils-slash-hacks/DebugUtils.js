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
        this.operationsDone = [];
        this.operationsDoneTimings = [];
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
        this.operationsDone = [];
        this.operationsDoneTimings = [];
    }
    beginDraw() {
        this.lastDrawCallStart = new Date().getTime();
        this.drawStartsList.push(this.lastDrawCallStart);
        if (this.drawStartsList.length > 1200) this.drawStartsList.shift();
    }
    endDraw() {
        let now = new Date().getTime();
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
    currentOperationsDonePerSecond() {
        let now = new Date().getTime();
        let lastOperationsDoneInCurrentSecondI = 0;
        for (; lastOperationsDoneInCurrentSecondI < this.operationsDone.length; lastOperationsDoneInCurrentSecondI++) {
            if (now - this.operationsDoneTimings[lastOperationsDoneInCurrentSecondI] <= 1000) {
                break;
            }
        }
        this.operationsDone.splice(0, lastOperationsDoneInCurrentSecondI);
        this.operationsDoneTimings.splice(0, lastOperationsDoneInCurrentSecondI);
        let totalOperationsDoneInLastSecond = 0;
        for (let i = 0; i < this.operationsDone.length; i++) {
           totalOperationsDoneInLastSecond += this.operationsDone[i];
        }
        return totalOperationsDoneInLastSecond;
    }
    beginTick() {
        this.lastTickStart = new Date();
    }
    endTick() {
        let now = new Date();
        let tickDuration = now - this.lastTickStart;
        this.avgTickDuration = (this.avgTickDuration * this.numberOfTicks + tickDuration) / ++this.numberOfTicks;
    }

    addOperations(numberOfOperationsToAdd) {
        this.operationsDone.push(numberOfOperationsToAdd);
        this.operationsDoneTimings.push(new Date().getTime());
    }
}