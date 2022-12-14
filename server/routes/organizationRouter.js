const Router = require("express");
const router = new Router();
const organizationController = require("../controllers/organizationController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post("/", checkRoleMiddleware("admin"), organizationController.create);
router.get("/:organization", organizationController.getOne);
router.get(
  "/getCards/:userId",
  organizationController.getCardsFromOrganization
);
router.get(
  "/getByAdmin/:userId",
  organizationController.getOrganizationByAdminId
);
router.post("/update", organizationController.updateOrganization);

module.exports = router;
