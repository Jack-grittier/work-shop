import { useContext } from "react";
import { Badge } from "@mui/material";
import { StateContext } from "../pages/_app";
import { calcPlayerCharacterIcon } from "../common/CharacterIcons";
import { calcPlayerWinsFromPlays, calcPlayerLossesFromPlays } from "./PlayerCard";
import { calcPlayerCharactersPlayed, calcPlayerCharacterTimesPlayed, calcPlayerLevelImage, getCharacterTitle } from "./smasherscape";

export default function PlayerOption(props) {
    let { playerOption, className } = props;
    const { plays } = useContext<any>(StateContext);
    return (
        <div className={`autocompleteOption ${className ? className : ``}`}>
            <div className="levelNumColumn">Lv {playerOption?.level?.num}</div>
            <div className="levelImageColumn">
                <img width={30} src={calcPlayerLevelImage(playerOption?.level?.name)} alt={playerOption?.level?.name} />
            </div>
            <div className="playerDetailsColumn">
                <div className="playerStats justifyContentCenter">
                    <span>{playerOption?.name}</span>
                    {/* <div className="playerStatDetails subtleTextInLabel">
                        <div className={`statDetailLabelSmall`}><span className={`subtleTextInLabel`}>K:</span> {playerOption?.kills}</div>
                        <div className={`statDetailLabelSmall`}><span className={`subtleTextInLabel`}>D:</span> {playerOption?.deaths}</div>
                    </div> */}
                </div>
                <div className="playerEXP subtleTextInLabel">
                    <div className="playerStats">
                        <span>Exp: {playerOption?.experience?.arenaXP?.toLocaleString(`en`)}</span>
                        <div className="playerStatDetails subtleTextInLabel">
                            <div className={`statDetailLabelSmall`}><span className={`subtleTextInLabel`}>Wins:</span> {plays?.length > 0 ? calcPlayerWinsFromPlays(playerOption, plays.filter(ply => ply?.winnerUUID == playerOption?.uuid || ply?.loserUUID == playerOption?.uuid)) : 0 || plays?.length > 0 ? playerOption?.wins : 0}</div>
                            <div className={`statDetailLabelSmall`}><span className={`subtleTextInLabel`}>Losses:</span> {plays?.length > 0 ? calcPlayerLossesFromPlays(playerOption, plays.filter(ply => ply?.winnerUUID == playerOption?.uuid || ply?.loserUUID == playerOption?.uuid)) : 0 || plays?.length > 0 ? playerOption?.losses : 0}</div>
                        </div>
                    </div>
                </div>
                <div className="plays">
                    <div className={`playsContainer`}>
                        {calcPlayerCharactersPlayed(playerOption, true, plays).length > 0 ? (
                            calcPlayerCharactersPlayed(playerOption, true, plays).map((char, charIndex) => {
                                return (
                                    <Badge title={`Played ${getCharacterTitle(char)} ${calcPlayerCharacterTimesPlayed(playerOption, char, plays)} Time(s)`} 
                                    key={charIndex} badgeContent={calcPlayerCharacterTimesPlayed(playerOption, char, plays)} color="primary">
                                        <img className={`charImg`} width={25} src={calcPlayerCharacterIcon(char)} alt={getCharacterTitle(char)} />
                                    </Badge>
                                )
                            })
                        ) : (
                            <span className={`subtleTextInLabel`}>0 Plays</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}