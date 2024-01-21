import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === `GET`) {
    try {
      const storeName = process.env.NEXT_PUBLIC_SHOPIFY_STORE_NAME;
      const apiVersion = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION;
      const accessToken = process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN;
      const url = `https://${storeName}.myshopify.com/admin/api/${apiVersion}/shop.json`;

      const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken
          }
      });

      const data = await response.json();
      res.status(200).json(data.shop);
    } catch (error) {
      res.status(500).json({ error: `Failed to get Shop Data.` });
    }
  } else {
    res.status(405).json({ error: `Shop Data not allowed.` });
  }
}