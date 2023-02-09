const {Gamer} = require("../models/tienda")
const {User} = require("../models/user")
const {validationResult} = require("express-validator")
const bcrypt = require("bcryptjs")
const axios = require("axios")
const generarToken = require("../helpers/generadorJWT")
const setHeaders = require("../helpers/headers")


const indexController = (req, res) =>{
    res.send('Hello World!')
}
const crearSession = (req, res)=>{
    let persona = {
        nombre: "juan",
        edad: 25
    }
    req.session.usuario = persona
    res.json(req.session)
}

const consultarSession = (req, res)=>{
    res.json(req.session.usuario)
}

const cerrarSession = (req, res)=>{
    req.session.destroy()
    res.json({
        msg: "session cerrada"
    })
}

const login = async (req, res)=>{
    try {
        const err = validationResult(req)
        if (err.isEmpty()) {
            const usuario = await User.findOne({email: req.body.email}) 
            if (usuario == null) {
                res.json({msg:"El mail o la contraseña esta mal"})
            }
            if (!bcrypt.compareSync(req.body.password, usuario.password)) {
                res.json({msg:"El mail o la contraseña esta mal"})
            }
            const user ={
                _id: usuario._id,
                name: usuario.name
            }
            req.session.usuario = user
        } else {
            res.json({err})
        }
    } catch (error) {
        res.json({error})
    }
}

const ejemploDePass = (req, res) =>{
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(req.body.pass, salt)
    let compare = bcrypt.compareSync(req.body.pass, hash)

    res.json({pass: req.body.pass, hash, compare})
}


const consultaAxios = async(req, res) =>{
    try {
        const respuesta = await axios.get("https://pokeapi.co/api/v2/pokemon/")
        res.json({data: respuesta.data, status: respuesta.status})
    } catch (error) {
        res.json({data: error.response.data, status: error.response.status})
    }
}

const register = async (req, res) =>{
    try {
        const err = validationResult(req)
        if (err.isEmpty()) {
            let salt = bcrypt.genSaltSync(10)
            let hash = bcrypt.hashSync(req.body.pass, salt)
            let usuario = {
                name: req.body.name,
                email: req.body.email,
                password: hash
            }
            const item = new User(usuario)
            await item.save()
            res.status(201).json({item})
        } else {
            res.status(501).json(err)
        }
    } catch (error) {
        res.status(501).json({error})
    }
}


const vistaGeneral = async (req, res) =>{
    const item = await Gamer.find()
    res.status(200).json({ item })
}

const vistaUnica = async (req, res) =>{
    const item = await Gamer.findById(req.params.id)
    res.status(200).json({ item })
}
const busqueda = async (req, res) =>{
    const item = await Gamer.findOne({name: req.params.name})
    res.status(200).json({ item })
}


const crearItem = async (req, res) =>{
    try {
        const err = validationResult(req)
        if (err.isEmpty()) {
            const item = new Gamer(req.body)
            await item.save()
            res.status(201).json({item})
        } else {
            res.status(501).json(err)
        }
    } catch (error) {
        res.status(501).json({error})
    }
}

const editarItem = async (req, res) =>{
    try {
        const err = validationResult(req)
        if (err.isEmpty()) {
           await Gamer.findByIdAndUpdate(req.params.id, req.body)
           res.status(201).json({msg: "se actualizo"})
        } else {
            res.status(501).json(err)
        }
    } catch (error) {
        res.status(501).json({error})
    }
}

const elimirItem = async (req, res)=>{
    item = await Gamer.findByIdAndDelete(req.params.id)
    res.status(200).json({msg: "el item siguiente se elimino corrctamente", item})
}


const prueba = async (req, res) =>{
    const token = await generarToken(req.body)
    res.json(token)
}

const loginToken = async (req, res) =>{

    try {
        const err = validationResult(req)
        if (err.isEmpty()) {
            const usuario = await User.findOne({email: req.body.email})

            if (usuario == null ) {
                res.json({msg: "El mail o la contraseña es incorrecto"})     
            }
            if (!bcrypt.compareSync(req.body.password, usuario.password)) {
                res.json({msg: "El mail o la contraseña es incorrecto"}) 
            }
            const token = await generarToken({id:usuario._id, email:usuario.email})
            if (req.body.remember) {
                res.cookie("tokenDelUsuario", token, {maxAge: 60000*60*24})
            }
            res.json({email: req.body.email, token})
        } else {
            res.status(501).json(err)
        }
    } catch (error) {
        res.json(error)
    }
}

const verificarToken = (req, res)=>{
    
    res.json({msg: "paso token valido"})
}





module.exports = {indexController, vistaGeneral,vistaUnica,busqueda, crearItem, editarItem, elimirItem, prueba, loginToken,verificarToken, ejemploDePass, consultaAxios, crearSession, consultarSession, cerrarSession,login}