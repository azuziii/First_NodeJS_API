require("dotenv").config();

const { createServer } = require("http");
const { JSONResponse } = require("./utils.js");
const USERS = require("./controllers/users.js");
const PORT = process.env.PORT || 3000;
const ROUTES = [
  {
    reg: /^\/api\/users$/,
    methods: {
      GET: USERS.getAll,
      POST: USERS.addUser,
    },
  },
  {
    reg: /^\/api\/user\/(\w+)$/,
    methods: {
      GET: USERS.getUser,
      DELETE: USERS.remove,
      PUT: USERS.edit,
    },
  },
];

const SERVER = createServer((req, res) => {
  const REQUEST_METHOD = req.method;

  const MATCHED_ROUTE = ROUTES.find(
    (route) => req.url.match(route.reg) && route.methods[REQUEST_METHOD]
  );

  if (!MATCHED_ROUTE) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSONResponse(404, "route not found"));
  } else {
    MATCHED_ROUTE.methods[REQUEST_METHOD](req, res);
  }
}).listen(PORT, () => console.log(`Server running on port ${PORT}`));
