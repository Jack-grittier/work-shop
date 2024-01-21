export default class Level {
  [key: string]: any;
  constructor(levelObj: {
    id?: any,
    uuid?: any,
    color?: any,
    name: string,
    num?: number,
    unlocks?: any,
    bonuses?: any,
    features?: any,
    gradient?: any,
    image?: string,
    class?: string,
    experience?: any,
    background?: any,
    startAt?: number,
    altImage?: string,
    levelUpAfter?: number,
  }) {
    Object.assign(this, levelObj);
  }
}