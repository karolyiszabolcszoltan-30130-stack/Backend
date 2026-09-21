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

const getKonyvBySzerzo = (req, res) => {
    const szerzo = req.params.szerzo.toLowerCase().replace(/\s/g, "");
    const konyv = konyvek.filter(konyv => {
        let kisbetus = konyv.author.toLowerCase().trim().replace(/\s/g, "")
        if(kisbetus == szerzo)
        {
            return konyv
        }
    });
    res.json(konyv);
}

const getKonyvekByCategory = (req, res) => {
    const kategoria = req.params.kategoria.toLowerCase().replace(/\s/g, "");
    const konyv = konyvek.filter(konyv => {
        let kisbetus = konyv.category.toLowerCase().replace(/\s/g, "");
        if(kisbetus == kategoria){
            return konyv;
        }
    });
    res.json(konyv);
}
// scope szintű véltozók pl: paramAr
const getKonyvekByArFelett = (req, res) => {
    let paramAr = Number(req.params.price);
    let konyvekByAr = konyvek.filter(konyv => konyv.price > paramAr);
    res.json(konyvekByAr);
}

const getKonyvekByOldalszam = (req, res) => {
    const paramOldalszam = Number(req.params.oldalszam);
    const konyvekByOldalszam = konyvek.filter(konyv => konyv.pages < paramOldalszam);
    res.json(konyvekByOldalszam);
}

const getEvUtaniKonyvek = (req, res) => {
    const paramEvszam = Number(req,params.evszam);
    const konyvekEvszamUtan = konyvek.filter(konyv => konyv.year > paramEvszam);
    res.json(konyvekEvszamUtan);
}
const createKonyv = (req, res) => {
    //Mit csinál ez a végpont?
    //1. Használható formába hozni a request.bodyt
    const {title, author, category, year, pages, price} = req.body;

    //2. Felépíteni a konyv objektumot
        // Az id, Views automatikus - default
    
    let maxId = 0;
    const azonositok = konyvek.map(konyv => konyv.id);
    for (let i = 0; i < azonositok.length; i++){
        if(azonositok[i] > maxId){
            maxId = azonositok[i];
        }
    }
    
    let views = 0; 
    let id = maxId + 1;

    let konyv = {
        id,
        title,
        author,
        category,
        year,
        pages,
        price,
        views
    }

    konyvek.push(konyv);
    //3. Visszaküldjük hogy sikeres
    //console.log(req.body);
    res.json({message: "Sikeres adatfelvétel!"});
}

const updateKonyv = (req, res) => {

    // ha nincs ilyen id amit törölni akarunk akkor "Törölni kivánt könyv nem elérhető!"
    const { id } = req.params;
    const { title, author, category, year, pages, price } = req.body;

    const konyv = konyvek.find(konyv => konyv.id === Number(id));

    if (!konyv) {
        return res.status(404).json({ message: "A törölni kívánt könyv nem elérhető!" });
    }

    if (title !== undefined) konyv.title = title;
    if (author !== undefined) konyv.author = author;
    if (category !== undefined) konyv.category = category;
    if (year !== undefined) konyv.year = Number(year);
    if (pages !== undefined) konyv.pages = Number(pages);
    if (price !== undefined) konyv.price = Number(price);

    res.status(200).json({ 
        message: "Sikeres módosítás!"
    });
};

const deleteKonyv = (req, res) => {
    const { id } = req.params;

    const index = konyvek.findIndex(konyv => konyv.id === Number(id));

    if (index === -1) {
        return res.status(404).json({ message: "A könyv nem található." });
    }

    konyvek.splice(index, 1);

    res.status(200).json({ message: "Könyv sikeresen törölve lett." });
};

module.exports = {
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
}