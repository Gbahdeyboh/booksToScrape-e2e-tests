/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable one-var */
module.exports = {
	generateCredential( user ) {
		/**
		* @description - Generates a onetime username and password for the test sessions
		* @param {string} username - The unique name to be appended to the username
		* @return {Object.username, Object.password} username, password  - The generated username and password
		*/
    	let username = `${user}-${Math.random()}`,
    	 password = `${Math.random()}`;
    	// Make sure both usernames and passwords are strings
    	username = String( username );
    	password = String( password );
    	let credential = { username, password };
    	return credential;
	}
};
