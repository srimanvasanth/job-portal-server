const express = require("express");
const cors = require("./config/corsConfig");
const router = require("./config/routerConfig");
const logger = require("./logger");
const codingQuestionParser = require("./utilities/jsonParser");
const app = express();
const port = process.env.PORT || 5001

codingQuestionParser();
app.use(cors);
app.use(logger);
app.use(express.json());
app.use(router);


app.listen(port, (req, res) => {
    console.log("server started on PORT", port)
})