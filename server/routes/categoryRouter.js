const Router = require("express");
const router = new Router();
const categoryController = require("../controllers/categoryController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post("/", checkRoleMiddleware("admin"), categoryController.create);
router.get("/:id", categoryController.getOne);
router.get("/", categoryController.getAll);

module.exports = router;
