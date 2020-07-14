let express = require('express');
const bodyParser = require("body-parser");

app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(8000, function () {
  console.log("server is running on port 3000");
});

let routes = require("./routes/gradesRoutes");

routes(app);
