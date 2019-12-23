"use strict";

const fs = require("fs");
require.extensions[".html"] = function(module, filename) {
  module.exports = fs.readFileSync(filename, "utf8");
};

const results = ["נ", "ג", "ה", "ש"];
const notFound = require("404.html");
const showResult = require("dreidel.html");

const generateResponse = (
  body,
  statusCode,
  contentType = "text/html",
  isBase64Encoded = false
) => ({
  isBase64Encoded,
  statusCode,
  headers: { "Content-Type": contentType },
  body
});

exports.main_handler = async (event, context, callback) => {
  console.log("%j", event);
  const result = Math.trunc(Math.random() * 4);
  if (event.path === "/challenge-1/api")
    return generateResponse(
      JSON.stringify({ result: results[result] }),
      200,
      "application/json"
    );

  if (event.path === "/challenge-1/dreidel")
    return generateResponse(
      showResult.replace("{{$result}}", results[result]),
      200
    );

  return generateResponse(notFound, 404);
};
