import { toast } from "react-toastify";
import Product from "../models/Product";
import { useContext, useState } from "react"
import { StateContext } from "../pages/_app";
import { liveLink, maxAnimationTime, productPlaceholderAltImage, productPlaceholderImage } from "../firebase";

export const addProductsToShopify = async (productToAdd) => {
    let { title, price, image, altImage, category, quantity, description } = productToAdd;
    try {
        let addProductsResponse = await fetch(`${liveLink}/api/products/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                price,
                image,
                altImage,
                quantity,
                category,
                description,
            })
        });

        if (addProductsResponse.status === 200) {
          let addedProductsData = await addProductsResponse.json();
          if (addedProductsData) return addedProductsData;
        }
    } catch (error) {
      console.log(`Server Error on Get Products`, error);
    }
}

export default function ProductForm(props) {

    let [processing, setProcessing] = useState(false);
    let [imageURLAdded, setImageURLAdded] = useState(false);
    let { setProducts, productToEdit, setProductToEdit } = useContext<any>(StateContext);

    const cancelEditProduct = () => {
        setProductToEdit(null);
        let productFormElement: any = document.querySelector(`.productForm`);
        productFormElement.reset();
    }

    const isURLAdded = (e) => {
        let { value } = e.target;
        if (value != ``) {
            setImageURLAdded(true);
        } else {
            setImageURLAdded(false);
        }
    }

    const onProductFormSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        try {
            let form = e.target;
            let { title: titleField, category: categoryField, price: priceField, quantity: quantityField, image: imageField, description: descriptionField, altImage: altImageField } = form;

            if (productToEdit == null) {
                let title = titleField.value;
                let category = categoryField.value;
                let price = parseFloat(priceField.value);
                let quantity = quantityField.value != `` ? parseInt(quantityField.value) : 1;
                let image = imageField.value != `` ? imageField.value : productPlaceholderImage;
                let altImage = altImageField && altImageField?.value != `` ? altImageField.value : productPlaceholderAltImage;
                let description = descriptionField.value != `` ? descriptionField.value : `${titleField.value} Description`;

                let productToAdd = { 
                    title, 
                    price, 
                    image, 
                    altImage,
                    category, 
                    quantity, 
                    description,
                };

                let addedProductResponse = await addProductsToShopify(productToAdd);

                if (addedProductResponse) {
                    let productsAdded = addedProductResponse && addedProductResponse.product ? addedProductResponse.product : addedProductResponse;
                    console.log(`Added Product`, productsAdded);
                    toast.success(`Product Successfully Added`);
                    setProducts(prevProducts => [new Product(productsAdded), ...prevProducts]);
                    setProcessing(false);
                    form.reset();
                    return addedProductResponse;
                }
            } else {
                setProcessing(false);
                console.log(`Edit & Update Product`, productToEdit);
            }
        } catch (error) {
            toast.error(`Error Submitting Product Form`);
            console.log(`Error Submitting Product Form`, error);
            setTimeout(() => setProcessing(false), maxAnimationTime);
        }
    }

    return (
        <form 
            onSubmit={(e) => onProductFormSubmit(e)}
            id={`${productToEdit == null ? `addProductForm` : `editProductForm`}`}
            className={`alignCenter flex flexColumn gap5 justifyCenter productForm addProductForm ${productToEdit == null ? `` : `editProductForm`}`}
        >
            <input 
                required 
                name={`title`} 
                type={`text`} 
                className={`productTitle productName`} 
                placeholder={`Enter Product Title...`} 
                defaultValue={productToEdit == null ? `` : productToEdit.title} 
            />
            <input 
                required 
                type={`text`} 
                name={`category`} 
                className={`productCategory productType`} 
                placeholder={`Enter Product Category...`} 
                defaultValue={productToEdit == null ? `` : productToEdit.category} 
            />
            <input 
                min={0} 
                step={1} 
                required 
                max={99999} 
                name={`price`} 
                type={`number`} 
                placeholder={`Price...`} 
                className={`productPrice`} 
                defaultValue={productToEdit == null ? `` : productToEdit.price} 
            />
            <input 
                min={0}
                max={99999} 
                type={`number`} 
                name={`quantity`} 
                placeholder={`Quantity...`} 
                className={`productQuantity`} 
                defaultValue={productToEdit == null ? `` : productToEdit.quantity} 
            />
            <input 
                type={`text`} 
                name={`description`} 
                className={`productDescription`} 
                placeholder={`Product Description...`} 
                defaultValue={productToEdit == null ? `` : productToEdit.description} 
            />
            <input 
                type={`text`} 
                name={`image`} 
                className={`productImage`} 
                onInput={(e) => isURLAdded(e)}
                placeholder={`Public Image URL...`} 
                defaultValue={productToEdit == null ? `` : productToEdit?.image?.src} 
            />
            {imageURLAdded || productToEdit != null && <input 
                type={`text`} 
                name={`altImage`} 
                className={`productImage`} 
                placeholder={`Public Alt Image URL...`} 
                defaultValue={productToEdit == null ? `` : productToEdit?.altImage?.src} 
            />}
            <button disabled={processing} className={`productFormSubmitButton blackButton`} type={`submit`}>
                <div className={`textWithIcon`}>
                    <i className={`fas ${productToEdit == null ? processing ? `pink spinThis fa-spinner` : `pink fa-plus` : `lightgreen fa-save`}`}></i>
                    {productToEdit == null ? processing ? `Adding` : `Add` : `Save`}
                </div>
            </button>
            {productToEdit != null && (
                <button type={`button`} onClick={() => cancelEditProduct()} className={`productFormSubmitButton productFormCancelButton blackButton`}>
                    <div className={`textWithIcon`}>
                        <i className={`pink fas ${processing ? `spinThis fa-spinner` : `fa-ban`}`}></i>
                        {productToEdit == null ? processing ? `Canceling` : `Cancel` : `Cancel`}
                    </div>
                </button>
            )}
        </form>
    )
}