import { Badge } from "@mui/material";
import { removeTrailingZeroDecimal } from "../globals/functions/globalFunctions";

export default function AutoCompleteOption(props) {
    let { option, property, className } = props;
    return (
        <div className={`autocompleteOption ${className ? className : ``}`}>
            <div className={`leftSmallCol`}>
                <span className={`dollar`}>$</span>{removeTrailingZeroDecimal(option?.price, 2)}
            </div>
            <div className={`optionPrimaryImageColumn`}>
                <img className={`optionPrimaryImage`} src={option?.image?.src} alt={`Image`} />
            </div>
            <div className={`optionDetailsColumn`}>
                <div className={`optionStats justifyContentCenter`}>
                    <span className={`optionTitle oflow notop tflow100`}>{option[property]}</span>
                    {/* <div className={`optionStatDetails subtleTextInLabel`}>
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
                <div className={`optionInnerRightColumn subtleTextInLabel`}>
                    <div className={`optionStats`}>
                        <span className={`optionType`}>{option?.type}</span>
                        <div className={`optionStatDetails subtleTextInLabel`}>
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
                <div className={`optionVariants`}>
                    <div className={`optionVariantsContainer`}>
                        {option?.images?.length > 1 ? (
                            option?.images?.slice(1,4)?.map((img, imgIndex) => {
                                let variantsLength = img?.variant_ids?.length > 1 ? img?.variant_ids?.length : 1;
                                return (
                                    <Badge key={imgIndex} title={`Only ${variantsLength} Item(s) Left`} badgeContent={variantsLength} color={`primary`}>
                                        <img className={`optionAltImage`} src={img?.src} alt={`Alt Image`} />
                                    </Badge>
                                )
                            })
                        ) : (
                            <Badge title={`Only ${option?.quantity} Item(s) Left`} badgeContent={option?.quantity} color={`primary`}>
                                <img className={`optionAltImage`} src={option?.altImage?.src} alt={`Alt Image`} />
                            </Badge>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}