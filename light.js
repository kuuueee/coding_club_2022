function init(){
	//enableRadios();
	var sq1_id = "sq1";
	var sq2_id = "sq2";
	var sq3_id = "sq3";
	var sq4_id = "sq4";
	var sq5_id = "sq5";
	var sq6_id = "sq6";
	var sq7_id = "sq7";
	var sq8_id = "sq8";
	var sq9_id = "sq9";
	var sq10_id = "sq10";
	
	var square_ids = Array(sq1_id, sq2_id, sq3_id, sq4_id, sq5_id, sq6_id, sq7_id, sq8_id, sq9_id, sq10_id);
	var blackToWhite = Array("#000000", "#080808", "#101010", "#181818", "#202020", "#282828", "#303030", "#383838", "#404040", "#484848", "#505050", "#585858", "#606060", "#686868", "#696969", "#707070", "#747474", "#787878", "#808080", "#888888", "#909090", "#989898", "#A0A0A0", "#A8A8A8", "#A9A9A9", "#B0B0B0", "#B8B8B8", "#BEBEBE", "#C0C0C0", "#C8C8C8", "#D0D0D0", "#D3D3D3", "#D8D8D8", "#DCDCDC", "#E0E0E0", "#E8E8E8", "#F0F0F0", "#F5F5F5", "#F8F8F8", "#FFFFFF");
	var selectedDirection = blackToWhite.reverse();

	
	for (var i = 0; i < square_ids.length; i++){
		spread = i*4;
		document.getElementById(square_ids[i]).style.backgroundColor = selectedDirection[spread];
	}
}

function reimage(){
	enableRadios();
	var sq1_id = "sq1";
	var sq2_id = "sq2";
	var sq3_id = "sq3";
	var sq4_id = "sq4";
	var sq5_id = "sq5";
	var sq6_id = "sq6";
	var sq7_id = "sq7";
	var sq8_id = "sq8";
	var sq9_id = "sq9";
	var sq10_id = "sq10";

	var forward_id = "forward";
	var backward_id = "backward";
	var forward_value = "null";
    var backward_value = "null";
	if (document.getElementById(forward_id).checked) {
		forward_value = document.getElementById(forward_id).value;
	}
		if (document.getElementById(backward_id).checked) {
		backward_value = document.getElementById(backward_id).value;
	}


	var square_ids = Array(sq1_id, sq2_id, sq3_id, sq4_id, sq5_id, sq6_id, sq7_id, sq8_id, sq9_id, sq10_id);
	var blackToWhite = Array("#000000", "#080808", "#101010", "#181818", "#202020", "#282828", "#303030", "#383838", "#404040", "#484848", "#505050", "#585858", "#606060", "#686868", "#696969", "#707070", "#747474", "#787878", "#808080", "#888888", "#909090", "#989898", "#A0A0A0", "#A8A8A8", "#A9A9A9", "#B0B0B0", "#B8B8B8", "#BEBEBE", "#C0C0C0", "#C8C8C8", "#D0D0D0", "#D3D3D3", "#D8D8D8", "#DCDCDC", "#E0E0E0", "#E8E8E8", "#F0F0F0", "#F5F5F5", "#F8F8F8", "#FFFFFF");
	var selectedDirection;
	if (forward_value == "forward"){
		selectedDirection = blackToWhite.reverse();
	} else if (backward_value == "backward"){
		selectedDirection = blackToWhite;
	}	
	for (var i = 0; i < square_ids.length; i++){
		spread = i*4;
		document.getElementById(square_ids[i]).style.backgroundColor = selectedDirection[spread];
	}
}

function step(){
	lockRadios();
	var sq1_id = "sq1";
	var sq2_id = "sq2";
	var sq3_id = "sq3";
	var sq4_id = "sq4";
	var sq5_id = "sq5";
	var sq6_id = "sq6";
	var sq7_id = "sq7";
	var sq8_id = "sq8";
	var sq9_id = "sq9";
	var sq10_id = "sq10";

	var square_ids = Array(sq1_id, sq2_id, sq3_id, sq4_id, sq5_id, sq6_id, sq7_id, sq8_id, sq9_id, sq10_id);
	var blackToWhite = Array("#000000", "#080808", "#101010", "#181818", "#202020", "#282828", "#303030", "#383838", "#404040", "#484848", "#505050", "#585858", "#606060", "#686868", "#696969", "#707070", "#747474", "#787878", "#808080", "#888888", "#909090", "#989898", "#A0A0A0", "#A8A8A8", "#A9A9A9", "#B0B0B0", "#B8B8B8", "#BEBEBE", "#C0C0C0", "#C8C8C8", "#D0D0D0", "#D3D3D3", "#D8D8D8", "#DCDCDC", "#E0E0E0", "#E8E8E8", "#F0F0F0", "#F5F5F5", "#F8F8F8", "#FFFFFF");
	
	for (var i = 0; i < square_ids.length; i++){
		var temp_rgb = document.getElementById(square_ids[i]).style.backgroundColor;
		var temp_hex = rgbToHex(temp_rgb);
		var index = blackToWhite.indexOf(temp_hex);
		if (index != blackToWhite.length-1){
			document.getElementById(square_ids[i]).style.backgroundColor = blackToWhite[index+1];
		} else {
			document.getElementById(square_ids[i]).style.backgroundColor = blackToWhite[0];
		}
	}
	
}

function componentFromStr(numStr, percent) {
    var num = Math.max(0, parseInt(numStr, 10));
    return percent ?
        Math.floor(255 * Math.min(100, num) / 100) : Math.min(255, num);
}


function rgbToHex(rgb) {
    var rgbRegex = /^rgb\(\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*\)$/;
    var result, r, g, b, hex = "";
    if ( (result = rgbRegex.exec(rgb)) ) {
        r = componentFromStr(result[1], result[2]);
        g = componentFromStr(result[3], result[4]);
        b = componentFromStr(result[5], result[6]);

        hex = "#" + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
	hex = hex.toUpperCase();
    return hex;
}

function stop(){
	var stop_id = "hidden_stop";
	document.getElementById(stop_id).innerHTML = "stop";
}

async function start(){
	lockRadios();
	var stop_id = "hidden_stop";
	document.getElementById(stop_id).innerHTML = "go";	
	i = 0;
	while (document.getElementById(stop_id).innerHTML != "stop"){
		await stepThru();
	}
}

function lockRadios(){
	var forward_id = "forward";
	var backward_id = "backward";
	document.getElementById(forward_id).disabled = true;  
    document.getElementById(backward_id).disabled = true;  
}

function enableRadios(){
	var forward_id = "forward";
	var backward_id = "backward";
	document.getElementById(forward_id).disabled = false;  
    document.getElementById(backward_id).disabled = false;  
}

function getFrequency(){
	var frequency_id = "frequency";
	return Number(document.getElementById(frequency_id).value);  
	
}

function stepThru(){
	var frequency = getFrequency();
	var speed;
	switch (frequency){
		case 0:
			speed = 300;
            break;
		case 1:
			speed = 250;
			break;
		case 2:
			speed = 200;
			break;
		case 3:
			speed = 150;
			break;
		case 4:
			speed = 100;
			break;
		case 5:
			speed = 50;
			break;
			
	}
	speed = parseInt(speed);
	step();
	return new Promise(resolve => {
		setTimeout(() => {
			resolve('resolved');
		}, speed);
	});
	
}