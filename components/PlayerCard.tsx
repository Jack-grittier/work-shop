import Image from './Image';
import Player from '../models/Player';
import { Badge } from '@mui/material';
import { toast } from 'react-toastify';
import PlayerRecord from './PlayerRecord';
import { Levels } from '../common/Levels';
import { useContext, useState } from 'react';
import BadgesContainer from './BadgesContainer';
import { calcPlayerCharacterIcon } from '../common/CharacterIcons';
import { updatePlayerInDB, updatePlayersLocalStorage } from './PlayerForm';
import { calcPlayerCharacterTimesPlayed, calcPlayerCharactersPlayed, calcPlayerLevelImage, checkUserRole, getActivePlayers, getCharacterTitle } from './smasherscape';

export const calcPlayerWinsFromPlays = (player, plays) => plays.filter(ply => ply?.winnerUUID == player?.uuid)?.length;
export const calcPlayerLossesFromPlays = (player, plays) => plays.filter(ply => ply?.loserUUID == player?.uuid)?.length;
export const calcPlayerWins = (plyr: Player) => plyr.plays.filter(ply => ply.winner.toLowerCase() == plyr.name.toLowerCase()).length;
export const calcPlayerLosses = (plyr: Player) => plyr.plays.filter(ply => ply.loser.toLowerCase() == plyr.name.toLowerCase()).length;

export const isBigImage = (plyr: Player) => {
    let classesToAdd = `bigImage`;
    let levelOfPlayer = Object.values(Levels).find(lvl => lvl?.name == plyr?.level?.name);
    if (levelOfPlayer?.altImage != undefined) classesToAdd = ``;
    return classesToAdd;
}

export default function PlayerCard(props) {
    let { plyr } = props;

    let [initialInterval, setInitialInterval] = useState(5);
    let [loadedInterval, setLoadedInterval] = useState(20);
    let [paginationAmount, setPaginationAmount] = useState(initialInterval);
    let [paginationEnd, setPaginationEnd] = useState(paginationAmount);

    const { user, plays, useDatabase, players, filteredPlayers, setFilteredPlayers, useLazyLoad, setPlayers } = useContext<any>((StateContext as any));

    const setPlayerExpanded = (player: Player, e?) => {
        if (e?.target?.classList?.contains(`playerNameContainer`)) return;
        setPaginationEnd(initialInterval);
        let recordOf = document.querySelector(`.recordOf-${plyr?.uuid}`);
        recordOf.scrollTop = 0;
        let playersWithExpandedOrCollapsedPlayer = setFilteredPlayers(filteredPlayers.map(plyr => plyr.id == player.id ? { ...player, expanded: !player.expanded } : plyr));
        return playersWithExpandedOrCollapsedPlayer;
    };

    const limitInput = (event, maxLen, plyr?) => {
        const allowedKeys = [`Backspace`, `Delete`, `Shift`, `Control`, `ShiftLeft`, `ShiftRight`, `ArrowRight`, `ArrowLeft`, `ArrowUp`, `ArrowDown`, `Home`, `End`];
        const disallowedKeys = [`Space`, `Enter`, `NumpadEnter`, `Return`];
        const element = event.target;
        if ((event.code != `Enter` && event.code != `NumpadEnter`) && (element.textContent.length >= maxLen && !allowedKeys.includes(event.code) || disallowedKeys.includes(event.code))) {
            event.preventDefault();
            return; 
        } else if (event.code == `Enter` || event.code == `NumpadEnter`) {
            event.preventDefault();
            changePlayerNameConfirm(event, plyr);
            event.target.blur();
        }
    }

    const changePlayerNameConfirm = (e, player) => {
        let value = e.target.textContent.toLowerCase();
        let displayName = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        let playerNames = getActivePlayers(players, true, plays).map(plyr => plyr.name.toLowerCase());

        const changePlayerName = (e, player) => {
            let currentDateTimeStamp = formatDate((new Date() as any));

            let updatedPlayer = {
                ...player,
                displayName,
                name: displayName,
                username: displayName,
                updated: currentDateTimeStamp,
                lastUpdated: currentDateTimeStamp,
                expanded: player.expanded || false,
                properties: countPropertiesInObject(player),
                lastUpdatedBy: user ? user.name : displayName,
            };

            if (useDatabase == true) {
                const jsonPlayer = JSON.parse(JSON.stringify(player));
                const jsonUpdatedPlayer = JSON.parse(JSON.stringify(updatedPlayer));
                updatePlayerInDB(jsonPlayer, jsonUpdatedPlayer);
            } else {
                let updatedPlayers = getActivePlayersJSON(players, false, plays).map(plyr => {
                    if (plyr?.uuid == player?.uuid) {
                        return updatedPlayer;
                    } else {
                        return plyr;
                    }
                });
                updatePlayersLocalStorage(updatedPlayers, plays);
                setPlayers(updatedPlayers);
                setFilteredPlayers(updatedPlayers);
            }
        }

        if (player?.name.toLowerCase() == value) {
            e.target.textContent = player?.name;
            return;
        } else if (value == ``) {
            e.target.textContent = player?.name;
            toast.error(`Please Enter a Valid Name!`);
            return;
        } else if (playerNames.includes(value)) {
            e.target.textContent = player?.name;
            toast.error(`Player name is already taken, Please pick a unique name.`);
            // showAlert(`Player name is already taken`, <div className="alertMessage errorMessage loadingMessage">
            //     <i style={{color: `var(--smasherscapeYellow)`}} className="fas fa-exclamation-triangle"></i>
            //     <h3>Player name is already taken</h3>
            //     <h3>Please pick a unique name</h3>
            // </div>, `55%`, `50%`);
            return;
        } else {
            changePlayerName(e, player);
            // showAlert(`Change Player Name?`, <div className="alertMessage confirmMessage loadingMessage">
            //     <i style={{color: `var(--smasherscapeYellow)`}} className="fas fa-exclamation-triangle"></i>
            //     <h3>Are you sure you want to change player name?</h3>
            //     <h3>Saving will update the name</h3>
            //     <button onClick={(e) => changePlayerName(e, player)}>Save</button>
            // </div>, `55%`, `50%`);
            // e.target.textContent = player?.name;
            // return;
        }
    }

    return <div id={`playerCard-${plyr.uuid}`} className={`playerCard ${plyr?.expanded ? `expandedPlayerCard` : `collapsedPlayerCard`} ${plyr?.uid ? `playerCardUID-${plyr?.uid} ${user && user?.uid == plyr?.uid ? `playerIsUser userIsPlayer` : ``}` : ``}`}>
    <BadgesContainer player={plyr} />
    <div className="gridCard" onClick={(e) => setPlayerExpanded(plyr, e)}>
        <Image className={`cardBG`} alt={`Smasherscape Player Card`} src={`/assets/OSRS_Card_Empty.png?raw=true`} />
        <Image className={`cardBG border`} alt={`Smasherscape Player Card`} src={`/assets/OSRS_Card_Template_Border_Only.png?raw=true`} />
        <div className="playerCardContent">
            <div className="cardTopRow">
                <div className="logoWithWords">
                    <img width={70} src={`/assets/OSRS_Top_Hat.png?raw=true`} alt={`Tophat Logo`} />
                    <h3 className={`blackTextShadow slimmed`}>Xuruko's<br />SmasherScape</h3>
                </div>
                <h2 title={plyr?.name} className={`playerNameText bluePurpleTextShadow textOverflow overrideWithInlineBlock`}>
                    <span onKeyDown={(e) => limitInput(e, 10, plyr)} onBlur={(e) => changePlayerNameConfirm(e, plyr)} className={`playerNameContainer changeLabel ${(checkUserRole(user, `Owner`) || user && user?.uid == plyr?.uid) ? `editable` : ``}`} contentEditable={checkUserRole(user, `Owner`) || user && user?.uid == plyr?.uid} suppressContentEditableWarning>
                        {plyr?.name}
                    </span>
                    {user && plyr?.uid && user?.uid == plyr?.uid && user?.image && <img alt={user?.email} src={user?.image}  className={`userImage playerCardUserImage`} />}
                    {user && plyr?.uid && user?.uid == plyr?.uid && !user?.image && <div className={`userCustomAvatar playerCardUserImage`}>{user?.name?.charAt(0).toUpperCase()}</div>}
                </h2>
            </div>
            <div className="cardMiddleRow">
                <div className={`imgLeftCol ${plyr.level.name.split(` `)[0]}`}>
                    <img className={`cardLevelImage ${isBigImage(plyr)}`} width={150} src={calcPlayerLevelImage(plyr?.level?.name)} alt={plyr?.level?.name} />
                    <h4 className={`levelName blackTextShadow slimmed ${plyr?.level?.name.split(` `)[0]}`}>{plyr?.level?.name}</h4>
                </div>
                <div className="recordPlays">
                    <div className="record">
                        <h3 className={`greenRecordText`}>Record</h3>
                        <h4 className={`${(calcPlayerWinsFromPlays(plyr, plays) > 1000 || calcPlayerLossesFromPlays(plyr, plays) > 1000) ? `highNumbers` : ``}`}>{calcPlayerWinsFromPlays(plyr, plays).toLocaleString()} - {calcPlayerLossesFromPlays(plyr, plays).toLocaleString()}</h4>
                    </div>
                    <div className="plays">
                        <h3 className={`greenRecordText`}>Plays</h3>
                        <div className={`playsContainer ${calcPlayerCharactersPlayed(plyr, true, plays)?.length > 0 ? `populatedPlays` : ``}`}>
                            {calcPlayerCharactersPlayed(plyr, true, plays)?.length > 0 ? calcPlayerCharactersPlayed(plyr, true, plays).map((char, charIndex) => {
                                return (
                                    <Badge title={`Played ${getCharacterTitle(char)} ${calcPlayerCharacterTimesPlayed(plyr, char, plays)} Time(s)`} key={charIndex} badgeContent={calcPlayerCharacterTimesPlayed(plyr, char, plays)} color="primary">
                                        <img className={`charImg`} width={35} src={calcPlayerCharacterIcon(char)} alt={getCharacterTitle(char)} />
                                    </Badge>
                                )
                            }) : <div className={`flex center blackTextShadow slimmed`}>
                                No Plays Yet
                            </div>}
                        </div>
                    </div>
                </div>
                <div className="rightCol">
                    <div className="level">
                        <h4 className={`levelNum levelTop`}>{plyr?.level?.num}</h4>
                        <div className="borderSep"></div>
                        <h4 className={`levelNum levelBot`}>{plyr?.level?.num}</h4>
                    </div>
                    <div className="experienceDetails">
                        <div className="arenaXP xpDetail">
                            <div>Arena XP:</div>
                            <div>{plyr?.experience.arenaXP.toLocaleString(`en`)}</div>
                        </div>
                        <div className="nextLevelAt xpDetail">
                            <div>Next Level At:</div>
                            <div>{plyr?.experience.nextLevelAt.toLocaleString(`en`)}</div>
                        </div>
                        <div className="remainingXP xpDetail">
                            <div>Remaining XP:</div>
                            <div>{plyr?.experience.remainingXP.toLocaleString(`en`)}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="cardBottomRow">
                <div className="gradient" style={{clipPath: `polygon(0% 0, ${((plyr.experience.arenaXP - plyr.experience.xp) / (plyr.experience.nextLevelAt - plyr.experience.xp)) * 100}% 0%, ${((plyr.experience.arenaXP - plyr.experience.xp) / (plyr.experience.nextLevelAt - plyr.experience.xp)) * 100}% 100%, 0 100%)`}}></div>
            </div>
        </div>
    </div>
    <PlayerRecord plyr={plyr} paginationEnd={paginationEnd} setPaginationEnd={setPaginationEnd} loadedInterval={loadedInterval} plyrPlays={plays.filter(ply => ply?.winnerUUID == plyr?.uuid || ply?.loserUUID == plyr?.uuid)} />
</div>
}