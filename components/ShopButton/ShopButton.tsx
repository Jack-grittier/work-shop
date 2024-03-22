import { useState } from "react";
import Action from "../../models/Action";
// import { useContext, useState } from "react";
// import { StateContext } from "../../pages/_app";
import { productActions } from "../../globals/globals";
// import { checkUserRole } from "../../globals/functions/globalFunctions";

interface ShopButtonProps {
    icon?: any;
    product?: any;
    wide?: boolean;
    inCart: boolean;
    iconColor?: string;
    action: Action & typeof productActions.Add;
}

export default function ShopButton(props: ShopButtonProps) {
    let { wide, icon, iconColor, action, inCart } = props;
    // let { user } = useContext<any>(StateContext);

    if (!icon) icon = action.icon;
    if (!iconColor) iconColor = action.color;

    let [actionInProgress,] = useState(false);

    return <>
        <button type={`button`} className={`shopButton ${wide ? `w100` : `maxFit`} productButton center ${inCart ? `cartRemoveButton cartDeleteButton cartActionButton` : ``}`}>
            <i className={`shopButtonIcon maxfit productIcon fas ${actionInProgress ? `pink spinThis fa-spinner` : `${iconColor} ${icon}`}`}></i>
            <div className={`shopButtonText maxfit productButtonText alertActionButton`}>
                {actionInProgress 
                ? (inCart ? action.inProgressLabel : action.inProgressLabel) 
                : (inCart ? action.label : action.label)}
            </div>
        </button>
    </>
}