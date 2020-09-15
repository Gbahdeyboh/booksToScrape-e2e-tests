/* eslint-disable no-undef */
/* eslint-disable valid-jsdoc */
const querystring = require( 'querystring' );

class Page {

	/**
	 * Navigate the browser to a given page.
	 *
	 * @param {string} title Page title
	 * @param {Object} [query] Query parameter
	 * @param {string} [fragment] Fragment parameter
	 */
	openTitle( page, title, query = {}, fragment = '' ) {
		query.title = title;
		// eslint-disable-next-line no-console
		console.log( `URL IS: ${process.env.MW_SERVER || 'http://127.0.0.1:8080/index.php?'}` );
		return page.goto(
			`${process.env.MW_SERVER || 'http://127.0.0.1:8080'}/index.php?` +
			querystring.stringify( query ) +
			( fragment ? ( '#' + fragment ) : '' )
		);
	}
}

module.exports = Page;
