const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Training & Placement Portal API is running on this port!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
