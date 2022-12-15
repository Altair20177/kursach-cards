const Router = require("express");
const router = new Router();
const cardController = require("../controllers/cardController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post("/", checkRoleMiddleware("admin"), cardController.create);
router.post("/byCategory", cardController.getAllByCategoryId);
router.get("/byOrganization", cardController.getAllByOrganizationId);
router.get("/toAccept", cardController.getCardsToAccept);
router.get("/acceptCard/:cardId", cardController.acceptCard);
router.get("/rejectCard/:cardId", cardController.rejectCard);

module.exports = router;
