import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let useAPICall = true;
  let defaultCart = { id: 1, items: [] };
  if (req.method === `GET`) {
    try {
      if (useAPICall) {
        const storeName = process.env.SHOPIFY_STORE_NAME || process.env.NEXT_PUBLIC_SHOPIFY_STORE_NAME;
        const apiVersion = process.env.SHOPIFY_API_VERSION || process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION;
        const accessToken = process.env.SHOPIFY_ACCESS_TOKEN || process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN;
        const url = `https://${storeName}.myshopify.com/admin/api/${apiVersion}/cart.json`;

        const response = await fetch(url, {
          method: 'GET',
          headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': accessToken
          }
        });

        const data = await response.json();
        let cartDataToReturn = data?.errors ? {data, defaultCart} : data;
        res.status(200).json(cartDataToReturn);
      } else {
        res.status(200).json(defaultCart);
      }
    } catch (error) {
      res.status(500).json({ error: `Failed to get Cart Data.` });
    }
  } else {
    res.status(405).json({ error: `Cart Data not allowed.` });
  }
}