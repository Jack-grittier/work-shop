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

    const searchProducts = (e) => {
        setProductsSearchTerm(e.target.value.toLowerCase());
    }

    const getFilteredProducts = (productsToFilter) => {
        let filteredProducts = productsToFilter;
        if (productsSearchTerm && productsSearchTerm != ``) filteredProducts = productsToFilter.filter(prod => JSON.stringify(prod).toLowerCase().includes(productsSearchTerm));
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
                    <Search onInput={(e) => searchProducts(e)} className={`productSearch`} />
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