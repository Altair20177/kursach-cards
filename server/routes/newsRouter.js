const Router = require("express");
const router = new Router();
const newsController = require("../controllers/newsController");

router.get("/", newsController.getAll);
router.get("/:id", newsController.getById);
router.post("/", newsController.create);
router.put("/:id", newsController.update);
router.delete("/:id", newsController.delete);

module.exports = router;
