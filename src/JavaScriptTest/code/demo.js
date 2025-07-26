// Printing Hello World in JavaScript
console.log("Hello World"); // To run the javaScript file we use command "node demo.js"
// node src/JavaScriptTest/code/demo.js
// Declaring the variables in JavaScript
// We use the keywords like var, let and const keywords to declare a variable in JavaScript
// We cannot redeclare the variable with "let" keyword but it is possible with "var" 
let a = 4;
let b = "String";
let c = true;
let d = 3.1815;
// To understand the data type of any variable we use typeof() method in JavaScript
console.log(typeof (a));
console.log(typeof (b));
console.log(typeof (c));
console.log(typeof (d));
// Performing operations on variables
var num1 = 10;
var num2 = 20;
var num1 = 30;
var num3 = num1 + num2;
console.log(num3);
// Negation of boolean values
console.log(!c) // true will be converted to the false
// We can reassign new values to "let" & "var" keywords but we cannot reassign new values to the "const" keyword
// Loops and Conditional statements
// if - else conditional statement in JavaScript
// const flag = true;
// const flag = false;
const flag = null;
if (flag == true) {
    console.log("First if block is executed successfully");
} else if (flag == false) {
    console.log("Second else if block is executed successfully");
} else {
    console.log("Third else block is executed successfully");
}
// While loop in JavaScript
let i = 0;
while (i <= 2) {
    i++;
    console.log(i % 2 == 0);
}
// Do-While loop in JavaScript
let j = 0;
do {
    j++;
    if (j % 2 == 0) {
        console.log("Number " + j + " is even number");
    } else {
        console.log("Number " + j + " is odd number");
    }
} while (j <= 10);
// For loop in the JavaScript
for(let k = 0; k <= 10; k++){
    console.log(k * 2);
}
// Operators in javaScript
let l = 0;
for(let l = 0; l <= 10; l++){
   if(l % 2 ==0 && l % 5 ==0){ // Similarly we can use other operators like &&, ||, !
    console.log(l);
   }
}
// Arrays in JavaScript
let marks = Array(6); // Here we are declaring the length of an array now in next line we will add 6 values in the array by creating new object
marks = new Array(20, 40, 35, 37, 50, 67);
// Another way to declare array in JavaScript
var nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(nums[0]); // calling the value from array nums which is at the zero'th index.
console.log( "Length of nums array is " + nums.length); // Checking the length of array
nums.push(64); //.push is the method in JavaScrip which is used for inserting new element in arrays at the last index
console.log(nums);
nums.pop(); //.pop() method is used for deleting the last element in the array
// Break array into different parts of sub array
console.log(nums.slice(3, 6)); //.slice(starting element, endine element) this method is used for creating sub arrays
nums.unshift(55); //.unshift() method in JavaScrip which is used for inserting new element in arrays at the first index
console.log(nums);
nums.indexOf(6); // .indexOf() This method will give us the index of specific element
// Check if certain element is present in the array or not
nums.includes(120); // .includes() this method will check if 120 value is present in the given nums array or not
// sum all the elemens prsent in array 
var sum = 0;
for(let i = 0; i < nums.length; i++){
    sum = sum + nums[i]
}
console.log(sum);
// reduce filter map
let addition = nums.reduce((sum, number) => sum + number, 0);
console.log(addition);
// We have a given array hich contains different numbers and we have to filter the even numbers from that array & we have to create a new array containing those even numbers
var score = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
var evenScore = [];
for(let i=0; i<score.length; i++){
    if(score[i] % 2 == 0){
        evenScore.push(score[i]);
    }
}
console.log(evenScore);
// Now we will use the filter method for above use case
let newFilteredScoreArray = score.filter(evenScoreValues => evenScoreValues % 2 == 0);
console.log(newFilteredScoreArray);