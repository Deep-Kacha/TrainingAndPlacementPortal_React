const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Training & Placement Portal API is running on this port!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))