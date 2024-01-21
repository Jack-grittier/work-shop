import { useState } from "react";
import { Badge } from "@mui/material";
import { calcPlaysCharacterTimesPlayed } from "./smasherscape";
export default function CharacterOption(props) {
    let { type, plays, characterOption, plyr } = props;
    const [timesPlayed, setTimesPlayed] = useState(calcPlaysCharacterTimesPlayed(plays, type, characterOption, plyr));
    return (
        <div className="autocompleteOption characterOption">
            <div className="characterIndex">{characterOption?.id}</div>
            <Badge title={`Played ${timesPlayed} Time(s)`} badgeContent={timesPlayed} color="primary">    
                <img className={`charImg`} width={25} src={characterOption.image} alt={characterOption.label} />
            </Badge>
            <div className="spacer"></div>
            <div className="characterName">{characterOption?.label}</div>
            <Badge title={`Played ${timesPlayed} Time(s)`} badgeContent={timesPlayed} color="primary" />
        </div>
    )
}