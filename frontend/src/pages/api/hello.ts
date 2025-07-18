import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // サーバーサイドからのリクエストなのでDocker内部のサービス名が使える
    const response = await axios.get('http://backend:3000');
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching from backend:', error);
    res.status(500).json({ error: 'Failed to fetch data from backend' });
  }
}