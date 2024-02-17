import { useContext } from "react";
// import NextraSearch from "./NextraSearch";
import { StateContext } from "../pages/_app";
import { Autocomplete, TextField } from "@mui/material";

export default function Search(props) {
    let { products } = useContext<any>(StateContext);
    let { className, searchTitle, onInput } = props;
    let activeProducts = products.filter(prod => prod.status != `archived`);
    let productOptions = activeProducts?.map((prod, prodIndex) => ({ ...prod, label: prod?.title }));

    return (
        <Autocomplete
            disablePortal
            options={productOptions}
            onChange={(e, val: any) => onInput(e, val)}
            noOptionsText={`No Products for this Search`}
            onInputChange={(e, val: any) => onInput(e, val)}
            getOptionLabel={(option) => option.title}
            isOptionEqualToValue={(option, value) => option.title === value.title}
            renderInput={(params) => (
                <TextField {...params} label={`Search`} />
            )}
        />
        // <NextraSearch 
        //     onInput={(e) => onInput(e)}
        //     className={`search ${className && className != `` ? className : ``}`} 
        //     searchTitle={searchTitle && searchTitle != `` ? searchTitle : `Products`} 
        // />
    )
}