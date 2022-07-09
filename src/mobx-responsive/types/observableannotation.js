export function createObservableAnnotation(name, options) {
    return {
        annotationType_: name,
        options_: options,
        make_,
        extend_
    }
}

function make_(
    adm,
    key,
    descriptor
) {
    return this.extend_(adm, key, descriptor, false) === null ? 0 : 1
}

function extend_(
    adm,
    key,
    descriptor,
    proxyTrap
) {
    return adm.defineObservableProperty_(
        key,
        descriptor.value,
        (v) => v,
        // this.options_?.enhancer ?? deepEnhancer,
        proxyTrap
    )
}