const express = require('express')
const port = 3000
const app = express();
const metatag = require('./routes/metatag-finder');

app.use(express.json())

app.use('/api', metatag);

app.listen(port, () => console.log(`server running at ${port}`))