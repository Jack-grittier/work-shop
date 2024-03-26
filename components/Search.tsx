import { useContext } from "react";
import AutoComplete from "./AutoComplete";
import { StateContext } from "../pages/_app";
// import NextraSearch from "./NextraSearch";
import { productStatuses } from "../globals/globals";

export default function Search(props) {
    let { onInput } = props;
    let { products } = useContext<any>(StateContext);
    let activeProducts = products.filter(prod => prod.status != productStatuses.Archived);
    let productOptions = activeProducts?.map((prod, prodIndex) => ({ ...prod, label: prod?.title }));

    return (
        <AutoComplete 
            type={`Product`}
            onInput={onInput} 
            property={`title`}
            label={`Search...`}
            options={productOptions}
        />
        // <NextraSearch 
        //     onInput={(e) => onInput(e)}
        //     className={`search ${className && className != `` ? className : ``}`} 
        //     searchTitle={searchTitle && searchTitle != `` ? searchTitle : `Products`} 
        // />
    )
}