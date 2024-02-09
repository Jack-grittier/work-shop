import Image from "./Image";
import { toast } from "react-toastify";
import { ButtonGroup } from "@mui/material";
import { useContext, useState } from "react";
import { StateContext, dev, dismissAlert, showAlert } from "../pages/_app";
import { checkRole, liveLink, maxAnimationTime, productPlaceholderImage } from "../firebase";

export default function Product(props) {
    let { product, filteredProducts } = props;
    let { user, router, products, setProducts, adminFeatures, setImageURLAdded, productToEdit, setProductToEdit } = useContext<any>(StateContext);

    if (!filteredProducts) filteredProducts = products;

    let [delClicked, setDelClicked] = useState(false);
    let [cartLoaded, setCartLoaded] = useState(false);
    let [prodClicked, setProdClicked] = useState(false);
    let [editClicked, setEditClicked] = useState(false);
    let [cartClicked, setCartClicked] = useState(false);
    let [cancelClicked, setCancelClicked] = useState(false);
    let [backToShopClicked, setBackToShopClicked] = useState(false);
    let [optionGroups, setOptionGroups] = useState(product.options);
    let [featuredProduct, setFeaturedProduct] = useState(filteredProducts && Array.isArray(filteredProducts) && filteredProducts?.length == 1);
    let [options, setOptions] = useState(product.options.reduce((acc, {name, values}) => Object.assign(acc, {[name]: values[0]}), {
        Quantity: 1,
        Price: product.price,
    }));

    // console.log(`Product`, {product, options, optionGroups});

    const isCartButtonDisabled = () => {
        return Object.keys(options).length == 0;
    }

    const dismissAlertThenDeleteProduct = () => {
        dismissAlert();
        deleteProduct();
    }

    const cancelOrFinishEditProduct = () => {
        setProductToEdit(null);
        setImageURLAdded(false);
        let productFormElement: any = document.querySelector(`.productForm`);
        productFormElement.reset();
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
        else if (optName == `Quantity`) icon = `blue fas fa-hashtag`;
        else if (optName == `Price`) icon = `green fas fa-dollar-sign`; 

        return icon;
    }

    const backToShop = () => {
        setBackToShopClicked(true);
        dev() && console.log(`Navigating to Shop`);
        toast.info(`Navigating to Shop`);
        router.push(`/shop`);
        setTimeout(() => setBackToShopClicked(false), maxAnimationTime);
    }

    const updateOptions = (optName, opt) => {
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
                console.log(`Deleting Product Error...`, product);
                toast.error(`Error Deleting Product`);
                setTimeout(() => setDelClicked(false), maxAnimationTime);
                return responseToUse;
            } else {
                const responseData = await responseToUse.json();
                toast.success(`Product Successfully Deleted`);
                setProducts(prevProducts => prevProducts.filter(prevProduct => prevProduct.id != product.id));
                cancelOrFinishEditProduct();
                setDelClicked(false);
                return responseData;
            }
        } catch (error) {
            toast.error(`Deleting Product Error on Server...`);
            console.log(`Deleting Product Error on Server...`, product);
            setTimeout(() => setDelClicked(false), maxAnimationTime);
        }
    }

    const handleShopifyAction = (e, type?: string) => {
        if (type == `Delete`) {
            showAlert(<div className={`alertTitleMessage`}>Confirm <span className={`red`}>Delete</span>?</div>, <>
                <div className={`confirmTitle`}>
                    <h3 className={`confirmMessage`}>Are you sure you want to Delete Product {product?.name}?</h3>
                    <div className={`productActions productButtons`}>
                        <button onClick={() => dismissAlertThenDeleteProduct()} className={`productButton buttonFullWidth`} type={`button`}>
                            <i className={`productIcon fas ${delClicked ? `pink spinThis fa-spinner` : `red fa-trash-alt`}`}></i>
                            <div className={`productButtonText alertActionButton`}>{delClicked ? `Deleting` : `Delete`}</div>
                        </button>
                    </div>
                </div>
            </>, undefined, `400px`);
        } else if (type == `Product`) {
            setProdClicked(true);
            dev() && console.log(`Navigating to ${product.name}`, {e, type, user, router, route: router.route});
            toast.info(`Navigating to ${product.name}`);
            router.push(`/products/${product.id}`);
            setTimeout(() => setProdClicked(false), maxAnimationTime);
        } else if (type == `Edit`) {
            setEditClicked(true);
            cancelOrFinishEditProduct();
            setProductToEdit(product);
            dev() && console.log(`Editing ${product.name}`, product);
            setEditClicked(false);
            // setTimeout(() => setEditClicked(false), maxAnimationTime);
        } else if (type == `Cancel`) {
            setCancelClicked(true);
            cancelOrFinishEditProduct();
            dev() && console.log(`Cancel Editing ${product.name}`, product);
            setCancelClicked(false);
            // setTimeout(() => setCancelClicked(false), maxAnimationTime);
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
                <i className={`shopifyIcon green topIcon fab fa-shopify`}></i>
                <div className={`desc productTitleAndPrice`}>
                    <span className={`prodTitle oflow ${product?.title.length > 15 ? `longTitle` : `shortTitle`}`}>{product?.title}</span>
                    <span className={`price cardPrice`}> - 
                        <span className={`dollar`}>$</span>{options?.Price}
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
                        {featuredProduct ? <>
                            {product.quantity} In Stock
                        </> : <>
                            Qty - {product.quantity}
                        </>}
                    </div>
                </div>
                {product.description != `` ? product.description : product?.title}
            </div>
            <form onSubmit={(e) => onProductOptionFormSubmit(e)} className={`productOptions productOptionsForm`}>
                <div className={`productFieldRow`}>
                    {featuredProduct && <>
                        <fieldset name={`selectPriceField`} className={`selectToggle selectPriceField`}>
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
                    {featuredProduct && <>
                        <fieldset name={`selectQuantityField`} className={`selectToggle selectQuantityField`}>
                            <ButtonGroup className={`toggleButtons productButtons`} variant={`outlined`} aria-label={`Product Quantity`}>
                                <h3 className={`selectText textWithIcon`}>
                                    <i className={`selectIcon ${renderSelectIcon(`Quantity`)}`}></i> 
                                    Quantity
                                </h3>
                                <button onClick={(e) => updateOptions(`QuantitySub`, options.Quantity)} type={`button`} className={`subQty redBg qtyButton ${adminFeatures && adminFeatures?.find(feat => feat.feature == `Quantity Circle Buttons`)?.enabled ? `qtyButtonSlim` : ``} optionButton productButton Quantity-${options.Quantity} firstOption`} value={options.Quantity}>
                                    <span className={`optionText textOverflow`}>-</span>
                                </button>
                                <button type={`button`} className={`qtyText ${adminFeatures && adminFeatures?.find(feat => feat.feature == `Quantity Circle Buttons`)?.enabled ? `qtyTextSlim` : ``} optionButton productButton Quantity-${options.Quantity}`} value={options.Quantity} disabled>
                                    <span className={`optionText textOverflow`}>{options.Quantity}</span>
                                    {/* <input name={`quantity`} type={`number`} value={options.Quantity} /> */}
                                </button>
                                <button onClick={(e) => updateOptions(`QuantityAdd`, options.Quantity)} type={`button`} className={`addQty greenBg qtyButton ${adminFeatures && adminFeatures?.find(feat => feat.feature == `Quantity Circle Buttons`)?.enabled ? `qtyButtonSlim` : ``} optionButton productButton Quantity-${options.Quantity}`} value={options.Quantity}>
                                    <span className={`optionText textOverflow`}>+</span>
                                </button>
                            </ButtonGroup>
                        </fieldset>
                    </>}
                </div>
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
                <div className={`productFieldRow`}>
                    <div className={`productActions productButtons`}>

                        {featuredProduct && (
                            <button title={`Back to Shop`} onClick={() => backToShop()} className={`productButton backToShopButton`} type={`button`}>
                                <i className={`productIcon fas ${backToShopClicked ? `pink spinThis fa-spinner` : `pink fa-undo`}`}></i>
                                <div className={`productButtonText alertActionButton`}>
                                    {backToShopClicked ? `Navigating` : `Back to Shop`}
                                </div>
                            </button>
                        )}

                    </div>
                    <div className={`productActions productButtons`}>

                        {user && checkRole(user.roles, `Admin`) && (
                            <button title={`Delete ${product?.title}`} onClick={(e) => handleShopifyAction(e, `Delete`)} className={`productButton deleteProductButton`} type={`button`}>
                                <i className={`productIcon fas ${delClicked ? `pink spinThis fa-spinner` : `red fa-trash-alt`}`}></i>
                                <div className={`productButtonText alertActionButton`}>{delClicked ? `Deleting` : `Delete`}</div>
                            </button>
                        )}

                        {user && checkRole(user.roles, `Admin`) && (
                            <button 
                                className={`productButton editProductButton ${productToEdit != null && productToEdit.id == product.id ? `cancelProductButton` : ``}`} type={`button`}
                                title={`
                                    ${productToEdit != null && productToEdit.id == product.id ? `Cancel` : `Edit`} ${product?.title}
                                `} 
                                onClick={
                                    (e) => handleShopifyAction(e, productToEdit != null && productToEdit.id == product.id ? `Cancel` : `Edit`)
                                }
                            >
                                <i className={`productIcon fas ${editClicked || cancelClicked ? `pink spinThis fa-spinner` : productToEdit != null && productToEdit.id == product.id ? `blue fa-ban` : `blue fa-pen`}`}></i>
                                <div className={`productButtonText alertActionButton`}>{editClicked ? `Editing` : productToEdit != null && productToEdit.id == product.id ? cancelClicked ? `Canceling` : `Cancel` : `Edit`}</div>
                            </button>
                        )}

                        {!router.route.includes(`products/`) && (
                            <button title={`Details ${product?.title}`} onClick={(e) => handleShopifyAction(e, `Product`)} className={`productButton detailsProductButton`} type={`button`}>
                                <i className={`productIcon fas ${prodClicked ? `pink spinThis fa-spinner` : `green fa-tags`}`}></i>
                                <div className={`productButtonText alertActionButton`}>{prodClicked ? `Navigating` : `Details`}</div>
                            </button>
                        )}

                        {router.route.includes(`products`) && (
                            <button title={`Add ${options.Quantity} ${product?.title}'s to Cart`} onClick={(e) => handleShopifyAction(e, `Cart`)} className={`productButton addToCartButton ${isCartButtonDisabled() ? `disabled` : ``}`} type={`submit`} disabled={isCartButtonDisabled()}>
                                {!cartClicked && <>
                                    <span className={`price innerPrice`}>
                                        <span className={`dollar`}>$</span>{options?.Price}
                                    </span>
                                </>}
                                <i className={`productIcon green addToCartIcon fas ${cartClicked ? cartLoaded ? `fa-check` : `pink spinThis fa-spinner` : `fa-shopping-cart`}`}></i>
                                <div className={`productButtonText alertActionButton`}>
                                    {cartClicked ? cartLoaded ? `Added` : `Adding` : `Add to Cart`}
                                </div>
                            </button>
                        )}

                    </div>
                </div>
            </form>
        </div>
    )
}