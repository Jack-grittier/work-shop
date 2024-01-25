import { useContext } from "react";
import { StateContext } from "../pages/_app";
import { LazyLoadImage } from 'react-lazy-load-image-component';

export const productPlaceholderImage = `/assets/images/CatTripleWhiteBG.svg`;

export default function Image(props) {
    const { useLazyLoad } = useContext<any>((StateContext as any));
    return useLazyLoad == true ? <LazyLoadImage effect={`blur`} {...props} /> : <img {...props} />;
}