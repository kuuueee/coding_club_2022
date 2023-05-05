const min_maze_side = 4;
const max_maze_side = 500;

function validate_gen(){
    var height_gen_id = "height_gen";
    var width_gen_id = "width_gen";
    var submit_id = "submit_gen";
        
    //if both sides are valid, turn on the submit button, else turn it off, give a warning
    if ((validate_one_side(height_gen_id)) && (validate_one_side(width_gen_id))){
        document.getElementById(submit_id).disabled = false;
        return;
    }
    document.getElementById(submit_id).disabled = true;
}


function validate_one_side(target_id){
    var target_value = Number(document.getElementById(target_id).value);
    //return true iff value is a number within the min and max constant values
    if ((isNaN(target_value)) || (target_value < min_maze_side) || (target_value > max_maze_side)) return false;
    return true;
}

//1. Start with a grid full of walls.
//2. Pick a cell, mark it as part of the maze. Add the walls of the cell to the wall list.
//3. While there are walls in the list:
//  a) Pick a random wall from the list. If only one of the cells that the wall divides is visited, then:
//      i) Make the wall a passage and mark the unvisited cell as part of the maze.
//      ii) Add the neighboring walls of the cell to the wall list.
//  b) Remove the wall from the list.

function generate_maze(){
    //get the height and width of the maze
    var height_gen_id = "height_gen";
    var width_gen_id = "width_gen";
    var height = Number(document.getElementById(height_gen_id).value);
    var width = Number(document.getElementById(width_gen_id).value);
    
    //determine the start and end positions of the maze.
    var start_pos = {x:1, y:height};
    var end_pos = {x:width-1, y:0};
    
    //create a 2d array of values, 0 means empty, 1 means wall
    //start with a grid full of walls
    var maze = Array.from(Array(width), () => new Array(height));
    for (var i = 0; i < width; i++){
        for (var j = 0; j < height; j++){
            maze[i][j] = 1;
        }
    }
    
    //start at a random point inside the maze.
    var rand_x = getRandomInt(0, width-1);
    var rand_y = getRandomInt(0, height-1);
    var maze_origin = {x:rand_x, y:rand_y};
    
    var wall_list = [];
    var visited_list = [];
    visited_list.push(maze_origin);
    
    var directional_coords = get_directional_coords(maze_origin);
    maze[maze_origin.x][maze_origin.y] = 0;
    

    if (directional_coords.length == 1){
        wall_list.push(directional_coords[0]);
    } else {
        for (var l = 0; l < directional_coords.length; l++){
            wall_list.push(directional_coords[l]);
        }
    }
    var iteration_counter = 0;
    var max_walls = min_maze_side * max_maze_side +1;
    
    //3. While there are walls in the list:
    while (wall_list.length != 0 && iteration_counter < max_walls){

        iteration_counter++;
        //a) Pick a random wall from the list.
        
        var randomWallPos = getRandomInt(0, wall_list.length-1);
        
        var random_wall = wall_list[randomWallPos];
        wall_list.splice(randomWallPos, 1);
        
        //when visiting a random wall, record that it was visited
        visited_list.push(random_wall);
        
        //If only one of the cells that the wall divides is visited, then:
        //i) Make the wall a passage and mark the unvisited cell as part of the maze.
        //ii) Add the neighboring walls of the cell to the wall list.
        
        //check the following coords in the visited list
        var left_coords = {x:random_wall.x-1, y:random_wall.y};
        var up_coords = {x:random_wall.x, y:random_wall.y+1};
        var right_coords = {x:random_wall.x+1, y:random_wall.y};
        var down_coords = {x:random_wall.x, y:random_wall.y-1};
        
        var left_visited = check_if_visited(visited_list , left_coords);
        var up_visited = check_if_visited(visited_list , up_coords);
        var right_visited = check_if_visited(visited_list , right_coords);
        var down_visited = check_if_visited(visited_list , down_coords);
        
        var num_neighbors_visited = 0;
        if (left_visited) num_neighbors_visited++;
        if (up_visited) num_neighbors_visited++;
        if (right_visited) num_neighbors_visited++;
        if (down_visited) num_neighbors_visited++;
        
       // console.log("[" + random_wall.x + "][" + random_wall.y + "] has " + num_neighbors_visited + " neighbors adjacent");
        //If only one of the cells that the wall divides is visited
        if (num_neighbors_visited == 1){
            //i) Make the wall a passage and mark the unvisited cell as part of the maze.
            maze[random_wall.x][random_wall.y] = 0;
            //ii) Add the neighboring walls of the cell to the wall list.
            //only add if the coords are valid
            if (coords_are_valid(left_coords)){
                wall_list.push(left_coords);
            }          
            if (coords_are_valid(up_coords)){
                wall_list.push(up_coords);
            }     
            if (coords_are_valid(right_coords)){
                wall_list.push(right_coords);
            } 
            if (coords_are_valid(down_coords)){
                wall_list.push(down_coords);
            }
        }
    }
    
    
    document.getElementById('dirty_print').innerHTML = "";
    dirty_print(maze);
    document.getElementById('clean_print').innerHTML = "";
    clean_print(maze);
}


/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//return true if valid
function verify_x(x){
    var height_gen_id = "height_gen";
    var height = document.getElementById(height_gen_id).value;
    //if x or y are not within the limits of height and width respectively, or NaN, return false;
    if (x < 0 || x >= height || isNaN(x)) return false;
    //else x and y are within bounds and are numbers.
    return true;
}

//return true if valid
function verify_y(y){
    var width_gen_id = "width_gen";
    var width = document.getElementById(width_gen_id).value;
    //if x or y are not within the limits of height and width respectively, or NaN, return false;
    if (y < 0 || y >= width || isNaN(y)) return false;
    //else x and y are within bounds and are numbers.
    return true;
}

function get_directional_coords(maze_origin){
    var valid_coords = [];
    var x_left = maze_origin.x - 1;
    var x_right = maze_origin.x + 1;
    var y_down = maze_origin.y - 1;
    var y_up = maze_origin.y + 1;
    
    //if one of the origin coords is out of bounds, exit.
    if (!verify_x(maze_origin.x) || !verify_y(maze_origin.y)) return;
    var left = {x:x_left, y:maze_origin.y};
    var right = {x:x_right, y:maze_origin.y};
    var down = {x:maze_origin.x, y:y_down};
    var up = {x:maze_origin.x, y:y_up};
    if (verify_x(x_left)) {
        valid_coords.push(left);
    }
    if (verify_x(x_right)) {
        valid_coords.push(right);
    }
    if (verify_y(y_down)) {
        valid_coords.push(down);
    }
    if (verify_y(y_up)) {
        valid_coords.push(up);
    }
    return valid_coords;
}

function dirty_print(maze){
    var height_gen_id = "height_gen";
    var width_gen_id = "width_gen";
    var height = document.getElementById(height_gen_id).value;
    var width = document.getElementById(width_gen_id).value;
    
    var tbl = document.createElement("TABLE");
    tbl.setAttribute("id", "dp_maze_table");
    document.body.appendChild(tbl);
    
   
    for (var j = height-1; j >= 0; j--){
        var tblRow = document.createElement("TR");
        tblRow.setAttribute("id", "dp_row" + j);
        document.getElementById("dp_maze_table").appendChild(tblRow);
        for (var i = 0; i < width; i++){
            var z = document.createElement("TD");
            var t = document.createTextNode(maze[i][j]);
            z.setAttribute("id", "dp_" + i +"-" + j);
            z.appendChild(t);
            document.getElementById("dp_row" + j).appendChild(z);
        }
    }
    document.getElementById('dirty_print').appendChild(tbl);  
    
}

function check_if_visited (visited_list, coords){
    for (var i = 0; i < visited_list.length; i++){
        if (JSON.stringify(visited_list[i]) == JSON.stringify(coords)){
            return true;
        }
    }
    return false;
}

function coords_are_valid(coords){
    if (verify_x(Number(coords.x)) && verify_x(Number(coords.y))) {
        return true;
    }
    return false;
}

function clean_print(maze){
    var height_gen_id = "height_gen";
    var width_gen_id = "width_gen";
    var height = document.getElementById(height_gen_id).value;
    var width = document.getElementById(width_gen_id).value;
    
    var tbl = document.createElement("TABLE");
    tbl.setAttribute("id", "maze_table");
    document.body.appendChild(tbl);
    
   
    for (var j = height-1; j >= 0; j--){
        var tblRow = document.createElement("TR");
        tblRow.setAttribute("id", "row" + j);
        document.getElementById("maze_table").appendChild(tblRow);
        for (var i = 0; i < width; i++){
            var z = document.createElement("TD");
            var t = document.createTextNode(maze[i][j]);
            z.setAttribute("id", i +"-" + j);
            z.appendChild(t);
            document.getElementById("row" + j).appendChild(z);
        }
    }
    document.getElementById('clean_print').appendChild(tbl);  
    
}