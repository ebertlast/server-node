require('dotenv').config();
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  let example_json = {
    "name": "John Doe",
    "age": 30,
    "address": {
      "street": "123 Main St",
      "city": "Anytown",
      "state": "CA"
    }
  };
  res.send(example_json);
});

let port = process.env.PORT_NODE;

app.listen(port, () => {
  console.clear();
  console.log(`Server running on port ${port}`);
});