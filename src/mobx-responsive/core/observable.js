import {globalState} from '../internal'

export function reportObserved(observable) {
    const derivation = globalState.trackingDerivation;
    if(derivation!==null) {
        derivation.newObserving_[derivation.unboundDepsCount_++] = observable
    }
}

export function addObserver(observable, node) {
    observable.observers_.add(node)
}

export function propagateChanged(observable) {
    observable.lowestObserverState_ = 2

    observable.observers_.forEach(d => {
        d.onBecomeStale_()
    })
}