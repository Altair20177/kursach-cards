const Router = require("express");
const router = new Router();
const organizationController = require("../controllers/organizationController");

router.post("/", organizationController.create);
router.get("/:id", organizationController.getOne);
router.get("/", organizationController.getAll);

module.exports = router;
