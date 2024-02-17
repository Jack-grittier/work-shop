import Search from "./Search";
import Product from "./Product";
import ProductForm from "./ProductForm";
import { checkRole } from "../firebase";
import { StateContext } from "../pages/_app";
import LoadingSpinner from "./LoadingSpinner";
import { useContext, useEffect, useState } from "react";

export default function Products(props) {
    let { products } = props;
    let { user } = useContext<any>(StateContext);
    if (!products) products = useContext<any>(StateContext)?.products;
    products = products && products.filter(prod => prod.status != `archived`);

    let [productsLoaded, setProductsLoaded] = useState(false);
    let [productsSearchTerm, setProductsSearchTerm] = useState(``);

    useEffect(() => {
        if (products && products?.length > 0) {
            setProductsLoaded(true);
        }
    }, [products])

    const searchProducts = (e, val?) => {
        if (!val) val = e.target.value;
        if (typeof val == `string`) {
            setProductsSearchTerm(val?.toLowerCase());
        } else {
            setProductsSearchTerm(val?.label?.toLowerCase());
        }
    }

    const getFilteredProducts = (productsToFilter) => {
        let filteredProducts = productsToFilter.map(prod => ({ ...prod, label: prod.title }));
        if (productsSearchTerm && productsSearchTerm != ``) {
            filteredProducts = productsToFilter.filter(prod => JSON.stringify({ ...prod, label: prod.title }).toLowerCase().includes(productsSearchTerm));
        };
        return filteredProducts;
    }

    return (
        <div className={`productsComponent productsContainer flex columns gap15`}>
        
            {getFilteredProducts(products) && getFilteredProducts(products)?.length > 0 && getFilteredProducts(products)?.length != 1 && (
                <h2 className={`shopSubtitle`}>{getFilteredProducts(products)?.length} Product(s)</h2>
            )}

            {user && checkRole(user.roles, `Admin`) && products && products?.length > 0 && products?.length != 1 && (
                <ProductForm />
            )}

            <div className={`sectionContent mt-4`}>
                <div className={`fieldBG`}>
                    <Search onInput={searchProducts} className={`productSearch`} />
                    <kbd className={`fieldBGKBD nx-absolute nx-my-1.5 nx-select-none ltr:nx-right-1.5 rtl:nx-left-1.5 nx-h-5 nx-rounded nx-bg-white nx-px-1.5 nx-font-mono nx-text-[10px] nx-font-medium nx-text-gray-500 nx-border dark:nx-border-gray-100/20 dark:nx-bg-dark/50 contrast-more:nx-border-current contrast-more:nx-text-current contrast-more:dark:nx-border-current nx-items-center nx-gap-1 nx-pointer-events-none nx-hidden sm:nx-flex nx-opacity-100`}>
                        Products
                    </kbd>
                </div>
            </div>

            {getFilteredProducts(products) && (

                <ul id={`productCards`} className={`cards ${getFilteredProducts(products)?.length > 0 ? `hasProducts ${getFilteredProducts(products)?.length > 1 ? `multiProducts` : `oneProduct`}` : `noProducts`} hasButtons`}>

                    {getFilteredProducts(products)?.length > 0 ? getFilteredProducts(products).map((product, productIndex) => {
                        return (
                            <li className={`card productCard`} key={productIndex}>
                                <div className={`productDetails flex gap15`}>
                                    <Product product={product} filteredProducts={getFilteredProducts(products)} />
                                </div>
                            </li>
                        )
                    }) : (
                        <h2 className={`shopSubtitle`}>
                            {productsSearchTerm && productsSearchTerm != `` ? `No Products for Search` : productsLoaded ? `No Products Yet` : (
                                <LoadingSpinner circleNotch loadingLabel={`Products`} />
                            )}
                        </h2>
                    )}

                </ul>

            )}

        </div>
    )
}