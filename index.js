const https = require("https");

const handlePriceResponse = require("./handle-response");
const handleErrorCode = require("./handle-error-code");
const { API_URI } = require("./constants");

const handlePrice = ({ bpi }) => console.log(bpi);

const checkPrice = () =>
  https
    .get(API_URI, handlePriceResponse(handlePrice))
    .on("error", console.error);

checkPrice();
