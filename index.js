require('dotenv').config();
const express = require('express');
const extension = require('./extension');

const app = express();

extension.extendApp({ app });

let port = process.env.PORT_NODE;

app.listen(port, () => {
  console.clear();
  console.log(`Server running on port ${port}`);
});