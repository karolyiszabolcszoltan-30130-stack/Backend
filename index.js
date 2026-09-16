const express = require("express");
const app = express();
const PORT = 3030;
// http://localhost:3030
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({info: "Könyvek backend alkalmazás"})
});

app.listen(PORT, () => {
    console.log("Szerver elindult a " + PORT + "-as porton.")
});