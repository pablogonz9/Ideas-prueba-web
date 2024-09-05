import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await client.connect();
      const database = client.db('text-viewer');
      const texts = database.collection('texts');

      const { content } = req.body;
      const result = await texts.insertOne({ content, timestamp: new Date() });

      res.status(200).json({ message: 'Text saved successfully', id: result.insertedId });
    } catch (error) {
      res.status(500).json({ message: 'Error saving text', error: error.message });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}