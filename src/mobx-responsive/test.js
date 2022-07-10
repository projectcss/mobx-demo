import {makeObservable, observable, autorun} from './mobx';

class Store {
    count = 0;
    increase() {
        this.count = 2;
    }
    constructor() {
        makeObservable(this, {
            count: observable,
        })
        autorun(() => {
            console.log(this.count)
        })
    }
}

const store = new Store();

setTimeout(() => {
    store.increase();
}, 3000)

export default store;
