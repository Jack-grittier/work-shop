import Image from "./Image";
import { useContext } from "react";
import { StateContext } from "../pages/_app";

export default function BadgesContainer(props) {
    let streak = 0;
    let { player } = props;
    const { plays } = useContext<any>(StateContext);
    let playerPlays = plays.filter(ply => ply?.winnerUUID == player?.uuid || ply?.loserUUID == player?.uuid);
    let streakType = playerPlays[0]?.winnerUUID == player?.uuid ? `Win` : `Loss`;

    for (let i = 0; i < playerPlays.length; i++) {
        if (streakType == `Win`) {
            if (playerPlays[i]?.winnerUUID == player?.uuid) {
                streak = streak + 1;
            }
        } else {
            if (playerPlays[i]?.loserUUID == player?.uuid) {
                streak = streak + 1;
            }
        }
    }

    return <div className={`playerBadgesContainer`}>
        {player?.xpModifier > 1 && <div className={`badgeElement xpModifierBadge`}>
            <span className="badgeContent">{player?.xpModifier?.toLocaleString()}x <span className="innerBadgeContext">Pts</span></span>
            <Image src={`/assets/RS_Empty_Blue_Ring_Badge.png`} alt={`Empty Badge`} className={`emptyBadge recordBadge`} />
        </div>}
        {streak > 2 && <div className={`badgeElement strkBadge ${streakType} ${streak > 999 ? `largeStreak` : ``}`}>
            {streakType == `Win` && <Image src={`/assets/flames/flame3.gif`} alt={`Win Streak Badge`} className={`flameBadge badgeIcon ${streakType}`} />}
            {streakType == `Loss` && <Image src={`/assets/flames/flame3.gif`} alt={`Loss Streak Badge`} className={`flameBadge badgeIcon ${streakType}`} />}
            <span className="badgeContent">{streak?.toLocaleString()} <span className="innerBadgeContext">{streakType} Strk</span></span>
            <Image src={`/assets/RS_Empty_Blue_Ring_Badge.png`} alt={`Empty Badge`} className={`emptyBadge recordBadge`} />
        </div>}
        {/* <Image src={`/assets/RS_Warrior_Badge.webp`} alt={`Warrior Badge`} className={`warriorBadge recordBadge`} /> */}
    </div>
}