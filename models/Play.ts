import Stock from "./Stock";

export default class Play {
  [key: string]: any;
  constructor(playObj: {
    ID: any,
    date: string,
    loser: string,
    winner: string,
    stocks: Stock[],
    character: string,
    stocksTaken: number,
    lossStocks: Stock[],
    otherCharacter: string,
    winnerStocksTaken?: number,
    winnerExpGained?: number,
    loserExpGained?: number,
    winnerPrevExp?: number,
    loserPrevExp?: number,
    winnerNewExp?: number,
    loserNewExp?: number,
    winnerUUID?: string,
    winnerUID?: string,
    loserUUID?: string,
    loserUID?: string,
    timeLeft?: number,
    winnerID?: string,
    loserID?: string,
    expGained?: any,
    prevExp?: any,
    seriesID?:any,
    newExp?: any,
    uuid?: any,
    id?: any,
  }) {
    Object.assign(this, playObj);
  }
}