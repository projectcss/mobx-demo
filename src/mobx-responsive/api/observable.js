import {createObservableAnnotation, globalState} from '../internal';


export const OBSERVABLE = "observable"
export const OBSERVABLE_REF = "observable.ref"
export const OBSERVABLE_SHALLOW = "observable.shallow"
export const OBSERVABLE_STRUCT = "observable.struct"

const observableAnnotation = createObservableAnnotation(OBSERVABLE)

function createObservable() {}

// 函数本身也是一个对象，可以往这个函数上添加属性
Object.assign(createObservable, observableAnnotation);


export var observable = Object.assign(createObservable, {})

export function startBatch() {
    globalState.inBatch++
}