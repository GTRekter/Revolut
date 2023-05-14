const express = require('express');
const userRoutes = require('./user/route');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use('/', userRoutes);

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = server;
