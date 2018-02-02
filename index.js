const https = require("https");
const chalk = require("chalk");

const handlePriceResponse = require("./handle-response");
const handleErrorCode = require("./handle-error-code");
const sendDeskRequest = require("./send-desk-request");
const { COINS, CHECK_PRICE_INTERVAL } = require("./constants");
const {
  DESK_API_BODY_RAISE,
  DESK_API_BODY_LOWER
} = require("./private-constants"); // See https://github.com/Nase00/pantheon

const coin = COINS.BITCOIN;

// State
let prevPrice = 0;
let nextPrice = 0;
let counter = 0;
let message = chalk.bgBlue("Initializing");

const handlePrice = ({ bpi }) => {
  prevPrice = nextPrice;
  nextPrice = bpi.USD.rate_float;

  if (prevPrice < nextPrice) {
    message = chalk.bgGreen("Buy lambo!");
    sendDeskRequest(DESK_API_BODY_RAISE);
  } else if (prevPrice > nextPrice) {
    message = chalk.bgRed(`Buy more ${coin.NAME}!`);
    sendDeskRequest(DESK_API_BODY_LOWER);
  } else {
    message = chalk.bgYellow("No change");
  }
};

const sendCheckPriceReq = () =>
  https
    .get(coin.API_URI, handlePriceResponse(handlePrice))
    .on("error", console.error);

const checkPrice = () => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);

  if (counter === CHECK_PRICE_INTERVAL) {
    sendCheckPriceReq();
    counter = 0;
    process.stdout.write(message);
  } else {
    process.stdout.write(`${message} ${".".repeat(counter)}`);
    counter += 1;
  }
};

sendCheckPriceReq();

setInterval(checkPrice, CHECK_PRICE_INTERVAL);
