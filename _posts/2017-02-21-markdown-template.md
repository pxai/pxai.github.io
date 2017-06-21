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
- Horizontal rules
- Links
- Images
- Youtube
- Tables
- Code
- Blockquotes

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

## Horizontal rules
You can make the using three or more
- Minuses, dashes or hyphens -
- Underscores _
- Asterisk *

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
![alt text](http://pello.io/images/logo.png "This is the logo")

### Reference like images
![alt text][pellologo]
[pellologo]: (http://pello.io/images/logo.png "This is the logo")

## Youtube videos
We can't embbed but we could add a video link with a caption. You need to specify the video id
[![IMAGE ALT TEXT HERE](http://img.youtube.com/vi/v0MkJtI3FvU/0.jpg)](http://www.youtube.com/watch?v=v0MkJtI3FvU)

## Tables
Tables are a bit tricky, they are made using pipes and dashes. Each header must have at least three dashes
of separation. Outer pipes are optional.
Notice that tables must not be perfectly aligned with the same number of spaces. 
### Simple table
| Id     | Name         | Description    |
| ------ | ------------ | -------------- |
| 42     | Answer       | The answer     |
| 15     | Pretty       | Means pretty   |
| 666    | Evil         | Evil number    |

### Alignment
Using special headers we can set content alignment in tables. Don't forget the spaces.

| Left     | Center       | Right  |
|:------ |:------------:| --------------:|
| 42     | Answer     | The answer   |
| 15     | Pretty     | Means pretty |
| 666    | Evil       | Evil number  |

### Nested markdown 
Inside the cells we can still use markdown. 
| Id     | Name         | Description    |
| ------ | ------------ | -------------- |
| 42     | Answer       | The answer     |
| *15*   | *Pretty*       | *Means pretty*   |
| 666    | **Evil**         | Evil number    |



## Code
Using triple back-ticks , we can somehow get the code style

### Simple word
We can just use backquotes to make a something in the middle of a paragraph to look like a code or command:
just `like this`, looking good?

### Code listing
```
Just using triple quotes
We get this effect of highlighted code
```

### Syntax highlighting
For sites like GitHub, we add the language after the first back-ticks
```javascript
const number = 666;
function sample (parameter) {
    if (parameter) {
        return 666;
    } else {
        console.log('Crappy function this one');
    }
}
```
### Inline HTML
You can just use HTML tags in your code, and it will work in most cases
with simple tags <strong>like this</strong>

## Blockquotes
Looks like a reply
> Hi there
> This is a replay of an email
> and it looks great.

