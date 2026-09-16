const express = require("express");
const app = express();
const PORT = 3030;
const {
    getKonyvek,
    getKonyvById,
    getKonyvekByAr,
    getKonyvDarab,
    getKonyvByCim
} = require("./services/konyvekservice");
// http://localhost:3030
app.use(express.json());

app.listen(PORT, () => {
    console.log("Szerver elindult a " + PORT + "-as porton.")
});
app.get("/", (req, res) => {
    res.status(200).json({info: "Könyvek backend alkalmazás"})
});


app.get("/konyvek", getKonyvek);
app.get("/konyvek/db", getKonyvDarab);
//Parameteres a lista aljara:
app.get("/konyvek/:id", getKonyvById);
app.get("/konyvek/ar/:price", getKonyvekByAr);
app.get("/konyvek/cim/:cim", getKonyvByCim);

