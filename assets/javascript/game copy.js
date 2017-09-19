
var quiObj = {
	name: "Qui-Gon Jinn",
	photo: "assets/images/qui.jpg",
	hp: 180
};


var anakinObj = {
	name: "Anakin Skywalker",
	photo: "assets/images/anakin.jpg",
	hp: 100
};

function moveCharacter(obj, place) {

	//var charDiv = document.createElement("button");
	var charDiv = document.createElement("li");
	$(place).append(charDiv);

	$(charDiv).attr("class", "character");

	if (place === "#enemies") {
		console.log(place);
		$(charDiv).attr("class", "enemy");
		//$(charDiv).removeAttr("class", "character");
	}
	else if (place === "#defender") {
		$(charDiv).attr("class", "defender");

	}

	$(charDiv).attr("id", obj.name);
	$(charDiv).attr("value", obj.name);
	$(charDiv).attr("hp", obj.hp);

	//$(charDiv).attr("power", obj.hp);

	//charDiv.attr("id", "2");


	//charDiv.append("<div>")
	//charDiv.addClass("character");
	//charDiv.text(this.name);
	$(charDiv).append(obj.name + '<br>')
	$(charDiv).append('<img src="' + obj.photo + '">' + '<br>')
	$(charDiv).append(obj.hp)

	//console.log(charDiv);

	//return charDiv;

	//$(place).append(charDiv);
};


$(document).ready(function() {

	//var names = ["Qui-Gon Jinn", "Anakin Skywalker", "Count Dooku", "General Grievous"];
	//var images = ["qui.jpg", "anakin.jpg", "dooku.jpg", "grievous.jpb"];
	//var pps = ["120", "100", "150", "180"];

	var yourCharacter;
	var defender;
	var yourDamage;
	var defDamage;
	var yourAttackPower = 0; // remember incresing
	var isDefenderSlected;


	isDefenderSlected = false;
	isEnemiesAvailable = false;

	//for (var i = 0; i < names.length; i++) {

	//var carBtn = $("<button>");

	//carBtn.addClass("letter-button letter letter-button-color");

	//carBtn.attr("data-letter", names[i]);

	//carBtn.text(names[i]);

	//$("#characters").append(carBtn);

	//}

	// Add selected character to #yourCharacters. Add other characters to #enemies.
	moveCharacter(quiObj, "#characters");
	moveCharacter(anakinObj, "#characters");

	// Select your character
	//$(".character").on("click", function() {
	$("#characters").on("click", function() {

		console.log("clicked");
		console.log(this.value);
		yourCharacter = this.value;

		$("#characters").empty();

		// Display Your Character
		//$("#yourCharacter").append(quiObj.display());
		moveCharacter(quiObj, "#yourCharacter");
		//$(this).removeClass("enemy");

		// Display Enemies available To Attack
		//$("#enemies").append(anakinObj.display());
		moveCharacter(anakinObj, "#enemies");
		//$(anakinObj).addClass("enemies");
        $(".enemies").css('background-color','Red');

	});

	// Select defender
	//$(".enemy").click(function(event) {
	$("#enemies").on("click", function() {
	//$(".enemy").on("click", function() {

		console.log($(this));
		console.log(this.value);

		if (isDefenderSlected) {
			return;
		}
		else{
			// Move selected item to Defender
			moveCharacter(anakinObj, "#defender");

			// Remove from ememies available to attack
			$(this).remove();

			isDefenderSlected = true;
		}

	});

	$("#defender").click(function(event) {
		var userAnswer = event.target.id;
		console.log(userAnswer);
		console.log("clicked def");
		console.log(this.value);
		console.log($(this).value);

	});


	// Attack
	$("#attack").click(function(event) {
		console.log("attacked");

		if (isDefenderSlected) {
			var result;
			// You attacked xxx for xx damage.
			// xxx attacked you back for xx damage.

			// You been defeated...GAME OVER!!!
			// You have defeated xxx, you can choose to fight anothet enemy.

			//var elem = document.getElementByID('yourCharacter');
			//console.log(elem.id);
			console.log($("#yourCharacter").children('button'));
			console.log($("#yourCharacter button"));
			var elem = $("#yourCharacter").children('button');
			console.log(elem.value);
			//if ()		
			yourAttackPower += 8;

			result = "You attacked xxx for " + parseInt(yourAttackPower) + " damage."
			result += "<br>xxx attacked you back for xx damage."
		}
		else {
        	result = "Slect defender";
		}

        $("#result").html(result);


	});


});


