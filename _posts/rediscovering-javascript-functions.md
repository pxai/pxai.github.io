<img src="http://s24.postimg.org/d6m5kxqm9/sir_13.jpg" title="Javascript like a sir" alt="Javascript like a sir" />
<p>Javascript functions are apparently simple yet very flexible. Functions are data. Functions
can be anonymous. Functions can even be shape shifters. And of course, closures deserve a look.</p>

<h3>Simple function</h3>
<p>This is a simple sample functions that generates a String, an excuse to introduce the most basic jsdoc notation.</p>
<pre class="brush: js;">
/** 
 * Repeats a word
 * @author Pello Altadill
 * @param {string} word
 * @param {number} repeat
 * @returns {string} the word repeated 
 */
function printWord (word, times) {
    var printed = '';
    for (var i=0;i&lt;times;i++) {
        printed = printed + word;
    }
    
    return printed;
}

printWord('a',5);
aaaaa
</pre>

<h3>Beware global variables</h3>
<p>Never forget this: if we define a variable without the var, it becomes a global, even if it is defined inside a function.</p>
<pre class="brush: js;">
/**
* increments a global variable
* @author Pello Altadill
* @return {number} value of the global
*/
function increment () {
    if (typeof a == "undefined") {
       a = 0;
    } else {
        a++;
    }
    console.log('value is ' + a);
}

increment();
</pre>

<h3>Global and local</h3>
<p>This function plays with global and local variables. Results may not be surprising.</p>
<pre class="brush: js;">

var everywhere = 6;
/**
* increments a global and local variable
* @author Pello Altadill
* @return {number} value of the global
*/
function increment () {
    var onlyLocal = 5;
    onlyLocal++;
    everywhere++;
    return onlyLocal;
}

console.log(increment());
console.log(everywhere);
console.log(increment());
console.log(everywhere);

6
7
6
8
</pre>

<h3>Anonymous functions</h3>
<p>These are javascript functions with no name at all. As you will see later on this post, they come in handy for certain purposes</p>
<pre class="brush: js;">
/**
 * prints parameter to console
 * @author Pello Altadill
 * @param something to print
 * @return undefined
 */
function (something) { console.log(something); }

// Uses: 1. pass as parameter for callbacks
// 2. execute it right away
</pre>

<h3>Functions are data</h3>
<p>We can define a function, anonymous function with no name, and assign it to a variable. Then we can invoke our function through that variable.</p>
<pre class="brush: js;">/**
* adds two numbers
* @author Pello Altadill
* @param {string} a - first operand
* @param {number} b - second operand
* @return {number} - result of addition
*/
function add (a,b) { 
    return a+b;
}

var add = function(a,b) {return a+b;};
typeof add
"function"

add(40,2);
42
</pre>



<h3>Callbacks</h3>
<p>Callbacks are a key concept in javascript and fundamental in Node.js. The idea is simple, you pass a function as a parameter for other function and so calls are chained. In the next example we apply a callback function for array operations. </p>
<pre class="brush: js;">
/**
* function with callback, to apply different operations to array values
* @author Pello Altadill
* @param {array} - numbers
* @param {function} - callback function 
* @return {array} - the resulting array
*/
function convert (numbers, convertCallback) {
    for (var i = 0;i&gt;numbers.length;i++) {
        numbers[i] = convertCallback(numbers[i]);
    }    
    return numbers;
}



/**
* Multiplies a number with itself
* @param {number} - number in decimal base
* @return {number} 
*/
function power (number) {
    return number * number;
}

/**
* Decrements number
* @param {number} - number in decimal base
* @return {number} the
*/
function decrement (number) {
    return --number;
}


var someNumbers = [4,10,12,15,3];

convert(someNumbers,decrement);
[3,9,11,14,2]

convert(someNumbers,power);
[16,100,144,225,9]

</pre>

<p>Check documentation about javascript's forEach statement.</p>

<h3>Self invoking functions</h3>
<p>Apart from recursion, that is available indeed, in javascript we can create functions that after they are defined they are inmediately invoked. JUST ONCE though</p>
<pre class="brush: js;">
/**
* self invoking function, executed only once
* @return {string}
*/
{
    function test () {
        console.log('I am executed only once.');
        return 'ok';
    }
}();

/**
* self invoking anonymous function, executed only once
* @param {string} name
* @param {string} version
* @return {string}
*/

{
    function  (name, version) {
        console.log('This is ' + name + ' program, v' + version);
    }
}('SelfInvoking','0.0.1');
</pre>

<h3>Morphing functions</h3>
<p>This may sound weird or somehow related to virus development, but in fact is one of the niceties of Javascript. The mechanism is easy as pie.</p>
<pre class="brush: js;">
/**
* mighty morphing powerfunction 
* every time you invoke morphing it code changes..
* @author Pello Altadill
* @param {string} - name to be shown
*/
function morphing (name) {
    var person = name;
    console.log('Good morning ' + person);
    morphing = function () {
        console.log('Good afternoon ' + person);
        morphing = function () {
            console.log('Good night ' + person);
        }
    }
}
morphing('any');
"Good morning any"
morphing();
"Good afternoon any"
morphing();
"Good night any"
morphing();
"Good night any"
...
</pre>

<h3>Variable scope chain</h3>
<p>Functions can access global variables or variables defined in their parents. What happens when we have functions inside others? Just the same. There is a scope chain as you will see in this code.</p>
<pre class="brush: js;">
/**
* simple function to try the scope chain inside functions
* NOTE: the scope is defined when functions are defined, not executed.
* @author Pello Altadill
* @param {number} - sample number
* @return {result}
*/
function scopeChain (someParam) {
    var top = someParam;
    console.log('Inside top level: ' + top );
    function chain1 () {
        var second = 42;
        console.log('Inside second level: ' + top + ", " +  second);
        function chain2 () {
            var third = 666;
            console.log('Inside third level: ' + top + ", " +  second + ", " + third);
        }        
        chain2();
    }
    chain1();
    if (typeof second == "undefined") {
        console.log('Cannot access variables inside other functions');
    }
}

scopeChain(15);

"Inside top level: 15"
"Inside second level: 15, 42"
"Inside third level: 15, 42, 666"
"Cannot access variables inside other functions"
</pre>


<h3>Closures</h3>
<img src="http://i.stack.imgur.com/YhU4Z.png" title="classic closure explanation" alt="classic closure explanation" />
<p>Closures provide a mechanism to create private variables inside functions. They are based on the idea that you take out a function that resides in another function (the parent) but it is still linked to its parent function.</p>
<h4>Example</h4>
<p>To show how closures works, and different ways to create them, we will code around this example. It's a password generator that has two variables we would like to protect: totalLetters which indicates the length of the password and letters, which contains all the letters used to generate a password. The function uses an inner function; this approach will make it easy the transition to a closure where we will protect totalLetters and letters variables and we will make sure that they are initialized only once.</p>
<pre class="brush: js;">
/**
* generates passwords
* @author Pello Altadill
* @param {number} [length] - optional length
* @return {result}
*/
function generatePassword () {
    var totalLetters = 8;
    var letters = 'abcdef23456789';
    console.log('Ok, initiliazed');
    function generate () {
        var result = '';
        for (var i = 0;i&lt;totalLetters;i++) {
            result += letters[Math.round(Math.random()*(letters.length-1))];
        }        
        return result;
    }
    
    return generate();
}

generatePassword();
"fc498fa8"
"Ok, initiliazed"
generatePassword();
"55833ffd"
"Ok, initiliazed"
generatePassword();
"6b9edc75"
"Ok, initiliazed"
</pre>

<h4>Closure, with a global variable</h4>
<p>A simple solution, where we define a global variable and inside the function we assign the inner function to it.</p>
<pre class="brush: js;">
// We define a global variable to hold the closure
var generate;

/**
* generates passwords. Uses a closure because we will return function but the link
* with its parent is kept.
* @author Pello Altadill
* @param {number} [length] - optional length
* @return {result}
* @greetz any
*/
function generatePassword () {
    var totalLetters = 8;
    var letters = 'abcdef23456789';
    console.log('Ok, initiliazed only once.');
    generate = function () {
        var result = '';
        for (var i = 0;i&lt;totalLetters;i++) {
            result += letters[Math.round(Math.random()*(letters.length-1))];
        }        
        return result;
    }
}

generatePassword();
"Ok, initiliazed only once."
generate();
"9ecb266b"
generate();
"58576336"
generate();
"7f87d274"
</pre>



<h4>Closure, returning the inner function</h4>
<p>If you don't like to mess around with a global variable inside your function, this is another way to create a closure</p>
<pre class="brush: js;">
/**
* generates passwords. Uses a closure because we will return function but the link
* with its parent is kept.
* @author Pello Altadill
* @param {number} [length] - optional length
* @return {result}
* @greetz any
*/
function generatePassword () {
    var totalLetters = 8;
    var letters = 'abcdef23456789';
    console.log('Ok, initiliazed only once.');
    var genFunction = function () {
        var result = '';
        for (var i = 0;i&lt;totalLetters;i++) {
            result += letters[Math.round(Math.random()*(letters.length-1))];
        }        
        return result;
    }
    
    return genFunction;
}

var generate = generatePassword();

"Ok, initiliazed only once."
generate()
"23acce53"
generate()
"87aa77cc"
generate()
"78d653ec"
</pre>

<h4>Closure, anonymous and selfinvoking</h4>
<p>Putting it all together, this is how you create a closure like a sir.</p>
<pre class="brush: js;">
/**
* generates passwords. Uses a closure because we will return function but the link
* with its parent is kept.
* @author Pello Altadill
* @param {number} [length] - optional length
* @return {result}
* @greetz any
*/
var generatePassword = ( 
    function  () {
        var totalLetters = 8;
        var letters = 'abcdef23456789';
        console.log('Ok, initiliazed only once.');
        return function () {
            var result = '';
            for (var i = 0;i&lt;totalLetters;i++) {
                result += letters[Math.round(Math.random()*(letters.length-1))];
            }        
            return result;
        }
    }
)();

"Ok, initiliazed only once."
generatePassword();
"3737c6c7"
generatePassword();
"ad5f5eb2"
generatePassword();
"cb684648"
</pre>

<h4>Adding getters and setters</h4>
<p>Why not? create some controlled access to your variables while keeping them private.</p>
<pre class="brush: js;">
// We define the get/set references
var getTotalLetters, setTotalLetters;
var getLetters, setLetters;

/**
* generates passwords. Uses a closure because we will return function but the link
* with its parent is kept.
* @author Pello Altadill
* @param {number} [length] - optional length
* @return {result}
* @greetz any
*/
var generatePassword = ( 
    function  () {
        var totalLetters = 8;
        var letters = 'abcdef23456789';
        console.log('Ok, initiliazed only once.');
        
        // We define get/set methods
        getTotalLetters = function () {
                        return totalLetters; 
                   };
        setTotalLetters = function (value) {
                        totalLetters = value;
                   };
        getLetters = function () {
                        return letters; 
                   };
        setLetters = function (value) {
                        letters = value;
                   };
                   
        return function () {
            var result = '';
            for (var i = 0;i&lt;totalLetters;i++) {
                result += letters[Math.round(Math.random()*(letters.length-1))];
            }        
            return result;
        }
    
    }
)();

"Ok, initiliazed only once."
generatePassword()
"4c7d4b25"
generatePassword()
"88988ce6"
setTotalLetters(4)
generatePassword()
"ebb5"
generatePassword()
"cfcb"
getTotalLetters()
4
getLetters()
"abcdef23456789"
setLetters('xyz789')
generatePassword()
"7y77"
generatePassword()
"89yy"
generatePassword()
"zz7y"
</pre>

<h3>Iterarion closures</h3>
<p>This is a way to crea next(), hasMoreElements()-like iterators in Javascript.</p>
<pre class="brush: js;">
/**
* closure to generate an iterator for arrays
* @author Pello Altadill
* @param {Array} array of elements
* @return {function}
* @greetz any
*/
function iterator(list) {
    var i = 0;
    return function(){
        return list[i++];
    };
}

var nextElement = iterator([15,42,666]);

while (var e = nextElement()) {
    console.log(e);
}
</pre>

<p>That's all for today.  This is but a lame intro, anyway I hope that you find something useful. Mastering javascript functions is important if you want to move on and dive in Objects, prototype, and the like. Greets for you, as always ;)</p>