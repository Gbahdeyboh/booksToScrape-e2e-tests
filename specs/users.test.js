let credentials = require( '../utils/credentials' );
let createAccount = require( '../actions/createAccount' );
let loginAccount = require( '../actions/loginAccount' );
let reporterObj = require( '../utils/reporter' );

jest.setTimeout(60000);

describe('User should be able to create an account and logout', () => {
	let credential;
	beforeAll( async () => {
		// Set a definite site for the page viewport so view is consistent across browsers
		await page.setViewport( {
			width: 1366,
			height: 768,
			deviceScaleFactor: 1
		} );
		
		credential = credentials( 'User' );
		createAccount = await createAccount( page );	
		loginAccount = await loginAccount( page );
		
		// log failed tests
		let reporter = reporterObj( 'Account authentication', page );
		jasmine.getEnv().addReporter( reporter );
	} );
	
	it( 'Should be able to create an account', async () => {
		const firstname = await createAccount.signup( credential.fullname, credential.username, credential.password );
		page.waitFor( 1000 );
		expect( credential.fullname ).toContain( firstname );
	})
	
	it( 'Should be able to login after a successful account creation', async () => {
		const firstname = await loginAccount.login( credential.username, credential.password );
		page.waitFor( 1000 );
		expect( credential.fullname ).toContain( "Some random text" );
	} );
	
	it( 'Should not login on wrong credentials', async () => {
		try {
			page.on( 'dialog', dialog => {
				console.log("Message isssss", dialog.message() );
				expect( dialog.message() ).toBe( 'Invalid username or password inputted' );
				dialog.accept();
			});
			
			await page.goto( 'https://mock-auth.netlify.app/login.html' );
			await page.type( '#username', 'username' );
			await page.type( '#password', 'password' );
			await page.click( '#loginBtn' );
			await page.waitFor(5000) //Wait for the dialog to accept the prompt before proceeding


		} catch(err){
			// Don't do anything, let it happen
			console.log("An error occured while trying to login => ", err)
		}
	})
} );