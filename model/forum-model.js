const database = require("../config/database");
const query = require("../helper/query");
const redis = require("../config/redis");
const redisReset = require("../helper/redis-reset");

exports.readAll = async (table) => {
  let result = await redis.get(table);
  if (result === null) {
    result = await query.execute(database, `select * from ${table}`);
    redis.set(table, JSON.stringify(result));
    console.log("Membaca data dari mysql");
    return result;
  } else {
    console.log("Membaca data dari redis");
    return JSON.parse(result);
  }
};

exports.readBy = async (table, where) => {
  let result = await redis.get(`${table}?${where}`);
  if (result === null) {
    result = await query.execute(
      database,
      `select * from ${table} where ${where}`
    );
    redis.set(`${table}?${where}`, JSON.stringify(result));
    console.log("Membaca data dari mysql");
    return result;
  } else {
    console.log("Membaca data dari redis");
    return JSON.parse(result);
  }
};

exports.create = async (table, columns, values) => {
  const result = await query.execute(
    database,
    `insert into ${table}(${columns}) values(${values})`
  );
  console.log("Menambahkan data ke mysql");
  redisReset.resetAllForumCache();
  return result;
};

exports.update = async (table, set, where) => {
  const result = await query.execute(
    database,
    `update ${table} set ${set} where ${where}`
  );
  console.log("Meperbaharui data di mysql");
  redisReset.resetAllForumCache();
  return result;
};

exports.delete = async (table, where) => {
  const result = await query.execute(
    database,
    `delete from ${table} where ${where}`
  );
  console.log("Menghapus data dari mysql");
  redis.del(`${table}?${where}`);
  redisReset.resetAllForumCache();
  return result;
};
