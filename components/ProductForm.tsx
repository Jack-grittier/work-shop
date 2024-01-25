import { useContext } from "react"
import { StateContext, dev } from "../pages/_app";
import { productPlaceholderImage } from "./Image";

export const addProductsToShopify = async (productToAdd) => {
    let { title, price, image, category, quantity, description } = productToAdd;
    try {
        let serverPort = 3000;
        let liveLink = dev() ? `http://localhost:${serverPort}` : window.location.origin;

        let addProductsResponse = await fetch(`${liveLink}/api/products/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                price,
                quantity,
                category,
                description,
                imageSrc: image,
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

    let { productToEdit, setProductToEdit } = useContext<any>(StateContext);

    const onProductFormSubmit = async (e) => {
        e.preventDefault();
        try {
            let form = e.target;
            let { title: titleField, category: categoryField, price: priceField, quantity: quantityField, image: imageField, description: descriptionField } = form;

            if (productToEdit == null) {
                let title = titleField.value;
                let category = categoryField.value;
                let price = parseFloat(priceField.value);
                let quantity = quantityField.value != `` ? parseInt(quantityField.value) : 1;
                let image = imageField.value != `` ? imageField.value : productPlaceholderImage;
                let description = descriptionField.value != `` ? descriptionField.value : `${titleField.value} Description`;

                let productToAdd = { 
                    title, 
                    price, 
                    image, 
                    category, 
                    quantity, 
                    description,
                };

                let addedProductResponse = await addProductsToShopify(productToAdd);

                if (addedProductResponse) {
                    let productsAdded = addedProductResponse && addedProductResponse.product ? addedProductResponse.product : addedProductResponse;
                    console.log(`Added Product`, productsAdded);
                    return addedProductResponse;
                }
            } else {
                console.log(`Edit Product`, productToEdit);
            }
        } catch (error) {
            console.log(`Error Submitting Product Form`, error);
        }
    }

    return (
        <form 
            onSubmit={(e) => onProductFormSubmit(e)}
            id={`${productToEdit == null ? `addProductForm` : `editProductForm`}`}
            className={`alignCenter flex flexColumn gap5 justifyCenter productForm addProductForm`}
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
                placeholder={`Public Image URL...`} 
                defaultValue={productToEdit == null ? `` : productToEdit.image} 
            />
            <button className={`productFormSubmitButton blackButton`} type={`submit`}>{productToEdit == null ? `Add` : `Save`}</button>
            {productToEdit != null && <button type={`button`} onClick={() => setProductToEdit(null)} className={`productFormCancelButton blackButton`}>Cancel</button>}
        </form>
    )
}