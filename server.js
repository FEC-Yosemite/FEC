const express = require('express');
const app = express();
const port = 3000;
const api = require('./apiRequests.js');

app.use(express.static('client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
});

// /products routers

app.get('/products', (req, res) => {
  api.getProducts(req.query)
    .then(result => res.status(200).send(result.data))
    .catch(err => {
      console.log('ERROR:', err);
      res.status(500).send(err);
    });
});

app.get('/products/:id', (req, res) => {
  var id = req.params.id;
  api.getProductById(id)
    .then(result => {
      res.status(200).send(result.data);
    })
    .catch(err => {
      console.log('ERROR:', err);
      res.status(500).send(err);
    });
});

app.get('/products/:id/styles', (req, res) => {
  var id = req.params.id;
  api.getProductStyles(id)
    .then(result => res.status(200).send(result.data))
    .catch(err => {
      console.log('ERROR:', err);
      res.status(500).send(err);
    });
});

app.get('/products/:id/related', (req, res) => {
  var id = req.params.id;
  api.getRelatedProducts(id)
    .then(result => res.status(200).send(result.data))
    .catch(err => {
      console.log('ERROR:', err);
      res.status(500).send(err);
    });
});

// /reviews routers

app.get('/reviews', (req, res) => {
  api.getReviews(req.query)
    .then(result => res.status(200).send(result.data))
    .catch(err => {
      console.log('ERROR:', err);
      res.status(500).send(err);
    });
});

app.get('/reviews/meta', (req, res) => {
  api.getReviewMeta(req.query)
    .then(result => res.status(200).send(result.data))
    .catch(err => {
      console.log('ERROR:', err);
      res.status(500).send(err);
    });
});

app.post('/reviews', (req, res) => {
  api.addReview(req.body)
    .then(result => res.status(201).send(result.data))
    .catch(err => {
      console.log('ERROR:', err);
      res.status(500).send(err);
    });
});

app.put('/reviews/:reviewid/helpful', (req, res) => {
  let id = req.params.reviewid;
  api.markAsHelpful(id)
    .then(result => res.status(200).send(result.data))
    .catch(err => {
      console.log('ERROR:', err);
      res.status(500).send(err);
    });
})

app.put('/reviews/:reviewid/report', (req, res) => {
  let id = req.params.reviewid;
  api.reportReview(id)
    .then(result => res.status(200).send(result.data))
    .catch(err => {
      console.log('ERROR:', err);
      res.status(500).send(err);
    });
})

app.get('/cart', (req, res) => {
  api.getCart()
    .then(result => res.status(200).send(result.data))
    .catch(err => {
      console.log('ERROR:', err);
      res.status(500).send(err);
    });
})

app.post('/cart', (req, res) => {
  api.addToCart(req.body)
    .then(result => res.status(200).send(result.data))
    .catch(err => {
      console.log('ERROR:', err);
      res.status(500).send(err);
    });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});