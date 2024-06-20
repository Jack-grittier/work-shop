import { defaultShop } from '../../../../db/database';
import type { NextApiRequest, NextApiResponse } from 'next';

const toBase64 = (input: string) => Buffer.from(input).toString('base64');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { cartProducts, customerData } = req.body;

      const storeName = process.env.SHOPIFY_STORE_NAME || process.env.NEXT_PUBLIC_SHOPIFY_STORE_NAME;
      const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_API_ACCESS_TOKEN 
                                    || process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_ACCESS_TOKEN;
      const url = `https://${storeName}.myshopify.com/api/2021-04/graphql.json`;

      const lineItems = cartProducts.map(item => ({
        variantId: toBase64(`gid://shopify/ProductVariant/${item.variantID}`),
        quantity: item.selectedOptions.Quantity,
      }));

      let customerFragment = ``;
      if (customerData) {
        let { address1, address2, city, country, first_name, last_name, phone, province, zip } = customerData.default_address;
        let shippingAddressFields = `
          address1: "${address1 == null ? defaultShop.address1 : address1}",
          address2: "${address2 == null ? defaultShop.address2 : address2}",
          city: "${city == null ? defaultShop.city : city}",
          country: "${country == null ? defaultShop.country : country}",
          firstName: "${first_name}",
          lastName: "${last_name}",
          phone: "${phone == null ? defaultShop.phone : phone}",
          province: "${province == null ? defaultShop.province : province}",
          zip: "${zip == null ? defaultShop.zip : zip}"
        `.trim().replace(/,$/, '');

        customerFragment = `
          email: "${customerData.email}",
          shippingAddress: {
            ${shippingAddressFields}
          },
        `;
      }

      const query = `
        mutation {
          checkoutCreate(input: {
            lineItems: ${JSON.stringify(lineItems).replace(/"([^"]+)":/g, '$1:')},
            ${customerFragment}
          }) {
            checkout {
              id
              webUrl
            }
            checkoutUserErrors {
              code
              field
              message
            }
          }
        }
      `;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
        },
        body: JSON.stringify({ query }),
      });

      const result = await response.json();

      if (result.errors) {
        res.status(400).json({ errors: result.errors });
      } else if (result.data.checkoutCreate.checkoutUserErrors.length > 0) {
        res.status(400).json({ errors: result.data.checkoutCreate.checkoutUserErrors });
      } else {
        res.status(200).json({ checkout: result.data.checkoutCreate.checkout });
      }
    } catch (error) {
      console.error(`Error Creating Checkout Session`, error);
      res.status(500).json({ error: `Failed to Create Checkout Session.` });
    }
  } else {
    res.status(405).json({ error: `Method Not Allowed.` });
  }
}