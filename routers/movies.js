//importo 
const express = require("express")
const movieController = require("../controllers/movieController")

//creo router
const router = express.Router();

//definisco rotte

//INDEX
router.get("/", movieController.index);

//SHOW
router.get("/:id", movieController.show)

module.exports = router