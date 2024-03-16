import Products from "./Products";
import { useContext } from "react";
import { StateContext } from "../pages/_app";

export default function Cart(props) {
    let { cart, router } = useContext<any>(StateContext);
    // let [cartOpen, setCartOpen] = useState(false);
    return (
        <div className={`cart sideCart`}>
            <div className={`cartTop`}>
                <Products products={cart?.items} isCart={true} />
            </div>
            <div className={`cartBottom center flex justifyContentCenter`}>
                <div className={`cartButtons toggleButtons w85I m0auto`}>
                    <button onClick={(e) => router.push(`/cart`)} className={`cartButton productButton whiteBG blackText`}>
                        <i title={`Cart | Creative Workshop`} className={`addToCartIcon pink fas fa-shopping-cart`}></i>
                        Cart
                    </button>
                    <button className={`cartButton productButton whiteBG blackText`}>Checkout</button>
                </div>
            </div>
        </div>
    )
}