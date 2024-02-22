import { Badge } from "@mui/material";
import { removeTrailingZeroDecimal } from "../globalFunctions";

export default function AutoCompleteOption(props) {
    let { option, property, className } = props;
    return (
        <div className={`autocompleteOption ${className ? className : ``}`}>
            <div className="levelNumColumn">
                <span className={`dollar`}>$</span>{removeTrailingZeroDecimal(option?.price)}
            </div>
            <div className="levelImageColumn">
                <img width={30} src={option?.image?.src} alt={`Image`} />
            </div>
            <div className="playerDetailsColumn">
                <div className="playerStats justifyContentCenter">
                    <span className={`optionTitle`}>{option[property]}</span>
                    {/* <div className="playerStatDetails subtleTextInLabel">
                        <div className={`statDetailLabelSmall`}>
                            <span className={`subtleTextInLabel`}>K:</span> 
                            25
                        </div>
                        <div className={`statDetailLabelSmall`}>
                            <span className={`subtleTextInLabel`}>D:</span> 
                            15
                        </div>
                    </div> */}
                </div>
                <div className="playerEXP subtleTextInLabel">
                    <div className="playerStats">
                        <span className={`optionType`}>{option?.type}</span>
                        <div className="playerStatDetails subtleTextInLabel">
                            <div className={`statDetailLabelSmall`}>
                                <span className={`subtleTextInLabel`}>Qty:</span> 
                                {option?.quantity}
                            </div>
                            <div className={`statDetailLabelSmall`}>
                                <span className={`subtleTextInLabel`}>Vars:</span> 
                                {option?.variants ? option?.variants?.length : 0}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="plays">
                    <div className={`playsContainer`}>
                        <Badge title={`Only ${option?.quantity} Item(s) Left`} badgeContent={option?.quantity} color="primary">
                            <img className={`charImg`} width={25} src={option?.altImage?.src} alt={`Alt Image`} />
                        </Badge>
                    </div>
                </div>
            </div>
        </div>
    )
}