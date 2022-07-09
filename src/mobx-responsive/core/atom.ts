import {reportObserved, propagateChanged} from '../internal';

// 创建全局唯一的key，用来保存被mobx代理过后的对象
export const $mobx = Symbol("mobx administration")

export class Atom {
    observers_ = new Set()
    diffValue_ = 0
    reportObserved() {
        return reportObserved(this)
    }
    reportChanged() {
        propagateChanged(this)
    }
}