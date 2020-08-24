const express = require('express')
const PORT = process.env.PORT
const app = express();
const metatag = require('./routes/metatag-finder');

app.use(express.json())

app.use('/api', metatag);

app.listen(PORT, () => console.log(`server running at ${PORT}`))