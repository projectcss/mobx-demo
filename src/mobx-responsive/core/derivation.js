import {globalState, addObserver} from '../internal'

function bindDependencies(derivation) {
    const observing = derivation.newObserving_;
    const l =  derivation.unboundDepsCount_;
    let i0 = 0;
    for (let i = 0; i < l; i++) {
        const dep = observing[i]
        if (dep.diffValue_ === 0) {
            dep.diffValue_ = 1
            if (i0 !== i) {
                observing[i0] = dep
            }
            i0++
        }
    }
    while (i0--) {
        const dep = observing[i0]
        if (dep.diffValue_ === 1) {
            dep.diffValue_ = 0
            addObserver(dep, derivation)
        }
    }
}

export function trackDerivedFunction(derivation, f, context) {
    derivation.newObserving_ = new Array(derivation.observing_.length + 100)
    derivation.unboundDepsCount_ = 0
    derivation.runId_ = ++globalState.runId
    const prevTracking = globalState.trackingDerivation
    globalState.trackingDerivation = derivation
    globalState.inBatch++
    const result = f.call(context)
    globalState.inBatch--
    globalState.trackingDerivation = prevTracking
    // 往observer对象中添加reaction对象
    bindDependencies(derivation)
}