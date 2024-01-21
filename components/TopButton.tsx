import { useState, useEffect } from 'react';

export default function TopButton(props) {
    const [show, setShow] = useState<any>(false);

    const scrollTop = () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    const showButton = () => {
        if (window.scrollY > 50) {
            setShow(true);
        } else {
            setShow(false);
        }
    }

    const windowEvents = () => {
        window.addEventListener(`scroll`, event => {
            showButton();
            return () => window.removeEventListener(`scroll`, event => {
                showButton();
            })
        });
    }

    useEffect(() => {
        windowEvents();
        return () => {
            window.removeEventListener(`resize`, () => windowEvents());
            window.removeEventListener(`scroll`, () => windowEvents());
        }
    }, [])

    return <button className={show ? `visibleButton iconButton` : `hiddenButton iconButton`} onClick={() => scrollTop()} id="topButton" title="Scroll to top">
    <span className="upArrow">
        &gt;
    </span>
</button>
}