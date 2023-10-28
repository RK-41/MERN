/**
27.10.

   Entry Point of the App

   'localhost' and '127.0.0.1' are not entirely same. Use them at respective places.
 */

// Importing Modules
const express = require('express');
const { MongoClient } = require('mongodb');

// Creating an Express app
const app = express();

// Port
const port = process.env.PORT || 8000;

// Initializing a Middleware
//    Function of express: It parses incoming JSON payload
app.use(express.json({ extended: false }));

// A function 'withDB()' to perform DB Operations (28.10.)
const withDB = async (operations, res) => {
   try {
      // Connecting to the MongoDB Server through Express
      const client = await MongoClient.connect('mongodb://127.0.0.1:27017');

      // Fetching the DB
      const db = client.db('mernblog');

      // Performing Operations through a function 'operations()'
      await operations(db);

      // Closing the Connection
      client.close();

   } catch (err) {
      // Internal Server Error
      res.status(500).json({
         status: 'fail',
         message: 'Error connecting to the database!',
         err
      })
   }
};

// Implementing Route for Articles (28.10.23)
app.get('/api/articles/:name', async (req, res) => {

   withDB(async (db) => {
      const articleName = req.params.name;

      // Fetching the 'articleInfo' from the DB
      const articleInfo = await db
         .collection('articles')
         .findOne({ name: articleName });

      // Sending back the response to the Client
      res.status(200).json(articleInfo);
   }, res)

})

// Routing the Comments
app.post('/api/articles/:name/add-comments', (req, res) => {
   const { username, text } = req.body;
   const articleName = req.params.name;

   withDB(async (db) => {
      // Fetching the Article Info
      const articleInfo = await db
         .collection('articles')
         .findOne({ name: articleName });

      // Updating the Article Info
      await db.collection('articles')
         .updateOne({ name: articleName },
            {
               $set: {
                  comments: articleInfo.comments.concat({ username, text })
               }
            }
         );

      // Getting Updated Article Info
      const updatedArticleInfo =  await db.collection('articles').findOne({name: articleName});

      // Sending back Response to the Client
      res.status(200).json(updatedArticleInfo);
   }, res)
});

// For Testing Purpose
app.get('/', (req, res) => {
   res.status(200).json({
      status: 'success',
      message: 'Response from the server!'
   })
})

// Starting the server
app.listen(port, () => console.log(`Server running at port ${port}`))
