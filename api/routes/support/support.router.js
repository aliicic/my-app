const { SupportController } = require("../../http/controllers/support/support.controller");
// const { checkLogin, checkAccessLogin } = require("../../http/middlewares/auth");
const { ApiNamespaceRouter } = require("./namespace.router");
const { ApiRoomRouter } = require("./room.router");

const router = require("express").Router();
router.use("/namespace", ApiNamespaceRouter)
router.use("/room", ApiRoomRouter)
// router.get("/login", SupportController.loginForm)
// router.post("/login", SupportController.login)
// router.get("/", SupportController.renderChatRoom)
module.exports = {
    SupportSectionRouter : router
}