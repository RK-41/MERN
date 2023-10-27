/**
27.10.

   Entry Point of the App
 */

// Importing Express framework
const express = require('express');

// Creating an Express app
const app = express();

// Port
const port = process.env.PORT || 8000

// For the Comments
const articlesInfo = {
   "learn-react": {
      comments: []
   },
   "learn-node": {
      comments: []
   },
   "my-thoughts-on-learning-react": {
      comments: []
   }
}

// Initializing a Middleware
//    Function of express: It parses incoming JSON payload
app.use(express.json({extended: false}));

// Routing the Comments
app.post('/api/articles/:name/add-comments', (req, res) => {
   const {username, text} = req.body;
   const articleName = req.params.name;
   articlesInfo[articleName].comments.push({username, text});
   // articlesInfo[articleName].comments.push(req.body);

   res.status(200).send(articlesInfo[articleName]);
})

// Starting the server
app.listen(port, () => console.log(`Server running at port ${port}`))
