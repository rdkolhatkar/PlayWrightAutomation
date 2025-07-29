const demoClass = require("./demoClass");
// node src/JavaScriptTest/code/demoInheritance.js

class demoInheritance extends demoClass {
    // If parent class have any kind of constrcutor defined in it then our child class must have that constructor 
    constructor(firstName, lastName) {
        // calling parent class constructor
        super(firstName, lastName) // This keyword will call the parent class constructor & we have to pass the same arguments as that of the parent class constructor

    }

    // Here we are overriding the location method of the parent class 'demoClass'
    get location() {
        return "BlueCross Canada"
    }
}

let newPerson = new demoInheritance("Fex", "Sanguish");
newPerson.fullName();
console.log(newPerson.location);