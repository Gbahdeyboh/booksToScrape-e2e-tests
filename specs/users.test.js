require('expect-puppeteer');

let loginAccountPage = require( '../pageObjects/loginAccount' );
let createAccountPage = require( '../pageObjects/createAccount' );
let reporterObj = require( '../Utils/reporter' );
let credentials = require( '../Utils/credentials' );

jest.setTimeout(60000);

describe('User should be able to create an account and logout', () => {
	let credential;
	beforeAll( async () => {
		// page = await global.__BROWSER__.newPage();
		// Set a definite site for the page viewport so view is consistent across browsers
		await page.setViewport( {
			width: 1366,
			height: 768,
			deviceScaleFactor: 1
		} );

		credential = credentials.generateCredential( 'User' );

		loginAccountPage = await loginAccountPage( page );
		createAccountPage = await createAccountPage( page );	

		// log failed tests
		let reporter = reporterObj( 'Account authentication', page );
		jasmine.getEnv().addReporter( reporter );
	} );

	it( 'Should be able to create an account', async () => {
		const firstname = await createAccountPage.signup( credential.fullname, credential.username, credential.password );
		page.waitFor( 1000 );
		expect( credential.fullname ).toContain( firstname );
	})
	
	it( 'Should be able to login after a successful account creation', async () => {
		const firstname = await loginAccountPage.login( credential.username, credential.password );
		page.waitFor( 1000 );
		expect( credential.fullname ).toContain( firstname );
	} );

	it( 'Should not login on wrong credentials', async () => {
		try {
			loginAccountPage.login( 'credential.username', credential.password );
		} catch(err){
			// Don't do anything, let it happen
		}
		page.on( 'dialog',  async dialog => {
			expect( dialog.message() ).toBe( 'Invalid username or password inputted' );
		})
	})
	
} );
