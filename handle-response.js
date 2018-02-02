const handlePriceResponse = callback => res => {
  const { statusCode } = res;
  const contentType = res.headers["content-type"];

  if (statusCode !== 200) {
    const error = new Error("Request Failed.\n" + `Status Code: ${statusCode}`);
    console.error(error.message);
    res.resume();
    return;
  }

  res.setEncoding("utf8");

  let rawData = "";

  res.on("data", chunk => {
    rawData += chunk;
  });

  res.on("end", () => {
    try {
      const parsedData = JSON.parse(rawData);
      callback(parsedData);
    } catch (e) {
      console.error(e.message);
    }
  });
};

module.exports = handlePriceResponse;
