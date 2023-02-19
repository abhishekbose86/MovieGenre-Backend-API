const express = require ("express");
const genreRoute = require("./routes/genreRoute")
const app = express();


const port = 3000 || process.env.port
app.use(express.json());
app.use("/api/genres",genreRoute);
app.listen(port);


