import Products from "./Products";
import { useContext, useState } from "react";
import { StateContext, dev } from "../pages/_app";
import { ToastOptions, toast } from "react-toastify";
import { maxAnimationTime, shortAnimationTime } from "../firebase";

export default function Cart(props) {
    let { cartPage } = props;
    // let [cartOpen, setCartOpen] = useState(false);
    let { cart, router } = useContext<any>(StateContext);
    if (!cartPage) cartPage = false;
    let [checkoutClicked, setCheckoutClicked] = useState(false);

    const onCheckout = (e) => {
        dev() && console.log(`onCheckout`, e);
        setCheckoutClicked(true);
        toast.info(`Checking Out`);
        setTimeout(() => {
            toast.info(`Checkout is In Development`, { duration: shortAnimationTime } as ToastOptions);
            setCheckoutClicked(false);
        }, maxAnimationTime);
    }

    return (
        <div className={`cart ${cartPage ? `sideCart cartPage` : `sideCart`}`}>
            <div className={`cartTop`}>
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