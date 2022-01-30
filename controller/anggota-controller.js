const anggotaModel = require("../model/anggota-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registrasi = async (req, res) => {
  try {
    const kata_sandi = bcrypt.hashSync(req.body.kata_sandi, 10);
    return res.send(
      await anggotaModel.create(
        `anggota`,
        `id_jenis_keanggotaan, nama, email, kata_sandi, dibuat`,
        `${req.body.id_jenis_keanggotaan}, "${req.body.nama}", "${req.body.email}", "${kata_sandi}", now()`
      )
    );
  } catch (err) {
    return res.send({
      status: "error",
      message: err.message,
      data: null,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const anggota = await anggotaModel.readBy(
      `anggota`,
      `email="${req.body.email}"`
    );
    if (
      anggota.data.length === 0 ||
      !bcrypt.compareSync(req.body.kata_sandi, anggota.data[0].kata_sandi)
    ) {
      return res.send({
        status: "error",
        message: "Incorrect email or password",
        data: null,
      });
    }
    const sesiLogin = await anggotaModel.readBy(
      `sesi_login`,
      `id_anggota="${anggota.data[0].id_anggota}" and tanggal_logout is null`
    );
    if (sesiLogin.data.length !== 0) {
      const hapusSesiLogin = await anggotaModel.update(
        `sesi_login`,
        `tanggal_logout = now()`,
        `id_anggota="${anggota.data[0].id_anggota}" and tanggal_logout is null`
      );
      if (hapusSesiLogin.data.affectedRows === 0) {
        return res.send({
          status: "error",
          message: "Fail to delete login session",
          data: null,
        });
      }
    }
    const token = jwt.sign(
      { _id: anggota.data[0].id_anggota },
      process.env.JWT_SECRET
    );
    const buatSesiLogin = await anggotaModel.create(
      `sesi_login`,
      `id_anggota, token, tanggal_login`,
      `${anggota.data[0].id_anggota}, "${token}", now()`
    );
    if (buatSesiLogin.data.affectedRows === 0) {
      return res.send({
        status: "error",
        message: "Fail to create login session",
        data: null,
      });
    }
    return res.header("token", token).send(anggota);
  } catch (err) {
    return res.send({
      status: "error",
      message: err.message,
      data: null,
    });
  }
};

exports.logout = async (req, res) => {
  const hapusSesiLogin = await anggotaModel.update(
    `sesi_login`,
    `tanggal_logout = now()`,
    `id_anggota="${res.locals.anggota.id_anggota}" and tanggal_logout is null`
  );
  if (hapusSesiLogin.data.affectedRows === 0) {
    return res.send({
      status: "error",
      message: "Fail to delete login session",
      data: null,
    });
  }
  return res.send(hapusSesiLogin);
};
