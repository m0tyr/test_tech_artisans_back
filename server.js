const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();
const port = 8000;
app.use(cors());

const url = 'mongodb://localhost:27017';
const dbName = 'test_tech_art';

const products = [
  { "_id" : 1, "name" : "AC1 Phone1", "type" : "phone", "price" : 200.05, "rating" : 3.8, "warranty_years" : 1, "available" : true },
  { "_id" : 2, "name" : "AC2 Phone2", "type" : "phone", "price" : 147.21, "rating" : 1, "warranty_years" : 3, "available" : false },
  { "_id" : 3, "name" : "AC3 Phone3", "type" : "phone", "price" : 150, "rating" : 2, "warranty_years" : 1, "available" : true },
  { "_id" : 4, "name" : "AC4 Phone4", "type" : "phone", "price" : 50.20, "rating" : 3, "warranty_years" : 2, "available" : true }
];

async function initDefaultData() {
    const client = new MongoClient(url);
    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection('produits');
  
      await collection.deleteMany({});
      const result = await collection.insertMany(products, { ordered: false });
      console.log(`${result.insertedCount} documents insérés`);
    } catch (err) {
      console.error('Erreur lors de la réinitialisation des documents:', err);
    } finally {
      await client.close();
    }
  }

initDefaultData().catch(console.dir);

app.get('/', async (req, res) => {
    try {
      res.json('Server is running...');
    } catch (err) {
      console.error('[ERROR]: Erreur lors de la récupération des documents:', err);
      res.status(500).send('[ERROR]: Erreur lors de la récupération des données');
    } finally {
      await client.close();
    }
});

app.listen(port, () => {
  console.log(`[INFO]: Serveur en écoute sur http://localhost:${port}`);
});