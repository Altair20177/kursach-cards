const Router = require("express");
const router = new Router();

const cardRouter = require("./cardRouter");
const favouriteRouter = require("./favouriteRouter");
const organizationRouter = require("./organizationRouter");
const requestRouter = require("./requestRouter");
const userRouter = require("./userRouter");
const categoryRouter = require("./categoryRouter");

router.use("/user", userRouter);
router.use("/card", cardRouter);
router.use("/organization", organizationRouter);
router.use("/request", requestRouter);
router.use("/favourite", favouriteRouter);
router.use("/category", categoryRouter);

module.exports = router;
