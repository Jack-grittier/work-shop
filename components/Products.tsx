import Product from "./Product";
import { useContext } from "react";
import ProductForm from "./ProductForm";
import { checkRole } from "../firebase";
import { StateContext } from "../pages/_app";

export default function Products(props) {
    let { products } = props;
    let { user } = useContext<any>(StateContext);
    if (!products) products = useContext<any>(StateContext)?.products;
    products = products.filter(prod => prod.status != `archived`);

    return (
        <>
            {products && products?.length > 0 && products?.length != 1 && <h2 className={`shopSubtitle`}>{products?.length} Product(s)</h2>}
            {user && checkRole(user.roles, `Admin`) && products && products?.length > 0 && products?.length != 1 && <ProductForm />}
            {products && (
                <ul id={`productsCodeBlocks`} className={`productBlocks commandsList commandToCopy ${products?.length > 0 ? `hasProducts ${products?.length > 1 ? `multiProducts` : `oneProduct`}` : `noProducts`}`}>  
                    {products?.length > 0 ? products.map((product, productIndex) => {
                        return (
                            <li className={`productContainer productCode listedCommand`} key={productIndex}>
                                <div className={`productDetails commandDetails flex gap15`}>
                                    <Product product={product} filteredProducts={products} />
                                </div>
                            </li>
                        )
                    }) : (
                        <h2 className={`shopSubtitle`}>No Products Yet</h2>
                    )}
                </ul>
            )}
        </>
    )
}