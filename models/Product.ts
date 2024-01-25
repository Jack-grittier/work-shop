export interface Option {
    id: number;
    product_id: number;
    name: string;
    position: number;
    values: string[];
  }
  
  export interface Image {
    id: number;
    alt: string | null;
    position: number;
    product_id: number;
    created_at: string;
    updated_at: string;
    admin_graphql_api_id: string;
    width: number;
    height: number;
    src: string;
    variant_ids: number[];
  }
  
  export interface Variant {
    id: number;
    title: string;
    option1: string;
    option2?: string;
    option3?: string;
    sku: string;
    requires_shipping: boolean;
    taxable: boolean;
    featured_image?: Image;
    available: boolean;
    price: string;
    grams: number;
    compare_at_price?: string;
    position: number;
    product_id: number;
    created_at: string;
    updated_at: string;
  }
  
  export default class Product {  
    constructor(productObj: {
      id: number,
      title: string,
      body_html: string,
      vendor: string,
      product_type: string,
      created_at: string,
      handle: string,
      updated_at: string,
      published_at: string,
      template_suffix: string,
      published_scope: string,
      tags: string,
      status: string,
      admin_graphql_api_id: string,
      options: Option[],
      images: Image[],
      image: Image,
      variants: Variant[],
      description?: string,
      category?: string,
      created?: string,
      updated?: string,
      altImage?: Image,
      name?: string,
    }) {
      Object.assign(this, productObj);
    }
}  