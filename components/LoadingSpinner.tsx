import { capWords } from "../pages/_app";

export const getSpinnerIcon = (props) => {
    let spinner;
    props.dots ? spinner = <i className={`fas fa-spinner spinner ${props?.className}`}></i> : null;
    props.sync ? spinner = <i className={`fas fa-sync-alt spinner ${props?.className}`}></i> : null;
    props.circleNotch ? spinner = <i className={`fas fa-circle-notch spinner ${props?.className}`}></i> : null;
    return spinner;
}

export default function LoadingSpinner(props) {
    let { loadingLabel } = props;
    if (!loadingLabel) loadingLabel = `Player(s)`;
    return (
        <div className={`loadingSpinner`}>
            <div className={`spinnerEl`} style={{maxHeight: props.size}}>
                {/* <i style={{fontSize: props.size}} className="fas fa-spinner spinner"></i> */}
                <i style={{fontSize: props.size, color: `var(--gameBlueSoft)`}} className={`fas fa-circle-notch spinner ${props?.className}`}></i>
            </div>
            <span className={`spinnerEl`} style={{fontSize: (props.size <= 56 && props.override == false) ? 56 : props.size, maxHeight: props.size}}>Loading {capWords(loadingLabel)}...</span>
        </div>
    )
}