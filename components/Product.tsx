import Image from "./Image";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { StateContext, dev } from "../pages/_app";
import { checkRole, liveLink, maxAnimationTime, productPlaceholderImage } from "../firebase";
import { ButtonGroup } from "@mui/material";

export default function Product(props) {
    let { product, filteredProducts } = props;
    let { user, router, products, setProducts, setProductToEdit } = useContext<any>(StateContext);

    if (!filteredProducts) filteredProducts = products;

    let [delClicked, setDelClicked] = useState(false);
    let [prodClicked, setProdClicked] = useState(false);
    let [cartClicked, setCartClicked] = useState(false);
    let [featuredProduct, setFeaturedProduct] = useState(filteredProducts && Array.isArray(filteredProducts) && filteredProducts?.length == 1);

    let [optionGroups, setOptionGroups] = useState(product.options);
    let [options, setOptions] = useState(product.options.reduce((acc, {name, values}) => Object.assign(acc, {[name.toLowerCase()]: values[0]}), {}));

    console.log(`Product`, {product, options, optionGroups});

    const deleteProduct = async () => {
        try {
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
                setProducts(prevProducts => prevProducts.filter(prevProduct => prevProduct.id != product.id));
                setProductToEdit(null);
                setDelClicked(false);
                // setTimeout(() => setDelClicked(false), maxAnimationTime);
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
            dev() && console.log(`Navigating to ${product.name}`, {e, type, user, router, route: router.route});
            toast.info(`Navigating to ${product.name}`);
            router.push(`/products/${product.id}`);
            setTimeout(() => setProdClicked(false), maxAnimationTime);
        } else {
            setCartClicked(true);
            dev() && console.log(`Add to Cart`, {e, type, user});
            toast.info(`Add to Cart is in Development`);
            setTimeout(() => setCartClicked(false), maxAnimationTime);
        }
    }

    const onProductOptionFormSubmit = (e) => {
        e.preventDefault();
        let { selectColorField } = e.target;
        console.log(`onProductOptionFormSubmit`, { e, selectColorField, val: selectColorField.value });
    }

    const isCartButtonDisabled = () => {
        return Object.keys(options).length == 0;
    }

    const updateOptions = (optName, opt) => {
        setOptions(prevOptions => {
            return {
                ...prevOptions,
                [optName.toLowerCase()]: opt
            }
        })
    }

    return (
        <div className={`product ${featuredProduct ? `featuredProduct` : `multiProduct`}`}>
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
            <form onSubmit={(e) => onProductOptionFormSubmit(e)} className={`productOptions`}>
                {featuredProduct && optionGroups && Array.isArray(optionGroups) && optionGroups.length > 1 && optionGroups.map((optGroup, optGroupIndex) => {
                    return (
                        <fieldset key={optGroupIndex} name={`select${optGroup?.name}Field`} className={`selectToggle select${optGroup?.name}Field`}>
                            <h3 className={`selectText`}>Select {optGroup?.name}</h3>
                            <ButtonGroup className={`toggleButtons productButtons`} variant={`outlined`} aria-label={`Product Options`}>
                            {optGroup.values && Array.isArray(optGroup.values) && optGroup.values.length > 0 && optGroup.values.map((option, optionIndex) => {
                                return (
                                    <button onClick={(e) => updateOptions(optGroup?.name, option)} key={optionIndex} type={`button`} className={`productButton ${Object.values(options).includes(option) ? `active` : ``} ${optGroup?.name}-${option}`} value={option}>{option}</button>
                                )
                            })}
                            </ButtonGroup>
                        </fieldset>
                    )
                })}
                <div className={`productActions productButtons`}>
                    {user && checkRole(user.roles, `Admin`) && <button onClick={(e) => handleShopifyAction(e, `Delete`)} className={`productButton btn btn-secondary`} type={`button`}>
                        <i className={`productIcon fas ${delClicked ? `spinThis fas fa-spinner` : `fa-trash-alt`}`}></i>
                        <div className={`productButtonText alertActionButton`}>{delClicked ? `Deleting` : `Delete`}</div>
                    </button>}
                    {!router.route.includes(`products`) && <button onClick={(e) => handleShopifyAction(e, `Product`)} className={`productButton`} type={`button`}>
                        <i className={`productIcon fas ${prodClicked ? `spinThis fas fa-spinner` : `fa-tags`}`}></i>
                        <div className={`productButtonText alertActionButton`}>{prodClicked ? `Navigating` : `Details`}</div>
                    </button>}
                    {router.route.includes(`products`) && <button onClick={(e) => handleShopifyAction(e, `Cart`)} className={`productButton ${isCartButtonDisabled() ? `disabled` : ``}`} type={`submit`} disabled={isCartButtonDisabled()}>
                        <i className={`productIcon fas ${cartClicked ? `fa-check` : `fa-cart-plus`}`}></i>
                        <div className={`productButtonText alertActionButton`}>{cartClicked ? `Added` : `Cart`}</div>
                    </button>}
                </div>
            </form>
        </div>
    )
}