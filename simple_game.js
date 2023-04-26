const height = 6;
const width = 7;

//0 = empty
//1 = red
//2 = yellow

function add(col_num){
    var turn_color = get_turn_color_hex();
    var turn = get_turn_color();
    for (var i=0; i < height; i++){
        var temp_circle_id = "circ" + col_num + "-" + i;
        var curr_circ_inner = document.getElementById(temp_circle_id).innerHTML;
        if (i == height-1){
            set_circle_color(temp_circle_id, turn_color);
            switch_teams();
            set_button(col_num, "off");
            if (turn == "red"){
              document.getElementById(temp_circle_id).innerHTML = "1";  
            } else if (turn == "yellow"){
                document.getElementById(temp_circle_id).innerHTML = "2";
            }
            check_if_won(turn);
            return;
        } else if (curr_circ_inner == "0"){
            set_circle_color(temp_circle_id, turn_color);
            switch_teams();
            if (turn == "red"){
                document.getElementById(temp_circle_id).innerHTML = "1";  
            } else if (turn == "yellow"){
                document.getElementById(temp_circle_id).innerHTML = "2";
            }
            check_if_won(turn);
            return;
        }
    } 
}

function set_circle_color(circle_id, color){
    document.getElementById(circle_id).style.backgroundColor = color;
}

function set_button(col_num, state){
    var button_id = "button-" + col_num;
    if (state == "on"){
        document.getElementById(button_id).disabled = false;
    } else if (state == "off"){
        document.getElementById(button_id).disabled = true;
    }
}

function reset(){
    for (var i=0; i < width; i++){
        for (var j = 0; j < height; j++){
            var temp_circle_id = "circ" + i + "-" + j;
            document.getElementById(temp_circle_id).style.backgroundColor = "#FFFFFF";
            document.getElementById(temp_circle_id).innerHTML = "0";
        }
    }
    for (var k=0; k < width; k++){
        set_button(k, "on");
    }
    var winner_is_id = "winner";
    document.getElementById(winner_is_id).innerHTML = "";
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
    switch_color();
}

function switch_color(){
    var color = get_turn_color_hex();
    document.getElementById("turn").style.backgroundColor = color;
}


function get_turn_color_hex(){
    var turn_color_id = "turn";
    var turn_color = document.getElementById(turn_color_id).value;
    var color = turn_color.toLowerCase();
    if (color == "red"){
        return "#ff0000";
    } else {
        return "#ffff00";
    }
}

function get_turn_color(){
    var turn_color_id = "turn";
    var turn_color = document.getElementById(turn_color_id).value;
    var color = turn_color.toLowerCase();
    return color;
}

function check_if_won(turn_color){
    var win_div_id = "winner";
    var c4 = Array.from(Array(width), () => new Array(height));
    for (var i = 0; i < width; i++){
        for (var j = 0; j < height; j++){
            var temp_circ_id = "circ" + i + "-" + j;
            c4[i][j] = document.getElementById(temp_circ_id).innerHTML;
        }
    }
    var target_num;
    if (turn_color  == "red"){
        target_num = 1;
    } else if (turn_color == "yellow"){
        target_num = 2;
    }
    
    for (var k = 0; k < width; k++){
        for (var l = 0; l < height; l++){
            //1 = red won
            //2 = yellow won
            //0 indicates no winners
            if (c4[k][l] ==  target_num){
                var winner_turn_num = check_all_directions(c4, target_num, k,l);
                if (winner_turn_num != 0){
                    var winner_message;
                    if (winner_turn_num == 1){
                        winner_message = "Red Won, try again yellow?";
                    } else if (winner_turn_num ==2){
                        winner_message = "Yellow Won, try again red?";
                    }
                    document.getElementById(win_div_id).innerHTML = winner_message;
                }
            }
        }
    }
}

function check_all_directions(c4, target_num, x, y){
    var north = check_north(c4, target_num, x, y);
    if (north != 0) return target_num;
    
    var northeast = check_northeast(c4, target_num, x, y);
    if (northeast != 0) return target_num;

    var east = check_east(c4, target_num, x, y);
    if (east != 0) return target_num;

    var southeast = check_southeast(c4, target_num, x, y);
    if (southeast != 0) return target_num;
    
    var south = check_south(c4, target_num, x, y);
    if (south != 0) return target_num;
    
    var southwest = check_southwest(c4, target_num, x, y);
    if (southwest != 0) return target_num;
    
    var west = check_west(c4, target_num, x, y);
    if (west != 0) return target_num;
    
    var northwest = check_northwest(c4, target_num, x, y);
    if (northwest != 0) return target_num;
    return 0;
}

function check_north(c4, target_num,x,y){
        var target_coords = [
        {
            "x" : x,
            "y" : y,
        },
        {
            "x" : x,
            "y" : y+1,
        },
        {
            "x" : x,
            "y" : y+2,
        },
        {
            "x" : x,
            "y" : y+3,
        },
    ];
    if (!validate_coords(target_coords)) {
        return 0;
    }
    if(checkeach(c4, target_num, target_coords)){
        return target_num;
    } else {
        return 0;
    }
    for (var i = 0; i < target_coords.length; i++){
        if (target_coords[i].x > width){
            return 0;
        }
        if (target_coords[i].y > height){
            return 0;
        }
    }
}
function check_northeast(c4, target_num,x,y){
        var target_coords = [
        {
            "x" : x,
            "y" : y,
        },
        {
            "x" : x+1,
            "y" : y+1,
        },
        {
            "x" : x+2,
            "y" : y+2,
        },
        {
            "x" : x+3,
            "y" : y+3,
        },
    ];
    if (!validate_coords(target_coords)) {
        return 0;
    }
    if(checkeach(c4, target_num, target_coords)){
        return target_num;
    } else {
        return 0;
    }
    for (var i = 0; i < target_coords.length; i++){
        if (target_coords[i].x > width){
            return 0;
        }
        if (target_coords[i].y > height){
            return 0;
        }
    }
}
function check_east(c4, target_num,x,y){
        var target_coords = [
        {
            "x" : x,
            "y" : y,
        },
        {
            "x" : x+1,
            "y" : y,
        },
        {
            "x" : x+2,
            "y" : y,
        },
        {
            "x" : x+3,
            "y" : y,
        },
    ];
    if (!validate_coords(target_coords)) {
        return 0;
    }
    if(checkeach(c4, target_num, target_coords)){
        return target_num;
    } else {
        return 0;
    }
    for (var i = 0; i < target_coords.length; i++){
        if (target_coords[i].x > width){
            return 0;
        }
        if (target_coords[i].y > height){
            return 0;
        }
    }
}
function check_southeast(c4, target_num,x,y){
        var target_coords = [
        {
            "x" : x,
            "y" : y,
        },
        {
            "x" : x+1,
            "y" : y-1,
        },
        {
            "x" : x+2,
            "y" : y-2,
        },
        {
            "x" : x+3,
            "y" : y-3,
        },
    ];
    if (!validate_coords(target_coords)) {
        return 0;
    }
    if(checkeach(c4, target_num, target_coords)){
        return target_num;
    } else {
        return 0;
    }
    for (var i = 0; i < target_coords.length; i++){
        if (target_coords[i].x > width){
            return 0;
        }
        if (target_coords[i].y > height){
            return 0;
        }
    }
}
function check_south(c4, target_num,x,y){
        var target_coords = [
        {
            "x" : x,
            "y" : y,
        },
        {
            "x" : x,
            "y" : y-1,
        },
        {
            "x" : x,
            "y" : y-2,
        },
        {
            "x" : x,
            "y" : y-3,
        },
    ];
    if (!validate_coords(target_coords)) {
        return 0;
    }
    if(checkeach(c4, target_num, target_coords)){
        return target_num;
    } else {
        return 0;
    }
    for (var i = 0; i < target_coords.length; i++){
        if (target_coords[i].x > width){
            return 0;
        }
        if (target_coords[i].y > height){
            return 0;
        }
    }
}
function check_southwest(c4, target_num,x,y){
        var target_coords = [
        {
            "x" : x,
            "y" : y,
        },
        {
            "x" : x-1,
            "y" : y-1,
        },
        {
            "x" : x-2,
            "y" : y-2,
        },
        {
            "x" : x-3,
            "y" : y-3,
        },
    ];
    if (!validate_coords(target_coords)) {
        return 0;
    }
    if(checkeach(c4, target_num, target_coords)){
        return target_num;
    } else {
        return 0;
    }
    for (var i = 0; i < target_coords.length; i++){
        if (target_coords[i].x > width){
            return 0;
        }
        if (target_coords[i].y > height){
            return 0;
        }
    }
}
function check_west(c4, target_num,x,y){
        var target_coords = [
        {
            "x" : x,
            "y" : y,
        },
        {
            "x" : x-1,
            "y" : y,
        },
        {
            "x" : x-2,
            "y" : y,
        },
        {
            "x" : x-3,
            "y" : y,
        },
    ];
    if (!validate_coords(target_coords)) {
        return 0;
    }
    if(checkeach(c4, target_num, target_coords)){
        return target_num;
    } else {
        return 0;
    }
    for (var i = 0; i < target_coords.length; i++){
        if (target_coords[i].x > width){
            return 0;
        }
        if (target_coords[i].y > height){
            return 0;
        }
    }
}
function check_northwest(c4, target_num,x,y){
        var target_coords = [
        {
            "x" : x,
            "y" : y,
        },
        {
            "x" : x-1,
            "y" : y+1,
        },
        {
            "x" : x-2,
            "y" : y+2,
        },
        {
            "x" : x-3,
            "y" : y+3,
        },
    ];
    if (!validate_coords(target_coords)) {
        return 0;
    }
    if(checkeach(c4, target_num, target_coords)){
        return target_num;
    } else {
        return 0;
    }
    for (var i = 0; i < target_coords.length; i++){
        if (target_coords[i].x > width){
            return 0;
        }
        if (target_coords[i].y > height){
            return 0;
        }
    }
}


function checkeach(c4, target_num, target_coords){
    var all_match_target = false;
    if ((c4[target_coords[0].x][target_coords[0].y] == target_num) &&
        (c4[target_coords[1].x][target_coords[1].y] == target_num) &&
        (c4[target_coords[2].x][target_coords[2].y] == target_num) &&
        (c4[target_coords[3].x][target_coords[3].y] == target_num)){
        return true;
    }
    return false;
}

function validate_coords(target_coords){
    for (var i = 0; i < target_coords.length; i++){
        if ((target_coords[i].x >= width) || (target_coords[i].x < 0) ||
            (target_coords[i].y >= height) || (target_coords[i].y < 0)){
            return false;
        }
    }
    //IF HERE THEN THE CHECK WAS VALID
    var all_targets = "";
    for (var j = 0; j < target_coords.length; j++){
        all_targets += "[" + target_coords[j].x + "][" +  target_coords[j].y + "]\n";
    }
    return true;
}
