/* Author: Pello Xabier Altadill Izura
 * scripts for Chaos
*/


/**
 * Logger function
 * @param {Object} prefix
 * @param {Object} where
 */

function Log (prefix, where) {
	this.prefix = prefix;
	this.where = where;

	/**
	 * clears log screen
	 */
	clear = function () {
		$(where).html = "";
	};	
	
	/**
	 * logs a message
 	 * @param {Object} msg
	 */
	log = function (msg) {
		$(where).html(msg);	
	};
	
	/**
	 * appends a message in log
     * @param {Object} msg
	 */
	append = function (msg) {
		$(where).append(msg);
	};
}
