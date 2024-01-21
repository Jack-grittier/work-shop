import { useContext } from "react";
import CodeBlock from "./CodeBlock";
import { StateContext } from "../pages/_app";

export default function CreativeWorkshop(props) {
//   let { id, className } = props;
  let { shop, products } = useContext<any>(StateContext); 
  return (
    <div {...props}>
      <h1>Creative Workshop</h1>
      <CodeBlock custombutton={true} id={`shop-${shop?.id}`} language={`json`} codeTitle={<>
            {shop?.name}
            <div className={`desc`}>{shop?.domain}</div>
      </>}>
            {JSON.stringify(shop)}
      </CodeBlock>
      {products?.length > 0 && products.map((product, productIndex) => {
        return (
            <CodeBlock key={productIndex} custombutton={true} id={`product-${product?.id}`} language={`json`} codeTitle={<>
                {product?.tags}
                <div className={`desc`}>{product?.title}</div>
            </>}>
                {JSON.stringify(product)}
            </CodeBlock>
        )
      })}
    </div>
  )
}