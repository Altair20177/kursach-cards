const Router = require("express");
const router = new Router();
const cardController = require("../controllers/cardController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post("/", checkRoleMiddleware("admin"), cardController.create);
router.get("/", cardController.getAll);

module.exports = router;