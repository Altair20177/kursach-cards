const Router = require("express");
const router = new Router();
const cardController = require("../controllers/cardController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post("/", checkRoleMiddleware("admin"), cardController.create);
router.get("/toAccept", cardController.getCardsToAccept);
router.get("/:id", cardController.getCardById);
router.put("/:id", cardController.updateCard);
router.get("/category/:categoryId", cardController.getAllByCategoryId);
router.get("/byOrganization/:id", cardController.getAllByOrganizationId);
router.get("/acceptCard/:cardId", cardController.acceptCard);
router.get("/rejectCard/:cardId", cardController.rejectCard);
router.post("/excel", cardController.createFromExcel);

module.exports = router;
