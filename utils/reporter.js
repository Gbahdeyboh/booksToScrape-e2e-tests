module.exports = ( filename, page ) => {
	/**
	* @description - Checks when a test fails and takes a screenshot of the page immediately the test fails
	* @param {string} filename - The name of the image to be saved
	* @param {Object} page - The page Object of the current page whose screenshot is being taken
	* @return {Object} reporter - The reporter object
	*/
	const path = './log/',
	 filepath = `${path + filename}.png`,
	 reporter = {
			specDone: async ( result ) => {
				if ( result.status === 'failed' ) {
            	// log the screenshot when any test fails
					await page.screenshot( { path: filepath } );
				console.log("An image log of this test failing can be found at ", filepath);
				}
			}
		};
	return reporter;
};
