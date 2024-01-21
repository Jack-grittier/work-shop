import Main from './Main';
import Play from '../models/Play';
import { useContext } from 'react';
import Level from '../models/Level';
import Player from '../models/Player';
import PlayerForm from './PlayerForm';
import { Levels } from '../common/Levels';
import CommandsForm from './CommandsForm';
import { parseDate } from './PlayerRecord';
import LoadingSpinner from './LoadingSpinner';
import Experience from '../models/Experience';
import { Characters } from '../common/Characters';
import { StateContext, defaultPlayerRoles, getActivePlayersJSON } from '../pages/_app';
import PlayerCard, { calcPlayerLossesFromPlays, calcPlayerWinsFromPlays } from './PlayerCard';

export const calcPlayerCharacterTimesPlayed = (plyr: Player, char, plays: any) => {
    let timesCharPlayed = 0;
    if (plays && plays?.length > 0) {
        let playsToUpdate = plays.filter(ply => ply?.winnerUUID == plyr?.uuid || ply?.loserUUID == plyr?.uuid);
        let charsPlayed = playsToUpdate?.length > 0 ? playsToUpdate?.map(ply => (ply?.winnerUUID == plyr?.uuid ? ply?.character : ply?.otherCharacter)) : [];
        timesCharPlayed = charsPlayed?.length > 0 ? charsPlayed?.filter(charPlayed => charPlayed.toLowerCase() == char || charPlayed.toLowerCase().includes(char)).length : [].length;
    } else {
        timesCharPlayed = plyr.plays.length > 0 ? plyr.plays.map(ply => ply.character).filter(charPlayed => charPlayed.toLowerCase() == char || charPlayed.toLowerCase().includes(char)).length : [].length;
    }
    return timesCharPlayed;
};

export const calcPlaysCharacterTimesPlayed = (plys: Play[], type, characterOption, plyr?: any) => {
    let playChars = type == `All` ? plys.map(ply => ply.character).concat(plys.map(ply => ply.otherCharacter)) : plys.map(ply => (ply?.winnerUUID != plyr?.uuid ? ply?.character : ply?.otherCharacter));
    return playChars.filter(charPlayed =>  characterOption.label.toLowerCase().includes(charPlayed.toLowerCase())).length;
};

export const getCharacterTitle = (char) => {
    if (char.split(` `).length > 1) char = char.split(` `).join(``).toLowerCase();
    return Characters[char];
}

export const removeEmptyParams = (object) => {
    Object.keys(object).forEach(key => isInvalid(object[key]) && delete object[key]);
    return object;
}

export const checkUserRole = (user: any, role) => {
    if (user && user?.roles && user?.roles?.length > 0) {
        let userRoleNames = user?.roles?.map(rol => rol?.name);
        let userRoleLevels = user?.roles?.map(rol => rol?.level);
        let maxUserRole = Math.max(...userRoleLevels);
        if (typeof role == `string`) {
            let thisRole = defaultPlayerRoles.find(rol => rol?.name == role);
            let userHasRole = userRoleNames.includes(role) || maxUserRole >= thisRole?.level;
            return userHasRole;
        } else {
            let thisRole = defaultPlayerRoles.find(rol => rol?.level == role);
            let userHasRole = userRoleLevels.includes(role) || maxUserRole >= thisRole?.level;
            return userHasRole;
        }
    } else {
        return user && user?.roles && user?.roles?.length > 0;
    }
}

export const getActivePlayers = (players: any[], customObject = true, plays) => {
   if (customObject == true) {
    let activePlayers: Player[] = players.filter(plyr => (plyr.active || !plyr.disabled)).sort((a: Player, b: Player) => {

        let aWins = 0;
        let bWins = 0;

        let aLosses = 0;
        let bLosses = 0;

        let aPlays = [];
        let bPlays = [];

        let hasPlays = plays && Array.isArray(plays) && plays?.length > 0;

        if (hasPlays) aPlays = plays.filter(ply => ply?.winnerUUID == a?.uuid || ply?.loserUUID == a?.uuid);
        if (hasPlays) bPlays = plays.filter(ply => ply?.winnerUUID == b?.uuid || ply?.loserUUID == b?.uuid);

        if (hasPlays) aWins = calcPlayerWinsFromPlays(a, plays);
        if (hasPlays) bWins = calcPlayerWinsFromPlays(b, plays);
        
        if (hasPlays) aLosses = calcPlayerLossesFromPlays(a, plays);
        if (hasPlays) bLosses = calcPlayerLossesFromPlays(b, plays);

        let compareByExperience = b.experience.arenaXP !== a.experience.arenaXP;
        if (compareByExperience) {
            let sortByHighestExperience = b.experience.arenaXP - a.experience.arenaXP;
            return sortByHighestExperience;
        }

        let compareByWins = aWins !== bWins;
        if (compareByWins) {
            let sortByHighestWins = bWins - aWins;
            return sortByHighestWins;
        }

        let compareByLowestLosses = aLosses !== bLosses;
        if (compareByLowestLosses) {
            let sortByLowestLosses = aLosses - bLosses;
            return sortByLowestLosses;
        }

        let sortByHighestGamesPlayedAfterHighestExp = bPlays?.length - aPlays?.length;
        
        if (hasPlays) {
            return sortByHighestGamesPlayedAfterHighestExp;
        };

    }).map(pla => newPlayerType(pla, true, plays));
    return activePlayers;
   } else {
    getActivePlayersJSON(players, false, plays);
   }
}

export const calcPlayerLevelImage = (levelName) => {
    let levels = Object.values(Levels);
    let playerLevel: any = levels.find(lvl => lvl?.name == levelName);
    return playerLevel?.altImage || playerLevel?.image;
    // let smasherscapeImagesURL = `/assets`;
    // if (levelName == `Bronze Scimitar`) return `${smasherscapeImagesURL}/Bronze_Scimmy.png?raw=true`; 
    // else if (levelName == `Iron Scimitar`) return `${smasherscapeImagesURL}/Iron_Scimmy.png?raw=true`; 
    // else if (levelName == `Steel Scimitar`) return `${smasherscapeImagesURL}/Steel_Scimmy.png?raw=true`; 
    // else if (levelName == `Mithril Scimitar`) return `${smasherscapeImagesURL}/Mithril_Scimmy.png?raw=true`; 
    // else if (levelName == `Adamantite Scimitar`) return `${smasherscapeImagesURL}/Adamant_Scimmy.png?raw=true`; 
    // else if (levelName == `Rune Scimitar`) return `${smasherscapeImagesURL}/Rune_Scimmy.png?raw=true`; 
    // else if (levelName == `Gilded Scimitar`) return `${smasherscapeImagesURL}/Gilded_Scimmy.png?raw=true`;
    // else if (levelName == `Gomu Gomu`) return `${smasherscapeImagesURL}/Gomu_Gomu.png?raw=true`;
    // else if (levelName == `Dragon Scimitar`) return `${smasherscapeImagesURL}/Dragon_Scimmy.png?raw=true`;
    // else if (levelName == `Abyssal Whip`) return `${smasherscapeImagesURL}/Abyssal_Whip.png?raw=true`;
    // // else if (levelName == `Dragon Hunter Crossbow`) return `${smasherscapeImagesURL}/Abyssal_Whip.png?raw=true`;
    // // else if (levelName == `Twisted Bow`) return `${smasherscapeImagesURL}/Abyssal_Whip.png?raw=true`;
    // else if (levelName == `Fish Sack`) return `${smasherscapeImagesURL}/Fish_Sack.png?raw=true`;
    // else if (levelName == `Golden Tench`) return `${smasherscapeImagesURL}/Golden_Tench.png?raw=true`;
    // else return `${smasherscapeImagesURL}/OSRS_Top_Hat.png?raw=true`;
}

export const calcPlayerCharactersPlayed = (plyr: Player, cutOff = true, plays) => {
    let playsToUpdate = [];
    if (plays && plays?.length > 0) {
        playsToUpdate = plays.filter(ply => ply?.winnerUUID == plyr?.uuid || ply?.loserUUID == plyr?.uuid);
    } else {
        playsToUpdate = plyr?.plays;
    }
    let charsPlayed = playsToUpdate?.length > 0 ? playsToUpdate?.map(ply => (ply?.winnerUUID == plyr?.uuid ? ply?.character : ply?.otherCharacter)) : [];
    let counts = charsPlayed.reduce((acc, char) => {
        acc[char] = (acc[char] || 0) + 1;
        return acc;
    }, {});
    let sortedCharactersByMostTimesPlayed = Object.entries(counts).sort((a, b) => {
        const aRecent = playsToUpdate?.find(p => (p?.winnerUUID == plyr?.uuid ? p?.character : p?.otherCharacter) === a[0])?.date;
        const bRecent = playsToUpdate?.find(p => (p?.winnerUUID == plyr?.uuid ? p?.character : p?.otherCharacter) === b[0])?.date;
        // return (new Date(bRecent) as any) - (new Date(aRecent) as any); 
        return parseDate(bRecent) - parseDate(aRecent); 
    }).sort((a: any, b: any) => b[1] - a[1]).map(entry => entry[0].toLowerCase());
    return cutOff == true ? sortedCharactersByMostTimesPlayed.slice(0,3) : sortedCharactersByMostTimesPlayed;
}

export const isInvalid = (item) => {
    if (typeof item == `string`) {
        if (!item || item == `` || item == undefined || item == null) {
            return true;
        } else {
            return false;
        }
    } else if (typeof item == `number`) {
        if (isNaN(item) || item == undefined || item == null) {
            return true;
        } else {
            return false;
        }
    } else {
        if (item == undefined || item == null) {
            return true;
        } else {
            return false;
        }
    }
}

export const newPlayerType = (player: Player, customObject = true, plays) => {
    let { name, num } = player.level;
    let levelObj = { name, num };
    let level: Level = new Level(levelObj) as Level;
    let experience: Experience = new Experience(player.experience.nextLevelAt, player.experience.remainingXP, player.experience.arenaXP, player.experience.xp) as Experience;

    // let wins;
    // let losses;
    // let ratio = 0;
    // let kills = 0;
    // let deaths = 0;
    // let kdRatio = 0;

    // if (plays && plays?.length > 0) {
    //     wins = calcPlayerWinsFromPlays(player, plays);
    //     losses = calcPlayerLossesFromPlays(player, plays);
    //     ratio = (wins/(wins+losses)) * 100;
    //     kills = calcPlayerKills(player, plays);
    //     deaths = calcPlayerDeaths(player, plays);
    //     kdRatio = calcPlayerKDRatio(player, plays);
    // }
    
    experience = removeEmptyParams(experience) as Experience;

    let newPlayer: Player = new Player({
        ...player,
        level,
        experience,
        // kills,
        // deaths,
        // kdRatio,
        // wins,
        // losses,
        // ratio,
        // plays: playsToConsider,
        // percentage: (ratio) > 100 ? 100 : parseFloat(removeTrailingZeroDecimal(ratio)),
    }) as Player;

    return new Player(removeEmptyParams(newPlayer)) as Player;
}

export default function Smasherscape(props) {
    const { user, mobile, useDatabase, filteredPlayers, players, noPlayersFoundMessage, plays, playersLoading, command } = useContext<any>(StateContext);

    return <Main className={`smasherscapeLeaderboard`} style={playersLoading ? {paddingTop: 10} : null}>
        <div className={`AdminArea ${command?.name}`}>
            {getActivePlayers(players, true, plays).length > 0 && (useDatabase == false && !mobile || (user && checkUserRole(user, `Admin`))) && <>
                <h2 className={`centerPageHeader toggleButtonsHeader`}>Commands Builder Form</h2>
                <CommandsForm />
            </>}
            <PlayerForm />
        </div>
        <div id={props.id} className={`${props.className} playerGrid ${getActivePlayers(filteredPlayers, true, plays)?.length == 0 ? `empty` : `populated`}`}>
            {getActivePlayers(filteredPlayers, true, plays)?.length == 0 && <>
                <div className="gridCard">
                    <h1 className={`runescape_large noPlayersFound`}>
                        {playersLoading ? <LoadingSpinner size={42} /> : noPlayersFoundMessage}
                    </h1>
                </div>
            </>}
            {!playersLoading ? getActivePlayers(filteredPlayers, true, plays)?.length > 0 && getActivePlayers(filteredPlayers, true, plays)?.map((plyr, plyrIndex) => {
                return playersLoading ? <LoadingSpinner size={30} override={true} /> : <PlayerCard plyr={plyr} key={plyrIndex} />
            }) : <LoadingSpinner size={30} override={true} />}
        </div>
    </Main>
}