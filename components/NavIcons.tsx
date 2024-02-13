import { useContext } from "react";
import { StateContext } from "../pages/_app"

export default function NavIcons() {
    let { theme, setAdminFeatures } = useContext<any>(StateContext);

    const onClickThemeModeIconLink = () => {
        setAdminFeatures(prevAdminFeats => prevAdminFeats.map(featr => featr.feature == `Dark Mode` ? ({ ...featr, enabled: !featr.enabled }) : featr));
    }

    return (
        <div className={`navIcons`}>
            <a href={`https://twitter.com/GetCreativeWS`} target="_blank" rel="noreferrer" className={`twitterIconLink x-p-2 nx-text-current`}>
                <i title={`Twitter | Creative Workshop`} className={`twitterIcon naturallySmallIcon fab fa-twitter`}></i>
                <span className={`navIconLabel twitter`}>Twitter</span>
                <span className="nx-sr-only">Twitter</span>
                <span className="nx-sr-only"> (opens in a new tab)</span>
            </a>
            <a href={`https://www.instagram.com/getcreativeworkshop/`} target="_blank" rel="noreferrer" className={`instagramIconLink nx-p-2 nx-text-current`}>
                <i title={`Instagram | Creative Workshop`} className={`instagramIcon naturallySmallIcon fab fa-instagram`}></i>
                <span className={`navIconLabel instagram`}>Instagram</span>
                <span className="nx-sr-only">Instagram</span>
                <span className="nx-sr-only"> (opens in a new tab)</span>
            </a>
            <a href={`/cart`} rel="noreferrer" className={`cartIconLink customIconLink nx-p-2 nx-text-current`}>
                <i title={`Cart | Creative Workshop`} className={`addToCartIcon navCart fas fa-shopping-cart`}></i>
                {/* <span className={`navIconLabel cart`}>Cart</span> */}
            </a>
            <a type={`button`} onClick={() => onClickThemeModeIconLink()} href={`#`} rel="noreferrer" className={`themeModeIconLink customIconLink nx-p-2 nx-text-current`}>
                {theme == `dark` ? (
                    <i title={`Dark Mode`} className={`darkModeIcon fas fa-moon`}></i>
                ) : (
                    <i title={`Light Mode`} className={`lightModeIcon fas fa-sun`}></i>
                )}
            </a>
        </div>
    )
}