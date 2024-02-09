import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const productId = req.query.id;
        try {
            const { id, title, price, image, altImage, category, description, quantity } = req.body;

            if (!productId) {
                return res.status(400).json({ error: 'Product ID is required for updates.' });
            }

            const storeName = process.env.NEXT_PUBLIC_SHOPIFY_STORE_NAME || process.env.SHOPIFY_STORE_NAME;
            const apiVersion = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || process.env.SHOPIFY_API_VERSION;
            const accessToken = process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN || process.env.SHOPIFY_ACCESS_TOKEN;
            const shopifyURL = `https://${storeName}.myshopify.com/admin/api/${apiVersion}/products/${productId}.json`;

            const shopifyResponse = await fetch(shopifyURL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': accessToken,
                },
                body: JSON.stringify({
                    product: {
                        id: productId,
                        title: title,
                        vendor: category,
                        product_type: category,
                        body_html: description,
                        images: [
                            { src: image, alt: `${title} Primary Image` }, 
                            { src: altImage, alt: `${title} Alternative Image` },
                        ],
                        variants: [{
                            price: price,
                            inventory_quantity: quantity,
                            inventory_management: 'shopify',
                        }],
                    }
                })
            });

            if (!shopifyResponse.ok) {
                console.log(`Error updating product: ${shopifyResponse.statusText}`);
                return res.status(shopifyResponse.status).json({error: `Error updating product: ${shopifyResponse.statusText}`});
            }

            const responseData = await shopifyResponse.json();
            res.status(200).json(responseData);
        } catch (error) {
            console.error('Error Updating Product:', error);
            res.status(500).json({ message: `Error Updating Product from Server`, errorMessage: error.message });
        }
    } else {
        res.setHeader(`Allow`, [`PUT`]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}