let loginAccount = require( '../actions/loginAccount' );
let createAccount = require( '../actions/createAccount' );
let reporterObj = require( '../utils/reporter' );
let credentials = require( '../utils/credentials' );

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
		
		credential = credentials( 'User' );
		
		loginAccount = await loginAccount( page );
		createAccount = await createAccount( page );	
		
		// log failed tests
		let reporter = reporterObj( 'Account authentication', page );
		jasmine.getEnv().addReporter( reporter );
	} );
	
	// it( 'Should be able to create an account', async () => {
	// 	const firstname = await createAccount.signup( credential.fullname, credential.username, credential.password );
	// 	page.waitFor( 1000 );
	// 	expect( credential.fullname ).toContain( firstname );
	// })
	
	// it( 'Should be able to login after a successful account creation', async () => {
	// 	const firstname = await loginAccount.login( credential.username, credential.password );
	// 	page.waitFor( 1000 );
	// 	expect( credential.fullname ).toContain( firstname );
	// } );
	
	it( 'Should not login on wrong credentials', async () => {
		try {
			page.on( 'dialog', dialog => {
				console.log("Message isssss", dialog.message() );
				dialog.accept();
			});

			await page.goto( 'https://mock-auth.netlify.app/login.html' );
			await page.type( '#username', 'username' );
			await page.type( '#password', 'password' );
			await page.click( '#loginBtn' );

			expect( dialog.message() ).toBe( 'Invalid username or password inputted' );

		} catch(err){
			// Don't do anything, let it happen
			throw new Error("An error occured while trying to login => ", err)
		}
	})
	
} );