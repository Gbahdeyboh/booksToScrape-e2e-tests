// jest-puppeteer.config.js
module.exports = {
	launch: {
		dumpio: true,
		headless: process.env.HEADLESS !== 'false'
	},
	browser: 'chromium', // set default browser you want to run the script with i.e firefox or chrome
	// browser: 'firefox',
	browserContext: 'default'
};
