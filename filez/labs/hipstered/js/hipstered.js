/* Author: Pello Xabier Altadill Izura
 * scripts for hipstered
*/

var CONFIG = null;
var LOG = null;
var myCodeMirror;

$(document).ready(function() {


var defaultFile;
var activeFile;
var FILES = [];


LOG = new Log('','#status');
if (null != localStorage['CONFIG']) {
	CONFIG = JSON.parse(localStorage['CONFIG']);
} else {
	LOG.log('Unable to load localStorage');
}



init();

/**
* init function
*/
function init() {
	$('#splash').hide(2000);
	$('header').show(3000);	
	$('#editor').show(3000);	
	myCodeMirror = CodeMirror.fromTextArea(document.getElementById("editarea"),{lineNumbers: true,
      mode: "text/html",
      theme: "lesser-dark",
      matchBrackets: true });
    openNewFile();
	LOG.append('\nWelcome to hipstered!');
}

/**
* behooooold the ultramagic preview mechanism
*/
myCodeMirror.on("change", function () {
	// we change tab status to*
	$('#file_'+activeFile.id+' a.openfile').text(activeFile.name + "*");
	activeFile.content = myCodeMirror.doc.getValue();
    $("#previewzone").html(myCodeMirror.doc.getValue());
});




// Check if config is present
/*if (null == CONFIG) {
	LOG.log('No config present...');	
	$('#splash').hide(2000);
	$('#config').show(3000);	
	LOG.append('Please provide config info.');
} else {
	LOG.log('Config loaded, Welcome back <a href="#"" id="editconfig">' + CONFIG.username + '</a>');
	$('#deleteconfig').show(1000);
	if (null != localStorage['LAST_STATUS']) {
		LOG.append(localStorage['LAST_STATUS']);
		localStorage['LAST_STATUS'] = '';
	}
}*/

// Config saved
$('#submitconfig').click(function() {
						if ($('#password').val() == $('#reenterpassword').val()) {
							CONFIG = new Config();
							CONFIG.setConfig($('#username').val(),$('#password').val(),$('#email').val(),$('#forecolor').val(),$('#backcolor').val());
							localStorage['CONFIG'] = JSON.stringify(CONFIG);
							$('#main').show(2000);
						} else {
							localStorage['LAST_STATUS'] = " Passwords not equal";
						}
					});

// Edit config info
$('#editconfig').click(function(event) {
							event.preventDefault();
							$('#main').hide(2000);
							$('#username').val(CONFIG.username);
							$('#password').val(CONFIG.password);
							$('#reenterpassword').val(CONFIG.password);
							$('#email').val(CONFIG.email);
							$('#forecolor').val(CONFIG.forecolor);
							$('#backcolor').val(CONFIG.backcolor);

							$('#config').show(3000);	
					});

// Edit config info
$('#deleteconfig').click(function(event) {
							event.preventDefault();
							if (window.confirm("Sure? ")) {
								localStorage['CONFIG'] = null;
								location.href = "index.html";
							}
							//localStorage.clear();	
					});

// Create new file
$('#newfile').click(function(event) {
						event.preventDefault();
						openNewFile();
					});

// We save directly
$('#savefile').click(function(event) {
						event.preventDefault();
						saveFileName(activeFile.name);
					});


// Open Save As dialog
$('#saveasfile').click(function(event) {
						event.preventDefault();
						$('#savedialogname').val(activeFile.name);
						$('#savedialog').show(30);	
					});

// Edit config info
$('#cancelsave').click(function(event) {
						event.preventDefault();
						$('#savedialog').hide(1);	
					});

/**
* if enter is pressed I would like to save data too
*/
$('#savedialogname').keypress(function(event) {
	if (event.which == 13) {
		saveFileName($('#savedialogname').val());
	}
});

/*
* if user confirms that name is saved...
*/
$('#confirmsave').click(function(event) {
						event.preventDefault();
						saveFileName($('#savedialogname').val());
					});

/**
* save file name from dialog
*/
function saveFileName(name) {
	activeFile.save(myCodeMirror.doc.getValue());	
	activeFile.name = name;
	$('#file_'+activeFile.id+' a.openfile').text(activeFile.name);
	LOG.log(activeFile.toString());
	$('#savedialog').hide(1);	
}

/**
* openNewFile
* opens a file, pushes in file array and opens tab
*/
function openNewFile() {
	var id = new Date().getTime();
	var name = 'untitled';
	defaultFile = new File(id, name, '');
	unactivePrevious(activeFile);
	activeFile = defaultFile;
	myCodeMirror.doc.setValue(activeFile.content);
	FILES.push(defaultFile);
	console.log(FILES);
	openFileTab(id, name);
}


/**
* closes a file, removes from array and destroys the tab
*/
function closeFile (id) {
	console.log("Closing file..." + id);
	activeid = seekAndDestroy(id);

	// We change active file if whe close active file
	if (activeFile.id == id) {
		activateTab(activeid);
		activeFile = getActiveFile(activeid);
	}

	console.log('New active id: ' + activeid);
	closeFileTab(id);
}

/**
* if we click in any tab it is activated
*/
$(document).on('click','.openfile',function(event)  {
	event.preventDefault();
	var id = $(this).attr("href");
	// only of we click in a different one
	if (id != activeFile.id) {
		unactivePrevious(activeFile);
		activeFile = getActiveFile(id);
		myCodeMirror.doc.setValue(activeFile.content);
		activateTab(id);
	} else { // We update status info
		LOG.log(activeFile.toString());
	}
});

/**
* tabs are generated dynamically so we attach events using on
$(document).on(events, selector, data, handler);  
*/
$(document).on('click','.close',function(event)  {
	event.preventDefault();
	var id = $(this).attr("href");
	closeFile(id);
});

/**
* opens a tab for a new file
*/
function openFileTab (id, name) {
	$('#openedfilestab').append('<li class="active" id="file_'+id+'"><a href="'+id+'" class="openfile">'+name+'*</a><a href="'+id+'" class="close">x</a></li>');
	console.log($('#openedfilestab').text());
}

function closeFileTab (id) {
		console.log("closing " + id);
	$("#file_"+id).remove();
}

/**
* activate tab
*/
function activateTab (id) {
		console.log("activatin " + id);
		$("#file_"+id).addClass("active");
}

/**
* set previously active file as inactive
*/
function unactivePrevious (file) {
	if (null != file) {
		console.log("unsetting " + file.id);
		$("#file_"+file.id).removeClass("active");
	}
}


/**
* seek a file and return it
*/
function getActiveFile (id) {
	file = null;
	for (i=0;i<FILES.length;i++) {
		if (FILES[i].id == id) {
			return FILES[i];
		}
	}

	return null;
}

/**
* removes a file with id from FILES array
*/
function seekAndDestroy(id) {
	var activeid = -1;

	for (i=0;i<FILES.length;i++) {
		if (FILES[i].id == id) {
			console.log("Found it");
			FILES.splice(i,1);
			if (i>0) {
				activeid = FILES[i-1].id;
			} else if (i < FILES.length -1) {
				activeid = FILES[i+1].id;
			}

			return activeid;
		}
	}
}

/**
* File class to operate with files
*/
function File (id, name, content) {
	this.id = id;
	this.name = name;
	this.content = content;
	this.extension = ''; // future
	this.owner = ''; // future
	this.lastUpdate = new Date();

	/**
	* saves file content
	*/
	this.save = function (newContent) {
		this.content = newContent;
		this.lastUpdate = new Date();
	}

	/**
	* dumps file info
	*/
	this.toString = function () {
		return "Id: " + this.id +
				", Name: " + this.name + 
				", Length: " + this.content.length +
				", Extension: " + this.extension +
				", Owner: " + this.owner + 
				", Last update:" + this.lastUpdate;
	};
}

/**
 * Config class to save configurations
 */
function Config () {
	this.username = '';
	this.password = '';
	this.email = '';
	this.forecolor = '';
	this.backcolor = '';

	/**
	 * 
	 */
	this.setConfig = function (username, password, email, forecolor, backcolor) {
							this.username = username;
							this.password = password;
							this.email = email;
			                this.forecolor = forecolor;
	                        this.backcolor = backcolor;
					};
	
	/**
	 * loadConfig
	 * loads config from localStorage
	 */
		this.loadConfig = function () {
	                        return JSON.parse(localStorage['CONFIG']);
					};
	/**
	 * noConfigPresent
	 * tries to get config from local storage
	 * tells if config is in localstorage or not
	 */
	this.noConfigPresent = function () {
						return (this.username == '');
					  };

	/**
	 * showConf
	 * shows stored config
	 */
	this.showConf = function () {
					return 
					"username: " + this.username + ", " +
					"password: " + this.password + ", " +
					"email: " + this.email + ", " +
					"forecolor: " + this.forecolor + ", " +
					"backcolor: " + this.backcolor;
				};
}

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
	this.clear = function () {
		$(where).html = "";
	};	
	
	/**
	 * logs a message
 	 * @param {Object} msg
	 */
	this.log = function (msg) {
		$(where).html(msg);	
	};
	
	/**
	 * appends a message in log
     * @param {Object} msg
	 */
	this.append = function (msg) {
		$(where).append(msg);
	};
}

});