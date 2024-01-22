export default function Banner(props) {
    let { title } = props;
    return (
        <section className={`cwsMainBanner banner`}>
        <div className={`hero`}>
          <div className={`heroContent`}>
            <div className={`floatingCat`}>
              <img src={`/assets/images/cwsCatDarkStar.png`} alt={`Floating Cat`} />
            </div>
            <img className={`heroLogo`} src={`/assets/images/cwsLongNavyLogo.svg`} alt={`Logo`} />
            <div className={`heroDesc`}>
              <p className={`heroDescText`}>Graphic Design - Event Design - Custom Printing</p>
            </div>
            <div className={`heroTitle`}>
              <div className={`heroTitleSubText`}>{title}</div>
            </div>
          </div>
        </div>
      </section>
    )
}