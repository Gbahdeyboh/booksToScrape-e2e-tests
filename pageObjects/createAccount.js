const chalk = require( 'chalk' );

class createAccountPage {
	constructor( page ) {
		this.url = "https://mock-auth.netlify.app/"
		this.page = page;
		this.signupBtn = '#signup';
		this.signBody = '#loginBody';
		this.usernameField = '#username';
		this.passwordField = '#password';
		this.loginPageBtn = '#loginBtn';
	}

	async signup( fullname, username, password ) {
		try {
			await this.page.goto( this.url );
			await this.page.waitFor( this.signupBtn );
			await this.page.click( this.signupBtn );
			// Wait for the signBody on the signup page to load
			await this.page.waitFor( this.loginBody );

			// Type the login credentials into the input fields
			// await this.page.type( this.usernameField, username )''

			// // The username should already be in the username field since user just logged out
			// await this.page.type( this.password, password );
		} catch ( err ) {
			console.log( chalk.red( 'ERROR => ', err ) );
		}
	}
}

module.exports = ( page ) => new createAccountPage( page );
