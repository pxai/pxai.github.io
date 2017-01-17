<h5>A night out with Jasmine</h5>
<p>
Unit testing is much more than a tool for ensuring that a program behaves as expected. Nowadays it's the key for new development techniques such as TDD and BDD in which you begin writing tests before the required code. It's all about requirements and behaviour; developers must focus on understanding the requirements instead of thinking about the way they implement the code. In the event that you've forgotten the fundamental benefits of unit testing here you have a quick reminder:</p>
<ul>
<li>Obviously, you are testing that your code works</li>
<li>When changes are made you can automatically verify that everything works</li>
<li>Tests are a pretty good way to document the project.</li>
</ul>

<p>Jasmine is a BDD framework for javascript code. In a nutshell, BDD it's an evolution of TDD where unit tests look like user stories, and so tests are defined in the same terms of the expected behaviour of the software units. When you discover functions names in Jasmine tests these simple definitions will make more sense.</p>
<p>Let's get our hands dirty, while you take a look at Jasmine's site
http://jasmine.github.io/2.0/introduction.html you can get the master from the github site 
https://github.com/pivotal/jasmine/archive/master.zip</p>
<p>
Or, if you are using node then just sigh, coff slightly, adjust your spectacles and simply try with this: npm -g install jasmine-node
</p>
<p>
Beware! at the time of writing this Jasmine is in 2.0 version and there are some changes and deprecated functions. So, be careful with what you read out there, check dates.
</p>
<p>
Ok, once jasmine is installed let's write this piece of code in a file called hello.js
</p>
<pre class="brush: jscript">
exports.hello = function () {
	return 'Hello world';
};
</pre>

<p>
Behold the almighty helloworld sample.
</p>

<p>
With Jasmine, the test file is expected to live in a dir called specs in a file called
name.spec.js, so hello.spec.js in this case.
</p>
<p>And this is what the test would look like:</p>
<pre class="brush: jscript">
/*
* specs/hello.spec.js
*/
var hl = require("../hello.js");

// testing hello function
describe("hello", function() {
	it('returns "Hello world"', function() {
		expect(hl.hello()).toEqual("Hello world");
	});
});
</pre>

<p>
To run the test, in the same directory where hello.js resides we type jasmine-node command with the dir of the test and it will pass all specs files within
</p>
<pre class="brush: bash">

linux$ jasmine-node specs/
.

Finished in 0.020 seconds
1 tests, 1 assertions, 0 failures, 0 skipped
linux$ 
</pre>

<p>
¿How could we test functions that are using a callback? In the same hello.js file we add this function:
</p>
<pre class="brush: jscript">

exports.helloAsync = function (callback) {
	return callback(null,'Async Hello World');
};
</pre>

<p>And this is how the test should look like:
<pre class="brush: jscript">
describe("helloAsync", function() {
	it("does an asynchronous call", function() {
		hl.helloAsync(function(err,response) {
			expect(response).toContain("Async Hello World");
		});
	});
});
</pre>

<p>Now if we run the test, we will check 2 test and 2 assertions:
</p>

<pre class="brush: bash">
linux$ jasmine-node specs/
..

Finished in 0.029 seconds
2 tests, 2 assertions, 0 failures, 0 skipped
linux$ 
</pre>

<p>Maybe you've noticed that in the second test instead of toEqual we're using .toContain. These are different matchers with different effects as indicated by their obvious names. As you can see, Jasmine drives us to write tests that apart from being 'extracool' can be read as natural language.
</p>

<h5>Developing a simply utility, TDD style</h5>
<p>
Our beloved system administrator wants a program to convert people names such as "john, doe" into account names like "john_doe". Remember, we are trying TDD now so focus on the requirement, and try not to think about using regular expressions or any kind of implementation details. TDD dictates to follow this steps:
</p>
<ol>
<li>Write the test code</li>
<li>Pass the test and see how it fails</li>
<li>Write just the necessary code, quick and dirty, to turn the test from red to green</li>
<li>Once the test is passed successfuly, refactor the code.</li>
<li>Feel kwel, you earned a good cup of whatever</li>
</ol>

<p>Ok, we create a specs dir, and inside a username.spec.js file containing our test of a code that right now it is but a ghost:
</p>
<pre class="brush: jscript">

var username = require('../username.js');

describe('Test to ensure username is created', function () {
	it('returns name_surname with simple Name,Surname',function () {
		expect(username.create('john,doe')).toEqual('john_doe');
	});

});
</pre>

<p>
Not only if we test this fails, but also if we run it this code FAILS. why? username.js does not exist, as simply as that. Well then, time for step 2 in TDD, we write our code in a file named username.js one dir level below.
</p>

<pre class="brush: jscript">
/**
* username.js
* Pello Altadill Izura
* http://pello.info
*/

exports.create = function (personName) {
	var result = '';
	var parts = personName.split(',');
	result = parts[0] + '_' + parts[1];

	return result;
};
</pre>

<p>Now what we get is what we expected to:
</p>

<pre class="brush: bash">
linux$ jasmine-node specs/
.

Finished in 0.033 seconds
1 test, 1 assertion, 0 failures, 0 skipped

linux$
</pre>

<p>The requirements were minimal in order to show the process of TDD. But the world is not a pleasant place where everything just works fine. As Melissandre said, there is one hell, the one we are living in now. This could be a more realistic problem, which might be more useful to ilustrate some other Jasmine features.
</p>

<p>Our Benevolent Dictator thinks that we deserve the honor to raise from the mud in which we creep and serve him with our bare hands, although we are not worthy of such a gift from a demigod. We want to get on well with OBD if we want him to lower the proxy constraints for us among other mundane privileges. He is in a need for a program that translates people names to system names with this specifications:
</p>
<ul>
<li>People names come with Name, Surname notation and they may be translated to name_surname</li>
<li>Names can come in either lower or uppercase</li>
<li>Names can come with extra spaces</li>
<li>Some people may have two names like 'John John, Kennedy' or 'Jar Jar, Binks' and they might be translated to name1name2_surname</li>
<li>Some names can be null or empty spaces ','. (That may be OBD's fault but It's better not to mention it)</li>
</ul>

<p>
We'll try to acomplish these specs, so our unit tests might look like this in Jasmine style:
</p>
<pre class="brush: jscript">

var username = require('../username.js');

describe('Test to ensure username is created', function () {
	it('returns name_surname with simple Name,Surname',function () {
		expect(username.create('john,doe')).toEqual('john_doe');
	});

	it('converts any uppercase character to lowercase', function () {
		expect(username.create('Han,Solo')).toEqual('han_solo');
	});

	it('removes any space character', function () {
		expect(username.create('   Luke, Skywalker ')).toEqual('luke_skywalker');
	});

	it('returns multiple names together', function () {
		expect(username.create('Obi Wan,Kenobi')).toEqual('obiwan_kenobi');
	});

	it('throws error if name is empty', function () {
		expect(function() { 
					username.create(''); 
			   }).toThrow('Person name is empty');
	});
});
</pre>

<p>If we test all of this with our previous code Jasmine will scream our name:
</p>

<pre class="brush: bash">
linux$ jasmine-node specs/
.FFFF

Failures:

  1) Test to ensure username is created converts any uppercase character to lowercase
   Message:
     Expected 'Han_Solo' to equal 'han_solo'.
   Stacktrace:
     Error: Expected 'Han_Solo' to equal 'han_solo'.
    at null.<anonymous> (/root/nodejs/jasmine/users/specs/username.spec.js:9:39)

  2) Test to ensure username is created removes any space character
   Message:
     Expected '   Luke_ Skywalker ' to equal 'luke_skywalker'.
   Stacktrace:
     Error: Expected '   Luke_ Skywalker ' to equal 'luke_skywalker'.
    at null.<anonymous> (/root/nodejs/jasmine/users/specs/username.spec.js:13:50)

  3) Test to ensure username is created returns multiple names together
   Message:
     Expected 'Obi Wan_Kenobi' to equal 'obiwan_kenobi'.
   Stacktrace:
     Error: Expected 'Obi Wan_Kenobi' to equal 'obiwan_kenobi'.
    at null.<anonymous> (/root/nodejs/jasmine/users/specs/username.spec.js:17:45)

  4) Test to ensure username is created returns empty string with spaces
   Message:
     Expected '_undefined' to equal ''.
   Stacktrace:
     Error: Expected '_undefined' to equal ''.
    at null.<anonymous> (/root/nodejs/jasmine/users/specs/username.spec.js:21:31)

Finished in 0.061 seconds
5 tests, 5 assertions, 4 failures, 0 skipped
</pre>

<p>Let's fix each of the tests</p>
<pre class="brush: jscript">

/**
* username.js
* Pello Altadill Izura
* http://pello.info
*/

exports.create = function (personName) {
	var result = '';
	personName = personName.toLowerCase();
	personName = personName.replace(/\s/g,'');
	if (personName == '' ) {
		throw new Error('Person name is empty');
	}
	var parts = personName.split(',');
	result = parts[0] + '_' + parts[1];

	return result;
};
</pre>

<p>
The \s replacement fixes many things. And now we throw an Error whenever a personName comes empty. Maybe this is not the preferred behaviour of our program, but It helps to show how to check if exceptions are thrown.
</p>

<h5>Jasmine matchers at a glance</h5>
<p>
We have already used .toEqual(), .toContain() and .toThrow(), but if you're familiar with unit testing you might expect many others to exist. So instead of blowing your mind with poor-man's wordgames, let's see what we have inside Jasmine's toolbox.</p>

<h6>Negate matching</h6>
<p>at any moment we can reverse the matcher using a not like this</p>
<pre class="brush: jscript">
expect(666).not.toEqual(333);
</pre>

<h6>toEqual</h6>
<p>Tests equality with primitive types: numbers, strings, booleans, null. But NOT with objects.
Some examples:</p>
<pre class="brush: jscript">
		var one = {'name' : 'John'};
		var other = {'name' : 'John'};
		var another = one;
		var oneArray = [42, 15, 69];
		var otherArray = [42, 15, 69];
		var anotherArray = [6, 66, 666];
		var phrase = 'By demon be driven';


		expect(6).toEqual(6);
		expect(6).toEqual(6.0);
		expect(one).toEqual(other);
		expect(oneArray).toEqual(otherArray);
		expect(6).not.toEqual('6');
</pre>

<h6>toBe</h6>
<p>Tests equality between objects. Some examples:</p>
<pre class="brush: jscript">
		var one = {'name' : 'John'};
		var other = {'name' : 'John'};
		var another = one;
		var oneArray = [42, 15, 69];
		var otherArray = [42, 15, 69];
		var anotherArray = [6, 66, 666];

		expect(6).toBe(6);
		expect(6).not.toBe('6');
		expect(6).toBe(6.0);
		expect(one).toBe(another);
		expect(oneArray).not.toBe(otherArray);
		expect(one).not.toBe(other);
</pre>

<h6>toContain</h6>
<p>Checks if an element of a string or of an array is present. Some examples:</p>
<pre class="brush: jscript">
		var phrase = 'By demon be driven';

		expect(oneArray).toContain(42);
		expect(phrase).toContain('demon');
</pre>

<h6>toBeTruthy</h6>
<p>Checks if what we expect is true. Some examples:</p>
<pre class="brush: jscript">
		expect(true).toBeTruthy();
		expect(1).toBeTruthy();
		expect('Metallica').toBeTruthy();
		expect(66).toBeTruthy(); // anything but 0
</pre>

<h6>toBeFalsy</h6>
<p>Checks if what we expect is false. Some examples:</p>
<pre class="brush: jscript">
		var phrase = 'By demon be driven';

		expect(false).toBeFalsy();
		expect(0).toBeFalsy();
		expect('').toBeFalsy();
		expect(null).toBeFalsy();
		expect(undefined).toBeFalsy();
		expect(NaN).toBeFalsy();
		expect(true).not.toBeFalsy();
		expect(phrase).not.toBeFalsy();
</pre>

<h6>toBeNull</h6>
<p>Checks if something is null. Some examples:</p>
<pre class="brush: jscript">
		expect(null).toBeNull();
		expect('').not.toBeNull();
		expect([]).not.toBeNull();
</pre>

<h6>toBeNaN</h6>
<p>Checks if we have anything but a number. Some examples:</p>
<pre class="brush: jscript">
		var phrase = 'By demon be driven';

		expect(NaN).toBeNaN();
		expect(parseInt('One')).toBeNaN();
		expect(parseInt('666')).not.toBeNaN();
		expect(phrase).not.toBeNaN();
		expect(6).not.toBeNaN();
</pre>

<h6>toBeDefined</h6>
<p>Checks if a variable is defined. Some examples:</p>
<pre class="brush: jscript">
		var unnamed;
		var god = 'Cthulhu';
		var anotherGod = god;
		expect(god).toBeDefined();
		expect(another).toBeDefined();
		expect(666).toBeDefined();
		expect(true).toBeDefined();
		expect(null).toBeDefined(); // yes, it is
		expect(unnamed).not.toBeDefined();
</pre>

<h6>toBeUndefined</h6>
<p>Checks if a variable is not defined Some examples:</p>
<pre class="brush: jscript">
		var unnamable;
		var unnamed;
		expect(unnamable).toBeUndefined();
		expect(unnamed).toBeUndefined();
		expect(null).not.toBeUndefined();
		// This would throw Reference Error
		//expect(notDeclaredVar).toBeUndefined();
</pre>

<h6>toBeGreaterThan</h6>
<p>Checks if the value, integer or String is greater than other. Some examples:</p>
<pre class="brush: jscript">
		expect(6).toBeGreaterThan(5);
		expect('b').toBeGreaterThan('a');
		expect(6).not.toBeGreaterThan('6');
</pre>

<h6>toBeLessThan</h6>
<p>Checks if the value is lesser. Some examples:</p>
<pre class="brush: jscript">
		expect(5).toBeLessThan(6);
		expect(-5.1).toBeLessThan(-5.0);
		expect('a').toBeLessThan('b');
</pre>

<h6>toBeCloseTo</h6>
<p>Checks if a value is closed to another providing certain precision. When the precision is 0 it parses the number to Int. Some examples:</p>
<pre class="brush: jscript">
		expect(66.64).toBeCloseTo(66.62,1);
		expect(66.64).toBeCloseTo(67,0);
		expect(42.44).toBeCloseTo(42,0);
		expect(42.59).toBeCloseTo(43,0);
		expect(Math.PI).toBeCloseTo(3.14,2);
		expect(Math.PI).toBeCloseTo(3,0);
</pre>

<h6>toMatch</h6>
<p>This is great, we can check if the value matches a regular expression. Some examples:
</p>		
<pre class="brush: jscript">
		expect('Thorin Kili Gloin').toMatch(/gloin/i);
		expect('Jasmine').toMatch(/[a-z]+/i);
		expect('Jasmine and Eugene').not.toMatch(/^[a-z]+$/gi);
		expect('Jasmine and Eugene').toMatch(/^[a-z\s]+$/gi);
</pre>

<h6>toThrow</h6>
<p>As explained before, checks if an Error is thrown.</p>
We'll try with this dumb function:
<pre class="brush: jscript">
		var vomitError = function () {
			throw new Error('I puke errors');
		};

	it('checks toThrow',function () {
		expect(vomitError).toThrow();
	});
</pre>

<h6>Creating our own matchers</h6>
<p>Maybe you need a more specific matcher to be able to test something that Jasmine's default matchers are not capable of. Well, you can define your own matchers. 
Inside the describe block we can define our own matcher, in this case is one matcher to test if a String is complex enough to be a secure password.
</p>

<pre class="brush: jscript">
	/**
	* customMatcher
	* toBeComplex
	* checks if a String contains alphanumeric and symbols
	* and a min lenght of 8
	*/
	beforeEach(function() {
		this.addMatchers({
			toBeComplex: function() {
				this.message = function() {
					return "Expected " + this.actual + " to be complex";
				};
					return this.actual.match(/[a-z]{1,}/) 
						&& this.actual.match(/[A-Z]{1,}/)
						&& this.actual.match(/[0-9]{1,}/)
						&& this.actual.match(/[\.\,\;\:\-\!\?\_]{1,}/)
						&& (this.actual.length>7);
			}
		});

	});
</pre>

<p>And now we can use our tester just like the others:
</p>	
<pre class="brush: jscript">
	// toBeComplex
	// Checks if a String is valid to be a password
	it('checks toBeComplex',function () {
		expect('Death-666').toBeComplex();
		expect('.-;.:,!?').not.toBeComplex();
		expect('Death66').not.toBeComplex();
		expect('josua').not.toBeComplex();
	});
</pre>

<p>'josua' has always been a very bad password.
</p>
<p>If you need params in this matcher is quite easy to add them. We define a slightly different matcher now adding the minimun length.
</p>
<pre class="brush: jscript">
			toBeComplexAndLongerThan: function(length) {
				this.message = function() {
					return "Expected " + this.actual + " to be complex and longer than " + length;
				};
					return this.actual.match(/[a-z]{1,}/) 
						&& this.actual.match(/[A-Z]{1,}/)
						&& this.actual.match(/[0-9]{1,}/)
						&& this.actual.match(/[\.\,\;\:\-\!\?\_]{1,}/)
						&& (this.actual.length>length);
			}
</pre>

<p>Now we test it:
</p>
<pre class="brush: jscript">
		expect('Josua:It666').toBeComplexAndLongerThan(10);
</pre>


<h5>Spies, spies everywhere</h5>
<p>Matches are fine to check if our functions are returning what are expected to. But, how could we be sure that certain functions are being called? Jasmine as many other tools brings us the possibility to introuce the so called spies. By the way I introduce the use of setup/teardown like methods in Jasmine: beforeEach and afterEach.
</p>

<p>
First I'll show how to use the spies in a very simple problem, and after that we'll move to test a tcp server with async calls.
</p>
<p>stringutils: this is a simple class with some methods to do simple stuff with strings.
<pre class="brush: jscript">
/**
* stringutils.js
* Some String utils 
*/
exports.StringUtils = function () {

		this.len = function (string) {
			return string.length;
		};

		this.vowels = function (string) {
			var totalVowels = 0;

			for (var i = 0; i< this.len(string);i++) {
				if (string[i].match(/^[aeiou]{1}$/i)) {
					totalVowels++;
				}
			}

			return totalVowels;
		};

		this.reverse = function (string) {
			var gnirts = '';
			for (var i = this.len(string) -1;i>=0 ;i--) {
				gnirts += string[i];
			}

			return gnirts;
		}
};
</pre>

<p>
Ok, I'm afraid that I'll not get rich with this, but should be enough to apply simple spies on it in this spec below:</p>

<pre class="brush: jscript">
var stringutils = require("../stringutils.js");

// testing hello function
describe("testing stringutils", function() {

	var myStringUtils;

	beforeEach(function() {
		myStringUtils = new stringutils.StringUtils();			
		spyOn(myStringUtils,'len');
		spyOn(myStringUtils,'vowels');
		spyOn(myStringUtils,'reverse');

		myStringUtils.len('Eugene');
		myStringUtils.vowels('Eugene');
		myStringUtils.reverse('Eugene');
    });

	it('calls len function',function () {
		expect(myStringUtils.len).toHaveBeenCalled();
		expect(myStringUtils.len).toHaveBeenCalledWith('Eugene');
	});

	it('calls vowels function',function () {
		expect(myStringUtils.vowels).toHaveBeenCalled();
		expect(myStringUtils.vowels).toHaveBeenCalledWith('Eugene');
	});


	it('calls reverse function',function () {
		expect(myStringUtils.reverse).toHaveBeenCalled();
		expect(myStringUtils.reverse).toHaveBeenCalledWith('Eugene');
	});

	afterEach(function () {

	});

});
</pre>

<p>
To set spies, we have to call spyOn method. Then we can check if any method has been called and even we can test if they where called with certain parameters. 
</p>
<ul>
<li>toHaveBeenCalled()</li>
<li>toHaveBeenCalledWith(something)</li>
</ul>

<p>We could chain some of these to make the function behave as we want:
</p>

<ul>
<li>andCallFake: instead of call</li>
<lli>andCallThrough(): calls the original functions that spyOn is faking</li>
<li>andReturn(arguments): show as the parameters when the spied function is called</li>
<li>andThrows(exception): throws an exception when the function is called</li>
</ul>

<h5>Another sample, a tcp server</h5>
<p>Now let's try harder with a simple node tcp echo server. This is the server
</p>

<pre class="brush: jscript">
/**
* echoserver.js
* Simple sample echo server writen in nodejs
* Pello Altadill
*/
var net = require('net');

exports.EchoServer = function (port, host) {

	var self = this;
	this.port = port || 1666;
	this.host = host || '0.0.0.0';
	this.server = net.createServer();
	this.timeout = 5000; // 5 secs
	this.keepAlive = true;
	this.keepAliveTime = this.timeout;
	this.clientSockets = [];

	this.init = function () {
		this.server.listen(this.port, this.host);
	};

	this.listening = function() {
		console.log('Server> Server listening on port ' + port);
	};

	this.connection = function(socket) {
		self.clientSockets.push(socket);
		console.log('Server> Connected to server, total clients: ' + self.clientSockets.length);
		
		// console.log(socket);
		if (this.keepAlive) {
			socket.setKeepAlive(this.keepAliveTime);
		} else {
			socket.setTimeout(this.timeout);
		}

		socket.on('timeout', function () {
			console.log('Server> timeout');
			socket.end();
		});

		socket.on('data', function (msg) {
			console.log('Server> Received data ' + msg);
			console.log('Server> Sending it back');
			socket.write(msg);
		});

		socket.on('close', function () {
			console.log('Server> Socket closed');
			var index = self.clientSockets.indexOf(socket);
			self.clientSockets.splice(index, 1);
		});
	};

	this.close = function(err) {
		console.log('Server> Connection closed ' + err);
	};

	this.error = function(err) {
		console.log('Server> Error on server ' + err);
	};
	
	this.close = function () {
		this.server.close();
		this.server.unref();
	};
	
	this.server.on('listening',this.listening);

	this.server.on('connection', this.connection); 

	this.server.on('close', this.close);

	this.server.on('error', this.error);

};
</pre>

<p>And this is a way to test some behaviours of the server
</p>

<pre class="brush: jscript">
var server = require("../echoserver.js");
var net = require('net');
var myServer;

// testing hello function
describe("server", function() {

	var successCallBack;

	 beforeEach(function() {
  	
		successCallBack = jasmine.createSpy();

		myServer = new server.EchoServer(1666,'0.0.0.0');
		spyOn(myServer, 'init').andCallThrough();
		spyOn(myServer.server, 'listen').andCallThrough();
		spyOn(myServer, 'connection').andCallThrough();
		myServer.init();
			
    });

	it('Check server port', function() {
		expect(myServer.port).toEqual(1666);
	});

	it('Check server host', function() {
		expect(myServer.host).toEqual('0.0.0.0');
	});

	it('Check server init was called', function() {
		expect(myServer.init).toHaveBeenCalled();
	});

	it('Check server listen was called', function() {
		expect(myServer.server.listen).toHaveBeenCalled();
	});
	
	it('Check server connection was called', function() {
		var client = net.connect({ port: 1666 },
            	function() {
               		client.write('Eat this madafaka!');
            	}, successCallBack);

		waitsFor(function() {
			console.log('Waiting here: ' + successCallBack.callCount );
			return successCallBack.callCount > 0;
		}, "operation never completed", 10000);

		runs(function() {
			expect(successCallBack).toHaveBeenCalled();
		});

	});

	it('checks that server responds the same ', function(done) {
			var client = net.connect({ port: 1666 });
			client.write('hello there');
	 		client.on('data', function(data){
	 			console.log(data.toString());
    			expect(data.toString()).toBe('hello there');
    			done();
  			});

	});

	 afterEach(function() {
    });
});
</pre>

<p>The last test is testing the result of an asynchronous call and it needs to use done() callback. This is valid for Jasmine >= 2.0 versions now. Maybe you've read something about run/waitFor but now this seems to be the official way to do this.
</p>

Some references: 
<ul>
<li>Jasmine introduction: http://jasmine.github.io/2.0/introduction.html</li>
<li>Jasmine wiki: https://github.com/pivotal/jasmine/wiki/Spies</li>
<li><a href="http://eugeniaperez.es/wordpress/2012/12/02/jasmine-javascript-unit-tests-and-testing-tools/" title="Jasmine intro">Intro about Jasmine</a>, web focused</li>
<li>Javascript Unit Testing, by Hazem Saleh PACKT</li>
<li>Javascript Testing with Jasmine, by OREILLY</li>
</ul>