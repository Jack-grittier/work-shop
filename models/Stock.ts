export default class Stock {
  [key: string]: any;
  constructor(
    public character: string,
    public dead?: boolean,
    public uuid?: any,
    public id?: any,
  ) {
    this.character = character;
    this.dead = dead;
    this.uuid = uuid;
    this.id = id;
  }
}