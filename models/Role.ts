export default class Role {
    [key: string]: any;
    constructor(roleObj: {
        name: string;
        level: number;
    }) {
        Object.assign(this, roleObj);
    }
}