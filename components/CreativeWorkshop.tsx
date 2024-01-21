import { useContext } from "react";
import CodeBlock from "./CodeBlock";
import { StateContext } from "../pages/_app";
import Image from "./Image";

export default function CreativeWorkshop(props) {
  let { shop, products } = useContext<any>(StateContext); 
  return (
    <div {...props}>
      <h1 className={`shopTitle`}>{shop?.name}</h1>
      <ul id={`productsCodeBlocks`} className={`productBlocks commandsList commandToCopy`}>  
        {products?.length > 0 && products.map((product, productIndex) => {
          return (
            <li className={`productCode listedCommand`} key={productIndex} title={product?.title}>
              <div className="commandDetails flex gap15">
                <CodeBlock key={productIndex} commandToCopy={true} custombutton={true} border={`solid 2px white`} id={`commandToRender-${product.id}`} language={`json`} codeTitle={(
                  <>
                    <i className="fab fa-shopify"></i>
                    <div className={`desc`}><span className={`oflow`}>{product?.title}</span> - <span className={`price`}><span className={`dollar`}>$</span>{product?.variants[0]?.price}</span></div>
                  </>
                )}>
                  <>
                    {product.image ? <Image src={product.image.src} className={`productPic`} alt={`Product Image`} /> : <Image src={`/assets/images/CatTripleWhiteBG.svg`} className={`productPic`} alt={`Product Image`} />}
                    <h1 className={`productDesc`}>Description</h1>
                    {product.description != `` ? product.description : product?.title}
                  </>
                </CodeBlock>
                {/* <div className={`desc`}>{product?.description}</div> */}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}