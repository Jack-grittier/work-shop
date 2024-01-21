import { useContext } from "react";
import { StateContext } from "../pages/_app";
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Image(props) {
    let { src, alt, className } = props;
    className = `customImage ${className}`;
    const { useLazyLoad } = useContext<any>((StateContext as any));
    return useLazyLoad ? <LazyLoadImage effect="blur" src={src} className={className} alt={alt} /> : <img src={src} className={className} alt={alt} />;
}