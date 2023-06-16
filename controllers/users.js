// The errors inside catch are all 500,
// because I don't know if they can be anything else other than server side.

const USERS = require("../models/users.js"),
  { JSONResponse, getBody, getID } = require("../utils.js");

// @desc get all users
// @route GET /api/users
async function getAll(req, res) {
  try {
    const RESPONSE = await USERS.getAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(RESPONSE));
  } catch (err) {
    console.log(err);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSONResponse(500)
    );
  }
}

// @desc add user
// @route POST /api/users
async function addUser(req, res) {
  try {
    const BODY = await getBody(req);
    const RESPONSE = await USERS.add(JSON.parse(BODY));
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(RESPONSE));
  } catch (err) {
    console.log(err);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSONResponse(500)
    );
  }
}

// @desc get user by id
// @route GET /api/user/:id
async function getUser(req, res) {
  try {
    const ID = getID(req.url),
      RESPONSE = await USERS.getById(ID);

    if (RESPONSE ?? false) {
    res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(RESPONSE));
    }

    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(
      JSONResponse(404, "user not found")
    );
  } catch (err) {
    console.log(err);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSONResponse(500)
    );
  }
}

// @desc remove user
// @route DELETE /api/user/:id
async function remove(req, res) {
  try {
    const ID = getID(req.url),
      RESPONSE = await USERS.getById(ID);

    if (RESPONSE ?? false) {
      await USERS.remove(ID);
    res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(
        JSONResponse(200, `removed user with id ${ID}`)
      );
    }

    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(
      JSONResponse(404, "user not found")
    );
  } catch (err) {
    console.log(err);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSONResponse(500)
    );
  }
}

// @desc edit user
// @route PUT /api/user/:id
async function edit(req, res) {
  try {
    const BODY = await getBody(req);
    const ID = getID(req.url),
      RESPONSE = await USERS.getById(ID);

    if (RESPONSE ?? false) {
      const UPDATED_USER = await USERS.edit(ID, JSON.parse(BODY));
    res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(UPDATED_USER));
    }

    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(
      JSONResponse(404, "user not found")
    );
  } catch (err) {
    console.log(err);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSONResponse(500)
    );
  }
}

module.exports = {
  getAll,
  addUser,
  getUser,
  remove,
  edit,
};
