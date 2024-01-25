import Banner from "./Banner";
import Products from "./Products";
import { useContext } from "react";
import ProductForm from "./ProductForm";
import { StateContext } from "../pages/_app";

export default function CreativeWorkshop(props) {
  let { shop, products } = useContext<any>(StateContext);

  // useEffect(() => {
  //   const detectWindowResizeChanges = () => setWidth(window.innerWidth);
  //   window.addEventListener(`resize`, detectWindowResizeChanges);
  //   detectWindowResizeChanges();
  //   return () => window.removeEventListener(`resize`, detectWindowResizeChanges);
  // }, [])

  return (
    <main {...props}>
      <Banner title={`We're Out Of This World`} />
      <section className={`productsSection customSection`}>
        <h1 className={`shopTitle`}>{shop?.name}</h1>
        <ProductForm />
        <Products products={products} />
      </section>
    </main>
  )
}