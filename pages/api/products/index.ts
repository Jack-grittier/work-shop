import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === `GET`) {
    try {
      const storeName = process.env.NEXT_PUBLIC_SHOPIFY_STORE_NAME || process.env.SHOPIFY_STORE_NAME;
      const apiVersion = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || process.env.SHOPIFY_API_VERSION;
      const accessToken = process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN || process.env.SHOPIFY_ACCESS_TOKEN;
      const url = `https://${storeName}.myshopify.com/admin/api/${apiVersion}/products.json`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': accessToken
        }
      });

      const data = await response.json();

      let modifiedProducts = data.products.sort((a, b) => {
        let dateA: any = new Date(a.created_at);
        let dateB: any = new Date(b.created_at);

        return dateB - dateA;
      }).map(({ ...pr }) => ({ 
        ...pr, 
        name: pr.title,
        category: pr.product_type,
        description: pr.body_html,
        created: new Date(pr.created_at).toLocaleString(), 
        updated: new Date(pr.updated_at).toLocaleString(),
      }));

      res.status(200).json(modifiedProducts);
    } catch (error) {
      res.status(500).json({ error: `Failed to get Products.` });
    }
  } else {
    res.status(405).json({ error: `Products not allowed.` });
  }
}