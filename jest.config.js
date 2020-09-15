module.exports = {
	preset: 'jest-puppeteer-preset',
	roots: [ 'specs' ],
	verbose: true,
	globalSetup: './setup.js',
	globalTeardown: './teardown.js',
	testEnvironment: './puppeteer_environment.js'
};
