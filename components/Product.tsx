import Image from "./Image";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { StateContext, dev } from "../pages/_app";
import { checkRole, maxAnimationTime } from "../firebase";
import { productPlaceholderImage } from "../pages/api/products";

export default function Product(props) {
    let { product } = props;
    let { user, router, setProductToEdit } = useContext<any>(StateContext);

    let [delClicked, setDelClicked] = useState(false);
    let [prodClicked, setProdClicked] = useState(false);
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
                toast.error(`Error Deleting Product`);
                setTimeout(() => setDelClicked(false), maxAnimationTime);
                return deleteProductResponse;
            } else {
                const responseData = await deleteProductResponse.json();
                toast.success(`Product Successfully Deleted`);
                setProductToEdit(null);
                setTimeout(() => setDelClicked(false), maxAnimationTime);
                return responseData;
            }
        } catch (error) {
            console.log(`Deleting Product Error on Server...`, product);
            setTimeout(() => setDelClicked(false), maxAnimationTime);
        }
    }

    const handleShopifyAction = (e, type?: string) => {
        if (type == `Delete`) {
            setDelClicked(true);
            deleteProduct();
            // setTimeout(() => setDelClicked(false), maxAnimationTime);
        } else if (type == `Product`) {
            setProdClicked(true);
            dev() && console.log(`Navigating to Product ${product.name}`, {e, type, user, router, route: router.route});
            toast.info(`Navigating to Product ${product.name}...`);
            router.push(`/products/${product.id}`);
            setTimeout(() => setProdClicked(false), maxAnimationTime);
        } else {
            setCartClicked(true);
            dev() && console.log(`Add to Cart`, {e, type, user});
            toast.success(`Add to Cart is in Development...`);
            setTimeout(() => setCartClicked(false), maxAnimationTime);
        }
    }

    return (
        <div className={`product`}>
            <div className={`productTitle`}>
                <i className={`topIcon fab fa-shopify`}></i>
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
                {!router.route.includes(`products`) && <button onClick={(e) => handleShopifyAction(e, `Product`)} className={`productButton btn btn-primary`}>
                    <i className={`productIcon fas ${prodClicked ? `spinThis fas fa-spinner` : `fa-tags`}`}></i>
                    <div className={`productButtonText alertActionButton`}>{prodClicked ? `Navigating` : `Details`}</div>
                </button>}
                <button onClick={(e) => handleShopifyAction(e, `Cart`)} className={`productButton btn btn-primary`}>
                    <i className={`productIcon fas ${cartClicked ? `fa-check` : `fa-cart-plus`}`}></i>
                    <div className={`productButtonText alertActionButton`}>{cartClicked ? `Added` : `Cart`}</div>
                </button>
            </div>
        </div>
    )
}