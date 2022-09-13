import { Product } from '../../utils/interface';
import { useStore } from '../../utils/store';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req: any, res: any) {
  //console.log(req.body);
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: req.body.map((item: Product) => {
          const img = item.imageUrl;
          return {
            quantity: item.quantity,
            price_data: {
              currency: 'eur',
              product_data: {
                name: item.title,
                images: [img],
              },
              unit_amount: item.price * 100,
            },
          };
        }),
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/`,
      });
      res.status(200).json(session);
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
