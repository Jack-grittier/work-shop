import { useContext } from "react";
import AutoComplete from "./AutoComplete";
import { StateContext } from "../pages/_app";
// import NextraSearch from "./NextraSearch";

export default function Search(props) {
    let { onInput } = props;
    let { products } = useContext<any>(StateContext);
    let activeProducts = products.filter(prod => prod.status != `archived`);
    let productOptions = activeProducts?.map((prod, prodIndex) => ({ ...prod, label: prod?.title }));

    return (
        <AutoComplete 
            type={`Product`}
            label={`Search`}
            onInput={onInput} 
            property={`title`}
            options={productOptions}
        />
        // <NextraSearch 
        //     onInput={(e) => onInput(e)}
        //     className={`search ${className && className != `` ? className : ``}`} 
        //     searchTitle={searchTitle && searchTitle != `` ? searchTitle : `Products`} 
        // />
    )
}