const FS = require("fs"),
  { STATUS_CODES } = require("http");

function JSONResponse(http_status, msg) {
  return JSON.stringify({
    message: msg || httpStatusToText(http_status),
  });
}

function httpStatusToText(statusCode) {
  return STATUS_CODES[statusCode];
}

function getBody(req) {
  return new Promise((res, rej) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      res(body);
    });

    req.on("error", (err) => {
      rej(err);
    });
  });
}

function writeToFile(file, data) {
  return FS.writeFileSync(file, data, "utf8", (err) => {
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
  JSONResponse,
  getBody,
  writeToFile,
  getID,
};
