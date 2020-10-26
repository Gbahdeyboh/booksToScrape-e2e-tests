/* eslint-disable no-console */
const chalk = require( 'chalk' );

class LoginAccount {
	constructor( page ) {
		this.url = "https://mock-auth.netlify.app/"
		this.page = page;
		this.loginBtn = '#login';
		this.loginBody = '#loginBody';
		this.usernameField = '#username';
		this.passwordField = '#password';
		this.loginPageBtn = '#loginBtn';
	}

	async login( username, password ) {
		try {
			await this.page.goto( this.url );
			await this.page.waitFor( this.loginBtn );
			await this.page.click( this.loginBtn );
			// Wait for the loginBody on the login page to load
			await this.page.waitFor( this.loginBody );

			// Type the login credentials into the input fields
			await this.page.type( this.usernameField, username );
            await this.page.waitFor( 1000 );
			
			await this.page.type( this.passwordField, password );
            await this.page.waitFor( 1000 );

			await this.page.click( this.loginPageBtn );

			// Wait for homepage to load 
			await this.page.waitFor( '#firstname' );
			await this.page.waitFor( 2000 );
 
			const firstname = await this.page.$eval( '#homeBody #firstname', el =>  el.textContent );

			return firstname;
		} catch ( err ) {
			console.log( chalk.red( 'ERROR => ', err ) );
		}
	}
}

module.exports = ( page ) => new LoginAccount( page );
