import { dev } from "../pages/_app";
import Play from "../models/Play";
import { getCharacterTitle } from "./smasherscape";
import { calcLevelFromExperience } from "../common/Levels";
import { deletePlayFromDB, updatePlayerInDB } from "./PlayerForm";
import { calcPlayerCharacterIcon } from "../common/CharacterIcons";

export default function CommandsUndo(props) {
    let { playsToConsider, parameters } = props;

    const undoPlay = (e, playToUndo, params) => {
        let { winner, loser} = params;
        if (e.target.innerHTML == `Confirm Undo`) {
            let overlay: any = document.querySelector(`.overlay`);
            let alert: any = document.querySelector(`.alert`);

            if (overlay && alert) {
                alert.style.opacity = 0;
                alert.style.transform = `translateY(-50px)`;
                overlay.style.opacity = 0;
          
                setTimeout(() => {
                  document.body.removeChild(overlay);
                  localStorage.setItem(`alertOpen`, `false`);

                  updatePlayerInDB(winner.player, winner.newPlayer);
                  updatePlayerInDB(loser.player, loser.newPlayer);
                  deletePlayFromDB(playToUndo?.ID);

                  let playerForm = document.querySelector(`#playerForm`);

                  if (playerForm) (playerForm as any).reset();
                }, 240);
            }
        } else {
            e.target.innerHTML = `Confirm Undo`;
            dev() && console.log(`playToUndo`, {playToUndo, winner, loser});
        }
    }

    return (
        <div className={`commandsToUndo recordOfPlayer`}>
            <ul className="recordList">
                {playsToConsider?.length > 0 ? playsToConsider.slice(0, 7).map((ply: Play, plyIndex) => {

                    let isWinner = true;
                    let winnerPlayer = parameters.players.find(plyr => plyr?.uuid == ply?.winnerUUID);
                    let loserPlayer = parameters.players.find(plyr => plyr?.uuid == ply?.loserUUID);
                    let winnerXP = winnerPlayer?.experience?.arenaXP;
                    let loserXP = loserPlayer?.experience?.arenaXP;
                    let winnerLevel = calcLevelFromExperience(winnerXP)?.level?.num;
                    let loserLevel = calcLevelFromExperience(loserXP)?.level?.num;
                    let winnerNewExperience = winnerXP - ply?.winnerExpGained;
                    if (ply?.loserExpGained < 0 || ply?.loserExpGained >= ply?.winnerExpGained) ply.loserExpGained = 100 * ply?.stocksTaken;
                    let loserNewExperience = loserXP - ply.loserExpGained;

                    winnerNewExperience = winnerNewExperience < 0 ? 0 : winnerNewExperience;
                    loserNewExperience = loserNewExperience < 0 ? 0 : loserNewExperience;

                    let winnerNewLevel = calcLevelFromExperience(winnerNewExperience)?.level?.num;
                    let loserNewLevel = calcLevelFromExperience(loserNewExperience)?.level?.num;

                    let updateParams = {
                        winner: {
                            player: winnerPlayer,
                            newPlayer: {
                                uuid: winnerPlayer?.uuid,
                                experience: calcLevelFromExperience(winnerNewExperience).experience,
                                level: calcLevelFromExperience(winnerNewExperience).level,
                            }
                        },
                        loser: {
                            player: loserPlayer,
                            newPlayer: {
                                uuid: loserPlayer?.uuid,
                                experience: calcLevelFromExperience(loserNewExperience).experience,
                                level: calcLevelFromExperience(loserNewExperience).level,
                            }
                        },
                    };

                    return (
                        <li className={`playerPlay commandToUndo`} key={plyIndex}>
                            <div className="plyIndex">{plyIndex + 1}.</div>
                            <div className="recordDetails">
                                <div className={`playMessage`}>{isWinner ? <div>{ply?.winner} <span className={`${isWinner ? `winner` : `loser`}`}>Win</span> over <span className={`loser`}>{ply?.loser}</span></div> : <div><span className={`${isWinner ? `winner` : `loser`}`}>Loss</span> to {ply?.winner}</div>}
                                    <div className="stocksRow">
                                        <div className="stocks">
                                            {isWinner ? ply?.stocks?.length > 0 && ply?.stocks?.map((stok, stkIndex) => {
                                                return (
                                                    <span key={stkIndex} className={stok?.dead ? `dead x` : `living`}>
                                                        <img className={`charImg`} width={35} src={calcPlayerCharacterIcon(stok?.character)} alt={getCharacterTitle(stok?.character)} />
                                                    </span>
                                                )
                                            }) : ply?.lossStocks?.map((stok, stkIndex) => {
                                                return (
                                                    <span key={stkIndex} className={stok?.dead ? `dead x` : `living`}>
                                                        <img className={`charImg`} width={35} src={calcPlayerCharacterIcon(stok?.character)} alt={getCharacterTitle(stok?.character)} />
                                                    </span>
                                                )
                                            })}
                                        </div>
                                    vs 
                                        <div className="otherStocks">
                                            {!isWinner ? ply?.stocks?.length > 0 && ply?.stocks?.map((stok, stkIndex) => {
                                                return (
                                                    <span key={stkIndex} className={stok?.dead ? `dead x` : `living`}>
                                                        <img className={`charImg`} width={35} src={calcPlayerCharacterIcon(stok?.character)} alt={getCharacterTitle(stok?.character)} />
                                                    </span>
                                                )
                                            }) : ply?.lossStocks?.map((stok, stkIndex) => {
                                                return (
                                                    <span key={stkIndex} className={stok?.dead ? `dead x` : `living`}>
                                                        <img className={`charImg`} width={35} src={calcPlayerCharacterIcon(stok?.character)} alt={getCharacterTitle(stok?.character)} />
                                                    </span>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className={`expLevelCompare recordSubDetails ${winnerXP >= 99999 || loserXP >= 99999 ? `largeXP` : ``}`}>
                                    <div className="playDate expChanges preChanges">
                                        <span className={`winner`}>{ply.winner}</span> Lvl: <span className={`preChange`}>{winnerLevel}</span> & XP: <span className={`preChange`}>{winnerXP.toLocaleString()}</span>, <span>{ply.loser}</span> Lvl: <span className={`preChange`}>{loserLevel}</span> & XP: <span className={`preChange`}>{loserXP.toLocaleString()}</span>
                                    </div>
                                    <div className="playDate expChanges">{`>>>`}</div>
                                    <div className="playDate expChanges postChanges">
                                        New <span className={`winner`}>{ply.winner}</span> Lvl: <span className={`postChange`}>{winnerNewLevel}</span> & XP: <span className={`postChange`}>{winnerNewExperience.toLocaleString()}</span>, 
                                        New <span>{ply.loser}</span> Lvl: <span className={`postChange`}>{loserNewLevel}</span> & XP: <span className={`postChange`}>{loserNewExperience.toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className="bottomButtonRow recordSubDetails">
                                    <div className="playDate commandDate">{ply?.date}</div>
                                    <button disabled={false} type={`button`} onClick={(e) => undoPlay(e, ply, updateParams)} className={`buttonLike commandUndoSubmit textShadowThis`}>Undo this Play</button>
                                </div>
                            </div>
                        </li>
                    )}) : <div className={`noPlaysYet`}>
                        No Plays Yet
                </div>}
            </ul>
        </div>
    )
}