import Image from "./Image";
import { productPlaceholderImage } from "../pages/api/products";

export default function Product(props) {
    let { product } = props;
    return (
        <div className={`product`}>
            <div className={`productTitle`}>
                <i className={`fab fa-shopify`}></i>
                <div className={`desc productTitleAndPrice`}>
                    <span className={`prodTitle oflow ${product?.title.length > 15 ? `longTitle` : `shortTitle`}`}>{product?.title}</span>
                    <span className={`price`}> - <span className={`dollar`}>$</span>{product?.variants[0]?.price}</span>
                </div>
            </div>
            <div className={`productContent`}>
                {product.image ? <div className={`productImageContainer`}>
                    <Image src={product.image.src} className={`productPic productMainImage customImage`} alt={`Product Image`} />
                    {product.altImage && <Image src={product.altImage.src} className={`productPic productAltImage customImage`} alt={`Product Alternate Image`} />}
                </div> : (
                    <Image src={productPlaceholderImage} className={`productPic customImage`} alt={`Product Image`} />
                )}
                <div className={`productDesc`}>
                    <div className={`productDescTitle`}>Description</div>
                    <div className={`productDescCat`}>Type: {product.type}</div>
                    <div className={`productDescQty`}>Qty: {product.quantity}</div>
                </div>
                {product.description != `` ? product.description : product?.title}
            </div>
            <div className={`productOptions productButtons`}>
                <button className={`productButton btn btn-secondary`}>
                    <i className={`productIcon fas fa-trash-alt`}></i>
                    <div className={`productButtonText alertActionButton`}>Delete</div>
                </button>
                <button className={`productButton btn btn-primary`}>
                    <i className={`productIcon fas fa-cart-plus`}></i>
                    <div className={`productButtonText alertActionButton`}>Cart</div>
                </button>
            </div>
        </div>
    )
}