const express = require("express");

const mainController = require("../controllers/main");

const router = express.Router();

router.get("/",mainController.listInstruments);

router.get("/shopping_cart",mainController.getCart);

router.post("/shopping_cart",mainController.postCart);

router.post("/shopping_cart_del_item", mainController.postCartDelItem);

router.post("/clear_shopping_cart", mainController.clearShoppingCart);

router.post("/finalize_shopping", mainController.finalizeShopping);

module.exports = router;