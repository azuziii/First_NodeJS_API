const USERS = require("../data/users.json"),
  {
    writeToFile
  } = require("../utils.js");

function getAll() {
  return new Promise((res, rej) => {
    res(USERS);
  });
}

function getById(id) {
  return new Promise((res, rej) => {
    const USER = USERS.find(user => user.id == id);

    res(USER);
  });
}

function add(body) {
  return new Promise((res, rej) => {
    const USER = {
      id: Math.floor(Math.random() * 1000000),
      ...body
    };

    USERS.push(USER);
    writeToFile("./data/users.json", JSON.stringify(USERS));
    res(USER);
  });
}

function remove(id) {
  return new Promise((res, rej) => {
    const INDEX = USERS.findIndex(user => user.id == id);

    USERS.splice(INDEX, 1);
    writeToFile("./data/users.json", JSON.stringify(USERS));
    res(INDEX);
  });
}

function edit(id, content) {
  return new Promise((res, rej) => {
    const INDEX = USERS.findIndex(user => user.id == id);
    const OLD_USER = USERS[INDEX];
    const USER = {
      ...OLD_USER,
      ...content,
      id
    };
    USERS[INDEX] = USER;
    writeToFile("./data/users.json", JSON.stringify(USERS));
    res(USER);
  });
}

module.exports = {
  getAll,
  add,
  getById,
  remove,
  edit
};