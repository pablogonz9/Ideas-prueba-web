import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await client.connect();
      const database = client.db('text-viewer');
      const texts = database.collection('texts');

      const result = await texts.find().sort({ timestamp: -1 }).toArray();

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching texts', error: error.message });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}