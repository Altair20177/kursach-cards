const Router = require("express");
const router = new Router();
const cardController = require("../controllers/cardController");

router.post("/", cardController.create);
router.get("/", cardController.getAll);

module.exports = router;
