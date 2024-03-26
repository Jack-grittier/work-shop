import Image from "./Image";
import { ButtonGroup } from "@mui/material";
import { useContext, useState } from "react";
// import ShopButton from "./ShopButton/ShopButton";
import { productActions } from "../globals/globals";
import { ToastOptions, toast } from "react-toastify";
import { StateContext, dev, dismissAlert, showAlert } from "../pages/_app";
import { checkRole, liveLink, maxAnimationTime, productPlaceholderImage, shortAnimationTime } from "../firebase";

export default function Product(props) {
    let { product, filteredProducts, inCart } = props;
    let { user, router, products, setProducts, cart, setCart, adminFeatures, setImageURLAdded, productToEdit, setProductToEdit } = useContext<any>(StateContext);

    if (!filteredProducts) filteredProducts = products;

    let [delClicked, setDelClicked] = useState(false);
    let [cartLoaded, setCartLoaded] = useState(false);
    let [prodClicked, setProdClicked] = useState(false);
    let [editClicked, setEditClicked] = useState(false);
    let [cartClicked, setCartClicked] = useState(false);
    let [cancelClicked, setCancelClicked] = useState(false);
    let [backToShopClicked, setBackToShopClicked] = useState(false);

    let [options, setOptions] = useState(product.options.reduce((acc, {name, values}) => Object.assign(acc, {[name]: values[0]}), {
        Quantity: 1,
        Price: product.price,
    }));

    const isCartButtonDisabled = () => {
        return Object.keys(options).length == 0;
    }

    const dismissAlertThenDeleteProduct = () => {
        dismissAlert();
        deleteProduct();
    }

    const clearSearch = () => {
        let searchInput: any = document.querySelector(`#globalSearchInput`);
        if (searchInput && searchInput?.value) {
            searchInput.value = ``;
        }
    }

    const cancelOrFinishEditProduct = () => {
        setProductToEdit(null);
        setImageURLAdded(false);
        let productFormElement: any = document.querySelector(`.productForm`);
        productFormElement.reset();
    }

    const removeProductFromCart = (e) => {
        if (inCart && e) e.stopPropagation();
        setDelClicked(true);
        setCart(prevCart => ({ ...prevCart, items: prevCart?.items?.filter(prod => prod?.cartId != product?.cartId) }));
        toast.success(`Product Successfully ${productActions.Remove.doneLabel}`);
        dev() && console.log(`Product ${product?.title} Successfully ${productActions.Remove.doneLabel} from ${productActions.Cart}`);
        setDelClicked(false);
    }

    const onProductOptionFormSubmit = (e) => {
        e.preventDefault();
        let { submitter } = e?.nativeEvent;
        let { selectColorField } = e.target;

        if (!submitter?.classList?.contains(`addToCartButton`)) {
            dev() && console.log(`onProductOptionFormSubmit`, { e, submitter, selectColorField, val: selectColorField.value });
        }
    }

    const renderSelectIcon = (optName) => {
        let icon = `blue fas fa-ruler-combined`;
        if (optName == `Color`) icon = `blue fas fa-palette`; 
        else if (optName == `Size`) icon = `blue fas fa-signal`; 
        else if (optName == `Quantity`) icon = `blue fas fa-hashtag`;
        else if (optName == `Price`) icon = `green fas fa-dollar-sign`; 

        return icon;
    }

    const backToShop = () => {
        setBackToShopClicked(true);
        let { inProgressLabel } = productActions.Navigate;
        dev() && console.log(`${inProgressLabel} to Shop`);
        toast.info(`${inProgressLabel} to Shop`);
        if (router.route.includes(`/shop`) || router.route.includes(`/products`) && !router.route.includes(`/products/`)) {
            router.push(`/shop`);
        } else {
            clearSearch();
            router.push(`/shop`);
        }
        setTimeout(() => setBackToShopClicked(false), maxAnimationTime);
    }

    const renderProductQuantityField = () => {
        return <>
            <fieldset name={`selectQuantityField`} className={`selectToggle selectQuantityField ${inCart ? `cartQuantityField` : ``}`}>
                <ButtonGroup className={`toggleButtons productButtons`} variant={`outlined`} aria-label={`Product Quantity`}>
                    <h3 className={`selectText textWithIcon`}>
                        <i className={`selectIcon ${renderSelectIcon(`Quantity`)}`}></i> 
                        {inCart ? `Qty` : `Quantity`}
                    </h3>
                    <div className={`productQuantityButtons`}>
                        <button onClick={(e) => updateOptions(`QuantitySub`, options.Quantity, e)} type={`button`} className={`qtyBtn subQty redBg qtyButton ${adminFeatures && adminFeatures?.find(feat => feat.feature == `Quantity Circle Buttons`)?.enabled ? `qtyButtonSlim` : ``} optionButton productButton Quantity-${options.Quantity} firstOption`} value={options.Quantity}>
                            <span className={`optionText textOverflow`}>-</span>
                        </button>
                        <button type={`button`} className={`qtyBtn qtyText ${adminFeatures && adminFeatures?.find(feat => feat.feature == `Quantity Circle Buttons`)?.enabled ? `qtyTextSlim` : ``} optionButton productButton Quantity-${options.Quantity}`} value={options.Quantity} disabled>
                            <span className={`optionText textOverflow`}>{options.Quantity}</span>
                            {/* <input name={`quantity`} type={`number`} value={options.Quantity} /> */}
                        </button>
                        <button onClick={(e) => updateOptions(`QuantityAdd`, options.Quantity, e)} type={`button`} className={`qtyBtn addQty greenBg qtyButton ${adminFeatures && adminFeatures?.find(feat => feat.feature == `Quantity Circle Buttons`)?.enabled ? `qtyButtonSlim` : ``} optionButton productButton Quantity-${options.Quantity}`} value={options.Quantity}>
                            <span className={`optionText textOverflow`}>+</span>
                        </button>
                    </div>
                </ButtonGroup>
            </fieldset>
        </>
    }

    const updateOptions = (optName, opt, e?) => {
        if (inCart && e) e.stopPropagation();
        if (filteredProducts && filteredProducts?.length > 0) {
            setOptions(prevOptions => {
                let Quantity = prevOptions.Quantity;
                let Price: any = parseFloat(product?.price);
                let Size = optName == `Size` ? opt : prevOptions?.Size;
    
                if (Size) {
                    let sizeMultiplier = parseFloat(Size.charAt(0));
                    let sizeMultiplierIsNumber = !isNaN(sizeMultiplier);
                    if (sizeMultiplierIsNumber) {
                        Price = Price + (sizeMultiplier * 1.5);
                    }
                }
    
                if (optName == `QuantitySub`) {
                    Quantity = Quantity <= 1 ? 1 : Quantity - 1;
                } else if (optName == `QuantityAdd`) {
                    Quantity = Quantity + 1;
                }
    
                Price = (Quantity * Price).toFixed(2).toString();
    
                let untrackedOptions = [`QuantitySub`, `QuantityAdd`];
    
                return {
                    ...prevOptions,
                    ...(!untrackedOptions.includes(optName) && {
                        [optName]: opt,
                    }),
                    Quantity,
                    Price,
                }
            })
        }
    }

    const deleteProduct = async () => {
        try {
            setDelClicked(true);

            let archiveProductResponse = await fetch(`${liveLink}/api/products/archive/${product.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // let deleteProductResponse = await fetch(`${liveLink}/api/products/delete/${product.id}`, {
            //     method: 'DELETE',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            // });

            let responseToUse = archiveProductResponse;

            if (!responseToUse.ok) {
                console.log(`${productActions.Delete.inProgressLabel} Product Error...`, product);
                toast.error(`Error ${productActions.Delete.inProgressLabel} Product`);
                setTimeout(() => setDelClicked(false), maxAnimationTime);
                return responseToUse;
            } else {
                const responseData = await responseToUse.json();
                toast.success(`Product Successfully ${productActions.Delete.doneLabel}`);
                setProducts(prevProducts => prevProducts.filter(prevProduct => prevProduct.id != product.id));
                cancelOrFinishEditProduct();
                setDelClicked(false);
                return responseData;
            }
        } catch (error) {
            toast.error(`${productActions.Delete.inProgressLabel} Product Error on Server...`);
            console.log(`${productActions.Delete.inProgressLabel} Product Error on Server...`, product);
            setTimeout(() => setDelClicked(false), maxAnimationTime);
        }
    }

    const handleShopifyProductOption = (e, type?: string) => {
        if (type == productActions.Delete.label) {
            showAlert(<div className={`alertTitleMessage`}>Confirm <span className={`red`}>Delete</span>?</div>, <>
                <div className={`confirmTitle`}>
                    <h3 className={`confirmMessage`}>Are you sure you want to Delete Product {product?.name}?</h3>
                    <div className={`productActions productButtons`}>
                        <button onClick={() => dismissAlertThenDeleteProduct()} className={`productButton buttonFullWidth`} type={`button`}>
                            <i className={`productIcon fas ${delClicked ? `pink spinThis fa-spinner` : `red fa-trash-alt`}`}></i>
                            <div className={`productButtonText alertActionButton`}>
                                {delClicked ? productActions.Delete.inProgressLabel : productActions.Delete.label}
                            </div>
                        </button>
                    </div>
                </div>
            </>, undefined, `400px`);
        } else if (type == productActions.Navigate.label) {
            setProdClicked(true);
            dev() && console.log(`${productActions.Navigate.inProgressLabel} to ${product.name}`, {e, type, user, router, route: router.route});
            toast.info(`${productActions.Navigate.inProgressLabel} to ${product.name}`);
            router.push(`/products/${product.id}`);
            setTimeout(() => setProdClicked(false), maxAnimationTime);
        } else if (type == productActions.Edit.label) {
            setEditClicked(true);
            cancelOrFinishEditProduct();
            setProductToEdit(product);
            dev() && console.log(`${productActions.Edit.inProgressLabel} ${product.name}`, product);
            setEditClicked(false);
            // setTimeout(() => setEditClicked(false), maxAnimationTime);
        } else if (type == productActions.Cancel.label) {
            setCancelClicked(true);
            cancelOrFinishEditProduct();
            dev() && console.log(`${productActions.Cancel.label} ${productActions.Edit.inProgressLabel} ${product.name}`, product);
            setCancelClicked(false);
            // setTimeout(() => setCancelClicked(false), maxAnimationTime);
        } else if (type == productActions.Remove.label) {
            removeProductFromCart(e);
        } else {
            setCartClicked(true);
            toast.info(`${productActions.AddToCart.inProgressLabel}...`, { duration: shortAnimationTime } as ToastOptions);
            setTimeout(() => {
                toast.success(`${productActions.AddToCart.doneLabel}`, { duration: shortAnimationTime } as ToastOptions);
                setCartLoaded(true);
                let cartProduct = { ...product, cartId: `Product-${cart?.items?.length + 1}-${product?.id}-${cart?.id}`, selectedOptions: options };
                setCart(prevCart => ({ ...prevCart, items: [...prevCart?.items, cartProduct] }));
                dev() && console.log(`${productActions.AddToCart.label}`, {e, type, user, cartProduct, cart});
                setTimeout(() => {
                    setCartClicked(false);
                    setCartLoaded(false);
                }, shortAnimationTime);
            }, shortAnimationTime);
        }
    }

    return (
        <div className={`product ${filteredProducts && Array.isArray(filteredProducts) && filteredProducts?.length == 1 ? `featuredProduct` : `multiProduct`}`}>

            <a className={`productTitleLink productTitle`} title={`Product Link - ${product?.title}`} href={!router.route.includes(`products/`) ? `/products/${product.id}` : undefined} onClick={(e) => !router.route.includes(`products/`) ? handleShopifyProductOption(e, productActions.Navigate.label) : e.preventDefault()}>
                {!inCart && <i className={`shopifyIcon green topIcon fab fa-shopify`}></i>}
                <h3 className={`productNameAndPrice productTitleAndPrice cardTitle`}>
                    <span title={product?.title} className={`prodTitle oflow ${product?.title.length > 15 ? `longTitle` : `shortTitle`}`}>
                        {product?.title}
                    </span>
                    <span title={`Product Price - $${options?.Price}`} className={`price cardPrice`}>{ inCart ? `` : ` - `}
                        <span className={`dollar`}>$</span>{options?.Price}
                    </span>
                </h3>
            </a>

            <div className={`productContent ${inCart ? `productContentInCart` : ``}`}>

                <a className={`productImageLinkContainer productImagesContainer`} href={!router.route.includes(`products/`) ? `/products/${product.id}` : undefined} onClick={(e) => !router.route.includes(`products/`) ? handleShopifyProductOption(e, productActions.Navigate.label) : e.preventDefault()}>
                    {product.image ? (
                        <div className={`productImageContainer`}>
                            <Image src={product.image.src} className={`productPic productMainImage customImage ${inCart ? `productPicInCart` : ``}`} alt={`Product Image`} />
                            {product.altImage && <Image src={product.altImage.src} className={`productPic productAltImage customImage`} alt={`Product Alternate Image`} />}
                        </div>
                    ) : (
                        <Image src={productPlaceholderImage} className={`productPic customImage`} alt={`Product Image`} />
                    )}
                </a>

                {!inCart && <>
                    <div className={`productDesc`}>
                        <div className={`productDescField productDescTitle textWithIcon`}>
                            <i className={`blue fas fa-stream`}></i>
                            {filteredProducts && Array.isArray(filteredProducts) && filteredProducts?.length == 1 ? `Description` : `Desc`}
                        </div>
                        {!inCart && <>
                            <div className={`productDescField productDescType productDescCat textWithIcon`}>
                                <i className={`blue fas fa-tags`}></i>
                                Type - {product.type}
                            </div>
                            <div className={`productDescField productDescQty textWithIcon`}>
                                <i className={`blue fas fa-hashtag`}></i>
                                {filteredProducts && Array.isArray(filteredProducts) && filteredProducts?.length == 1 ? <>
                                    {product.quantity} In Stock
                                </> : <>
                                    Qty - {product.quantity}
                                </>}
                            </div>
                        </>}
                    </div>
                </>}
                  
                <div className={`productDescription`}>
                    {product.description != `` ? product.description : product?.title}
                    {inCart && product.options.length >= 2 && <>
                        <div className={`productCartSelectedOptions`} style={{ fontStyle: `italic`, paddingTop: 5, fontSize: 13 }}>
                            {Object.entries(product.selectedOptions).filter(([key, val]) => key != `Quantity` && key != `Price`).map((entry: any, cartProdIndex) => {
                                return (
                                    <div key={cartProdIndex} className={`cartProductOption`}>
                                        {entry[0].charAt(0)} - {entry[1]}
                                    </div>
                                )
                            })}
                        </div>
                    </>}
                </div>

            </div>

            <form onSubmit={(e) => onProductOptionFormSubmit(e)} className={`productOptions productOptionsForm`}>

                <div className={`productOptionFields productFieldRow`}>
                    {filteredProducts && Array.isArray(filteredProducts) && filteredProducts?.length == 1 && !inCart && <>
                        <fieldset name={`selectPriceField`} className={`selectToggle selectPriceField hideOnMobile`}>
                            <ButtonGroup className={`toggleButtons productButtons`} variant={`outlined`} aria-label={`Product Price`}>
                                <h3 className={`selectText textWithIcon`}>
                                    <i className={`selectIcon ${renderSelectIcon(`Price`)}`}></i> 
                                    Price
                                </h3>
                                <button disabled className={`productButton optionButton firstOption`}>
                                    <span className={`price innerPrice`}>
                                        <span className={`dollar`}>$</span>{options?.Price}
                                    </span>
                                </button>
                            </ButtonGroup>
                        </fieldset>
                    </>}

                    {/* {(filteredProducts && Array.isArray(filteredProducts) && filteredProducts?.length == 1 && !inCart) && <>
                        {renderProductQuantityField()}
                    </>} */}
                </div>

                {filteredProducts && Array.isArray(filteredProducts) && filteredProducts?.length == 1 && product.options && Array.isArray(product.options) && product.options.length > 1 && !inCart && product.options.map((optGroup, optGroupIndex) => {
                    return (
                        <fieldset key={optGroupIndex} name={`select${optGroup?.name}Field`} className={`selectToggle select${optGroup?.name}Field`}>
                            <ButtonGroup className={`toggleButtons productButtons`} variant={`outlined`} aria-label={`Product Options`}>
                                <h3 className={`selectText textWithIcon hideOnMobile`}>
                                    <i className={`selectIcon ${renderSelectIcon(optGroup?.name)}`}></i> 
                                    {optGroup?.name}
                                </h3>
                                <div className={`buttons`}>
                                    {optGroup.values && Array.isArray(optGroup.values) && optGroup.values.length > 0 && optGroup.values.map((option, optionIndex) => {
                                        return (
                                            <button onClick={(e) => updateOptions(optGroup?.name, option, e)} key={optionIndex} type={`button`} className={`optionButton productButton ${Object.values(options).includes(option) ? `active` : ``} ${optGroup?.name}-${option} ${optionIndex == 0 ? `firstOption` : ``}`} value={option}>
                                                <span className={`optionText textOverflow`}>{option}</span>
                                            </button>
                                        )
                                    })}
                                </div>
                            </ButtonGroup>
                        </fieldset>
                    )
                })}
                
                <div className={`productActionButtons productFieldRow`}>
                    {!inCart && (
                        <div className={`productActions productButtons`}>
                            {filteredProducts && Array.isArray(filteredProducts) && filteredProducts?.length == 1 && (
                                <button title={`Back to Shop`} onClick={() => backToShop()} className={`productButton backToShopButton`} type={`button`}>
                                    <i className={`productIcon fas ${backToShopClicked ? `pink spinThis fa-spinner` : `pink fa-undo`}`}></i>
                                    <div className={`productButtonText alertActionButton`}>
                                        {backToShopClicked ? productActions.Navigate.inProgressLabel : (
                                            <div className={`backToShop`}>
                                                <span className={`hideOnMobile`}>Back to </span> Shop
                                            </div>
                                        )}
                                    </div>
                                </button>
                            )}
                        </div>
                    )}

                    <div className={`productActions productButtons ${inCart ? `inCartProductActionButtons` : ``}`}>

                        {inCart && <>
                            {renderProductQuantityField()}
                        </>}

                        {/* Delete Product Button // Remove Product Button */}
                        {/* <ShopButton product={product} inCart={inCart} action={productActions.Remove} wide={false} /> */}
                        {((user && checkRole(user.roles, `Admin`)) || inCart) && (
                            <button title={`Delete ${product?.title}`} onClick={(e) => handleShopifyProductOption(e, inCart ? productActions.Remove.label : productActions.Delete.label)} className={`productButton deleteProductButton ${inCart ? `cartRemoveButton cartDeleteButton cartActionButton` : ``}`} type={`button`}>
                                <i className={`productIcon fas ${delClicked ? `pink spinThis fa-spinner` : `red fa-trash-alt`}`}></i>
                                <div className={`productButtonText alertActionButton`}>
                                    {delClicked 
                                    ? (inCart ? productActions.Remove.inProgressLabel : productActions.Delete.inProgressLabel) 
                                    : (inCart ? productActions.Remove.label : productActions.Delete.label)}
                                </div>
                            </button>
                        )}

                        {/* Edit Product Button */}
                        {user && checkRole(user.roles, `Admin`) && !inCart && (
                            <button 
                                type={`button`}
                                className={`productButton editProductButton ${productToEdit != null 
                                    && productToEdit.id == product.id 
                                    ? `cancelProductButton` 
                                    : ``}
                                `}
                                title={`${productToEdit != null 
                                        && productToEdit.id == product.id 
                                        ? productActions.Cancel.label 
                                        : productActions.Edit.label
                                    } ${product?.title}
                                `} 
                                onClick={(e) => handleShopifyProductOption(e, 
                                        productToEdit != null 
                                        && productToEdit.id == product.id 
                                        ? productActions.Cancel.label 
                                        : productActions.Edit.label
                                    )
                                }
                            >
                                <i className={`productIcon fas ${editClicked || cancelClicked 
                                    ? `pink spinThis fa-spinner` 
                                    : productToEdit != null 
                                    && productToEdit.id == product.id 
                                    ? `blue fa-ban` 
                                    : `blue fa-pen`}
                                `}></i>
                                <div className={`productButtonText alertActionButton`}>
                                    {editClicked ? productActions.Edit.inProgressLabel 
                                    : productToEdit != null 
                                    && productToEdit.id == product.id 
                                    ? cancelClicked ? productActions.Cancel.inProgressLabel : productActions.Cancel.label 
                                    : productActions.Edit.label}
                                </div>
                            </button>
                        )}

                        {/* Navigate to Product Detail View Button */}
                        {!router.route.includes(`products/`) && !inCart && (
                            <button title={`${productActions.Details} ${product?.title}`} onClick={(e) => handleShopifyProductOption(e, productActions.Navigate.label)} className={`productButton detailsProductButton`} type={`button`}>
                                <i className={`productIcon fas ${prodClicked ? `pink spinThis fa-spinner` : `green fa-tags`}`}></i>
                                <div className={`productButtonText alertActionButton`}>
                                    {prodClicked ? productActions.Navigate.inProgressLabel : productActions.Details}
                                </div>
                            </button>
                        )}
              
                        {/* Add to Cart Button */}
                        {((router.route.includes(`products/`) || (product.options && product.options.length < 2) || (product.options && product.options.length >= 2 && filteredProducts && filteredProducts?.length == 1)) && !inCart) && (
                            <button title={`Add ${options.Quantity} ${product?.title}'s to Cart`} onClick={(e) => handleShopifyProductOption(e, productActions.Cart)} className={`productButton addToCartButton ${isCartButtonDisabled() ? `disabled` : ``}`} type={`submit`} disabled={isCartButtonDisabled()}>
                                {!cartClicked && <>
                                    <span className={`price innerPrice hideOnMobile`}>
                                        <span className={`dollar`}>$</span>{options?.Price}
                                    </span>
                                </>}
                                <i className={`productIcon green addToCartIcon fas ${cartClicked ? cartLoaded ? `fa-check` : `pink spinThis fa-spinner` : `fa-shopping-cart`}`}></i>
                                <div className={`productButtonText alertActionButton`}>
                                    {cartClicked ? cartLoaded ? productActions.Add.label : productActions.Add.inProgressLabel : (
                                        <div className={`addToCart`}>
                                            <span className={`hideOnMobile ${user && checkRole(user.roles, `Admin`) ? `hideForRole` : ``}`}>Add to </span> Cart
                                        </div>
                                    )}
                                </div>
                            </button>
                        )}

                    </div>
                </div>
            </form>
        </div>
    )
}