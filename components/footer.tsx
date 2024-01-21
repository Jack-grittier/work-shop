import { useContext } from "react";
import { StateContext } from "../pages/_app";

export default function Footer(props) {
    let { shop } = useContext<any>(StateContext);
    return <footer style={props.style}>
        <div className="left">
            <a className="hoverLink" title={`Home`} href="/">Home  <i className="fas fa-undo"></i></a>
        </div>
            <div className="right"> {shop?.name} <i className="fas fa-copyright"></i>{new Date().getFullYear()}</div>
    </footer>
}