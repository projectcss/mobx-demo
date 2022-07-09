import {getNextId, Reaction} from '../internal';

export function autorun(view) {
    const name = "Autorun@" + getNextId();
    const reaction = new Reaction(
        name,
        function () {
            this.track(reactionRunner)
        }
    )
    function reactionRunner() {
        view(reaction);
    }
    // 调用reaction
    reaction.schedule_();
}