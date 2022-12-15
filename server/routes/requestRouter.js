const Router = require("express");
const router = new Router();
const requestController = require("../controllers/requestController");

router.post("/", requestController.create);
router.get("/", requestController.getAll);
router.get("/:id", requestController.getOne);
router.get("/accept/:id", requestController.acceptRequest);
router.get("/reject/:id", requestController.rejectRequest);

module.exports = router;
