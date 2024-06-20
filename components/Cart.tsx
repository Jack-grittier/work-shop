import Products from "./Products";
import { useContext, useState } from "react";
import { StateContext, dev } from "../pages/_app";
import { ToastOptions, toast } from "react-toastify";
import { maxAnimationTime, shortAnimationTime, newShopifyCheckout } from "../firebase";

export default function Cart(props) {
    let { cartPage } = props;
    let { user, cart, router } = useContext<any>(StateContext);
    if (!cartPage) cartPage = false;
    let [checkoutClicked, setCheckoutClicked] = useState(false);

    async function newShopifyCheckoutFromCart() {
        try {
            let validCart = cart && cart.items && Array.isArray(cart.items);
            let notEmptyCart = validCart && cart.items.length > 0;
            if (notEmptyCart) {
                let customerData = user && user.customerData ? user.customerData : null;
                let newShopifyCart = await newShopifyCheckout(cart.items, customerData);
                setCheckoutClicked(false);
                if (newShopifyCart) return newShopifyCart;
            } else {
                setTimeout(() => {
                    setCheckoutClicked(false);
                    toast.info(`Please Add Items to Cart`, { duration: shortAnimationTime } as ToastOptions);
                }, maxAnimationTime);
            }
        } catch (error) {
            console.log(`Error Creating New Cart`, error);
        }
    }

    const onCheckout = (e) => {
        setCheckoutClicked(true);
        toast.info(`Checking Out`);
        newShopifyCheckoutFromCart().then((shopifyCart) => {
            if (shopifyCart != undefined && shopifyCart != null) {
                if (shopifyCart.checkout) {
                    shopifyCart = shopifyCart.checkout;
                    dev() && console.log(`New Checkout`, shopifyCart);
                    window.open(shopifyCart.webUrl, `_blank`);
                } else {
                    shopifyCart = shopifyCart.draft_order;
                    dev() && console.log(`New Cart`, shopifyCart);
                    // window.location.href = shopifyCart.invoice_url;
                    window.open(shopifyCart.invoice_url, `_blank`);
                }
            } else {
                toast.error(`Error Checking Out`, { duration: shortAnimationTime } as ToastOptions);
            }
        }).catch(error => {
            console.log(`Error Checking Out`, error);
            return error;
        });
    }

    return (
        <div className={`cart ${cartPage ? `sideCart cartPage` : `sideCart`}`}>
            <div className={`cartTop p10x`}>
                <Products products={cart?.items} isCart={true} extraClasses={cartPage ? `cartPageProducts` : `cartProducts`} />
            </div>
            <div className={`cartBottom center flex justifyContentCenter mb30`}>
                <div className={`cartButtons toggleButtons w85I m0auto`}>
                    {!cartPage && <>
                        <button onClick={(e) => router.push(`/cart`)} className={`cartButton productButton whiteBG blackText hoverWhiteText ${cart && cart?.items && Array.isArray(cart?.items) && cart?.items?.length > 0 ? `` : `w100 center`}`}>
                            <i title={`Cart | Creative Workshop`} className={`addToCartIcon pink fas fa-shopping-cart`}></i>
                            Cart
                        </button>
                    </>}
                    {cart && cart?.items && Array.isArray(cart?.items) && cart?.items?.length > 0 && <>
                        <button onClick={(e) => onCheckout(e)} className={`checkoutButton cartButton productButton whiteBG blackText hoverWhiteText ${cartPage ? `w100 center m75t` : ``}`}>
                            <i title={`Checkout | Creative Workshop`} className={`green fas ${checkoutClicked ? `pink spinThis fa-spinner` : `fa-money-check-alt`}`}></i>
                            {checkoutClicked ? `Checking Out` : `Checkout`}
                        </button>
                    </>}
                </div>
            </div>
        </div>
    )
}