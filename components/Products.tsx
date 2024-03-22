import Search from "./Search";
import Product from "./Product";
import ProductForm from "./ProductForm";
import { checkRole } from "../firebase";
import { StateContext } from "../pages/_app";
import LoadingSpinner from "./LoadingSpinner";
import { useContext, useEffect, useState, useRef } from "react";

export default function Products(props) {
    let cardsElementRef = useRef();
    let { products, isCart, extraClasses } = props;
    let { user, cart } = useContext<any>(StateContext);
    if (!products) products = useContext<any>(StateContext)?.products;
    products = products && products.filter(prod => prod.status != `archived`);

    let [productsLoaded, setProductsLoaded] = useState(false);
    let [productsSearchTerm, setProductsSearchTerm] = useState(``);

    const getFilteredProducts = (productsToFilter) => {
        let filteredProducts = productsToFilter.map(prod => ({ ...prod, label: prod.title }));
        if (productsSearchTerm && productsSearchTerm != ``) {
            filteredProducts = productsToFilter.filter(prod => JSON.stringify({ ...prod, label: prod.title }).toLowerCase().includes(productsSearchTerm));
        };
        return filteredProducts;
    }

    const searchProducts = (e, val?) => {
        if (e) {
            if (e?.target) {
                if (!val) val = e?.target?.value;
                if (typeof val == `string`) {
                    setProductsSearchTerm(val?.toLowerCase());
                } else {
                    setProductsSearchTerm(val?.label?.toLowerCase());
                }
            }
        }
    }

    const isElementOverflowingHeight = (element, height = element?.clientHeight) => {
        let overflowingHeight = false;
        if (element != undefined && element != null) {
            let children = Array.from(element.children);
            if (cart?.items?.length > 1) {
                let childHeights = children.map((ch: any) => ch.clientHeight + 35);
                let totalChildHeights = childHeights.reduce((total, currentValue) => total + currentValue, 0);
                
                let { scrollHeight, clientHeight } = element;
                let scrollOverClient = scrollHeight >= clientHeight;
                let childrenOverParent = totalChildHeights >= height;

                // console.log(`Element is Overflowing?`, {
                //     cart,
                //     height,
                //     children,
                //     scrollHeight,
                //     clientHeight,
                //     scrollOverClient,
                //     totalChildHeights,
                //     childrenOverParent,
                //     elementClasses: element?.className,
                // })
                
                overflowingHeight = scrollOverClient || childrenOverParent;
            }
        }

        return overflowingHeight;
    }

    useEffect(() => {
        if (isCart) {
            if (products && Array.isArray(products)) setProductsLoaded(true);
        } else {
            if (products && products?.length > 0) setProductsLoaded(true);
        }
    }, [products])

    return (
        <div className={`productsComponent productsContainer flex flexColumns gap15 ${extraClasses && extraClasses != `` ? extraClasses : ``} ${isCart ? `isCart pl3` : ``}`}>
        
            {getFilteredProducts(products) && getFilteredProducts(products)?.length > 0 && (getFilteredProducts(products)?.length != 1 || isCart) && (
                <h2 className={`shopSubtitle ${isCart ? `cartSubtitle` : ``}`}>
                    {getFilteredProducts(products)?.length} Product(s){isCart ? ` In Cart` : ``}
                </h2>
            )}

            {products && products?.length > 0 && products?.length != 1 && !isCart && (
                <div className={`searchContainer productSearchContainer sectionContent mb15I mt-4I`}>
                    <div className={`fieldBG`}>
                        <Search onInput={searchProducts} className={`productSearch`} />
                        <kbd className={`fieldBGKBD nx-absolute nx-my-1.5 nx-select-none ltr:nx-right-1.5 rtl:nx-left-1.5 nx-h-5 nx-rounded nx-bg-white nx-px-1.5 nx-font-mono nx-text-[10px] nx-font-medium nx-text-gray-500 nx-border dark:nx-border-gray-100/20 dark:nx-bg-dark/50 contrast-more:nx-border-current contrast-more:nx-text-current contrast-more:dark:nx-border-current nx-items-center nx-gap-1 nx-pointer-events-none nx-hidden sm:nx-flex nx-opacity-100`}>
                            Products
                        </kbd>
                    </div>
                </div>
            )}

            {user && checkRole(user.roles, `Admin`) && products && products?.length > 0 && products?.length != 1 && !isCart && (
                <ProductForm />
            )}

            {getFilteredProducts(products) && (

                <ul id={`productCards`} ref={cardsElementRef} className={`cards ${getFilteredProducts(products)?.length > 0 ? `hasProducts ${getFilteredProducts(products)?.length > 1 ? `multiProducts` : `oneProduct`}` : `noProducts`} hasButtons ${isCart ? `cartCards 
                ${cardsElementRef?.current && isElementOverflowingHeight(cardsElementRef?.current) == true ? `cardsOverflowingY` : ``}` : ``}`}>

                    {getFilteredProducts(products)?.length > 0 ? getFilteredProducts(products).map((product, productIndex) => {
                        return (
                            <li className={`card productCard`} key={productIndex}>
                                <div className={`productDetails flex gap15`}>
                                    <Product product={product} filteredProducts={getFilteredProducts(products)} inCart={isCart} />
                                </div>
                            </li>
                        )
                    }) : (
                        <h2 className={`shopSubtitle ${isCart ? `cartSubtitle` : ``}`}>
                            {productsSearchTerm && productsSearchTerm != `` ? `No Products for Search` : productsLoaded ? isCart ? `No Items in Cart Yet` : `No Products Yet` : (
                                <LoadingSpinner circleNotch loadingLabel={`Products`} />
                            )}
                        </h2>
                    )}

                </ul>

            )}

        </div>
    )
}