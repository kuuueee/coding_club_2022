function search_array(){
    var my_animals = ["cow", "frog", "bear", "cat", "horse", "dog", "camel", "fish", "beaver", "bat"];
   // the amount of elements in my array is the same number as the number of animals in the array
    var number_of_animals = my_animals.length;
    //store the seach value
    var search_animal = document.getElementById("animal_lookup").value;
    search_animal = search_animal.toLowerCase();
    //create the for loop
    
    //variable i is equal to zero
    //while i is less than the number of animals
    //add one to i.
    for(var i =0; i < number_of_animals; i++){
        
        //Look to see if the search is the same as the the current element: my_animals[i]
        if (search_animal == my_animals[i]){
            document.getElementById("indexed_animal").innerHTML = i;
            return;
        }
    //once the code has done everything above look at the value of i:
    //if this is the first time,
    //   i = 0, then next time i will be = 1,
    //if i = 1, then next time i will be = 2,
    //if i = 2, then next time i will be = 3,
    //if i = 3, then next time i will be = 4,
    //                 ...
    //if i = 9, then next time i will be = 10,
    //              BUT
    //since the number of animals is equal to 10, and
    //in our for loop we said : while i is less than the number of animals
    //and the number of animals is = 10,
    //
    //10 is NOT less than the number of animals SO the loop
    }
    document.getElementById("indexed_animal").innerHTML = "Couldn't find that.";
    
}


