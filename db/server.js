const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

const mongoURI = 'mongodb://localhost:27017';
const dbName = 'editor_db';
const collectionName = 'content';

app.get('/content', (req, res) => {
  MongoClient.connect(mongoURI, (err, client) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    collection.findOne({}, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      return res.json(result);
    });
  });
});

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
