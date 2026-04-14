const express = require("express");
const cors = require("cors");

<<<<<<< HEAD
const app = express();
const pool = require("./config/db");

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// Test DB connection
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection error");
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
=======
app.get('/', (req, res) => res.send('Training & Placement Portal API is running on this port!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
>>>>>>> 7e8c37a514d0e29b2f0115d85b7ebe8fc65fe7c6
