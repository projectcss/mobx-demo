import {defaultComparer, Atom} from '../internal';

export class ObservableValue extends Atom{
    constructor(value, enhancer, name_,  notifySpy = true, equals = defaultComparer) {
        super(name_)
        this.enhancer = enhancer;
        this.name_ = name_;
        this.equals = equals;
        // 根据绑定的监听方式去监听属性
        this.value_ = enhancer(value, undefined, name_);
    }
    setNewValue_(newValue) {
        this.value_ = newValue
        this.reportChanged()
    }

    get() {
        this.reportObserved()
        return this.value_
    }
}