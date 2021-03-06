import "dotenv/config";
import express from "express";
import { engine } from "express-handlebars";
import "express-async-errors";

import hallOfGloryRouter from "./routers/hall-of-glory-router";
import homeRouter from "./routers/home-router";
import registerRouter from "./routers/register-routers";
import arenaRouter from "./routers/arena-router";
import { handlebarsHelpers } from "./utils/handlebars-helpers";
import { errorHandler } from "./middlewares/errors";

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    helpers: handlebarsHelpers,
  })
);
app.set("view engine", "hbs");

app.use("/", homeRouter());
app.use("/register", registerRouter());
app.use("/hall-of-glory", hallOfGloryRouter());
app.use("/arena", arenaRouter());

app.use(errorHandler);

app.listen(3000, () => console.log("Server listening on port 3000"));
