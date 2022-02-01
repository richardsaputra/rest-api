const forumModel = require("../model/forum-model");

exports.daftar = async (req, res) => {
  try {
    console.log(res.locals.anggota);
    return res.send(await forumModel.readAll(`forum`));
  } catch (err) {
    return res.send({
      status: "error",
      message: err.message,
      data: null,
    });
  }
};

exports.detil = async (req, res) => {
  try {
    console.log(res.locals.anggota);
    return res.send(
      await forumModel.readBy(`forum`, `id_forum=${req.params.id}`)
    );
  } catch (err) {
    return res.send({
      status: "error",
      message: err.message,
      data: null,
    });
  }
};

exports.detilV2 = async (req, res) => {
  try {
    return res.send(await forumModel.readByV2(`forum`, req.params.id));
  } catch (err) {
    return res.send({
      status: "error",
      message: err.message,
      data: null,
    });
  }
};

exports.tambahkan = async (req, res) => {
  try {
    console.log(res.locals.anggota);
    return res.send(
      await forumModel.create(
        `forum`,
        `id_sub_kategori, judul, isi, dibuat`,
        `${req.body.id_sub_kategori}, "${req.body.judul}", "${req.body.isi}", now()`
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

exports.perbaharui = async (req, res) => {
  console.log(res.locals.anggota);
  return res.send(
    await forumModel.update(
      `forum`,
      `id_sub_kategori = ${req.body.id_sub_kategori}, judul = "${req.body.judul}", isi = "${req.body.isi}"`,
      `id_forum=${req.params.id}`
    )
  );
};

exports.hapus = async (req, res) => {
  console.log(res.locals.anggota);
  return res.send(
    await forumModel.delete(`forum`, `id_forum=${req.params.id}`)
  );
};
