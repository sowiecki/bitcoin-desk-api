const http = require("http");

const { DESK_API_OPTIONS } = require("./private-constants"); // See https://github.com/Nase00/pantheon

module.exports = sendDeskRequest = body => {
  const req = http.request(DESK_API_OPTIONS, res => {
    res.setEncoding("utf8");
  });

  req.on("error", console.error);
  req.write(JSON.stringify(body));
  req.end();
};
