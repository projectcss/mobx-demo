import {globalState} from "../internal"

export const defineProperty = Object.defineProperty

export function getNextId() {
    return ++globalState.mobxGuid
}

export function isObject(value) {
    return value!==null && typeof value === 'object';
}

export function isPlainObject(value) {
    // 如果不是对象直接返回false
    if(!isObject(value)) {
        return false;
    }
    const proto = Object.getPrototypeOf(value);
    if(proto == null) {
        return true;
    }
    const protoConstructor = Object.hasOwnProperty.call(proto, 'constructor') && proto.constructor;
    // 根据constructor的toString类型判断是否是普通对象
    return (
        typeof protoConstructor === 'function' && protoConstructor.toString() === Object.toString()
    )
}

export function addHiddenProp(target, key, value) {
    defineProperty(target, key, {
        enumerable: false,
        writable: true,
        configurable: true,
        value
    })
}


export const ownKeys = (obj) => Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(obj))