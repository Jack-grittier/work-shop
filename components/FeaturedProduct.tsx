// import Image from "next/image";
import Image from "./Image";
import { toast } from "react-toastify";
import { useState, useContext } from "react";
import { StateContext } from "../pages/_app";

export default function FeaturedProduct({ product }) {
    const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
    let { user, router, setProducts, setProductToEdit } = useContext<any>(StateContext);
    const [selectedSize, setSelectedSize] = useState(product.options.find(option => option.name === "Size").values[0]);
    const [selectedColor, setSelectedColor] = useState(product.options.find(option => option.name === "Color").values[0]);

    const handleVariantChange = (color, size) => {
        // Find the variant based on color and size
        const variant = product.variants.find(variant => variant.option1 === color && variant.option2 === size);
        if (variant) {
            setSelectedVariant(variant);
        } else {
            toast.error("Variant not available");
        }
    };

    const addToCart = () => {
        // Placeholder for add to cart functionality
        toast.success("Added to cart");
    };

    return (
        <div className="product">
            <div className="productTitle">
                <h2>{product.title}</h2>
                <span className="price"> - ${selectedVariant.price}</span>
            </div>
            <div className="productContent">
                <Image src={product.image.src} width={1950} height={1298} alt={`Product Image`} />
                <p>Description: {product.description}</p>
                <div className="productOptions">
                    <div className="colors">
                        <h3>Color</h3>
                        {product.options.find(option => option.name === "Color").values.map(color => (
                            <button key={color} className={selectedColor === color ? 'active' : ''} onClick={() => {
                                setSelectedColor(color);
                                handleVariantChange(color, selectedSize);
                            }}>{color}</button>
                        ))}
                    </div>
                    <div className="sizes">
                        <h3>Size</h3>
                        {product.options.find(option => option.name === "Size").values.map(size => (
                            <button key={size} className={selectedSize === size ? 'active' : ''} onClick={() => {
                                setSelectedSize(size);
                                handleVariantChange(selectedColor, size);
                            }}>{size}</button>
                        ))}
                    </div>
                </div>
                <button className="addToCartButton" onClick={addToCart}>Add to Cart</button>
            </div>
        </div>
    );
}