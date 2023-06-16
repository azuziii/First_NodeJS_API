require("dotenv").config();

const {
  createServer
} = require("http"), {
    writeHead,
    JSONResponse
  } = require("./utils.js"),
  USERS = require("./controllers/users.js");

const PORT = process.env.PORT || 3000,
  ROUTES = [{
    reg: /^\/api\/users$/,
    methods: {
      "GET": USERS.getAll,
      "POST": USERS.addUser
    }
  }, {
    reg: /^\/api\/user\/(\w+)$/,
    methods: {
      "GET": USERS.getUser,
      "DELETE": USERS.remove,
      "PUT": USERS.edit
    },
  }];

const SERVER = createServer((req, res) => {
  const METHOD = req.method;

  // IDK no other to do this, I had to use .some. Will be updated later
  const R = ROUTES.some(route => {
    if (req.url.match(route.reg) && route.methods[METHOD]) {
      return route.methods[METHOD](req, res);
    }
  });

  if (!R) {
    writeHead(res, 404);
    res.end(JSONResponse({
      http_status: 404
    }));
  }
}).listen(PORT, () => console.log(`Server running on port ${PORT}`));