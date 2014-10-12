var config = {
	development: {
		mode: 'development',
		port: 80,
    paypalApi: {
      host: 'api.sandbox.paypal.com',
      port: '',
      client_id: 'AY0mkBAZrqXgXkeDxVfEJXa1HL5-HPouajNkUK6thVVy39dlRb9BqBYBDKtW',
      client_secret: 'EGd76BDEMM7qucv-OAc-Z2_hK-Ble52rZVE8arq3V6-1hdnWUOUHEBAWEWH1'
    }
	}
};

module.exports = function(mode) {
	return config[mode || process.argv[2] || 'development'] || config.development;
};
