import { useContext } from "react";
import { StateContext } from "../pages/_app";

export default function Banner(props) {
  let { router, theme } = useContext<any>(StateContext);
  let { title, bg, bgPos, lightLogo, color, showCat } = props;
  return (
    <section className={`cwsMainBanner banner`} style={{ background: bg ? `url(/assets/images/${bg})` : `white`, backgroundPosition: bgPos ? `${bgPos}` : `50% 50%` }}>
      <div className={`hero ${theme} ${router.route == `/` ? `homeHero` : `pageHero`}`} style={{ color: color ? color : theme == `dark` ? `var(--cwsNavy)` : `white` }}>
        <div className={`heroContent`}>
          {showCat != false && (
            <div className={`floatingCat`}>
              <img src={theme == `dark` ? `/assets/images/cwsCatDarkStar.png` : `/assets/images/floatingCatLightMode.png`} alt={`Floating Cat`} />
            </div>
          )}
          <img className={`heroLogo`} src={lightLogo ? `/assets/images/cwsLongWhiteLogo.svg` : theme == `dark` ? `/assets/images/cwsLongNavyLogo.svg` : `/assets/images/cwsLongWhiteLogo.svg`} alt={`Logo`} />
          <div className={`heroDesc`}>
            <p className={`heroDescText`}>Graphic Design - Event Design - Custom Printing</p>
          </div>
          <div className={`heroTitle`}>
            <h1 className={`heroTitleSubText ${title.length > 15 ? `longTitleSubText` : `shortTitleSubText`}`}>{title}</h1>
          </div>
        </div>
      </div>
    </section>
  )
}