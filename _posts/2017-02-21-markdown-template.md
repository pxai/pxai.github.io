---
layout: post
title: "Markdown template"
date: 2017-02-21 12:15:00
categories: [markdown, template]
---
# Markdown template

Based on [Adams reference](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
I made this on my own just for fun and learning and further improvement.

## Contents
This is the list of contents described in this template
- Special emphasis
- Titles
- Lists
- Links
- Images
- Tables
- Code

## Special emphasis
You can get these effects
```
1. Italics with *asterisks* or _underscores_
2. Bold or Strong with **double asterisks** or __double underscore__
3. Both italic and bold **_with double asterisk and underscore_** or *__asterisk and double underscore__*
4. Strike or delete with using ~~tildes~~
```
1. Italics with *asterisks* or _underscores_
2. Bold or Strong with **double asterisks** or __double underscore__
3. Both italic and bold **_with double asterisk and underscore_** or *__asterisk and double underscore__*
4. Strike or delete with using ~~tildes~~ 

## Titles
Titles have different sizes
# H1-like title
## H2-like title
### H3-like title
#### H4-like title
##### H5-like title
###### H6-like title

Other ways to create H1 and H2-like titles:

H1-like title
=============
and
H2-like title
-------------

## Lists
Lists have different modes
### Ordered
1. Ordered 
2. With
3. Numbers
⋅1. Even with sublists ⋅2. Like this using dots


### Unorderded list with
- Minuses -
- Plus sign +
- Asterisk *

### Sublists
* Ordered or unordered
* Just use dots ··
··* Like this
··* Or this
* Use dots for indenting
···Just like this

## Links
Links can be made around text or any other element

### Simple link
[Simple link to my page](http://pello.io)

### Simple with title
[Simple link to my page](http://pello.io "My homepage")

### Link to reference
[Link to reference][Reference text]

### Link to reference
[Link to repository file](2017-02-21-markdown-template.md)

### Link to numbered reference
[Go to this reference][1]
[Go to another reference][2]

[Sample Reference]: https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
[1]: https://github.com
[2]: http://reddit.com

### Links with angle brackets
We can just use angle brackets with urls like <http://pello.io> 

## Images
Images must be available online
### Inline images
![alt text](https://github.com/pxai/pxai.github.io/blob/master/images/logo.png "This is the logo")

### Reference like images
![alt text][pellologo]
[pellologo]: (https://github.com/pxai/pxai.github.io/blob/master/images/logo.png "This is the logo")

## Tables
Tables are a bit tricky

## Code
Using triple-simple quotes, we can somehow get the code style


