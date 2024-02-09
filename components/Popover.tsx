export default function Popover({ isVisible, content, id, classes }) {
    return (
        <div
            id={id}
            className={`popover ${isVisible ? `visible` : ``} ${classes ? classes : ``}`}
        >
            {content}
        </div>
    );
};