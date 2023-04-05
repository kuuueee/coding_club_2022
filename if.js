function changeLight() {
    //resetLights();
    
    //get the value of the action and store in variable action_value
    var action_value = document.getElementById("action").value;
    action_value = action_value.toLowerCase();
    //The is the conditional statement we will use called if
    console.log(action_value);
    
    if (action_value == "no") {
        document.getElementById("red").style.background = "red";
    } else if (action_value == "maybe") {
        document.getElementById("yellow").style.background = "yellow";
    } else if (action_value == "yes") {
        document.getElementById("green").style.background = "green";
    } else {
        resetLights();
    }
    
}




function resetLights(){
    //change red
    document.getElementById("red").style.background = "grey";
    //change yellow
    document.getElementById("yellow").style.background = "grey";
    //change green
    document.getElementById("green").style.background = "grey";
}