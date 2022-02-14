global.fetch = require("node-fetch");
const CryptoCompareAPI = require("cryptocompare");
// CRYPTO COMPARE API KEY
const CCAPIKey =
	"02b0d1391958699f24281cc3193c49c985221930574d9818bc609dcd9b51cad1";
CryptoCompareAPI.setApiKey(CCAPIKey);

module.exports = {

	hourlyMovingAverage: function (cryptoAsset, fiatCurrency, hours, callback) {
		if (hours > 169) {
			console.error("Only up to 169 hours allowed.");
			return;
		}

		CryptoCompareAPI.histoHour(cryptoAsset, fiatCurrency)
			.then(response => {
				response = response.reverse();
				let sum = 0;
				for (let i = 0; i < hours; i++) {
					sum += response[i].close;
				}
				let movingAverage = sum / hours;
				callback(movingAverage);
				// console.log(
				// 	"The " +
				// 		cryptoAsset +
				// 		" " +
				// 		hours +
				// 		" hour moving average is $" +
				// 		movingAverage.toFixed(2)
				// );
			})
			.catch((error) => console.log(error));
	},
	dailyMovingAverage: function (cryptoAsset, fiatCurrency, days) {
		if (days > 31) {
			console.log("Only up to 31 days allowed.");
			return;
		}

		CryptoCompareAPI.histoDay(cryptoAsset, fiatCurrency)
			.then((response) => {
				
				response = response.reverse();
				let sum = 0;
				for (let i = 0; i < days; i++) {
					sum += response[i].close;
				}
				let movingAverage = sum / days;
				console.log(
					"The " +
						cryptoAsset +
						" " +
						days +
						" day moving average is $" +
						movingAverage.toFixed(2)
				);
			})
			.catch((error) => console.log(error));
	},
	minuteMovingAverage: function (cryptoAsset, fiatCurrency, minutes) {
		if (minutes > 1449) {
			console.log("Only up to 1449 minutes allowed.");
			return;
		}

		CryptoCompareAPI.histoMinute(cryptoAsset, fiatCurrency)
			.then((response) => {
	
				response = response.reverse();
				let sum = 0;
				for (let i = 0; i < minutes; i++) {
					sum += response[i].close;
				}
				let movingAverage = sum / minutes;
				console.log(
					"The " +
						cryptoAsset +
						" " +
						minutes +
						" minute moving average is $" +
						movingAverage.toFixed(2)
				);
			})
			.catch((error) => console.log(error));
	},
};
