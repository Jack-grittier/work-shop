import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import TopButton from "./TopButton";
export default function Main(props) {
    let { children, className, showTopButton, style } = props;
    return <main className={className} style={style}>
        <ToastContainer 
            hideProgressBar={false}
            position={`top-right`}
            pauseOnHover={false}
            newestOnTop={false}
            autoClose={3500}
            pauseOnFocusLoss
            closeOnClick
            theme="dark"
            rtl={false}
            draggable
        />
        {children}
        {showTopButton != false && <TopButton />}
    </main>
}