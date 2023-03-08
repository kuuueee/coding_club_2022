function change_array(){
    var my_animals = ["cow", "frog", "bear", "cat", "horse", "dog", "camel", "fish", "beaver", "bat"];
    var array_index =  document.getElementById("array_index").value;
    document.getElementById("indexed_animal").innerHTML = my_animals[array_index];
}


