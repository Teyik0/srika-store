import type { NextApiRequest, NextApiResponse } from 'next'
import { client, allCategoriesQuery } from '../../../utils/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'GET') {
    const query = allCategoriesQuery();
    const data = await client.fetch(query);
    res.status(200).json(data);
  }
}