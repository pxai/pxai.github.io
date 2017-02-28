/* Author: Pello Xabier Altadill Izura
 * scripts for Chaos
*/

/**
 * Config class to save configurations
 */
function Config () {
	this.username = '';
	this.password = '';
	this.email = '';
	this.forecolor = '';
	this.backcolor = '';

	noConfigPresent = function () {
						return (this.username == '');
					  };

	showConf = function () {
					return 
					"username: " + this.username + ", " +
					"password: " + this.password + ", " +
					"email: " + this.email + ", " +
					"forecolor: " + this.forecolor + ", " +
					"backcolor: " + this.backcolor;
				};
}
