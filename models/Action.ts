export default class Action {
    [key: string]: any;
    constructor(actionObj: {
        icon: string;
        label: string;
        name?: string;
        color: string;
        doneLabel: string;
        action?: Function;
        inProgressLabel: string;
    }) {
        Object.assign(this, actionObj);
    }
}