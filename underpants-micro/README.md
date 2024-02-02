# underpants-micro
Create a small portion of underscore functionality for review and higher order function practice.

## Why?
This project is for students entering into the Internet of Things course. Its purpose is to provide a refresher and some practice for coding techniques that will be useful throughout the course.

## Installation
To install this project, enter the following commands in your bash terminal.
 
* git clone https://github.com/OperationSpark/underpants-micro.git
* rm -rf underpants-micro/.git*

## Instructions
 - Open up index.html in a web browser.
 - Notice that all the tests are failing. :)
 - Open up underpants.js in a text editor and follow the instructions.
 - Make all the tests pass!!

## Links and Resources

Some quick notes that may come in handy:

- [underscore documentation](http://underscorejs.org/).
- Within a function, you can use the `arguments` variable to access all the
  parameters that were passed in even if they aren't named in the function
  definition. This is useful if you don't know how many arguments are going to
  be passed in in advance.
    - You can count the arguments by using `arguments.length` and access each
      argument using `arguments[i]`.
    - The `arguments` object is very similar to an array, but note that it does
      not support most array functions (such as `slice` or `push`). You can read
      more about this [here](http://www.sitepoint.com/arguments-a-javascript-oddity/).


**Note:** Some browsers provide built-in functions -- including `forEach`, `map`,
`reduce` and `filter` -- that replicate the functionality of some of the functions
you will implement. Don't use them to implement your functions.
