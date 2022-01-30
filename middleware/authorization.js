const anggotaModel = require("../model/anggota-model");
const jwt = require("jsonwebtoken");

exports.checkAuth = (req, res, next) => {
  if (
    req.header("Authorization") === undefined ||
    req.header("Authorization") === null ||
    req.header("Authorization") === ""
  ) {
    return res.send({
      status: "error",
      message: "No authorization",
      data: null,
    });
  } else {
    if (req.header("Authorization") !== process.env.AUTH) {
      return res.send({
        status: "unauthorized",
        message: "Incorrect authorization",
        data: null,
      });
    }
  }
  next();
};

exports.checkToken = async (req, res, next) => {
  let sesiLogin = null;
  let verifiedJwt = null;
  if (
    req.header("Token") === undefined ||
    req.header("Token") === null ||
    req.header("Token") === ""
  ) {
    return res.send({
      status: "error",
      message: "No token",
      data: null,
    });
  } else {
    try {
      verifiedJwt = jwt.verify(req.header("Token"), process.env.JWT_SECRET);
    } catch (err) {
      return res.send({
        status: "error",
        message: err.message,
        data: null,
      });
    }
    sesiLogin = await anggotaModel.readBy(
      `sesi_login`,
      `token="${req.header("Token")}" and tanggal_logout is null`
    );
    if (sesiLogin.data.length === 0) {
      return res.send({
        status: "error",
        message: "Incorrect token",
        data: null,
      });
    }
  }
  const anggota = await anggotaModel.readBy(
    `anggota`,
    `id_anggota="${verifiedJwt._id}"`
  );
  res.locals.anggota = anggota.data[0];
  next();
};
