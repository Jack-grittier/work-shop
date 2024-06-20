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
  inventory_quantity?: number;
  position: number;
  product_id: number;
  created_at: string;
  updated_at: string;
}
  
export default class Product {
  [key: string]: any;
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
    price: any,
    variants: Variant[],
    variantIDs: any[],
    type?: any,
    cartId?: string,
    variantID?: any,
    variant?: Variant,
    selectedOptions?: any,
    inCartQty?: any,
    quantity?: number,
    description?: string,
    category?: string,
    created?: string,
    updated?: string,
    altImage?: Image,
    name?: string,
    label?: string,
  }) {
    Object.assign(this, productObj);
    let hasValidVariants = this?.variants && this?.variants?.length > 0;
    if (this.label === undefined) this.label = this?.title;
    if (this.type === undefined) this.type = this?.product_type;
    if (this.category === undefined) this.category = this?.product_type;
    if (this.price === undefined) this.price = hasValidVariants ? this?.variants[0]?.price : `0.00`;
    if (this.variantIDs === undefined) this.variantIDs = hasValidVariants ? this?.variants.map(vr => vr.id) : [this.variants[0].id];
    if (this.quantity === undefined) {
      this.quantity = this?.variants && this?.variants?.length > 0 ? this?.variants?.reduce((total, variant) => total + variant.inventory_quantity, 0) : 0;
    }
  }
}  