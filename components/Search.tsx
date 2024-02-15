import NextraSearch from "./NextraSearch";

export default function Search(props) {
    let { className, searchTitle, onInput } = props;
    return (
        <NextraSearch 
            onInput={(e) => onInput(e)}
            className={`search ${className && className != `` ? className : ``}`} 
            searchTitle={searchTitle && searchTitle != `` ? searchTitle : `Products`} 
        />
    )
}