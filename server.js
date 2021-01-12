//Dependencies
const express = require('express');
const path = require('path');

//App set up
const app = express();
const PORT = process.env.PORT || 8088;

//Handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(express.static("routes"));

require("./routes/apiroutes")(app);
require("./routes/htmlroutes")(app);

//Start server
app.listen(PORT, function() {
    console.log(`App listening on PORT ${PORT}.`);
});