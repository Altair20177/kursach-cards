const Router = require("express");
const router = new Router();
const favouriteController = require("../controllers/favouriteController");

router.post("/", favouriteController.create);
router.get("/:userId", favouriteController.getAllByUserId);
router.delete("/:userId/:cardId", favouriteController.deleteCardFromFavourites);

module.exports = router;
