import Image from "./Image";
import CodeBlock from "./CodeBlock";
import { productPlaceholderImage } from "../pages/api/products";

export default function ProductCodeBlock(props) {
    let { product } = props;
    return (
        <CodeBlock product={product} commandToCopy={true} custombutton={true} border={`solid 2px white`} id={`commandToRender-${product.id}`} language={`json`} codeTitle={(
            <>
                <i className="fab fa-shopify"></i>
                <div className={`desc productTitleAndPrice`}>
                    <span className={`oflow`}>{product?.title}</span>
                    <span className={`price`}> - <span className={`dollar`}>$</span>{product?.variants[0]?.price}</span>
                </div>
            </>
        )}>
            <>
                {product.image ? <div className={`productImageContainer`}>
                    <Image src={product.image.src} className={`productPic productMainImage customImage`} alt={`Product Image`} />
                    {product.altImage && <Image src={product.altImage.src} className={`productPic productAltImage customImage`} alt={`Product Alternate Image`} />}
                </div> : (
                    <Image src={productPlaceholderImage} className={`productPic customImage`} alt={`Product Image`} />
                )}
                <h1 className={`productDesc`}>Description</h1>
                {product.description != `` ? product.description : product?.title}
            </>
        </CodeBlock>
    )
}