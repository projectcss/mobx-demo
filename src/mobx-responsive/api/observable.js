import {createObservableAnnotation, globalState} from '../internal';


export const OBSERVABLE = "observable"

const observableAnnotation = createObservableAnnotation(OBSERVABLE)

function createObservable() {}

// 函数本身也是一个对象，可以往这个函数上添加属性
Object.assign(createObservable, observableAnnotation);


export var observable = Object.assign(createObservable, {})