const mongoose = require("mongoose")

const Schema = mongoose.Schema
const schema = new Schema ({
    name: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    stock:{
        type: Boolean
    }
})

const Gamer = mongoose.model('Gamer', schema)
module.exports = { Gamer }