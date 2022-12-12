const Router = require("express");
const router = new Router();
const cardController = require("../controllers/cardController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post("/", checkRoleMiddleware("admin"), cardController.create);
router.post("/byCategory", cardController.getAllByCategoryId);
router.get("/byOrganization", cardController.getAllByOrganizationId);

module.exports = router;
