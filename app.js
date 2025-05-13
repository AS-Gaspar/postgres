const express  = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3000
const errorRoutes = require("./src/controller/404")
const db = require('./src/models')
const buildRoutes = require('./src/routes/build.routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use('/api/builds', buildRoutes)
app.use(errorRoutes.errorPage)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
