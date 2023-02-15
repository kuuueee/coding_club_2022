function example1() {
    document.getElementById("example1div").innerHTML = "FOOBAR";
}


function counter() {
    var currentCount = Number(document.getElementById("counter").innerHTML);
    var nextCount = currentCount + 1;
    document.getElementById("counter").innerHTML = nextCount;
}

function tryit() {
    //this is a variable
    var helloworld = "Hello World!";
    //document.getElementById("tryit").innerHTML = helloworld;
}
