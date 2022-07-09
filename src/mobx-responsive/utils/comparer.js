export function defaultComparer(a, b) {
    if(Object.is) {
        return Object.is(a, b)
    }
    return a === b ? a!==0 || 1/a === 1/b : a!==a && b!==a; 
}
