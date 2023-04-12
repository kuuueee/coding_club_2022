function add(col_num){
    //Get the turn color
    var height = 6; 
    var width = 7;
    
    var turn_color_id = "turn";
    var turn_color = document.getElementById(turn_color_id).value;
    var color = turn_color.toLowerCase();
    //Evaluate where the color will go.
    for(var i = height; i >= 1; i--){
        //checkbackground color from low to high
        var temp_circle_id = "sq" + i + "-" + col_num;
        let temp_cirlce_color = document.getElementById(temp_circle_id).style.backgroundColor;
        if (i == 1) {
            change_circle_color(temp_circle_id);
            turn_off_button(col_num);
            break;
        }
        if (temp_cirlce_color == "rgb(255, 255, 255)"){
            //change color of circle
            change_circle_color(temp_circle_id);
            break;
        }
    }
    switch_teams(turn_color);
}

function turn_off_button(col_num){
    var button_id = "button-" + col_num;
    document.getElementById(button_id).disabled = true;
}

function turn_on_button(col_num){
    var button_id = "button-" + col_num;
    document.getElementById(button_id).disabled = false;
}

function reset(){
    var width = 7;
    var height = 6; 
    for (var k = 1; k <= width; k++){
        turn_on_button(k);
    }
    for (var i = 1; i <= width; i++){
        for (var j = 1; j <= height; j++){
            var temp_circle_id = "sq" + i + "-" + j;
            if (temp_circle_id != null){
                document.getElementById(temp_circle_id).style.backgroundColor ="#FFFFFF";
            }
        }
    }
}

function change_circle_color(temp_circle_id){
    var turn_color_id = "turn";
    var turn_color = document.getElementById(turn_color_id).value;
    var color = turn_color.toLowerCase();
    if (color == "red"){
        document.getElementById(temp_circle_id).style.backgroundColor =  "red";
    } else {
        document.getElementById(temp_circle_id).style.backgroundColor =  "yellow";
    }
}

function switch_teams(){
    var turn_color_id = "turn";
    var turn_color = document.getElementById(turn_color_id).value;
    var color = turn_color.toLowerCase();
    if (color == "red"){
        document.getElementById(turn_color_id).value = "Yellow";
    } else {
        document.getElementById(turn_color_id).value = "Red";
    }
}

