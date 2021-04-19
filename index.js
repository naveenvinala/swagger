const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const low = require("lowdb");
const swaggerUI = require("swagger-ui-express");
const booksRouter = require("./api/v1/routes/books");
const bodyParser = require("body-parser");
const YAML = require('yamljs');
const fs = require('fs');

const PORT = process.env.PORT || 4000;

const swaggerDocument = YAML.load('./api/config/swagger/swagger.yaml');

const FileSync = require("lowdb/adapters/FileSync");

fs.mkdir("./database", { recursive: true }, function (err) {
    if (err) {
        console.log(err)
    } else {
        console.log("New directory successfully created.")
    }
})

const adapter = new FileSync("./database/db.json");
const db = low(adapter);
db.defaults({ books: [] }).write();

const app = express();
app.db = db;
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", booksRouter);

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
