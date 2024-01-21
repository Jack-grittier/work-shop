export default class Experience {
  [key: string]: any;
  constructor(
      public nextLevelAt: number,
      public remainingXP: number,
      public arenaXP: number,
      public xp: number,
      public uuid?: any,
      public id?: any,
  ) {
    this.nextLevelAt = nextLevelAt;
    this.remainingXP = remainingXP;
    this.arenaXP = arenaXP;
    this.uuid = uuid;
    this.xp = xp;
    this.id = id;
  }
}