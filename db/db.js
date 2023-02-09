const mongoose = require("mongoose")

const conect = async () =>{
    try {
        await mongoose.connect("mongodb+srv://juan:milanesa@cluster0.0bf5i.mongodb.net/test")
        console.log("base conectada")
    } catch {
        console.log("no se pudo conectar a la base de datos")
    }
}

module.exports = { conect }