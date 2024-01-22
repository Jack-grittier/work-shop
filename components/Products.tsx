import Image from "./Image";
import { useContext } from "react";
import CodeBlock from "./CodeBlock";
import { StateContext } from "../pages/_app";

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
                            <div className="commandDetails flex gap15">
                                <CodeBlock key={productIndex} commandToCopy={true} custombutton={true} border={`solid 2px white`} id={`commandToRender-${product.id}`} language={`json`} codeTitle={(
                                <>
                                    <i className="fab fa-shopify"></i>
                                    <div className={`desc`}>
                                        <span className={`oflow`}>{product?.title}</span> - 
                                        <span className={`price`}><span className={`dollar`}>$</span>{product?.variants[0]?.price}</span>
                                    </div>
                                </>
                                )}>
                                <>
                                    {product.image ? (
                                        <Image src={product.image.src} className={`productPic`} alt={`Product Image`} />
                                    ) : (
                                        <Image src={`/assets/images/CatTripleWhiteBG.svg`} className={`productPic`} alt={`Product Image`} />
                                    )}
                                    <h1 className={`productDesc`}>Description</h1>
                                    {product.description != `` ? product.description : product?.title}
                                </>
                                </CodeBlock>
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