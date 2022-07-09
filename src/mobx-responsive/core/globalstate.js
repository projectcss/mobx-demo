export class MobxGlobals {
    mobxGuid = 0;
    pendingUnobservations = [];
    pendingReactions = [];
    isRunningReactions = false;
    inBatch = 0

}

export const globalState = new MobxGlobals();