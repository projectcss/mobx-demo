import {getNextId, trackDerivedFunction,globalState} from '../internal';


let reactionScheduler = f => f()
export function runReactions() {
    reactionScheduler(runReactionsHelper)
}

function runReactionsHelper() {
    globalState.isRunningReactions = true
    const allReactions = globalState.pendingReactions
    while (allReactions.length > 0) {
        let remainingReactions = allReactions.splice(0)
        for (let i = 0, l = remainingReactions.length; i < l; i++) {
            remainingReactions[i].runReaction_()
        }
    }
    globalState.isRunningReactions = false
}
export class Reaction {
    observing_ = [];
    newObserving_ = [];
    dependenciesState_ = [];
    dependenciesState_ = -1
    diffValue_ = 0
    runId_ = 0
    isDisposed_ = false;
    isScheduled_ = false;
    isTrackPending_ = false;
    isRunning_ = false;
    unboundDepsCount_ = 0;
    constructor(name_, onInvalidate_, errorHandler_, requiresObservable_) {
        this.name_ = name_ || "Reaction@" + getNextId();
        this.onInvalidate_ = onInvalidate_;
        this.errorHandler_ = errorHandler_;
        this.requiresObservable_ = requiresObservable_;
    }


    onBecomeStale_() {
        this.schedule_()
    }

    schedule_() {
        if (!this.isScheduled_) {
            this.isScheduled_ = true
            globalState.pendingReactions.push(this)
            runReactions()
        }
    }
    runReaction_() {
        if(!this.isDisposed_) {
            this.isScheduled_ = false;
            const prev = globalState.trackingContext;
            // 将当前正在执行的reaction保存到globalState中
            globalState.trackingContext = this;
            this.isTrackPending_ = true;
            this.onInvalidate_();
            globalState.trackingContext = prev
        }
    }
    
    track(fn) {
        this.isRunning_ = true;
        const prevReaction = globalState.trackingContext;
        globalState.trackingContext = this;
        // 1、收集该reaction的依赖
        // 2、往对应的可观察属性的ObservableValue对象中添加该reaction
        const result = trackDerivedFunction(this, fn, undefined);
        this.isRunning_ = false
        this.isTrackPending_ = false
    }
}