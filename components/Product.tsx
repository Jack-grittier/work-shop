import Image from "./Image";
import { useContext, useState } from "react";
import { StateContext, dev } from "../pages/_app";
import { toast } from "react-toastify";
import { checkRole } from "../firebase";
import { productPlaceholderImage } from "../pages/api/products";

export default function Product(props) {
    let { product } = props;
    let { user, setProductToEdit } = useContext<any>(StateContext);

    let [delClicked, setDelClicked] = useState(false);
    let [cartClicked, setCartClicked] = useState(false);

    const deleteProduct = async () => {
        try {
            let serverPort = 3000;
            let liveLink = dev() ? `http://localhost:${serverPort}` : window.location.origin;

            let deleteProductResponse = await fetch(`${liveLink}/api/products/delete/${product.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!deleteProductResponse.ok) {
                console.log(`Deleting Product Error...`, product);
                setTimeout(() => setDelClicked(false), 2500);
                return deleteProductResponse;
            } else {
                const responseData = await deleteProductResponse.json();
                setProductToEdit(null);
                setTimeout(() => setDelClicked(false), 2500);
                return responseData;
            }
        } catch (error) {
            console.log(`Deleting Product Error on Server...`, product);
            setTimeout(() => setDelClicked(false), 2500);
        }
    }

    const handleShopifyAction = (e, type?: string) => {
        if (type == `Delete`) {
            setDelClicked(true);
            deleteProduct();
            // setTimeout(() => setDelClicked(false), 2500);
        } else {
            setCartClicked(true);
            dev() && console.log(`Add to Cart`, {e, type, user});
            toast.success(`Add to Cart is in Development...`);
            setTimeout(() => setCartClicked(false), 2500);
        }
    }

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
                {user && checkRole(user.roles, `Admin`) && <button onClick={(e) => handleShopifyAction(e, `Delete`)} className={`productButton btn btn-secondary`}>
                    <i className={`productIcon fas ${delClicked ? `spinThis fas fa-spinner` : `fa-trash-alt`}`}></i>
                    <div className={`productButtonText alertActionButton`}>{delClicked ? `Deleting` : `Delete`}</div>
                </button>}
                <button onClick={(e) => handleShopifyAction(e, `Cart`)} className={`productButton btn btn-primary`}>
                    <i className={`productIcon fas ${cartClicked ? `fa-check` : `fa-cart-plus`}`}></i>
                    <div className={`productButtonText alertActionButton`}>{cartClicked ? `Added` : `Cart`}</div>
                </button>
            </div>
        </div>
    )
}