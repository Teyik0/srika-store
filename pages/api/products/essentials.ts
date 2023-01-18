import type { NextApiRequest, NextApiResponse } from 'next';
import { client, allProductsQuery } from '../../../utils/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const query = allProductsQuery();
    const data = await client.fetch(query);
    res.status(200).json(data);
  }
}
