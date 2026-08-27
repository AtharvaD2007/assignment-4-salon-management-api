require("dotenv").config();

const express = require("express");

const authRoutes =
    require("./routes/authRoutes");

const salonRoutes =
    require("./routes/salonRoutes");

const serviceRoutes =
    require("./routes/serviceRoutes");

const loggerMiddleware =
    require("./middleware/loggerMiddleware");

const app = express();

app.use(express.json());

app.use(loggerMiddleware);


app.use("/", authRoutes);

app.use("/salons", salonRoutes);

app.use("/", serviceRoutes);


const PORT =
    process.env.PORT || 4000;

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});