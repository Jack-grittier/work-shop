import Image from "./Image";
import { toast } from "react-toastify";
import { ButtonGroup } from "@mui/material";
import { useContext, useState } from "react";
import { StateContext, dev, dismissAlert, showAlert } from "../pages/_app";
import { checkRole, liveLink, maxAnimationTime, productPlaceholderImage } from "../firebase";

export default function Product(props) {
    let { product, filteredProducts } = props;
    let { user, router, products, setProducts, setProductToEdit } = useContext<any>(StateContext);

    if (!filteredProducts) filteredProducts = products;

    let [delClicked, setDelClicked] = useState(false);
    let [cartLoaded, setCartLoaded] = useState(false);
    let [prodClicked, setProdClicked] = useState(false);
    let [cartClicked, setCartClicked] = useState(false);
    let [backToShopClicked, setBackToShopClicked] = useState(false);
    let [optionGroups, setOptionGroups] = useState(product.options);
    let [options, setOptions] = useState(product.options.reduce((acc, {name, values}) => Object.assign(acc, {[name]: values[0]}), {}));
    let [featuredProduct, setFeaturedProduct] = useState(filteredProducts && Array.isArray(filteredProducts) && filteredProducts?.length == 1);

    console.log(`Product`, {product, options, optionGroups});

    const isCartButtonDisabled = () => {
        return Object.keys(options).length == 0;
    }

    const dismissAlertThenDeleteProduct = () => {
        dismissAlert();
        deleteProduct();
    }

    const onProductOptionFormSubmit = (e) => {
        e.preventDefault();
        let { selectColorField } = e.target;
        console.log(`onProductOptionFormSubmit`, { e, selectColorField, val: selectColorField.value });
    }

    const renderSelectIcon = (optName) => {
        let icon = `blue fas fa-ruler-combined`;
        if (optName == `Color`) icon = `blue fas fa-palette`; 
        else if (optName == `Size`) icon = `blue fas fa-signal`; 

        return icon;
    }

    const updateOptions = (optName, opt) => {
        setOptions(prevOptions => {
            return {
                ...prevOptions,
                [optName]: opt
            }
        })
    }

    const backToShop = () => {
        setBackToShopClicked(true);
        dev() && console.log(`Navigating to Shop`);
        toast.info(`Navigating to Shop`);
        router.push(`/shop`);
        setTimeout(() => setBackToShopClicked(false), maxAnimationTime);
    }

    const deleteProduct = async () => {
        try {
            setDelClicked(true);
            // setTimeout(() => setDelClicked(false), maxAnimationTime);
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
                return responseData;
            }
        } catch (error) {
            console.log(`Deleting Product Error on Server...`, product);
            setTimeout(() => setDelClicked(false), maxAnimationTime);
        }
    }

    const handleShopifyAction = (e, type?: string) => {
        if (type == `Delete`) {
            showAlert(`Confirm Delete?`, <>
                <div className={`confirmTitle`}>
                    <h3 className={`confirmMessage`}>Are you sure you want to Delete Product {product?.name}?</h3>
                    <div className={`productActions productButtons`}>
                        <button onClick={() => dismissAlertThenDeleteProduct()} className={`productButton`} type={`button`}>
                            <i className={`productIcon fas ${delClicked ? `pink spinThis fas fa-spinner` : `red fa-trash-alt`}`}></i>
                            <div className={`productButtonText alertActionButton`}>{delClicked ? `Deleting` : `Delete`}</div>
                        </button>
                    </div>
                </div>
            </>, undefined, `300px`);
        } else if (type == `Product`) {
            setProdClicked(true);
            dev() && console.log(`Navigating to ${product.name}`, {e, type, user, router, route: router.route});
            toast.info(`Navigating to ${product.name}`);
            router.push(`/products/${product.id}`);
            setTimeout(() => setProdClicked(false), maxAnimationTime);
        } else {
            setCartClicked(true);
            dev() && console.log(`Add to Cart`, {e, type, user});
            toast.info(`Adding to Cart...`);
            setTimeout(() => {
                toast.error(`Add to Cart is in Development`);
                setCartLoaded(true);
                setTimeout(() => {
                    setCartClicked(false);
                    setCartLoaded(false);
                }, maxAnimationTime);
            }, maxAnimationTime);
        }
    }

    return (
        <div className={`product ${featuredProduct ? `featuredProduct` : `multiProduct`}`}>
            <div className={`productTitle`}>
                <i className={`topIcon fab fa-shopify`}></i>
                <div className={`desc productTitleAndPrice`}>
                    <span className={`prodTitle oflow ${product?.title.length > 15 ? `longTitle` : `shortTitle`}`}>{product?.title}</span>
                    <span className={`price cardPrice`}> - 
                        <span className={`dollar`}>$</span>{product?.variants[0]?.price}
                    </span>
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
                    <div className={`productDescField productDescTitle textWithIcon`}>
                        <i className={`blue fas fa-stream`}></i>
                        {featuredProduct ? `Description` : `Desc`}
                    </div>
                    <div className={`productDescField productDescType productDescCat textWithIcon`}>
                        <i className={`blue fas fa-tags`}></i>
                        Type - {product.type}
                    </div>
                    <div className={`productDescField productDescQty textWithIcon`}>
                        <i className={`blue fas fa-hashtag`}></i>
                        {featuredProduct ? `Quantity` : `Qty`} - {product.quantity}
                    </div>
                </div>
                {product.description != `` ? product.description : product?.title}
            </div>
            <form onSubmit={(e) => onProductOptionFormSubmit(e)} className={`productOptions productOptionsForm`}>
                {featuredProduct && optionGroups && Array.isArray(optionGroups) && optionGroups.length > 1 && optionGroups.map((optGroup, optGroupIndex) => {
                    return (
                        <fieldset key={optGroupIndex} name={`select${optGroup?.name}Field`} className={`selectToggle select${optGroup?.name}Field`}>
                            <ButtonGroup className={`toggleButtons productButtons`} variant={`outlined`} aria-label={`Product Options`}>
                                <h3 className={`selectText textWithIcon`}>
                                    <i className={`selectIcon ${renderSelectIcon(optGroup?.name)}`}></i> 
                                    {optGroup?.name}
                                </h3>
                                {optGroup.values && Array.isArray(optGroup.values) && optGroup.values.length > 0 && optGroup.values.map((option, optionIndex) => {
                                    return (
                                        <button onClick={(e) => updateOptions(optGroup?.name, option)} key={optionIndex} type={`button`} className={`optionButton productButton ${Object.values(options).includes(option) ? `active` : ``} ${optGroup?.name}-${option} ${optionIndex == 0 ? `firstOption` : ``}`} value={option}>
                                            <span className={`optionText textOverflow`}>{option}</span>
                                        </button>
                                    )
                                })}
                            </ButtonGroup>
                        </fieldset>
                    )
                })}
                <div className={`productCardFooter`}>
                    <div className={`productActions productButtons`}>
                        {featuredProduct && <button onClick={() => backToShop()} className={`productButton`} type={`button`}>
                            <i className={`productIcon fas ${backToShopClicked ? `pink spinThis fas fa-spinner` : `pink fa-undo`}`}></i>
                            <div className={`productButtonText alertActionButton`}>{backToShopClicked ? `Navigating` : `Back to Shop`}</div>
                        </button>}
                    </div>
                    <div className={`productActions productButtons`}>
                        {user && checkRole(user.roles, `Admin`) && <button onClick={(e) => handleShopifyAction(e, `Delete`)} className={`productButton`} type={`button`}>
                            <i className={`productIcon fas ${delClicked ? `pink spinThis fas fa-spinner` : `red fa-trash-alt`}`}></i>
                            <div className={`productButtonText alertActionButton`}>{delClicked ? `Deleting` : `Delete`}</div>
                        </button>}
                        {!router.route.includes(`products/`) && <button onClick={(e) => handleShopifyAction(e, `Product`)} className={`productButton`} type={`button`}>
                            <i className={`productIcon fas ${prodClicked ? `pink spinThis fas fa-spinner` : `green fa-tags`}`}></i>
                            <div className={`productButtonText alertActionButton`}>{prodClicked ? `Navigating` : `Details`}</div>
                        </button>}
                        {router.route.includes(`products`) && <button onClick={(e) => handleShopifyAction(e, `Cart`)} className={`productButton addToCartButton ${isCartButtonDisabled() ? `disabled` : ``}`} type={`submit`} disabled={isCartButtonDisabled()}>
                            {!cartClicked && <>
                                <span className={`price innerPrice`}>
                                    <span className={`dollar`}>$</span>{product?.variants[0]?.price}
                                </span>
                            </>}
                            <i className={`productIcon green addToCartIcon fas ${cartClicked ? cartLoaded ? `fa-check` : `pink spinThis fas fa-spinner` : `fa-shopping-cart`}`}></i>
                            <div className={`productButtonText alertActionButton`}>{cartClicked ? cartLoaded ? `Added` : `Adding` : `Add to Cart`}</div>
                        </button>}
                    </div>
                </div>
            </form>
        </div>
    )
}