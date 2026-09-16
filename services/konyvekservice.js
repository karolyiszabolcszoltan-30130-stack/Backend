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

module.exports = {
    getKonyvek,
    getKonyvById
}