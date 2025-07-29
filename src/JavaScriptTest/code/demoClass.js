// Classes in the javaScript
// node src/JavaScriptTest/code/demoClass.js
// We have to export the class to make it visible to other classes as public class
module.exports = class demoClass {
    age = 28;
    // get keyword is used to define the property like getter method
    get location() { // This is a property
        return "India"
    }
    // Defining the constructor of the class.
    // Constructor is a method which executes by default when class is initialized
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    fullName() { // This is a method 
        console.log(this.firstName + " " + this.lastName);
    }
}
// Creating object of the class
/*
let testClass = new demoClass("Quin", "Talen");
let testClassOne = new demoClass("Layla", "Munrow");
let testClassTwo = new demoClass("Erin", "Heylay");
console.log(testClass.age);
console.log(testClass.location); // This location is a property
testClass.fullName();
testClassOne.fullName();
testClassTwo.fullName();
*/