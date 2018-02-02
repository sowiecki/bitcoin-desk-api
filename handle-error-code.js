const handleErrorCode = ({ statusCode, headers }, template) => {
  const contentType = headers["content-type"];
  const error = (error = new Error(
    "Request Failed.\n" + `Status Code: ${statusCode}`
  ));

  console.error(error.message);
};

module.exports = handleErrorCode;
