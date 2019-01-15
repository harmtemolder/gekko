var strat = {};

strat.init = function() {
	this.name = 'EMA Crossover';
	this.addTulipIndicator('emaSlow', 'ema', {
		optInTimePeriod: this.settings.slow
	});
	this.addTulipIndicator('emaFast', 'ema', {
		optInTimePeriod: this.settings.fast
	});
}

// A candle object looks like this:
// { start: moment("2019-01-12T01:00:00.000"),
//   open: 0.00002884,
//   high: 0.00002919,
//   low: 0.00002874,
//   close: 0.00002915,
//   vwp: 0.000028931629781687234,
//   volume: 23162274,
//   trades: 17542 }

strat.check = function(candle) {
	const emaSlow = this.tulipIndicators.emaSlow.result.result;
	const emaFast = this.tulipIndicators.emaFast.result.result;

	if (emaFast < emaSlow) {
		this.advice({
			direction: 'long',
			trigger: {
				type: 'trailingStop',
				trailPercentage: this.settings.trailPercentage
			}
		});
	}
}

module.exports = strat;