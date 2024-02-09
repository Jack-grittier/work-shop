export default function NavIcons() {
    return (
        <div className={`navIcons`}>
            <a href={`https://twitter.com/GetCreativeWS`} target="_blank" rel="noreferrer" className="nx-p-2 nx-text-current">
                <i title={`Twitter | Creative Workshop`} className={`twitterIcon fab fa-twitter`}></i>
                <span className={`navIconLabel twitter`}>Twitter</span>
                <span className="nx-sr-only">Twitter</span>
                <span className="nx-sr-only"> (opens in a new tab)</span>
            </a>
            <a href={`https://www.instagram.com/getcreativeworkshop/`} target="_blank" rel="noreferrer" className="nx-p-2 nx-text-current">
                <i title={`Instagram | Creative Workshop`} className={`instagramIcon fab fa-instagram`}></i>
                <span className={`navIconLabel instagram`}>Instagram</span>
                <span className="nx-sr-only">Instagram</span>
                <span className="nx-sr-only"> (opens in a new tab)</span>
            </a>
            <a href={`/cart`} rel="noreferrer" className="nx-p-2 nx-text-current">
                <i title={`Cart | Creative Workshop`} className={`addToCartIcon navCart fas fa-shopping-cart`}></i>
                {/* <span className={`navIconLabel cart`}>Cart</span> */}
            </a>
        </div>
    )
}