import {$mobx, asObservableObject, ownKeys} from '../internal';

export function makeObservable(target, annotations, options) {
    const adm =  asObservableObject(target, options)[$mobx];
    ownKeys(annotations).forEach(key => adm.make_(key, annotations[key]))
}