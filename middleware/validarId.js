const {Gamer} = require("../models/tienda")
const validar = async (req, res, next) =>{
    const item = await Gamer.findById(req.params.id)
    if (item !== null){
        next()
    }else{
        res.status(500).json({ msg : "el id es invalido"})
    }
}

module.exports = {validar}