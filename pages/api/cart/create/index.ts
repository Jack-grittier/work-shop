import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { productId, quantity, customerId, customerData } = req.body;

      const storeName = process.env.SHOPIFY_STORE_NAME || process.env.NEXT_PUBLIC_SHOPIFY_STORE_NAME;
      const apiVersion = process.env.SHOPIFY_API_VERSION || process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION;
      const accessToken = process.env.SHOPIFY_ACCESS_TOKEN || process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN;
      const url = `https://${storeName}.myshopify.com/admin/api/${apiVersion}/draft_orders.json`;

      const draftOrder = {
        draft_order: {
          line_items: [{
            variant_id: productId,
            quantity: quantity,
          }],
          ...(customerId != null && {
            customer: {
              id: customerId,
            },
            email: customerData.email,
            shipping_address: customerData.default_address,
          }),
        },
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': accessToken,
        },
        body: JSON.stringify(draftOrder),
      });

      if (response.ok) {
        const data = await response.json();
        res.status(200).json(data);
      } else {
        const errorData = await response.json();
        res.status(response.status).json(errorData);
      }
    } catch (error) {
      console.error(`Error creating draft order`, error);
      res.status(500).json({ error: `Failed to add to cart.` });
    }
  } else {
    res.status(405).json({ error: `Method not allowed.` });
  }
}