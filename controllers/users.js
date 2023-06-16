// The errors inside catch are all 500,
// because I don't know if they can be anything else other than server side.

const USERS = require("../models/users.js"),
  {
    writeHead,
    JSONResponse,
    getBody,
    getID
  } = require("../utils.js");

// @desc get all users
// @route GET /api/users
async function getAll(req, res) {
  try {
    const RESPONSE = await USERS.getAll();
    writeHead(res);
    res.end(JSON.stringify(RESPONSE));
  } catch (err) {
    console.log(err);
    writeHead(res, 500);
    res.end(JSONResponse({
      http_status: 500
    }));
  }
}

// @desc add user
// @route POST /api/users
async function addUser(req, res) {
  try {
    const BODY = await getBody(req);
    const RESPONSE = await USERS.add(JSON.parse(BODY));
    writeHead(res);
    res.end(JSON.stringify(RESPONSE));
  } catch (err) {
    console.log(err);
    writeHead(res, 500);
    res.end(JSONResponse({
      http_status: 500
    }));
  }
}

// @desc get user by id
// @route GET /api/user/:id
async function getUser(req, res) {
  try {
    const ID = getID(req.url),
      RESPONSE = await USERS.getById(ID);

    if (RESPONSE ? ? false) {
      writeHead(res);
      return res.end(JSON.stringify(RESPONSE));
    }

    writeHead(res, 404);
    return res.end(JSONResponse({
      msg: "User not found",
      http_status: 404
    }));
  } catch (err) {
    console.log(err);
    writeHead(res, 500);
    res.end(JSONResponse({
      http_status: 500
    }));
  }
}

// @desc remove user
// @route DELETE /api/user/:id
async function remove(req, res) {
  try {
    const ID = getID(req.url),
      RESPONSE = await USERS.getById(ID);

    if (RESPONSE ? ? false) {
      await USERS.remove(ID);
      writeHead(res);
      return res.end(JSONResponse({
        msg: `Removed user with id ${ID}`
      }));
    }

    writeHead(res, 404);
    return res.end(JSONResponse({
      msg: "User not found",
      http_status: 404
    }));
  } catch (err) {
    console.log(err);
    writeHead(res, 500);
    res.end(JSONResponse({
      http_status: 500
    }));
  }
}

// @desc edit user
// @route PUT /api/user/:id
async function edit(req, res) {
  try {
    const BODY = await getBody(req);
    const ID = getID(req.url),
      RESPONSE = await USERS.getById(ID);

    if (RESPONSE ? ? false) {
      const UPDATED_USER = await USERS.edit(ID, JSON.parse(BODY));
      writeHead(res);
      return res.end(JSON.stringify(UPDATED_USER));
    }

    writeHead(res, 404);
    return res.end(JSONResponse({
      msg: "User not found",
      http_status: 404
    }));
  } catch (err) {
    console.log(err);
    writeHead(res, 500);
    res.end(JSONResponse({
      http_status: 500
    }));
  }
}

module.exports = {
  getAll,
  addUser,
  getUser,
  remove,
  edit
};