import Image from "../Image";

export default function Contact(props) {
    return (
        <div {...props} className={`contactComponent`}>
            <div className={`contactCardMainSide`}>
                <h2 className={`subtitle shopSubtitle`}>Contact Form</h2>
                <p className={`contactormText`} style={{ textAlign: `center`, paddingBottom: 5 }}>Contact Form will go here.</p>
            </div>
            <div className={`contactCardSidebar w40`}>
                <Image alt={`Cat Graphic Cutout Portrait`} className={`adjustOuterSpan contactCardSidebarImage`} src={`/assets/images/CatGraphicCutoutPortrait.jpg`} />
            </div>
        </div>
    )
}