
// import Image from "./Image";
import { useContext } from "react";
// import CodeBlock from "./CodeBlock";
import { StateContext } from "../pages/_app";
// import { productPlaceholderImage } from "../pages/api/products";
import ProductCodeBlock from "./ProductCodeBlock";
import Product from "./Product";

export default function Products(props) {
    let { products } = props;

    if (!products) products = useContext<any>(StateContext)?.products;

    return (
        <>
            {products && products?.length > 0 && <h2 className={`shopSubtitle`}>{products?.length} Product(s)</h2>}
            {products && (
                <ul id={`productsCodeBlocks`} className={`productBlocks commandsList commandToCopy ${products?.length > 0 ? `hasProducts` : `noProducts`}`}>  
                    {products?.length > 0 ? products.map((product, productIndex) => {
                        return (
                            <li className={`productCode listedCommand`} key={productIndex} title={product?.title}>
                                <div className={`productDetails commandDetails flex gap15`}>
                                    <Product product={product} />
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