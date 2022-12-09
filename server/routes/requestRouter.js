const Router = require("express");
const router = new Router();
const requestController = require("../controllers/requestController");

router.post("/", requestController.create);
router.get("/", requestController.getAll);
router.get("/:id", requestController.getOne);

module.exports = router;
