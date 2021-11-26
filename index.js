const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes/productsRoute");

const port = process.env.PORT || 5010;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routes);

app.get("/", (req, res) => {
    res.json({
        message: "server running in",
        serverTime: new Date(),
    });
});

app.get("*", (req, res) => {
    res.status(404).send("Page Not Found");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});