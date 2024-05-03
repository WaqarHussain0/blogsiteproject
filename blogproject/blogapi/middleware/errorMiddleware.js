const fs = require("fs");
const path = require("path");

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  // Read and send custom error page HTML file
  const errorPagePath = path.join(
    __dirname,
    "../errorpages",
    `${statusCode}.html`
  );
  fs.readFile(errorPagePath, "utf8", (readErr, data) => {
    if (readErr) {
      // If custom error page not found, send default error message
      res.status(statusCode).send(`Error ${statusCode}: ${err.message}`);
    } else {
      res.status(statusCode).send(data);
    }
  });
};

module.exports = errorMiddleware;
