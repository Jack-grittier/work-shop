import Play from "./Play";
import User from "./User";
import Player from "./Player";

export default class Parameters {
    [key: string]: any;
    constructor(parameterObject: {
        user: User | Player,
        command: any, 
        players: any, 
        commands: any,
        plays: Play[],
        setPlays: any,
        setPlayers: any, 
        useDatabase: any,
        commandParams: any,
        deleteCompletely: any, 
        setLoadingPlayers: any,
        sameNamePlayeredEnabled: any,
        loadingPlayers?: any,
        databasePlayers?: any, 
        setFilteredPlayers?: any, 
        updatePlayersLocalStorage?: any,
    }) {
      Object.assign(this, parameterObject);
    }
  }