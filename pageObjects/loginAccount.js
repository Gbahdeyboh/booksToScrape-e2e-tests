/* eslint-disable no-console */
const chalk = require( 'chalk' );

class LoginAccountPage {
	constructor( page ) {
		this.url = "https://mock-auth.netlify.app/"
		this.page = page;
		this.username = '#wpName2';
		this.password = '#wpPassword1';
	}

	async logout() {
		try {
			// await this.page.click( this.logoutBtn );
			// await this.page( 1000 );
		} catch ( err ) {
			console.log( chalk.red( 'ERROR => ', err ) );
		}
	}

	async login( username, password ) {
		try {
			await this.page.goto( this.url );
			// await this.page.waitFor( this.heading );
			// // The username should already be in the username field since user just logged out
			// await this.page.type( this.password, password );
			// await this.page.click( this.loginBtn );
		} catch ( err ) {
			console.log( chalk.red( 'ERROR => ', err ) );
		}
	}
}

module.exports = ( page ) => new LoginAccountPage( page );
