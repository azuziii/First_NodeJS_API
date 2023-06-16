const FS = require("fs");

function writeHead(res, http_status = 200, content_type = "Content-Type": "application/json") {
  return res.writeHead(http_status, {
    content_type
  });
}

function JSONResponse({
  msg,
  http_status
}) {
  const MSG = httpToMsg(http_status);
  return JSON.stringify({
    message: msg || MSG
  });
}

function httpToMsg(status) {
  switch (status) {
    case 404:
      return "route not found";
    case 500:
      return "Internal server error";
  }
}

function getBody(req) {
  return new Promise((res, rej) => {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", () => {
      res(body);
    });

    req.on("error", err => {
      rej(err);
    });
  });
}

function writeToFile(file, data) {
  console.log(data);
  return FS /*.promises*/ .writeFileSync(file, data, "utf8", err => {
    if (err) {
      console.log(err);
    }
  });
}

function getID(url) {
  const URL_SPLITTED = url.split("/");
  return URL_SPLITTED[URL_SPLITTED.length - 1];
}

module.exports = {
  writeHead,
  JSONResponse,
  getBody,
  writeToFile,
  getID
};