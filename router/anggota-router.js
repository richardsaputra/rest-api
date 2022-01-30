const anggotaController = require("../controller/anggota-controller");
const authorization = require("../middleware/authorization");

module.exports = (app) => {
  app.post("/registrasi", anggotaController.registrasi);
  app.post("/login", anggotaController.login);
  app.get(
    "/logout",
    authorization.checkAuth,
    authorization.checkToken,
    anggotaController.logout
  );
};
