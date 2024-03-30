import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === `POST`) {
    try {
        const storeName = process.env.SHOPIFY_STORE_NAME || process.env.NEXT_PUBLIC_SHOPIFY_STORE_NAME;
        const apiVersion = process.env.SHOPIFY_API_VERSION || process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION;
        const accessToken = process.env.SHOPIFY_ACCESS_TOKEN || process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN;
        // const url = `https://${storeName}.myshopify.com/admin/api/${apiVersion}/cart.json`;
        const url = `https://${storeName}.myshopify.com/api/${apiVersion}/graphql.json`;

        const query = `
            mutation {
                checkoutCreate(input: {}) {
                    checkout {
                        id
                        webUrl
                    }
                    userErrors {
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
                'X-Shopify-Access-Token': accessToken
            },
            body: JSON.stringify({ query }),
        });

        const data = await response.json();

        // if (data.errors) {
        //     console.error('Errors:', data.errors);
        //     return null;
        // }

        // if (data.data.checkoutCreate.userErrors.length > 0) {
        //     console.error('User errors:', data.data.checkoutCreate.userErrors);
        //     return null;
        // }

        res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: `Failed to Create Cart.` });
    }
  } else {
    res.status(405).json({ error: `Cart Data not allowed.` });
  }
}