/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const chalk = require( 'chalk' );
const NodeEnvironment = require( 'jest-environment-node' );
const puppeteerChrome = require( 'puppeteer' );
const fs = require( 'fs' );
const os = require( 'os' );
const path = require( 'path' ),

	DIR = path.join( os.tmpdir(), 'jest_puppeteer_global_setup' );

class PuppeteerEnvironment extends NodeEnvironment {
	constructor( config ) {
		super( config );
	}

	async setup() {
		console.log( chalk.yellow( 'Setup Test Environment.' ) );
		await super.setup();
		const wsEndpoint = fs.readFileSync( path.join( DIR, 'wsEndpoint' ), 'utf8' );
		if ( !wsEndpoint ) {
			throw new Error( 'wsEndpoint not found' );
		}
		// set the value of puppeteer based on the browser selected in the config
		this.global.__BROWSER__ = await puppeteerChrome.connect( {
			browserWSEndpoint: wsEndpoint
		} );
	}

	async teardown() {
		console.log( chalk.yellow( 'Teardown Test Environment.' ) );
		await super.teardown();
	}

	runScript( script ) {
		return super.runScript( script );
	}
}

module.exports = PuppeteerEnvironment;
