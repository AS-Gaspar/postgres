const express  = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3000
const errorRoutes = require("./src/controller/404")

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use(errorRoutes.errorPage)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
