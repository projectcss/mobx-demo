import {getNextId, isPlainObject, $mobx, addHiddenProp, ObservableValue} from '../internal';

const descriptorCache = Object.create(null)

export class ObservableObjectAdministration{
    constructor (target_, values_, name_) {
        this.target_ = target_;
        this.values_ = values_;
        this.name_ = name_;
    }
    make_(key, annotation) {
        let source = this.target_;
        // 沿着原型链去遍历属性，对属性进行代理
        while(source && source!==Object.prototype) {
            const descriptor = Object.getOwnPropertyDescriptor(source, key);
            if(descriptor) {
                annotation.make_(this, key, descriptor, source);
            }
            source = Object.getPrototypeOf(source)
        }
    }
    // 获取属性的代理方法
    getObservablePropValue_(key) {
        // 从该属性对应的可观察对象中取值
        return this.values_.get(key).get();
    }
    // 更新属性的代理方法
    setObservablePropValue_(key, newValue) {
        const observable = this.values_.get(key)
        observable.setNewValue_(newValue);
    }
    // enhancer表示采用哪种绑定方式：深层/一层/当前实例
    defineObservableProperty_(key, value, enhancer, proxyTrap) {
        // 获取该key的set河get方法
        const cachedDescriptor = getCachedObservablePropDescriptor(key)
        const descriptor = {
            configurable: true,
            enumerable: true,
            get: cachedDescriptor.get,
            set: cachedDescriptor.set
        }
        Object.defineProperty(this.target_, key, descriptor);
        const observable = new ObservableValue(
            value,
            enhancer,
            `${this.name_}.${key.toString()}`,
            false
        )
        this.values_.set(key, observable)
    }
}

export function asObservableObject(target, options) {
    // 判断是否是普通对象
    const name = isPlainObject(target) ? 'ObservableObject' : `target.constructor.name@${getNextId()}`;
    const adm = new ObservableObjectAdministration(
        target,
        new Map(),
        String(name)
    )

    addHiddenProp(target, $mobx, adm);
    return target;
}

function getCachedObservablePropDescriptor(key) {
    return (
        descriptorCache[key] ||
        (descriptorCache[key] = {
            get() {
                return this[$mobx].getObservablePropValue_(key)
            },
            set(value) {
                return this[$mobx].setObservablePropValue_(key, value)
            }
        })
    )
}