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

    const showCart = (anchor: Anchor) => (
        <div style={{maxWidth: 250, padding: `35px 0 0 35px`}}>
            {/* <Products products={cart?.items} /> */}
            {cart?.items && cart?.items?.length > 0 ? cart?.items?.map((itm, itmIndex) => {
                return (
                    <div key={itmIndex} className={`cartItem`}>
                        <div>{itmIndex + 1}) {itm?.name}</div>
                        <div className={`flex`}>${itm?.price} <div>Qty: 0</div></div>
                    </div>
                )
            }) : (
                <div className={`cartItem`}>
                    No items in the Cart
                </div>
            )}
        </div>
        // <Box
        //   sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        //   role="presentation"
        //   onClick={toggleDrawer(anchor, false)}
        //   onKeyDown={toggleDrawer(anchor, false)}
        // >
        //   <List>
        //     {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
        //       <ListItem key={text} disablePadding>
        //         <ListItemButton>
        //           <ListItemIcon>
        //             {index % 2 === 0 ? `Inbox Icon` : `Mail Icon`}
        //           </ListItemIcon>
        //           <ListItemText primary={text} />
        //         </ListItemButton>
        //       </ListItem>
        //     ))}
        //   </List>
        //   <Divider />
        //   <List>
        //     {['All mail', 'Trash', 'Spam'].map((text, index) => (
        //       <ListItem key={text} disablePadding>
        //         <ListItemButton>
        //           <ListItemIcon>
        //             {index % 2 === 0 ? `Inbox Icon` : `Mail Icon`}
        //           </ListItemIcon>
        //           <ListItemText primary={text} />
        //         </ListItemButton>
        //       </ListItem>
        //     ))}
        //   </List>
        // </Box>
      );

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
                    {showCart(`right`)}
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