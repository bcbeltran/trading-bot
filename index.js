const cryptocompare = require("./cryptoCompare.js");
const gemini = require("./gemini.js");

//MOVING AVERAGES
// cryptocompare.hourlyMovingAverage('BTC', 'USD', 169);
// cryptocompare.dailyMovingAverage('BTC', 'USD', 31);
// cryptocompare.minuteMovingAverage('BTC', 'USD', 1441);

//MARKET BUY (amount, price, side, symbol)
//gemini.createMarketOrder(1, 60000, 'buy', 'btcusd');

//MARKET SELL (amount, price, side, symbol)
//gemini.createMarketOrder(1, 10000, 'sell', 'btcusd');

//GET ASSET PRICE (symbol)
//gemini.getAssetPrice('btcusd');
var hasPosition = true;
const strategy = function () {
	console.log("    ");
	console.log("================================");
	console.log("Executing strategy");

	cryptocompare.hourlyMovingAverage("BTC", "USD", 100, function (ma) {
		gemini.getAssetPrice("btcusd").then((res) => {
			let price = res.last;

			console.log("MA: ", ma.toFixed(2));
			console.log("Price: ", price);

			if (price < ma && !hasPosition) {
				console.log("BUY!!!!");
				gemini.createMarketOrder(1, 60000, "buy", "btcusd");
				console.log("Buy successful.");
				hasPosition = true;
				setTimeout(strategy, 5000);
			} else if (price > ma && hasPosition) {
				console.log("SELL!!!!");
				gemini.createMarketOrder(1, 10000, "sell", "btcusd");
				console.log("Sell successful.");
				hasPosition = false;
				setTimeout(strategy, 5000);
			} else {
				console.log("HOLD!!!");
				setTimeout(strategy, 5000);
			}
		});
	});
};

strategy();
