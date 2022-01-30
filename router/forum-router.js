const forumController = require("../controller/forum-controller");
const authorization = require("../middleware/authorization");

module.exports = (app) => {
  app.get(
    "/daftar-forum",
    authorization.checkAuth,
    authorization.checkToken,
    forumController.daftar
  );
  app.get(
    "/detil-forum/:id",
    authorization.checkAuth,
    authorization.checkToken,
    forumController.detil
  );
  app.post(
    "/tambahkan-forum",
    authorization.checkAuth,
    authorization.checkToken,
    forumController.tambahkan
  );
  app.put(
    "/perbaharui-forum/:id",
    authorization.checkAuth,
    authorization.checkToken,
    forumController.perbaharui
  );
  app.delete(
    "/hapus-forum/:id",
    authorization.checkAuth,
    authorization.checkToken,
    forumController.hapus
  );
};
