import AutoCompleteOption from "./AutoCompleteOption";
import { Autocomplete, TextField } from "@mui/material";

export default function AutoComplete(props) {
    let { type, label, options, property, onInput } = props;
    return (
        <Autocomplete
            disablePortal
            options={options}
            onChange={(e, val: any) => onInput(e, val)}
            getOptionLabel={(option) => option[property]}
            noOptionsText={`No ${type}'s for this ${label}`}
            onInputChange={(e, val: any) => onInput(e, val)}
            isOptionEqualToValue={(option, value) => option[property] === value[property]}
            renderInput={(params) => (
                <TextField {...params} label={label} />
            )}
            renderOption={(props: any, option: any) => {
                return (
                    <div key={option.id} {...props}>
                        <AutoCompleteOption option={option} property={property} className={`autoCompleteOption ${type}AutoCompleteOption`} />
                    </div>
                )
            }}
        />
    )
}