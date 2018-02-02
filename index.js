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

let prevPrice = 0;
let nextPrice = 0;

const handlePrice = ({ bpi }) => {
  prevPrice = nextPrice;
  nextPrice = bpi.USD.rate_float;

  // Wait to compare two prices
  if (![prevPrice, nextPrice].includes(0)) return;

  if (prevPrice < nextPrice) {
    console.log(chalk.bgGreen("Buy lambo!"));
    sendDeskRequest(DESK_API_BODY_RAISE);
  } else if (prevPrice > nextPrice) {
    console.log(chalk.bgRed(`Buy more ${coin.NAME}!`));
    sendDeskRequest(DESK_API_BODY_LOWER);
  } else {
    console.log(chalk.bgYellow("No change"));
  }
};

const checkPrice = () =>
  https
    .get(coin.API_URI, handlePriceResponse(handlePrice))
    .on("error", console.error);

setInterval(checkPrice, CHECK_PRICE_INTERVAL);
