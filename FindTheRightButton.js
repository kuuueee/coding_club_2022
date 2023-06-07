function changeBGcolor() {
    var action_value = document.getElementById("action").value;
    action_value = action_value.toLowerCase();
    console.log(action_value);

    if (action_value == "white") {
        document.body.style.backgroundColor = "white";
    } else if (action_value == "red") {
        document.body.style.backgroundColor = "#7a0d1a";
    } else if (action_value == "blue") {
        document.body.style.backgroundColor = "#232778";
    } else if (action_value == "green") {
        document.body.style.backgroundColor = "#1b6935";
    } else if (action_value == "purple") {
        document.body.style.backgroundColor = "#6d10c4";
    } else if (action_value == "yellow") {
        document.body.style.backgroundColor = "#d9b60b";
    } else if (action_value == "black") {
        document.body.style.backgroundColor = "#262626";
    }
}

function rightButton() {
    document.getElementById("squareLV1").style.backgroundColor = "#31bf15";
}

function rightButton2() {
    document.getElementById("squareLV2").style.backgroundColor = "#31bf15";
}

function rightButton3() {
    document.getElementById("squareLV3").style.backgroundColor = "#31bf15";
}

function rightButton4() {
    document.getElementById("squareLV4").style.backgroundColor = "#31bf15";
}

function rightButton5() {
    document.getElementById("squareLV5").style.backgroundColor = "#31bf15";
}

function rightButton6() {
    document.getElementById("squareLV6").style.backgroundColor = "#31bf15";
}

function rightButton7() {
    document.getElementById("squareLV7").style.backgroundColor = "#31bf15";
}
z