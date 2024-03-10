import { Badge, Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useContext, useState } from "react";
import { StateContext } from "../pages/_app";
import Products from "./Products";
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';

type Anchor = `top` | `left` | `bottom` | `right`;

export default function NavIcons() {
    let [cartOpen, setCartOpen] = useState(false);
    let { theme, cart, setAdminFeatures } = useContext<any>(StateContext);

    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    
    const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === `keydown` && ((event as React.KeyboardEvent).key === `Tab` || (event as React.KeyboardEvent).key === `Shift`)) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const onClickThemeModeIconLink = () => {
        setAdminFeatures(prevAdminFeats => prevAdminFeats.map(featr => featr.feature == `Dark Mode` ? ({ ...featr, enabled: !featr.enabled }) : featr));
    }

    return (
        <div className={`navIcons`}>
            <a href={`https://twitter.com/GetCreativeWS`} target="_blank" rel={`noreferrer`} className={`twitterIconLink x-p-2 nx-text-current`}>
                <i title={`Twitter | Creative Workshop`} className={`twitterIcon naturallySmallIcon fab fa-twitter`}></i>
                <span className={`navIconLabel twitter`}>Twitter</span>
                <span className="nx-sr-only">Twitter</span>
                <span className="nx-sr-only"> (opens in a new tab)</span>
            </a>
            <a href={`https://www.instagram.com/getcreativeworkshop/`} target="_blank" rel={`noreferrer`} className={`instagramIconLink nx-p-2 nx-text-current`}>
                <i title={`Instagram | Creative Workshop`} className={`instagramIcon naturallySmallIcon fab fa-instagram`}></i>
                <span className={`navIconLabel instagram`}>Instagram</span>
                <span className="nx-sr-only">Instagram</span>
                <span className="nx-sr-only"> (opens in a new tab)</span>
            </a>
            <a rel={`noreferrer`} className={`cartIconLink customIconLink nx-p-2 nx-text-current cursorPointer`} onClick={toggleDrawer(`right`, !state[`right`])}>
                <Badge title={`${cart?.items?.length} Item(s) in Cart`} badgeContent={cart?.items?.length} color={`primary`}>
                    <i title={`Cart | Creative Workshop`} className={`addToCartIcon navCart fas fa-shopping-cart`}></i>
                    {/* <span className={`navIconLabel cart`}>Cart</span> */}
                </Badge>
                <Drawer
                    anchor={`right`}
                    open={state[`right`]}
                    onClose={toggleDrawer(`right`, false)}
                >
                    <div className={`cart sideCart`}>
                        <Products products={cart?.items} isCart={true} />
                    </div>
                </Drawer>
            </a>
            <a role={`button`} aria-pressed={theme == `dark`} onClick={() => onClickThemeModeIconLink()} rel={`noreferrer`} className={`themeModeIconLink customIconLink nx-p-2 nx-text-current`} tabIndex={0}>
                {theme == `dark` ? (
                    <i title={`Dark Mode`} className={`darkModeIcon fas fa-moon`}></i>
                ) : (
                    <i title={`Light Mode`} className={`lightModeIcon fas fa-sun`}></i>
                )}
            </a>
        </div>
    )
}