<h5>Python in 21 minutes (or so)</h5>
<p>For a developer is not enough to know one programming language, it is often said that is good to know many of them. After all the language is but a mere tool to build programs. Python has been around for many years and one of my pending task was to take a look at it. Some friends (<a href="http://twitter.com/Eugenia4v">@Eugenia4v</a>,<a href="http://twitter.com/Claw_Shadow">@Claw_Shadow</a>,<a href="http://twitter.com/@D00m3dr4v3n">@D00m3dr4v3n</a>) are always telling me about the benefits of Python not to mention plenty of papers where Python is even recommended as the language of choice to get into programming. I guess that when Google itself has been using Python from the beginning, and when this language is a requirement for many job offers there is something about it. Despite the title of this post, I spent more than 21 minutes coding around and trying the basics so don't expect a deep dive into Python. This is just a quick guide</p>
<img src="http://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Python_logo_and_wordmark.svg/320px-Python_logo_and_wordmark.svg.png" alt="python logo" title="python logo" /> 
<p>Python is: interpreted, weakly typed, (could be compilated), case sensitive, supports oop, functional, imperative programming,...   
apart from the classic definition, if you come from c style languages at first glance you'll notice the lack of semicolons. But the real change in Python is the use of indentation to create code blocks. So instead using  brackets for if-else-loops-functions you have to use indents or tabs properly. This at least, somehow leads to mandatory code convention (<a href="https://www.python.org/dev/peps/pep-0008">they exists too</a>), here there is no room for discussion about the most clear way to write an if-else structure; there is only "one style" so follow it or your code will not run at all. But to sum up, and above all, python was designed to be easy to read</p>

<p>All the sample code used in this post is included in one single file.</p>


<h5>Writing and running hello world</h5>
<p>So you have just installed python in you windows box or you are running a linux machine, which means that python is most likely in da house. Open any text editor, write this and save it with .py extension:
</p>
<pre class="brush: js">
print 'Hello World desde España y olé' # testing utf-8 :P
print "Welcome to python \'resume\'"
print "New Line \n and ring the bell \a"
</pre>
<p>To run this we can just execute <code>python filename.py</code>, or give it execution perms and run it directly</p>

<p>If you want to test some python code directly in the interpreter, just run python and the python prompt will show up awaiting for your commands.
</p>
<h5>Comments</h5>
<p>We have single line comments and multiline comments. The first line gives support for utf-8 characters.
</p>
<pre class="brush: js">
# -*- coding: utf-8 -*-
# This is a single line comment
"""
some python in a few lines, by Pello Altadill
This is a multiple line comment
more suitable for long texts like this
greetz to any
"""

</pre>

<h5>Variables</h5>
<p>There are no types in python. Variable declaration is the simplest possible.
</p>
<pre class="brush: js">
# variable definitions ###########
number = 666
negativeNumber = -42
decimals = 3.1415
name = "Legion"
anotherName = "Legion of Doom"
letterA = 'a'
letterB = "b"
godExists = True
itsMe = False
# multiline string, 
prayer = """Gods of war I call you,
my sword is by my side,
I seek a life of honor,
free from all false pride"""

# multiple assignment, c-style
a = b = c = 0

# but not strongly typed...
a = True
c = 'Hello'

a = 10
b = -a
c = 42
</pre>


<h5>Operators</h5>
<p>Comparing with other languages we have some extra operators here. Bit operators are omitted, but you've them all. 
</p>
<pre class="brush: js">
# expressions ##########
# arithmethyc
a = b + c
b = a - c
c = a * b
a = b / c # returns floating point
a = b // c # integer division
modulus = a % c
thePower = a ** 3

# of course this are available:
a += b
b -= c
c *= a
a /= b
b %= 42

# booleans, as always
theTruth = godExists and itsMe
theTruth = godExists or false
theTruth = not godExists

# comparison operators
areEqual = a == b
areNotEqual = a!= b   # a &lt;&gt; b works, but obsolete
isBigger = a &gt; b 
isLess = a &lt; b
biggerOrEqual = a &gt;= b
lessOrEqual = a &lt;= b

# combination of all of them
superTrue = ( (a-1) &gt; b) or (not(c == (b*4)))

# concatenation use , in general. + for strings
print "My name is " , name
print a , " - " , b , " - " , c
# if whe use + whe must convert to string
print str(a) + "," + str(b) + "," + str(c)
print prayer

# del unbinds variable values
del prayer
# print prayer would now fail

</pre>


<h5>Conditional</h5>
<p>Python offers if, if-else, if-elsif-else but <b>there is NO switch/case</b>.
</p>
<pre class="brush: js">
# conditional #########################
# single if
if godExists:
	print "God is real unless declared integer"

## single line if
if True:print 'I am single lined if'

anything = '1'
if anything:
	print "Yeah, anything different to 0 means True"

# 0, None, "", '', empty structures (),[],{} are the same as False
numberZero = 0
if not numberZero:
	print "And 0 is False"

# we can omit or put parenthesis
if (a&lt;b or b==c):
	print "a less than b or b equals c"


# if-else
if a &gt; b:
	print "a is bigger than b"
else:
	print "a is NOT bigger than b"

# elif 
if a &gt; b:
	print "a is bigger than b"	
elif a &lt; b:
	print "a is less than b"
elif a == b:
	print "a and b are equal"
elif a == 0:
	pass  # this a way to do NOTHING , as we can't leave a block empty
else:
	print "a and b are alien"

# THERE IS NO switch case
# but you can do it with a elif structure
</pre>


<h5>Loops</h5>
<p>for and while loops as always but... <b>there is no do-while</b>. for is very simple and works well as foreach.
</p>
<pre class="brush: js">
# loops ###########################
# while loop
c = 3
while c&gt;0 :
	print "a loop with c" , c
	c-=1

# for loop 
# for i in range(begin,end), does not reach end
for x in range(0,5):
	print "for loop with x " , x

# with different step
# range(5) = [0, 1, 2, 3, 4]
# for (i in range(begin,end, step))
for x in range(0,10,2):
	print "for loop inc 2 with x " , x
for x in range(5,0,-1):
	print "for loop dec with x " , x

# xrange(number): from 0 to number
for x in xrange(5):  #  0..4
	print "testing xrange: " , x

name = 'Python'
for x in name:
	print "for loop with string: " , x

# break and continue works in python as well 
# applied to while and for
# with break we stop and exit the loop
findTheX = 'sdfXsaf'
for x in findTheX:
	if x == "X":
		print "found the X, now exit"
		break

# with continue we finish current iteration and go for next
someVocals = '0a00i0e00u000a'
for x in someVocals:
	if x =='0':
		continue
	elif x =='a':
		print "a founded"
	elif x=='e':
		print "e founded"

# else clause ###### after for and while is executed after the normal
# execution of the iteration, but NOT when the execution has been
# interrupted by break, exceptions or returns.
counter = 0
for x in someVocals:
	if x == 'a':
		counter += 1
else:
	print "Total a letters found in " , someVocals , ": " , counter

# THERE IS NO do-while structure

</pre>

<h5>Arguments and read from console</h5>
<p>The most basic way to pass arguments to a python script is using the sys.argv list. But, there are other richer modules available to get arguments in getopt style.
</p>
<pre class="brush: js">
print 'Total arguments: ' , number ,  len(sys.argv)
for a in sys.argv:
	print a

# reading from console
value = raw_input("write something")
print value
</pre>
<h5>Tuples, lists, and dictionaries</h5>
<p>We have three kind of basic structures, but beware, once defined tuples can't be changed: they are immutable
</p>
<pre class="brush: js">
# STRUCTURES #############################
# Tuples = IMMUTABLE, ordered, sequence of arbitrary items
someValues = (42, 15, 69)
otherValues = ('Meaning', 42, True, -0.3)
newTuple = tuple('aeiou') # this creates ('a','e','i','o','u')
emptyTuple= ()

print "First: " , otherValues[0]
print "Last: " , otherValues[-1]

# This is a way to add an elemtn
otherValues+= (34,56)
# THIS IS NOT ALLOWED as a tuple is IMMUTABLE
# otherValues[0] = 'Satan'

# of course is iterable
for v in otherValues:
	print "Tuple: " , v

# Lists = MUTABLE, ordered, sequence of arbitrary items
superList = ['Python','Ruby','Go']
otherList = ['God',666, True]
emptyList = []

print "First: " , superList[0]
print "Last: " , superList[-1]

# This is a way to add an elemtn
superList+= ['NodeJS']
otherList[0] = 'Satan'

for x in superList:
	print "Superlist : " , x

# Dictionaries = MUTABLE, arbitrary collection of items
# indexed by arbitrary items = similar to hashtables, hash, maps, you name it.
ages = {'Gandalf':1432, 'Aragorn':543, 'Bilbo':112}
emptyDictionary = {}
# using the builtin function:
trigValues = dict(sin=34,cos=353.23,tan=34)
otherAges = dict([['Frodo',34],['Samwise',35]])

ages['Bilbo'] = 120
ages['Radagast'] = 1423

# iterating...
for key in ages:
	print key , " : " , ages[key]

# SLICING SEQUENCES
# We access an element with sequence[index]
# to get a slice of if: sequence[begin:length:stride]
# stride is the distance or leap
ports = [20, 21, 25, 80, 443, 110, 143];
webPorts = ports[3:2] 		# [80, 443]
ftpPorts = ports[:2]; 		# [20, 21]
somePorts = ports[1:6:2] 	# [21, 80, 110]

# Strings are IMMUTABLE!! and slicing works the same way
myName = "Pello Xabier Altadill Izura"
# so this is illegal
#myName[0] = 'L'

print myName[0] , " name: " , myName[:5]
</pre>

<p>If we want to manipulate these structures, we have many built-in methods available.</p>
<h5>Functions</h5>
<p>def, function name and parameters, that's all.
</p>
<pre class="brush: js">
# function definition #################
def hello():
	print "hello"

def add(a,b):
	return a+b

def isEven(a):
	return (a%2==0)

def withDefaultValues(a, b=0, c=42):
	result = a + b - c
	print "Parameter values: "
	print "a is " , a
	print "b is " , b
	print "c is " , c
	return result

# calling functions
hello
hello()
a = add(600,66)
print "Result of addition: " , add(a,b)
b = isEven(a) 
print "Result of isEven for " , a , ": " , b

withDefaultValues(5)
withDefaultValues(15,-5)
</pre>

<h5>Modules</h5>
<p>Put code in a file called filename.py and we can reuse it in other files just by doing import filename.
Of course, apart from OOP, there are other options to package and reuse code more efficiently.
</p>
<p>This is our super module, which has one super function</p>
<pre class="brush: js">
# hello.py 
def sayHello(name=""):
	return "Hello " , name
</pre>
<p>And this is the code to import and use that module</p>
<pre class="brush: js">
# importing an external 'hello.py' source
import hello as myModule

print myModule.sayHello("my little friend")
</pre>

<h5>Editors</h5>
<p>You may heard something about IDLE. Run, don't look back.. fly you fools! We could always use eclipse with plugins, aptana,... or pycharm by jetbrains if we prefer a simpler sintax-highlighted text editor check these out:
<ul>
<li><a href="http://www.jetbrains.com/pycharm/">pycharm, by jetbrains</a></li>
<li><a href="http://pydev.org">pydev</a></li>
<li><a href="http://www.sublimetext.com">sublime</a></li>
<li><a href="https://atom.io/">atom.io</a></li>
</ul>
</p>

<p>One of the complains you may have heard about python is that <a href="https://wiki.python.org/moin/Python2orPython3">version 3 and 2</a> are not compatible. Apart from that it is one of the languages that any coder should know (in addition to all object oriented c-style languages imho). What about the OOP? well, I was horrified when I saw some code. It looked as dirty as perl, or even more (I like perl btw). Maybe another day. </p>
<p>
When it comes to language preferences, it's always the same. Some people don't like java at all. Many coders think that php is not a language to be taken seriously. Other radicals hate whatever.NET from Microsoft. There are always fierce Python and Ruby supporters. I think that you have to forget your preferences and try to learn them all and master a few of them. Which language is the best? it depends. After all, web servers are written in c++ (yeah, nodejs too) and that's fine. And on top of the webserver we have realms of webapps built with interpreted languages: php, python, ruby, java, c#, js, ... . As for the dbms: frequently coded in c++, with sql, js, json on top.</p>
