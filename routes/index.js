const express = require("express")
const router = express.Router()
const {indexController, vistaGeneral, vistaUnica,busqueda,crearItem,editarItem, elimirItem, prueba, loginToken, verificarToken, ejemploDePass, consultaAxios, crearSession, consultarSession, cerrarSession,login} = require("../controller/controller")
const {validar} = require("../middleware/validarId")
const {check} = require("express-validator") // npm i express-validator
const auth = require("../middleware/auth")
const validarJWT = require("../middleware/validarToken")


//get
router.get('/', indexController)
router.get('/ver', vistaGeneral)
router.get('/ver/:id',validar,vistaUnica)
router.get('/buscar/:name',busqueda)
router.get('/token',prueba)
router.get('/validartoken',validarJWT,verificarToken)
router.get('/pass',ejemploDePass)
router.get('/poke',consultaAxios)
router.get('/versession',crearSession)
router.get('/consultar',auth,consultarSession)
router.get('/cerrar', cerrarSession)

//post //"" +3 -24
router.post('/crear',[
    check("name").not().isEmpty().withMessage("El campo name no puede estar vacio").isLength({min:3,max:24}).withMessage("El campo nombre debe tener mas de tres letras pero menos de 24"),
    check("price").not().isEmpty().withMessage("El campo price no puede guardarse vacio"),
    check("stock").not().isEmpty().withMessage("El campo stock no puede viajar vacio")
],crearItem)
router.post('/login',login)
router.post('/logintoken',[
    check("email").not().isEmpty().withMessage("No se coloco un email").isEmail().withMessage("Lo que se coloco no es un email"),
    check("password").not().isEmpty().withMessage("no se ingreso una contraseña")
],loginToken)


//put
router.put('/editar/:id',validar,[
    check("name").not().isEmpty().withMessage("Se tiene que cargar un nombre"),
    check("price").not().isEmpty().withMessage("Se tiene que cargar un precio"),
    check("stock").not().isEmpty().withMessage("Se tiene que cargar si esta en stock")
],editarItem)

//delete
router.delete('/eliminar/:id',validar,elimirItem)

router.post("/hola",(req, res)=>{
    res.send("prueba post")
})



module.exports = router
  