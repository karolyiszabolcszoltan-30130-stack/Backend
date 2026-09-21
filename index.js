const express = require("express");
const app = express();
const PORT = 3030;
const {
    getKonyvek,
    getKonyvById,
    getKonyvekByAr,
    getKonyvDarab,
    getKonyvByCim,
    getKonyvBySzerzo,
    getKonyvekByCategory,
    getKonyvekByArFelett,
    getKonyvekByOldalszam,
    getEvUtaniKonyvek,
    createKonyv,
    updateKonyv,
    deleteKonyv
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
app.get("/konyvek/szerzo/:szerzo", getKonyvBySzerzo);
app.get("/konyvek/kategoria/:kategoria", getKonyvekByCategory);
app.get("/konyvek/arfelett/:price", getKonyvekByArFelett);
app.get("/konyvek/oldalszam/:oldalszam", getKonyvekByOldalszam);
app.get("/konyvek/evszam/:evszam", getEvUtaniKonyvek);

app.post("/konyvek", createKonyv);

app.patch("/konyvek/:id", updateKonyv);

app.delete("/konyvek/:id", deleteKonyv)