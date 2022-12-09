const Router = require("express");
const router = new Router();
const categoryController = require("../controllers/categoryController");

router.post("/", categoryController.create);
router.get("/:categoryName", categoryController.getOne);
router.get("/", categoryController.getAll);

module.exports = router;
