const Router = require("express");
const router = new Router();
const organizationController = require("../controllers/organizationController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post("/", checkRoleMiddleware("admin"), organizationController.create);
router.get("/:id", organizationController.getOne);

module.exports = router;
