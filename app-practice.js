var a = "--";
var b = "!!";

(function(){
//    var a = b = 3;
    b = 3;
    var a = b;
    console.log("inside function a = " +a);
    console.log("inside function b = " +b);
})();

console.log("a defined? " + (typeof a !== 'undefined') +  " value = " + a);
console.log("b defined? " + (typeof b !== 'undefined') +  " value = " + b);
