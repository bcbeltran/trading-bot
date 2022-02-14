// GEMINI SANDBOX PRACTICE

// MASTER ACCOUNT
// api key name My Gemini Master API Key #1
// api key master-M6MbYUHNxEa5e9qttBEh
// api secret 2fwLLShVoWFSQRpanuLBGndoqscj

// PRIMARY ACCOUNT
// api key name My Gemini API Key #1
// api key account-J0ilcmndQgNioZJsOjOe
// api secret KQa44E8qpBETk5RcbLmFfBWaJS6

const GeminiAPI = require("gemini-api").default;

const key = "account-J0ilcmndQgNioZJsOjOe";
const secret = "KQa44E8qpBETk5RcbLmFfBWaJS6";

const client = new GeminiAPI({key, secret, sandbox:true});

module.exports = {
	getActiveOrders: function () {
		client
			.getMyActiveOrders()
			.then((response) =>
				console.log(`You have ${response} active orders`)
			)
			.catch((error) => console.log(error));
	},
	createMarketOrder: function (amount, price, side, symbol) {
		client
			.newOrder({
				amount: amount,
				price: price,
				side: side,
				symbol: symbol,
				options:['immediate-or-cancel']
			})
			.then((response) =>
				console.log(`This is your order summary: `, response)
			)
			.catch((error) => console.log(error));
	},
	getAssetPrice: function (symbol) {
		return client.getTicker(symbol);
	},

};


//client.newOrder({ amount: 100, symbol: "bchusd", price: 100, side: "buy" })