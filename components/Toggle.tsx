import { useState } from "react";

export default function Toggle({ classes, toggled, toggleFunction }) {
    const [isToggled, setIsToggled] = useState(toggled);
    const toggleSwitch = () => {
        setIsToggled(!isToggled);
        toggleFunction();
    };

    return (
        <div className={`toggle-switch ${classes}`} onClick={toggleSwitch}>
            <div className={`slider ${isToggled ? `toggled` : ``}`}></div>
        </div>
    );
}