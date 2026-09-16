const {konyvek} = require('../database/database')

const getKonyvek = (req, res) => {
    res.status(200).json(konyvek);
}

// 5os id konyvek
const getKonyvById = (req, res) => {
    let paramId = Number(req.params.id)
    let konyv = konyvek.filter(konyv => konyv.id == paramId);
    res.json(konyv);
}

const getKonyvekByAr = (req, res) => {
    let paramAr = Number(req.params.price);
    let konyvekByAr = konyvek.filter(konyv => konyv.price < paramAr);
    res.json(konyvekByAr);
}

const getKonyvDarab = (req, res) => {
    res.json({darab: konyvek.length});
}

const getKonyvByCim = (req, res) =>{
    const cim = req.params.cim.toLowerCase().trim();
    const konyv = konyvek.filter(konyv => {
        let kisbetus = konyv.title.toLowerCase().trim().replace(/\s/g, "")
        if(kisbetus == cim)
        {
            return konyv
        }
    });
    res.json(konyv);
}

module.exports = {
    getKonyvek,
    getKonyvById,
    getKonyvekByAr,
    getKonyvDarab,
    getKonyvByCim
}