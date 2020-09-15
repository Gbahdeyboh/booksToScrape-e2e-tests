/*
* This script makes sure a user can successfully create an account, logout and login with the same credentials afterwards
*/

let loginAccountPage = require( '../pageObjects/loginAccount' );
let reporterObj = require( '../Utils/reporter' );
let credentials = require( '../Utils/credentials' );

jest.setTimeout(60000);

describe('User should be able to create an account and logout', () => {
	let page, credential;
	beforeAll( async () => {
		page = await global.__BROWSER__.newPage();
		// Set a definite site for the page viewport so view is consistent across browsers
		await page.setViewport( {
			width: 1200,
			height: 800,
			deviceScaleFactor: 1
		} );

		credential = credentials.generateCredential( 'User' );

		loginAccountPage = await loginAccountPage( page );

		// log failed tests
		let reporter = reporterObj( 'Should-Create-Account', page );
		jasmine.getEnv().addReporter( reporter );
	} );

	it( 'Should be able to log out after account creation', async () => {
		await loginAccountPage.logout();
		await page.waitForSelector( loginAccountPage.loginText );
		// Assertion
		let logoutText = await page.$$eval( loginAccountPage.logoutText, text => text[ 0 ].textContent );
		expect( logoutText ).toContain( 'You are now logged out' );
	} );

	it( 'Should be able to login after a successful account creation', async () => {
		await loginAccountPage.login( credential.username, credential.password );
		await page.waitForSelector( loginAccountPage.heading );
		// Assertion
		let headingText = await page.$$eval( loginAccountPage.heading, h => h[ 0 ].textContent );
		expect( headingText ).toBe( 'Main Page' );
	} );
} );