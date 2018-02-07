module.exports.COINS = {
  BITCOIN: {
    NAME: "Bitcoin",
    API_URI: "https://api.coindesk.com/v1/bpi/currentprice.json"
  }
};

module.exports.CHECK_PRICE_INTERVAL = 25;

module.exports.GDAX_SELECTORS = {
  BITCOIN: `document.querySelector('span[class*="MarketInfo_market-"]').innerHTML`
};
