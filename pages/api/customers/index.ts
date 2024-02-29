import type { NextApiRequest, NextApiResponse } from 'next';
import { accessToken, apiVersion, storeName } from '../../../firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === `GET`) {
    try {
      const url = `https://${storeName}.myshopify.com/admin/api/${apiVersion}/customers.json`;

      const getCustomersResponse = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': accessToken
        }
      });

      const allShopifyCustomersData = await getCustomersResponse.json();

      res.status(200).json(allShopifyCustomersData);
    } catch (error) {
      res.status(500).json({ error: `Failed to get Customers.` });
    }
  } else {
    res.status(405).json({ error: `Customers not allowed.` });
  }
}