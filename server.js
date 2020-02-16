"use strict";

const express = require("express");
const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, () => console.log(`This is listening on port ${PORT}`));
