const express = require("express");
const app = express();
const routes = require("./routes")
const {logRequest, apiKeyMiddleware} = require("./middleware")

app.use(routes)

const PORT = 3000;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});

app.get("/authorized", apiKeyMiddleware, (req, res) => {
    res.send("You are now authorized.");
});

app.get("/middleware", logRequest, (req, res) => {
    console.log("We have implemented our first middleware!!");
});
